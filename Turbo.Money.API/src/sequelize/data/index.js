
module.exports = (logger, errors, db) => {

    const userData = require("./UserData")(logger, errors, db.user);

    return {
        user: userData,

        bankBank: require("./BankBankData")(logger, errors, db.bank.bank),
        bankAccount: require("./BankAccountData")(logger, errors, db.bank.account),
        bankTransaction: require("./BankTransactionData")(logger, errors, db.bank.transaction),
        bank: require("./BankData")(logger, errors, db.bank),

        budgetSection: require("./BudgetSectionData")(logger, errors, db.budget.section),
        budgetCategory: require("./BudgetCategoryData")(logger, errors, db.budget.category),
        budgetAccount: require("./BudgetAccountData")(logger, errors, db.budget.account),
        budget: require("./BudgetData")(logger, errors, db.budget),

    };
};