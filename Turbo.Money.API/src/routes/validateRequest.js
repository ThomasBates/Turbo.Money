

// Verify auth
module.exports = function validateRequest(req, res, next) {
    const context = 'validateRequest';
    const category = 'User';

    const loggerProvider = require("../../src/lib/logger/loggerConsoleProvider")();
    const logger = require("../../src/lib/logger/logger")(loggerProvider);
    logger.enableSeverity('verbose');
    logger.enableCategory('all');

    const jwt = require("jsonwebtoken");

    try {
        const signedUserCookie = req.cookies.user;
        logger.verbose(category, context, 'signedUserCookie =', signedUserCookie);

        if (!signedUserCookie) {
            logger.verbose(category, context, 'return', { message: "Unauthorized" });
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userCookie = jwt.verify(signedUserCookie, process.env.COOKIE_SECRET);
        logger.verbose(category, context, 'userCookie =', userCookie);

        return next();
    } catch (error) {
        logger.verbose(category, context, 'catch: error =', error);
        logger.verbose(category, context, 'catch: return', { message: "Unauthorized" });
        res.status(401).json({ message: "Unauthorized" });
    }
};
