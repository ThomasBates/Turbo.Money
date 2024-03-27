'use strict';
const { Model } = require('sequelize');

module.exports = (db) => {
    const sequelize = db.sequelize;
    const DataTypes = db.Sequelize.DataTypes;

    class BudgetAccount extends Model {

        // define associations
        static associate(db) {
            db.BudgetAccount.join.UserFamily = db.BudgetAccount.belongsTo(db.UserFamily, {});
            db.UserFamily.join.BudgetAccount = db.UserFamily.hasMany(db.BudgetAccount, {});

            db.BudgetAccount.join.BudgetCategory = db.BudgetAccount.belongsTo(db.BudgetCategory, {});
            db.BudgetCategory.join.BudgetAccount = db.BudgetCategory.hasMany(db.BudgetAccount, {});
        }
    }

    BudgetAccount.init({
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
        amount: {
            type: DataTypes.DECIMAL(10, 2).UNSIGNED
        },
        type: {
            type: DataTypes.STRING
        },
        method: {
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
        modelName: 'BudgetAccount',
        underscored: true,
    });

    BudgetAccount.join = {};

    db.budget.account = BudgetAccount;

    return BudgetAccount;
};