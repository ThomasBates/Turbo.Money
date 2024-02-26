
module.exports = (logger, business) => {
    return {
        auth: require("./AuthController")(logger, business.auth),
        users: require("./UserController")(logger, business.users),

        banks: require("./BankController")(logger, business.banks),
        bankAccounts: require("./BankAccountController")(logger, business.bankAccounts),
        bankTransactions: require("./BankTransactionController")(logger, business.bankTransactions),

        budgetSections: require("./BudgetSectionController")(logger, business.budgetSections),
        budgetCategories: require("./BudgetCategoryController")(logger, business.budgetCategories),
        budgetAccounts: require("./BudgetAccountController")(logger, business.budgetAccounts),

        budgetWorksheet: require("./BudgetWorksheetController")(logger, business.budgetWorksheet),
    };
};