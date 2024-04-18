
module.exports = (logger, errors, db) => {
    return {
        //  Basic CRUD
        bankBank: require("./basic/BankBankData")(logger, errors, db.bank.bank),
        bankAccount: require("./basic/BankAccountData")(logger, errors, db.bank.account),
        bankTransaction: require("./basic/BankTransactionData")(logger, errors, db.bank.transaction),

        budgetSection: require("./basic/BudgetSectionData")(logger, errors, db.budget.section),
        budgetCategory: require("./basic/BudgetCategoryData")(logger, errors, db.budget.category),
        budgetAccount: require("./basic/BudgetAccountData")(logger, errors, db.budget.account),

        //  Services
        bank: require("./services/BankData")(logger, errors, db.bank),
        budget: require("./services/BudgetData")(logger, errors, db.budget),
        user: require("./services/UserData")(logger, errors, db.user),
    };
};