'use strict';
const { Model } = require('sequelize');

/*
BudgetPeriod.propertyNames:
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
  'createdAt',
  'updatedAt',
  'rawAttributes',
  '_isAttribute',
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
  'UserFamilyId',
  'getUserFamily',
  'setUserFamily',
  'createUserFamily',
  'BudgetBudgetId',
  'getBudgetBudget',
  'setBudgetBudget',
  'createBudgetBudget'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetPeriod extends Model {

        // define associations
        static associate(db) {
            db.BudgetPeriod.join.UserFamily = db.BudgetPeriod.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetPeriod = db.UserFamily.hasMany(db.BudgetPeriod, {});
        }
    }

    BudgetPeriod.init({
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        start: {
            type: DataTypes.DATE
        },
        end: {
            type: DataTypes.DATE
        },
        isSandbox: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        isClosed: {
            type: DataTypes.BOOLEAN,
            default: false
        },
    }, {
        sequelize,
        modelName: 'BudgetPeriod',
        underscored: true,
    });

    BudgetPeriod.join = {};

    db.budget.period = BudgetPeriod;

    return BudgetPeriod;
};