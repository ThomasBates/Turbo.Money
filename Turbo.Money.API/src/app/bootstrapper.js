
module.exports = async function bootstrapper(app) {

    const loggerProvider = require("../services/logger/loggerConsoleProvider")();
    const logger = require("../services/logger/logger")(loggerProvider);
    const errors = require("../services/errors/errors")(logger);

    logger.enableSeverity('verbose');
    //logger.enableSeverity('info');
    logger.enableCategory('all');
    //logger.disableCategory('User');

    const db = await require("../sequelize")(logger);
    const data = require("../sequelize/data")(logger, errors, db);
    const business = require("../business")(logger, errors, data);
    const controllers = require("../controllers")(logger, errors, business);
    require("../routes")(app, logger, errors, controllers);

    return {
        logger,
        errors,
        business,
    }
}
