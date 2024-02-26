
module.exports = (logger, db) => {
    db.initialize();

    return {
        users: require("./UserData")(logger, db.users),

        banks: require("./BankData")(logger, db.banks),
        bankAccounts: require("./BankAccountData")(logger, db.bankAccounts),
        bankTransactions: require("./BankTransactionData")(logger, db.bankTransactions),

        budgetSections: require("./BudgetSectionData")(logger, db.budgetSections),
        budgetCategories: require("./BudgetCategoryData")(logger, db.budgetCategories),
        budgetAccounts: require("./BudgetAccountData")(logger, db.budgetAccounts),
    };
};