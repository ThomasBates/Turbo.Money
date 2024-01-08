module.exports = (sequelize, Sequelize) => {
    const BankAccount = sequelize.define("bank_account", {
        activeFrom: {
            type: Sequelize.DATE
        },
        activeTo: {
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
        tag: {
            type: Sequelize.STRING
        },
    });

    return BankAccount;
};