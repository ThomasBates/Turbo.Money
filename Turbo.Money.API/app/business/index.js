
module.exports = (data) => {
    return {
        banks: require("./BankBusiness")(data.banks),
        bankAccounts: require("./BankAccountBusiness")(data.bankAccounts),
        budgetCategories: require("./BudgetCategoryBusiness")(data.budgetCategories),
        budgetAccounts: require("./BudgetAccountBusiness")(data.budgetAccounts),
    };
};