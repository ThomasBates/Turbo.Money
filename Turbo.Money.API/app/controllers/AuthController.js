
module.exports = (logger, business) => {

    const axios = require("axios")
    const jwt = require("jsonwebtoken");
    const queryString = require('node:querystring');

    const commonConfig = {
        clientUrl: process.env.CLIENT_URL,
        tokenSecret: process.env.TOKEN_SECRET,
        cookieExpiration: 30 * 24 * 60 * 60 * 1000,  //  30 days
        businessSignIn: {
            signUp: business.signUp,
            signIn: business.signIn,
        }
    }

    const googleConfig = {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authUrl: process.env.GOOGLE_AUTH_URL,
        tokenUrl: process.env.GOOGLE_TOKEN_URL,
        userInfoUrl: process.env.GOOGLE_USER_INFO_URL,
        refreshUrl: process.env.GOOGLE_REFRESH_URL,
        redirectUrl: process.env.GOOGLE_SIGNIN_REDIRECT_URL,
        ...commonConfig
    }

    const config = {
        google: googleConfig,
        ...commonConfig
    }

    //  Param Functions  ---------------------------------------------------------------------------

    const getAuthParams = (source) => queryString.stringify({
        client_id: config[source].clientId,
        redirect_uri: config[source].redirectUrl,
        response_type: 'code',
        scope: 'openid profile email',
        access_type: 'offline',
        state: 'standard_oauth',
        prompt: 'consent',
    });

    const getTokenParams = (code, source) => queryString.stringify({
        client_id: config[source].clientId,
        client_secret: config[source].clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config[source].redirectUrl,
    });

    //  Cookie Functions  --------------------------------------------------------------------------

    function setCookie(res, cookieName, cookieData) {
        logger.debug('Auth', `AuthController.setCookie(${cookieName}): `, cookieData);
        const signedCookie = jwt.sign(cookieData, config.tokenSecret, { expiresIn: config.cookieExpiration });
        res.cookie(cookieName, signedCookie, { maxAge: config.cookieExpiration, httpOnly: true, })
    }

    function getCookie(req, cookieName) {
        const signedCookie = req.cookies[cookieName];
        if (!signedCookie) {
            return null;
        }
        return jwt.verify(signedCookie, config.tokenSecret);
    }

    function clearCookie(res, cookieName) {
        logger.debug('Auth', `AuthController.clearCookie(${cookieName}):`);
        res.clearCookie(cookieName);
    }

    //  Access Functions  --------------------------------------------------------------------------

    async function getUserData(accessToken, source) {
        try {
            const { data } = await axios.post(`${config[source].userInfoUrl}?access_token=${accessToken}`);

            return [null, data];

        } catch (error) {
            logger.error('Auth', 'AuthController.getUserData: error =', error.message || error);
            return [error.message || error, null];
        }
    }

    async function refreshAccessToken(refreshToken, source) {
        try {
            const { data } = await axios.post(config[source].refreshUrl, {
                client_id: config[source].clientId,
                client_secret: config[source].clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
            });

            return [null, data.access_token, refreshToken];

        } catch (error) {
            logger.error('Auth', 'AuthController.refreshAccessToken: error =', error.message || error);
            return [error.message || error, null];
        }
    }

    //  Exported Functions  ------------------------------------------------------------------------

    const getSignedIn = async (req, res) => {
        let result = { signedIn: false };

        try {
            logger.debug('Auth', 'AuthController.getSignedIn: ************************************************************************');

            //  Get state from cookie
            const signInStateCookie = getCookie(req, 'signInState');
            logger.verbose('Auth', 'AuthController.getSignedIn: req.cookies.signInState =', signInStateCookie);
            if (signInStateCookie && signInStateCookie.state !== "") {
                result.message = signInStateCookie.state;
                logger.debug('Auth', 'AuthController.getSignedIn: return ', result);
                return res.json(result);
            }

            let tokenCookie = getCookie(req, 'token');
            logger.verbose('Auth', 'AuthController.getSignedIn: req.cookies.token =', tokenCookie);
            if (!tokenCookie) {
                result.message = "no token cookie";
                logger.debug('Auth', 'AuthController.getSignedIn: return ', result);
                return res.json(result);
            }

            if (!tokenCookie.source || !(tokenCookie.source in config)) {
                result.message = `invalid source ("${tokenCookie.source}") in token cookie`;
                logger.debug('Auth', 'AuthController.getSignedIn: return ', result);
                return res.json(result);
            }

            //  Get access token from cookie token
            let accessToken = tokenCookie.access_token;

            //  Get user data with access token
            let error = null;
            let user = null;
            if (accessToken) {
                [error, user] = await getUserData(accessToken, tokenCookie.source);
                error && logger.verbose('Auth', 'AuthController.getSignedIn: getUserData(1).error =', error);
                user  && logger.verbose('Auth', 'AuthController.getSignedIn: getUserData(1).user =', user);
            }

            //  If access token is non-existent/invalid/expired, get refresh token from cookie token
            if (!user) {
                let refreshToken = tokenCookie.refresh_token;

                if (refreshToken) {
                    //  Use refresh token to get new access token
                    [error, accessToken, refreshToken] = await refreshAccessToken(refreshToken, tokenCookie.source);
                    error && logger.verbose('Auth', 'AuthController.getSignedIn: refreshAccessToken.error =', error);
                    if (accessToken) {
                        tokenCookie.access_token = accessToken;
                        logger.verbose('Auth', 'AuthController.getSignedIn: refreshAccessToken.accessToken =', accessToken);
                    }
                    if (refreshToken) {
                        tokenCookie.refresh_token = refreshToken;
                        logger.verbose('Auth', 'AuthController.getSignedIn: refreshAccessToken.refreshToken =', refreshToken);
                    }

                    //  Get user data with new access token
                    [error, user] = await getUserData(accessToken, tokenCookie.source);
                    error && logger.verbose('Auth', 'AuthController.getSignedIn: getUserData(2).error =', error);
                    user  && logger.verbose('Auth', 'AuthController.getSignedIn: getUserData(2).user =', user);
                }
            }

            //  Return { signedIn: true, user } if able to get user data with access token.
            if (user) {
                const updateUser = {
                    source: tokenCookie.source,
                    sourceId: tokenCookie.sourceId,
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                };
                logger.verbose('Auth', "AuthController.getSignedIn: updateUser =", updateUser);

                // update user in DB
                const error = await business.update(updateUser);
                if (error) {
                    result.message = error;
                    if (error.startsWith("Cannot find user object")) {
                        logger.debug('Auth', "AuthController.getSignedIn: return ", result);
                        return res.json(result);
                    }
                    logger.error('Auth', "AuthController.getSignedIn: return ", result);
                    return res.status(500).json(result);
                }

                // Reset token in cookie
                // Use newTokenCookie instead of tokenCookie, 
                // because tokenCookie has iat and exp attributes.
                const newTokenCookie = {
                    source: tokenCookie.source,
                    sourceId: tokenCookie.sourceId,
                    access_token: tokenCookie.access_token,
                    refresh_token: tokenCookie.refresh_token
                }
                setCookie(res, 'token', newTokenCookie);

                result = {
                    signedIn: true,
                    user: {
                        name: user.name,
                        picture: user.picture
                    }
                };

                logger.debug('Auth', 'AuthController.getSignedIn: return ', result);
                return res.json(result);
            }

            //  Return { signedIn: false } if unable to get user data with access token.
            //  i.e. no access token and no refresh token or expired refresh token.
            else {
                result.message = "no user";
                logger.debug('Auth', 'AuthController.getSignedIn: return ', result);
                return res.json(result);
            }

        } catch (error) {
            result.message = error;
            logger.error('Auth', 'AuthController.getSignedIn: catch: return ', result);
            return res.json(result);
        }
    };

    const getSignInUrl = async (req, res) => {
        logger.debug('Auth', 'AuthController.getSignInUrl: ***********************************************************************');
        logger.debug('Auth', "AuthController.getSignInUrl: req.query = ", req.query);


        const { source, mode } = req.query;

        if (!source || !mode) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: `Invalid query arguments` });
        }

        if (!(source in config)) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: `Source "${source}" not supported` });
        }

        const authParams = getAuthParams(source);
        logger.debug('Auth', 'AuthController.getSignInUrl: authParams =', authParams);

        setCookie(res, 'signInState', {
            state: "In Progress",
            source: source,
            mode: mode
        });

        return res.json({ url: `${config[source].authUrl}?${authParams}` });
    };

    const signIn = async (req, res) => {
        const { code } = req.query;

        if (!code) {
            clearCookie(res, 'signInState');
            return res.status(400).json({ message: 'Authorization code must be provided' });
        }

        const { state: signInState, source, mode } = getCookie(req, 'signInState');
        if (signInState !== "In Progress") {
            return res.json({ message: signInState });
        }

        try {
            // Get all parameters needed to hit authorization server
            const tokenParams = getTokenParams(code, source, mode);
            logger.verbose('Auth', `AuthController.signIn: tokenParams = "${tokenParams}"`);

            // Exchange authorization code for access token (id token is returned here too)
            const { data: tokenData } = await axios.post(config[source].tokenUrl, tokenParams);
            logger.verbose('Auth', `AuthController.signIn: tokenData =`, tokenData);

            if (!tokenData.id_token) {
                clearCookie(res, 'signInState');
                return res.status(400).json({ message: 'Authorization error' });
            }

            const id_data = jwt.decode(tokenData.id_token);
            logger.verbose('Auth', `AuthController.signIn: jwt.decode(data.id_token) =`, id_data);

            // Get user info from id token
            const { sub, email, name, picture } = jwt.decode(tokenData.id_token);
            const user = { source: source, sourceId: sub, name, email, picture };

            const tokenCookie = {
                source: source,
                sourceId: sub,
                access_token: tokenData.access_token,
                refresh_token: tokenData.refresh_token
            }
            setCookie(res, 'token', tokenCookie);

            // store user in DB
            const error = await config.businessSignIn[mode](user);
            if (error) {
                logger.error('Auth', `AuthController.signIn: businessSignIn(user).error =`, error);
                clearCookie(res, 'signInState');
                return res.status(500).json({ message: error });
            }

            clearCookie(res, 'signInState');
            return res.json({ user, });

        } catch (err) {
            logger.error('Auth', 'Error: ', err);
            clearCookie(res, 'signInState');
            return res.status(500).json({ message: err.message || 'Server error' });
        }
    };

    const signOut = async (_, res) => {
        // clear cookie
        clearCookie(res, 'token');
        res.json({ message: 'Signed out' });
    };

    //  --------------------------------------------------------------------------------------------

    return {
        getSignedIn,
        getSignInUrl,
        signIn,
        signOut
    };
}
