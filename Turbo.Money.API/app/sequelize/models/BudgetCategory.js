'use strict';
const { Model } = require('sequelize');

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetCategory extends Model {

        // define associations
        static associate(db) {
            db.BudgetCategory.join.UserFamily = db.BudgetCategory.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetCategory = db.UserFamily.hasMany(db.BudgetCategory, {});

            db.BudgetCategory.join.BudgetSection = db.BudgetCategory.belongsTo(db.BudgetSection, {});
            db.BudgetSection.join.BudgetCategory = db.BudgetSection.hasMany(db.BudgetCategory, {});
        }
    }

    BudgetCategory.init({
        activeFrom: {
            type: DataTypes.DATE
        },
        activeTo: {
            type: DataTypes.DATE
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        displayOrder: {
            type: DataTypes.INTEGER
        },
        tag: {
            type: DataTypes.STRING
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