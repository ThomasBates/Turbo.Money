
module.exports = (logger, data) => {
    return {
        auth: require("./AuthBusiness")(logger, data.users),
        users: require("./UserBusiness")(logger, data.users),

        banks: require("./BankBusiness")(logger, data.banks),
        bankAccounts: require("./BankAccountBusiness")(logger, data.bankAccounts),
        bankTransactions: require("./BankTransactionBusiness")(logger, 
            data.bankTransactions, data.bankAccounts),

        budgetSections: require("./BudgetSectionBusiness")(logger, data.budgetSections),
        budgetCategories: require("./BudgetCategoryBusiness")(logger, data.budgetCategories),
        budgetAccounts: require("./BudgetAccountBusiness")(logger, data.budgetAccounts),

        budgetWorksheet: require("./BudgetWorksheetBusiness")(logger, 
            data.budgetSections, data.budgetCategories, data.budgetAccounts),
    };
};