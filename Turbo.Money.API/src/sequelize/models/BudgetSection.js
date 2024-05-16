'use strict';
const { Model } = require('sequelize');

/*
BudgetSection.propertyNames:
[
  'constructor',           '_customGetters',
  '_customSetters',        'validators',
  '_hasCustomGetters',     '_hasCustomSetters',
  'id',                    'activeStart',
  'activeEnd',             'name',
  'description',           'direction',
  'displayOrder',          'createdAt',
  'updatedAt',             'rawAttributes',
  '_isAttribute',          'getBudgetCategories',
  'countBudgetCategories', 'hasBudgetCategory',
  'hasBudgetCategories',   'setBudgetCategories',
  'addBudgetCategory',     'addBudgetCategories',
  'removeBudgetCategory',  'removeBudgetCategories',
  'createBudgetCategory',  'UserFamilyId',
  'getUserFamily',         'setUserFamily',
  'createUserFamily',
]
*/

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetSection extends Model {

        // define associations
        static associate(db) {
            db.BudgetSection.join.UserFamily = db.BudgetSection.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetSection = db.UserFamily.hasMany(db.BudgetSection, {});

            db.BudgetSection.join.BudgetPeriod = db.BudgetSection.belongsTo(db.BudgetPeriod, {});
            db.BudgetPeriod.join.BudgetSection = db.BudgetPeriod.hasMany(db.BudgetSection, {});
        }
    }

    BudgetSection.init({
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        direction: {
            type: DataTypes.STRING
        },
        displayOrder: {
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'BudgetSection',
        underscored: true,
    });

    BudgetSection.join = {};

    db.budget.section = BudgetSection;

    return BudgetSection;
};