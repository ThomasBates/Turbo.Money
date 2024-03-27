
module.exports = (logger, business) => {
    return {
        users: require("./UserController")(logger, business.user),

        bankBank: require("./BankBankController")(logger, business.bankBank),
        bankAccount: require("./BankAccountController")(logger, business.bankAccount),
        bankTransaction: require("./BankTransactionController")(logger, business.bankTransaction),
        bank: require("./BankController")(logger, business.bank),

        budgetSection: require("./BudgetSectionController")(logger, business.budgetSection),
        budgetCategory: require("./BudgetCategoryController")(logger, business.budgetCategory),
        budgetAccount: require("./BudgetAccountController")(logger, business.budgetAccount),
        budget: require("./BudgetController")(logger, business.budget),
    };
};