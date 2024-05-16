'use strict';
const { Model } = require('sequelize');

/*
BudgetCategory.propertyNames:
[
  'constructor',          '_customGetters',
  '_customSetters',       'validators',
  '_hasCustomGetters',    '_hasCustomSetters',
  'id',                   'activeStart',
  'activeEnd',            'name',
  'description',          'displayOrder',
  'createdAt',            'updatedAt',
  'rawAttributes',        '_isAttribute',
  'getBudgetAccounts',    'countBudgetAccounts',
  'hasBudgetAccount',     'hasBudgetAccounts',
  'setBudgetAccounts',    'addBudgetAccount',
  'addBudgetAccounts',    'removeBudgetAccount',
  'removeBudgetAccounts', 'createBudgetAccount',
  'UserFamilyId',         'getUserFamily',
  'setUserFamily',        'createUserFamily',
  'BudgetSectionId',      'getBudgetSection',
  'setBudgetSection',     'createBudgetSection'
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetCategory extends Model {

        // define associations
        static associate(db) {
            db.BudgetCategory.join.UserFamily = db.BudgetCategory.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetCategory = db.UserFamily.hasMany(db.BudgetCategory, {});

            db.BudgetCategory.join.BudgetPeriod = db.BudgetCategory.belongsTo(db.BudgetPeriod, {});
            db.BudgetPeriod.join.BudgetCategory = db.BudgetPeriod.hasMany(db.BudgetCategory, {});

            db.BudgetCategory.join.BudgetSection = db.BudgetCategory.belongsTo(db.BudgetSection, {});
            db.BudgetSection.join.BudgetCategory = db.BudgetSection.hasMany(db.BudgetCategory, {});
        }
    }

    BudgetCategory.init({
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        displayOrder: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'BudgetCategory',
        underscored: true,
    });

    BudgetCategory.join = {};

    db.budget.category = BudgetCategory;

    return BudgetCategory;
};