'use strict';

module.exports = async (logger) => {
    const path = require('path');
    const { Umzug, SequelizeStorage } = require('umzug');

    const db = require('./models');

    const cwd = path.join(__dirname, 'migrations');

    const umzug = new Umzug({
        migrations: { glob: ['*.js', { cwd }], },
        context: db.sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize: db.sequelize }),
        logger: console,
    });

    await umzug.up();

    return db;
}