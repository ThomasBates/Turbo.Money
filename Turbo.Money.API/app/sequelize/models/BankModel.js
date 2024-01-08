module.exports = (sequelize, Sequelize) => {
    const Bank = sequelize.define("bank", {
        activeFrom: {
            type: Sequelize.DATE
        },
        activeTo: {
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
        tag: {
            type: Sequelize.STRING
        },
    });

    return Bank;
};