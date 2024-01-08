
module.exports = (business) => {
    return {
        banks: require("./BankController")(business.banks),
        bankAccounts: require("./BankAccountController")(business.bankAccounts),
        budgetCategories: require("./BudgetCategoryController")(business.budgetCategories),
        budgetAccounts: require("./BudgetAccountController")(business.budgetAccounts),
    };
};