'use strict';
const { Model } = require('sequelize');

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BankBank extends Model {

        // define associations
        static associate(db) {
            db.BankBank.join.UserFamily = db.BankBank.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BankBank = db.UserFamily.hasMany(db.BankBank, {});
        }
    }

    BankBank.init({
        activeFrom: {
            type: DataTypes.DATE
        },
        activeTo: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.STRING
        },
        branch: {
            type: DataTypes.STRING
        },
        tag: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'BankBank',
        underscored: true,
    });

    BankBank.join = {};

    db.bank.bank = BankBank;

    return BankBank;
};