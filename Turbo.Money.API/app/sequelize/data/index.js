
module.exports = (db) => {
    db.initialize();
    return {
        banks: require("./BankData")(db.banks),
        bankAccounts: require("./BankAccountData")(db.bankAccounts),

        budgetSections: require("./BudgetSectionData")(db.budgetSections),
        budgetCategories: require("./BudgetCategoryData")(db.budgetCategories),
        budgetAccounts: require("./BudgetAccountData")(db.budgetAccounts),
    };
};