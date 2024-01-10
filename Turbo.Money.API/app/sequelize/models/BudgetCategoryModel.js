module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("budget_category", {
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
        section_id: {
            type: Sequelize.INTEGER
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