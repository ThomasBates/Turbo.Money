module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("bank", {
        active_from: {
            type: Sequelize.DATE
        },
        active_to: {
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.STRING
        },
        transit: {
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