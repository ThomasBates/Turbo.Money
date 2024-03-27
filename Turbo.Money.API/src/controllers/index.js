
module.exports = (logger, errors, business) => {
    return {
        users: require("./UserController")(logger, errors, business.user),

        bankBank: require("./BankBankController")(logger, errors, business.bankBank),
        bankAccount: require("./BankAccountController")(logger, errors, business.bankAccount),
        bankTransaction: require("./BankTransactionController")(logger, errors, business.bankTransaction),
        bank: require("./BankController")(logger, errors, business.bank),

        budgetSection: require("./BudgetSectionController")(logger, errors, business.budgetSection),
        budgetCategory: require("./BudgetCategoryController")(logger, errors, business.budgetCategory),
        budgetAccount: require("./BudgetAccountController")(logger, errors, business.budgetAccount),
        budget: require("./BudgetController")(logger, errors, business.budget),
    };
};