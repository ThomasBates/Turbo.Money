module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("budget_category", {
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
        direction: {
            type: Sequelize.STRING
        },
        tag: {
            type: Sequelize.STRING
        },
    });

    return Bank;
};