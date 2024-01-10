module.exports = (sequelize, Sequelize) => {
    const BudgetAccount = sequelize.define("budget_account", {
        active_from: {
            type: Sequelize.DATE
        },
        active_to: {
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
        type: {
            type: Sequelize.STRING
        },
        method: {
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