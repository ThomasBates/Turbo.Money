'use strict';
const { Model } = require('sequelize');

/*
BankAccountPeriod.propertyNames:
[
  'constructor',        '_customGetters',
  '_customSetters',     'validators',
  '_hasCustomGetters',  '_hasCustomSetters',
  'id',                 'openingBalance',
  'closingBalance',     'createdAt',
  'updatedAt',          'rawAttributes',
  '_isAttribute',       'UserFamilyId',
  'getUserFamily',      'setUserFamily',
  'createUserFamily',   'BankAccountId',
  'getBankAccount',     'setBankAccount',
  'createBankAccount',  'BudgetPeriodId',
  'getBudgetPeriod',    'setBudgetPeriod',
  'createBudgetPeriod'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BankAccountPeriod extends Model {

        // define associations
        static associate(db) {
            db.BankAccountPeriod.join.UserFamily = db.BankAccountPeriod.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BankAccountPeriod = db.UserFamily.hasMany(db.BankAccountPeriod, {});

            db.BankAccountPeriod.join.BankAccount = db.BankAccountPeriod.belongsTo(db.BankAccount, {});
            db.BankAccount.join.BankAccountPeriod = db.BankAccount.hasMany(db.BankAccountPeriod, {});

            db.BankAccountPeriod.join.BudgetPeriod = db.BankAccountPeriod.belongsTo(db.BudgetPeriod, {});
            db.BudgetPeriod.join.BankAccountPeriod = db.BudgetPeriod.hasMany(db.BankAccountPeriod, {});
        }
    }

    BankAccountPeriod.init({
        openingBalance: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED
        },
        closingBalance: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED
        },
    }, {
        sequelize,
        modelName: 'BankAccountPeriod',
        underscored: true,
    });

    BankAccountPeriod.join = {};

    db.bank.accountPeriod = BankAccountPeriod;

    return BankAccountPeriod;
};