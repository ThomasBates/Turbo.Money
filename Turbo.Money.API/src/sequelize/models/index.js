'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
    sequelize,
    Sequelize,
    user: {},
    bank: {},
    budget: {},
};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js' &&
            file.indexOf('.test.js') === -1
        );
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(db);
        db[model.name] = model;
    });

Object.keys(sequelize.models).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

//console.log('db =', db);

module.exports = db;
