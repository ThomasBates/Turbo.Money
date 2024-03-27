'use strict';
const { Model } = require('sequelize');

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BankAccount extends Model {

        // define associations
        static associate(db) {
            db.BankAccount.join.UserFamily = db.BankAccount.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BankAccount = db.UserFamily.hasMany(db.BankAccount, {});

            db.BankAccount.join.BankBank = db.BankAccount.belongsTo(db.BankBank, {});
            db.BankBank.join.BankAccount = db.BankBank.hasMany(db.BankAccount, {});
        }
    }

    BankAccount.init({
        activeFrom: {
            type: DataTypes.DATE
        },
        activeTo: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.STRING
        },
        tag: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'BankAccount',
        underscored: true,
    });

    BankAccount.join = {};

    db.bank.account = BankAccount;

    return BankAccount;
};