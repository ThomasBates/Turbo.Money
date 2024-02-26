module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("user", {
        active_from: {
            type: Sequelize.DATE
        },
        active_to: {
            type: Sequelize.DATE
        },
        source: {
            type: Sequelize.STRING
        },
        source_id: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        picture: {
            type: Sequelize.STRING
        },
    });

    return Bank;
};