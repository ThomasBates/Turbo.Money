
module.exports = (logger, db) => {

    const userData = require("./UserData")(logger, db.user);

    return {
        user: userData,

        bankBank: require("./BankBankData")(logger, db.bank.bank),
        bankAccount: require("./BankAccountData")(logger, db.bank.account),
        bankTransaction: require("./BankTransactionData")(logger, db.bank.transaction),
        bank: require("./BankData")(logger, db.bank),

        budgetSection: require("./BudgetSectionData")(logger, db.budget.section),
        budgetCategory: require("./BudgetCategoryData")(logger, db.budget.category),
        budgetAccount: require("./BudgetAccountData")(logger, db.budget.account),
        budget: require("./BudgetData")(logger, db.budget),

    };
};