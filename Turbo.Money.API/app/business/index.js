
module.exports = (data) => {
    return {
        banks: require("./BankBusiness")(data.banks),
        bankAccounts: require("./BankAccountBusiness")(data.bankAccounts),

        budgetSections: require("./BudgetSectionBusiness")(data.budgetSections),
        budgetCategories: require("./BudgetCategoryBusiness")(data.budgetCategories),
        budgetAccounts: require("./BudgetAccountBusiness")(data.budgetAccounts),

        budgetWorksheet: require("./BudgetWorksheetBusiness")(
            data.budgetSections, data.budgetCategories, data.budgetAccounts),
    };
};