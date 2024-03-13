module.exports = (logger) => {

    const dbConfig = require("../../config/db.config.js");

    const Sequelize = require("sequelize");
    const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },

        logging: msg => logger.verbose('Sequelize', msg)
    });

    const db = {};

    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    require('./model.js')(db);

    db.initialize = async () => {
        try {
            await sequelize.sync({ force: true });
            logger.info("Model", "Drop and re-sync db.");
        } catch (err) {
            logger.error("Model", "Failed to sync db: ");
            logger.error("Model", err);
            return;
        }

        await require('./createBaseUserData')(logger, db.user);
        await require('./createSampleUserData')(logger, db.user);
    }

    return db;
}