
module.exports = function UserController(logger, business) {

    const jwt = require("jsonwebtoken");

    const config = {
        cookieSecret: process.env.COOKIE_SECRET,
        cookieExpiration: 30 * 24 * 60 * 60 * 1000,  //  30 days
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

    const getSignInUrl = (req, res) => {
        logger.debug('User', 'UserController.getSignInUrl: ***********************************************************************');
        logger.debug('User', "UserController.getSignInUrl: req.query = ", req.query);

        const { source, mode } = req.query;

        if (!source || !mode) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: `Invalid query arguments` });
        }

        const result = business.getSignInUrl(source, mode);
        logger.verbose('User', 'UserController.getSignInUrl: businessResult =', result);
        if (result.error) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: result.error });
        }

        setCookie(res, 'signInState', {
            state: "In Progress",
            source: source,
            mode: mode
        });

        logger.debug('User', "UserController.getSignInUrl: return", result);
        return res.json(result);
    };

    const getSignedIn = async (req, res) => {
        logger.debug('User', 'UserController.getSignedIn: ************************************************************************');
        logger.debug('User', "UserController.getSignedIn: req.cookies =", req.cookies);

        let userCookie = null;

        const handleError = (status, message) => {
            const result = { signedIn: false, message };
            (status == 200 ? logger.debug : logger.error)
                ('User', 'UserController.getSignedIn: return', result);
            return res.status(status).json(result);
        };

        //  Return if already in progress
        const signInStateCookie = getCookie(req, 'signInState');
        logger.verbose('User', 'UserController.getSignedIn: req.cookies.signInState =', signInStateCookie);
        if (signInStateCookie && signInStateCookie.state !== "")
            return handleError(200, signInStateCookie.state);

        //  Get user cookie 
        userCookie = getCookie(req, 'user');
        logger.verbose('User', 'UserController.getSignedIn: req.cookies.user =', userCookie);
        if (!userCookie)
            return handleError(200, "no user cookie");

        //  Get token cookie 
        const tokenCookie = getCookie(req, 'token');
        logger.verbose('User', 'UserController.getSignedIn: req.cookies.token =', tokenCookie);
        if (!tokenCookie)
            return handleError(200, "no token cookie");

        //  Call business method
        const getSignedInResult = await business.getSignedIn(userCookie, tokenCookie);
        logger.verbose('User', 'UserController.getSignedIn: result =', getSignedInResult);
        if (getSignedInResult.error)
            return handleError(500, `business.getSignedIn returned: ${getSignedInResult.error}`);
        if (getSignedInResult.message)
            return handleError(200, `business.getSignedIn returned: ${getSignedInResult.message}`);

        const result = {
            signedIn: true,
            user: getSignedInResult.user,
        };

        // Reset user cookie
        // Use new object instead of userCookie,
        // because userCookie has iat and exp attributes already.
        setCookie(res, 'user', {
            source: userCookie.source,
            sourceId: userCookie.sourceId,
            userId: userCookie.userId,
            familyId: userCookie.familyId,
        });

        // Reset token cookie
        // Use new object instead of tokenCookie, 
        // because tokenCookie has iat and exp attributes already.
        setCookie(res, 'token', {
            access_token: getSignedInResult.tokens.accessToken,
            refresh_token: getSignedInResult.tokens.refreshToken,
        });

        logger.debug('User', 'UserController.getSignedIn: return', result);
        return res.json(result);
    };

    const signIn = async (req, res) => {
        logger.debug('User', 'UserController.signIn: *****************************************************************************');
        logger.debug('User', "UserController.signIn: req.query =", req.query);
        logger.debug('User', "UserController.signIn: req.cookies =", req.cookies);
        const params = req.query;

        const handleError = (status, message) => {
            const result = { signedIn: false, message };
            logger.error('User', 'UserController.signIn: return', result);
            clearCookie(res, 'signInState');
            return res.status(status).json(result);
        }

        const signInStateCookie = getCookie(req, 'signInState');
        if (!signInStateCookie || signInStateCookie.state !== "In Progress")
            return handleError(400, 'Sign-in process not initiated properly');
        const { source, mode } = signInStateCookie;

        //  Call business method
        const signInResult = await business.signIn(source, mode, params);
        logger.verbose('User', 'UserController.signIn: result =', signInResult);
        if (signInResult.error)
            return handleError(500, `business.signIn returned: ${signInResult.error}`);

        setCookie(res, 'user', signInResult.userCookie);
        setCookie(res, 'token', signInResult.tokenCookie);

        const result = {
            signedIn: true,
            user: signInResult.user
        };

        logger.debug('User', 'UserController.signIn: return', result);
        clearCookie(res, 'signInState');
        return res.json(result);
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
