
module.exports = function UserController(logger, business) {

    const jwt = require("jsonwebtoken");
    const crypto = require('crypto');

    const config = {
        cookieSecret: process.env.COOKIE_SECRET,
        cookieExpiration: 30 * 24 * 60 * 60 * 1000,  //  30 days
        businessSignIn: {
            signUp: business.signUp,
            signIn: business.signIn,
        }
    }

    let state = {
        inProgress: [],
    }

    const strategy = {
        facebook: require('./authStrategy/FacebookStrategy')(logger),
        google: require('./authStrategy/GoogleStrategy')(logger),
        twitter: require('./authStrategy/TwitterStrategy')(logger),
        email: require('./authStrategy/EmailStrategy')(logger),
    }

    //  State Functions  ---------------------------------------------------------------------------

    function beginInProgress(user) {
        const key = `${user.source}:${user.sourceId}`;

        let index = state.inProgress.indexOf(key);
        if (index < 0) {
            state.inProgress.push(key);
        }
    }

    function endInProgress(user) {
        const key = `${user.source}:${user.sourceId}`;

        let index = state.inProgress.indexOf(key);
        while (index >= 0) {
            state.inProgress.splice(index, 1);
            index = state.inProgress.indexOf(key);
        }
    }

    function isInProgress(user) {
        const key = `${user.source}:${user.sourceId}`;

        return state.inProgress.indexOf(key) >= 0;
    }

    //  Cookie Functions  --------------------------------------------------------------------------

    function setCookie(res, cookieName, cookieData) {
        logger.debug('User', `UserController.setCookie(${cookieName}): `, cookieData);
        const signedCookie = jwt.sign(cookieData, config.cookieSecret, { expiresIn: config.cookieExpiration });
        res.cookie(cookieName, signedCookie, { maxAge: config.cookieExpiration, httpOnly: true, })
    }

    function getCookie(req, cookieName) {
        const signedCookie = req.cookies[cookieName];
        if (!signedCookie) {
            return null;
        }
        return jwt.verify(signedCookie, config.cookieSecret);
    }

    function clearCookie(res, cookieName) {
        logger.debug('User', `UserController.clearCookie(${cookieName}):`);
        res.clearCookie(cookieName);
    }

    //  Exported Functions  ------------------------------------------------------------------------

    const getSignInUrl = async (req, res) => {
        logger.debug('User', 'UserController.getSignInUrl: ***********************************************************************');
        logger.debug('User', "UserController.getSignInUrl: req.query = ", req.query);

        const { source, mode } = req.query;

        if (!source || !mode) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: `Invalid query arguments` });
        }

        if (!(source in strategy)) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: `Source "${source}" not supported` });
        }

        const url = strategy[source].getSignInUrl();

        logger.verbose('User', 'UserController.getSignInUrl: url =', url);

        setCookie(res, 'signInState', {
            state: "In Progress",
            source: source,
            mode: mode
        });

        result = { url };

        logger.debug('User', "UserController.getSignInUrl: return ", result);
        return res.json(result);
    };

    const getSignedIn = async (req, res) => {
        logger.debug('User', 'UserController.getSignedIn: ************************************************************************');
        logger.debug('User', "UserController.getSignedIn: req.cookies = ", req.cookies);

        let result = { signedIn: false };
        let userCookie = null;

        const handleError = (status, message) => {
            result.message = message;
            (status == 200 ? logger.debug : logger.error)
                ('User', 'UserController.getSignedIn: return', result);
            if (userCookie)
                endInProgress(userCookie);
            return res.status(status).json(result);
        };

        try {
            //  Return if already in progress
            const signInStateCookie = getCookie(req, 'signInState');
            logger.verbose('User', 'UserController.getSignedIn: req.cookies.signInState =', signInStateCookie);
            if (signInStateCookie && signInStateCookie.state !== "") {
                return handleError(200, signInStateCookie.state);
            }

            //  Get token cookie 
            userCookie = getCookie(req, 'user');
            logger.verbose('User', 'UserController.getSignedIn: req.cookies.user =', userCookie);
            if (!userCookie) {
                return handleError(200, "no user cookie");
            }

            if (!userCookie.source || !(userCookie.source in strategy)) {
                return handleError(200, `source ("${userCookie.source}") in user cookie is not supported`);
            }

            //  Return if already in progress
            if (isInProgress(userCookie)) {
                return handleError(200, "In Progress");
            }
            beginInProgress(userCookie);


            //  Get token cookie 
            const tokenCookie = getCookie(req, 'token');
            logger.verbose('User', 'UserController.getSignedIn: req.cookies.token =', tokenCookie);
            if (!tokenCookie) {
                return handleError(200, "no token cookie");
            }

            //  Use refresh token to get new access token
            let tokens = await strategy[userCookie.source].refreshAccessToken(tokenCookie.refresh_token);

            logger.verbose('User', 'UserController.getSignedIn: refreshAccessToken returned:', tokens);

            if (tokens.error) {
                return handleError(500, `refreshAccessToken returned: ${tokens.error}`);
            }

            tokenCookie.access_token = tokens.accessToken;
            tokenCookie.refresh_token = tokens.refreshToken;

            //  Get user data with new access token
            let user = await strategy[userCookie.source].getUserData(tokens.accessToken);

            logger.verbose('User', 'UserController.getSignedIn: getUserData returned:', user);

            if (user.error) {
                return handleError(500, `getUserData returned: ${user.error}`);
            }

            // update user in DB
            const error = await business.update(user);
            if (error) {
                return handleError(error.startsWith("Cannot find user object") ? 200 : 500,
                    `business.update returned: ${error}`);
            }

            // Reset user cookie
            // Use new object instead of userCookie,
            // because userCookie has iat and exp attributes already.
            setCookie(res, 'user', {
                source: userCookie.source,
                sourceId: userCookie.sourceId,
            });

            // Reset token cookie
            // Use new object instead of tokenCookie, 
            // because tokenCookie has iat and exp attributes already.
            setCookie(res, 'token', {
                access_token: tokenCookie.access_token,
                refresh_token: tokenCookie.refresh_token
            });

            //  Return { signedIn: true, user } if able to get user data with access token.
            result = {
                signedIn: true,
                user: {
                    name: user.name,
                    picture: user.picture
                }
            };

            logger.debug('User', 'UserController.getSignedIn: return', result);
            endInProgress(userCookie);
            return res.json(result);

        } catch (error) {
            return handleError(500, `catch: ${error}`);
        }
    };

    const signIn = async (req, res) => {
        logger.debug('User', 'UserController.signIn: *****************************************************************************');
        logger.debug('User', "UserController.signIn: req.query =", req.query);
        logger.debug('User', "UserController.signIn: req.cookies = ", req.cookies);
        const params = req.query;

        let result = { signedIn: false };
        let user = null;

        const handleError = (status, message) => {
            result.message = message;
            logger.error('User', 'UserController.signIn: return', result);
            clearCookie(res, 'signInState');
            if (user)
                endInProgress(user);
            return res.status(status).json(result);
        }

        const signInStateCookie = getCookie(req, 'signInState');
        if (!signInStateCookie || signInStateCookie.state !== "In Progress") {
            return handleError(400, 'Sign-in process not initiated properly');
        }
        const { source, mode } = signInStateCookie;

        try {
            //  Exchange params (code) for access (and refresh) token.
            let tokens = await strategy[source].getAccessToken(params);

            logger.verbose('User', 'UserController.signIn: getAccessTokens returned:', tokens);

            if (tokens.error) {
                return handleError(500, `getAccessToken returned: ${tokens.error}`);
            }

            //  Get user id, name, email, and picture data.
            user = await strategy[source].getUserData(tokens.accessToken);

            logger.verbose('User', 'UserController.signIn: getUserData returned:', user);

            if (user.error) {
                return handleError(500, `getUserData returned: ${user.error}`);
            }

            beginInProgress(user);

            //  Set user in cookie
            setCookie(res, 'user', {
                source: source,
                sourceId: user.sourceId,
            });

            //  Set token in cookie
            setCookie(res, 'token', {
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken
            });

            if (params.password) {
                user.authorization.passwordHash = crypto
                    .createHash('sha256')
                    .update(params.password)
                    .digest('base64');
            }

            // store user in DB
            const error = await config.businessSignIn[mode](user);
            if (error) {
                return handleError(500, `config.businessSignIn[${mode}] returned: ${error}`);
            }

            //  Return { signedIn: true, user } if able to get user data with access token.
            result = {
                signedIn: true,
                user: {
                    name: user.name,
                    picture: user.picture
                }
            };

            logger.debug('User', 'UserController.signIn: return', result);
            clearCookie(res, 'signInState');
            endInProgress(user);
            return res.json(result);

        } catch (error) {
            return handleError(500, `catch: ${error.message || 'Server error'}`);
        }
    };

    const signOut = async (_, res) => {
        const result = { signedIn: false, message: 'Signed out' };
        logger.debug('User', 'UserController.signOut: return', result);
        clearCookie(res, 'user');
        clearCookie(res, 'token');
        res.json(result);
    };

    //  --------------------------------------------------------------------------------------------

    return {
        getSignedIn,
        getSignInUrl,
        signIn,
        signOut
    };
}
