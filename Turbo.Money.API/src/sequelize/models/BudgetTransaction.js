'use strict';
const { Model } = require('sequelize');

/*
BudgetTransaction.propertyNames:
[
  'constructor',           '_customGetters',
  '_customSetters',        'validators',
  '_hasCustomGetters',     '_hasCustomSetters',
  'id',                    'timeStamp',
  'description',           'amount',
  'balance',               'sequence',
  'doubleEntryId',         'createdAt',
  'updatedAt',             'rawAttributes',
  '_isAttribute',          'UserFamilyId',
  'getUserFamily',         'setUserFamily',
  'createUserFamily',      'BudgetAccountId',
  'getBudgetAccount',      'setBudgetAccount',
  'createBudgetAccount',   'BankTransactionId',
  'getBankTransaction',    'setBankTransaction',
  'createBankTransaction'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetTransaction extends Model {

        // define associations
        static associate(db) {
            db.BudgetTransaction.join.UserFamily = db.BudgetTransaction.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetTransaction = db.UserFamily.hasMany(db.BudgetTransaction, {});

            db.BudgetTransaction.join.BudgetPeriod = db.BudgetTransaction.belongsTo(db.BudgetPeriod, {});
            db.BudgetPeriod.join.BudgetTransaction = db.BudgetPeriod.hasMany(db.BudgetTransaction, {});

            db.BudgetTransaction.join.BudgetAccount = db.BudgetTransaction.belongsTo(db.BudgetAccount, {});
            db.BudgetAccount.join.BudgetTransaction = db.BudgetAccount.hasMany(db.BudgetTransaction, {});

            db.BudgetTransaction.join.BankTransaction = db.BudgetTransaction.belongsTo(db.BankTransaction, {});
            db.BankTransaction.join.BudgetTransaction = db.BankTransaction.hasMany(db.BudgetTransaction, {});
        }
    }

    BudgetTransaction.init({
        timeStamp: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.STRING
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        sequence: {
            type: DataTypes.STRING
        },
        doubleEntryId: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'BudgetTransaction',
        underscored: true,
    });

    BudgetTransaction.join = {};

    db.budget.transaction = BudgetTransaction;

    return BudgetTransaction;
};