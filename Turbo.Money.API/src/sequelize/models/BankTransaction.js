'use strict';
const { Model } = require('sequelize');

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BankTransaction extends Model {

        // define associations
        static associate(db) {
            db.BankTransaction.join.UserFamily = db.BankTransaction.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BankTransaction = db.UserFamily.hasMany(db.BankTransaction, {});

            db.BankTransaction.join.BankAccount = db.BankTransaction.belongsTo(db.BankAccount, {});
            db.BankAccount.join.BankTransaction = db.BankAccount.hasMany(db.BankTransaction, {});
        }
    }

    BankTransaction.init({
        timeStamp: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2)
        },
        sequence: {
            type: DataTypes.STRING
        },
        doubleEntryId: {
            type: DataTypes.INTEGER
        },
        tag: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'BankTransaction',
        underscored: true,
    });

    BankTransaction.join = {};

    db.bank.transaction = BankTransaction;

    return BankTransaction;
};