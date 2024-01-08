module.exports = (sequelize, Sequelize) => {
    const BudgetAccount = sequelize.define("budget_account", {
        activeFrom: {
            type: Sequelize.DATE
        },
        activeTo: {
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.DECIMAL(10,2).UNSIGNED
        },
        method: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        display_order: {
            type: Sequelize.INTEGER
        },
        tag: {
            type: Sequelize.STRING
        },
    });

    return BudgetAccount;
};