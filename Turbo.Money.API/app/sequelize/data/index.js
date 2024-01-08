
module.exports = (db) => {
    db.initialize();
    return {
        banks: require("./BankData")(db.banks),
        bankAccounts: require("./BankAccountData")(db.bankAccounts),
        budgetCategories: require("./BudgetCategoryData")(db.budgetCategories),
        budgetAccounts: require("./BudgetAccountData")(db.budgetAccounts),
    };
};