

// Verify auth
const validateRequest = (req, res, next) => {
    const loggerProvider = require("../../lib/logger/loggerConsoleProvider")();
    const logger = require("../../lib/logger/logger")(loggerProvider);
    logger.enableSeverity('verbose');
    logger.enableCategory('all');

    const jwt = require("jsonwebtoken");

    try {
        const userCookie = req.cookies.user;
        logger.verbose('User', 'validateRequest: userCookie', userCookie);

        if (!userCookie) {
            logger.verbose('User', 'validateRequest: return', { message: "Unauthorized" });
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userData = jwt.verify(userCookie, process.env.COOKIE_SECRET);
        logger.verbose('User', 'validateRequest: userData', userData);

        return next();
    } catch (error) {
        logger.verbose('User', 'validateRequest: catch: error =', error);
        logger.verbose('User', 'validateRequest: catch: return', { message: "Unauthorized" });
        res.status(401).json({ message: "Unauthorized" });
    }
};

module.exports = validateRequest;