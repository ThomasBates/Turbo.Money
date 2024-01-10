module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("budget_section", {
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
        direction: {
            type: Sequelize.STRING
        },
        display_order: {
            type: Sequelize.INTEGER
        },
        tag: {
            type: Sequelize.STRING
        },
    });

    return Bank;
};