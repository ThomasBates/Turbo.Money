module.exports = (sequelize, Sequelize) => {
    const BankTransaction = sequelize.define("bank_transaction", {
        account_id: {
            type: Sequelize.INTEGER
        },
        time_stamp: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.DECIMAL(10, 2)
        },
        balance: {
            type: Sequelize.DECIMAL(10, 2)
        },
        sequence: {
            type: Sequelize.STRING
        },
        double_entry_id: {
            type: Sequelize.INTEGER
        },
        tag: {
            type: Sequelize.STRING
        },
    });

    return BankTransaction;
};