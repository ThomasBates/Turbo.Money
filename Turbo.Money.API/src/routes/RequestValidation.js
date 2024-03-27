

// Verify auth
module.exports = function RequestValidation(logger, errors) {
    const module = 'RequestValidation';
    const category = 'User';

    const validateUserCookie = (req, res, next) => {
        const context = `${module}.validateUserCookie`;

        const jwt = require("jsonwebtoken");

        try {
            const signedUserCookie = req.cookies.user;
            logger.verbose(category, context, 'signedUserCookie =', signedUserCookie);

            if (!signedUserCookie) {
                logger.verbose(category, context, 'return', { message: "Unauthorized" });
                return res.status(401).json(errors.create(context, 'Unauthorized', 'Unauthorized'));
            }

            const userCookie = jwt.verify(signedUserCookie, process.env.COOKIE_SECRET);
            logger.verbose(category, context, 'userCookie =', userCookie);

            return next();
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return res.status(500).json(errors.create(context, 'Catch', ex.message));
        }
    };

    return {
        validateUserCookie
    };
}