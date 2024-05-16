'use strict';
const { Model } = require('sequelize');

/*
UserFamily.propertyNames:
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
  'isInitial',
  'createdAt',
  'updatedAt',
  'rawAttributes',
  '_isAttribute',
  'getBankAccounts',
  'countBankAccounts',
  'hasBankAccount',
  'hasBankAccounts',
  'setBankAccounts',
  'addBankAccount',
  'addBankAccounts',
  'removeBankAccount',
  'removeBankAccounts',
  'createBankAccount',
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
  'getBankBanks',
  'countBankBanks',
  'hasBankBank',
  'hasBankBanks',
  'setBankBanks',
  'addBankBank',
  'addBankBanks',
  'removeBankBank',
  'removeBankBanks',
  'createBankBank',
  'getBankTransactions',
  'countBankTransactions',
  'hasBankTransaction',
  'hasBankTransactions',
  'setBankTransactions',
  'addBankTransaction',
  'addBankTransactions',
  'removeBankTransaction',
  'removeBankTransactions',
  'createBankTransaction',
  'getBudgetAccounts',
  'countBudgetAccounts',
  'hasBudgetAccount',
  'hasBudgetAccounts',
  'setBudgetAccounts',
  'addBudgetAccount',
  'addBudgetAccounts',
  'removeBudgetAccount',
  'removeBudgetAccounts',
  'createBudgetAccount',
  'getBudgetAccountPeriods',
  'countBudgetAccountPeriods',
  'hasBudgetAccountPeriod',
  'hasBudgetAccountPeriods',
  'setBudgetAccountPeriods',
  'addBudgetAccountPeriod',
  'addBudgetAccountPeriods',
  'removeBudgetAccountPeriod',
  'removeBudgetAccountPeriods',
  'createBudgetAccountPeriod',
  'getBudgetAmounts',
  'countBudgetAmounts',
  'hasBudgetAmount',
  'hasBudgetAmounts',
  'setBudgetAmounts',
  'addBudgetAmount',
  'addBudgetAmounts',
  'removeBudgetAmount',
  'removeBudgetAmounts',
  'createBudgetAmount',
  'getBudgetBudgets',
  'countBudgetBudgets',
  'hasBudgetBudget',
  'hasBudgetBudgets',
  'setBudgetBudgets',
  'addBudgetBudget',
  'addBudgetBudgets',
  'removeBudgetBudget',
  'removeBudgetBudgets',
  'createBudgetBudget',
  'getBudgetCategories',
  'countBudgetCategories',
  'hasBudgetCategory',
  'hasBudgetCategories',
  'setBudgetCategories',
  ... 65 more items
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class UserFamily extends Model {

        // define associations
        static associate(db) {
        }
    }

    UserFamily.init({
        activeStart: {
            type: DataTypes.DATE
        },
        activeEnd: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isInitial: {
            type: DataTypes.BOOLEAN
        },
    }, {
        sequelize,
        modelName: 'UserFamily',
        underscored: true,
    });

    UserFamily.join = {};

    db.user.family = UserFamily;

    return UserFamily;
};