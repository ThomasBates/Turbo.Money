'use strict';
const { Model } = require('sequelize');

/*
BankTransaction.propertyNames:
[
  'constructor',
  '_customGetters',
  '_customSetters',
  'validators',
  '_hasCustomGetters',
  '_hasCustomSetters',
  'id',
  'timeStamp',
  'description',
  'amount',
  'balance',
  'sequence',
  'doubleEntryId',
  'createdAt',
  'updatedAt',
  'rawAttributes',
  '_isAttribute',
  'UserFamilyId',
  'getUserFamily',
  'setUserFamily',
  'createUserFamily',
  'BankAccountId',
  'getBankAccount',
  'setBankAccount',
  'createBankAccount',
  'getBudgetTransactions',
  'countBudgetTransactions',
  'hasBudgetTransaction',
  'hasBudgetTransactions',
  'setBudgetTransactions',
  'addBudgetTransaction',
  'addBudgetTransactions',
  'removeBudgetTransaction',
  'removeBudgetTransactions',
  'createBudgetTransaction'
]
*/

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
    }, {
        sequelize,
        modelName: 'BankTransaction',
        underscored: true,
    });

    BankTransaction.join = {};

    db.bank.transaction = BankTransaction;

    return BankTransaction;
};