'use strict';
const { Model } = require('sequelize');

/*
BankAccount.propertyNames:
[
  'constructor',
  '_customGetters',
  '_customSetters',
  'validators',
  '_hasCustomGetters',
  '_hasCustomSetters',
  'id',
  'activeStart',
  'activeEnd',
  'name',
  'description',
  'number',
  'createdAt',
  'updatedAt',
  'rawAttributes',
  '_isAttribute',
  'UserFamilyId',
  'getUserFamily',
  'setUserFamily',
  'createUserFamily',
  'BankBankId',
  'getBankBank',
  'setBankBank',
  'createBankBank',
  'getBankAccountPeriods',
  'countBankAccountPeriods',
  'hasBankAccountPeriod',
  'hasBankAccountPeriods',
  'setBankAccountPeriods',
  'addBankAccountPeriod',
  'addBankAccountPeriods',
  'removeBankAccountPeriod',
  'removeBankAccountPeriods',
  'createBankAccountPeriod',
  'getBankTransactions',
  'countBankTransactions',
  'hasBankTransaction',
  'hasBankTransactions',
  'setBankTransactions',
  'addBankTransaction',
  'addBankTransactions',
  'removeBankTransaction',
  'removeBankTransactions',
  'createBankTransaction'
]
*/

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
        activeStart: {
            type: DataTypes.DATE
        },
        activeEnd: {
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
    }, {
        sequelize,
        modelName: 'BankAccount',
        underscored: true,
    });

    BankAccount.join = {};

    db.bank.account = BankAccount;

    return BankAccount;
};