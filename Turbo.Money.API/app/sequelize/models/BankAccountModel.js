module.exports = (sequelize, Sequelize) => {
    const BankAccount = sequelize.define("bank_account", {
        active_from: {
            type: Sequelize.DATE
        },
        active_to: {
            type: Sequelize.DATE
        },
        name: {
            type: Sequelize.STRING
        },
        bank_id: {
            type: Sequelize.INTEGER
            },
        number: {
            type: Sequelize.STRING
        },
        display_order: {
            type: Sequelize.INTEGER
        },
        tag: {
            type: Sequelize.STRING
        },
    });

    return BankAccount;
};