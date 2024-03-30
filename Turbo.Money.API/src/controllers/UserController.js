
module.exports = function UserController(logger, errors, business) {
    const module = 'UserController';
    const category = 'User';

    const jwt = require("jsonwebtoken");

    const config = {
        cookieSecret: process.env.COOKIE_SECRET,
        cookieExpiration: 30 * 24 * 60 * 60 * 1000,  //  30 days
    }

    //  Cookie Functions  --------------------------------------------------------------------------

    function setCookie(res, cookieName, cookieData) {
        const context = `${module}.${setCookie.name}`;
        logger.debug(category, context, cookieName, cookieData);
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
        const context = `${module}.${clearCookie.name}`;
        logger.debug(category, context, cookieName);
        res.clearCookie(cookieName);
    }

    //  Exported Functions  ------------------------------------------------------------------------

    const getSignInUrl = (req, res) => {
        const context = `${module}.${getSignInUrl.name}`;
        logger.debug(category, context, '***********************************************************************');
        logger.debug(category, context, 'req.query =', req.query);

        const { source, mode } = req.query;

        if (!source || !mode) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json({ message: `Invalid query arguments` });
        }

        const result = business.getSignInUrl(source, mode);
        logger.verbose(category, context, 'businessResult =', result);
        if (result.error) {
            clearCookie(res, 'signInState');
            return res
                .status(400)
                .json(result);
        }

        setCookie(res, 'signInState', {
            state: "In Progress",
            source: source,
            mode: mode
        });

        logger.debug(category, context, 'return', result);
        return res.json(result);
    };

    const getSignedIn = async (req, res) => {
        const context = `${module}.${getSignedIn.name}`;
        logger.debug(category, context, '************************************************************************');
        logger.debug(category, context, 'req.cookies =', req.cookies);

        let userCookie = null;

        const handleError = (status, message) => {
            const result = { signedIn: false, message };
            (status == 200 ? logger.debug : logger.error)
                (category, context, 'return', result);
            return res.status(status).json(result);
        };

        //  Return if already in progress
        const signInStateCookie = getCookie(req, 'signInState');
        logger.verbose(category, context, 'req.cookies.signInStateCookie =', signInStateCookie);
        if (signInStateCookie && signInStateCookie.state !== "")
            return handleError(200, signInStateCookie.state);

        //  Get user cookie 
        userCookie = getCookie(req, 'user');
        logger.verbose(category, context, 'userCookie =', userCookie);
        if (!userCookie)
            return handleError(200, "no user cookie");

        //  Get token cookie 
        const tokenCookie = getCookie(req, 'token');
        logger.verbose(category, context, 'tokenCookie =', tokenCookie);
        if (!tokenCookie)
            return handleError(200, "no token cookie");

        //  Call business method
        const getSignedInResult = await business.getSignedIn(userCookie, tokenCookie);
        logger.verbose(category, context, 'getSignedInResult =', getSignedInResult);
        if (getSignedInResult.error)
            return handleError(500, `business.getSignedIn returned: ${getSignedInResult.error.message}`);
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

        logger.debug(category, context, 'return', result);
        return res.json(result);
    };

    const signIn = async (req, res) => {
        const context = `${module}.${signIn.name}`;
        logger.debug(category, context, '*****************************************************************************');
        logger.debug(category, context, 'req.query =', req.query);
        logger.debug(category, context, 'req.cookies =', req.cookies);
        const params = req.query;

        const handleError = (status, message) => {
            const result = { signedIn: false, message };
            logger.error(category, context, 'return', result);
            clearCookie(res, 'signInState');
            return res.status(status).json(result);
        }

        const signInStateCookie = getCookie(req, 'signInState');
        if (!signInStateCookie || signInStateCookie.state !== "In Progress")
            return handleError(400, 'Sign-in process not initiated properly');
        const { source, mode } = signInStateCookie;

        //  Call business method
        const signInResult = await business.signIn(source, mode, params);
        logger.verbose(category, context, 'signInResult =', signInResult);
        if (signInResult.error)
            return handleError(500, signInResult);

        setCookie(res, 'user', signInResult.userCookie);
        setCookie(res, 'token', signInResult.tokenCookie);

        const result = {
            signedIn: true,
            user: signInResult.user
        };

        logger.debug(category, context, 'return', result);
        clearCookie(res, 'signInState');
        return res.json(result);
    };

    const signOut = async (_, res) => {
        const context = `${module}.${signOut.name}`;
        const result = { signedIn: false, message: 'Signed out' };
        logger.debug(category, context, 'return', result);
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
