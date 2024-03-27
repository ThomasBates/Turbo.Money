'use strict';
const { Model } = require('sequelize');

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetSection extends Model {

        // define associations
        static associate(db) {
            db.BudgetSection.join.UserFamily = db.BudgetSection.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetSection = db.UserFamily.hasMany(db.BudgetSection, {});
        }
    }

    BudgetSection.init({
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
        direction: {
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
        modelName: 'BudgetSection',
        underscored: true,
    });

    BudgetSection.join = {};

    db.budget.section = BudgetSection;

    return BudgetSection;
};