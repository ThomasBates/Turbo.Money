'use strict';
const { Model } = require('sequelize');

/*
BudgetSchedule.propertyNames:
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
  'getBankAccountSchedules',
  'countBankAccountSchedules',
  'hasBankAccountSchedule',
  'hasBankAccountSchedules',
  'setBankAccountSchedules',
  'addBankAccountSchedule',
  'addBankAccountSchedules',
  'removeBankAccountSchedule',
  'removeBankAccountSchedules',
  'createBankAccountSchedule',
  'getBudgetAccountSchedules',
  'countBudgetAccountSchedules',
  'hasBudgetAccountSchedule',
  'hasBudgetAccountSchedules',
  'setBudgetAccountSchedules',
  'addBudgetAccountSchedule',
  'addBudgetAccountSchedules',
  'removeBudgetAccountSchedule',
  'removeBudgetAccountSchedules',
  'createBudgetAccountSchedule',
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

    class BudgetSchedule extends Model {

        // define associations
        static associate(db) {
            db.BudgetSchedule.join.UserFamily = db.BudgetSchedule.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetSchedule = db.UserFamily.hasOne(db.BudgetSchedule, {});
        }
    }

    BudgetSchedule.init({
        type: {
            type: DataTypes.STRING
        },
        multiple: {
            type: DataTypes.INTEGER
        },
        weekDay: {
            type: DataTypes.STRING
        },
        monthDays: {
            type: DataTypes.STRING
        },
        yearDates: {
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'BudgetSchedule',
        underscored: true,
    });

    BudgetSchedule.join = {};

    db.budget.schedule = BudgetSchedule;

    return BudgetSchedule;
};