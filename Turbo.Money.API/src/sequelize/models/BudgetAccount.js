'use strict';
const { Model } = require('sequelize');

/*
BudgetAccount.propertyNames:
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
  'displayOrder',
  'createdAt',
  'updatedAt',
  'rawAttributes',
  '_isAttribute',
  'UserFamilyId',
  'getUserFamily',
  'setUserFamily',
  'createUserFamily',
  'BudgetCategoryId',
  'getBudgetCategory',
  'setBudgetCategory',
  'createBudgetCategory',
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

    class BudgetAccount extends Model {

        // define associations
        static associate(db) {
            db.BudgetAccount.join.UserFamily = db.BudgetAccount.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetAccount = db.UserFamily.hasMany(db.BudgetAccount, {});

            db.BudgetAccount.join.BudgetPeriod = db.BudgetAccount.belongsTo(db.BudgetPeriod, {});
            db.BudgetPeriod.join.BudgetAccount = db.BudgetPeriod.hasMany(db.BudgetAccount, {});

            db.BudgetAccount.join.BudgetCategory = db.BudgetAccount.belongsTo(db.BudgetCategory, {});
            db.BudgetCategory.join.BudgetAccount = db.BudgetCategory.hasMany(db.BudgetAccount, {});
        }
    }

    BudgetAccount.init({
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        displayOrder: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED
        },
        type: {
            type: DataTypes.STRING
        },
        method: {
            type: DataTypes.STRING
        },
        openingBalance: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED
        },
        closingBalance: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED
        },
    }, {
        sequelize,
        modelName: 'BudgetAccount',
        underscored: true,
    });

    BudgetAccount.join = {};

    db.budget.account = BudgetAccount;

    return BudgetAccount;
};