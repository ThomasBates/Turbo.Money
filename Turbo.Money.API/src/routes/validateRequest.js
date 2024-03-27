

// Verify auth
const validateRequest = (req, res, next) => {
    const loggerProvider = require("../../src/lib/logger/loggerConsoleProvider")();
    const logger = require("../../src/lib/logger/logger")(loggerProvider);
    logger.enableSeverity('verbose');
    logger.enableCategory('all');

    const jwt = require("jsonwebtoken");

    try {
        const signedUserCookie = req.cookies.user;
        logger.verbose('User', 'validateRequest: signedUserCookie', signedUserCookie);

        if (!signedUserCookie) {
            logger.verbose('User', 'validateRequest: return', { message: "Unauthorized" });
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userCookie = jwt.verify(signedUserCookie, process.env.COOKIE_SECRET);
        logger.verbose('User', 'validateRequest: userCookie', userCookie);

        return next();
    } catch (error) {
        logger.verbose('User', 'validateRequest: catch: error =', error);
        logger.verbose('User', 'validateRequest: catch: return', { message: "Unauthorized" });
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = validateRequest;