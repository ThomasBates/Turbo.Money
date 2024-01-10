
module.exports = (business) => {
    return {
        banks: require("./BankController")(business.banks),
        bankAccounts: require("./BankAccountController")(business.bankAccounts),

        budgetSections: require("./BudgetSectionController")(business.budgetSections),
        budgetCategories: require("./BudgetCategoryController")(business.budgetCategories),
        budgetAccounts: require("./BudgetAccountController")(business.budgetAccounts),

        budgetWorksheet: require("./BudgetWorksheetController")(business.budgetWorksheet),
    };
};