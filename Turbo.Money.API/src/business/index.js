
module.exports = (logger, errors, data) => {
    return {
        user: require("./UserBusiness")(logger, errors, data.user),

        bankBank: require("./BankBankBusiness")(logger, errors, data.bankBank),
        bankAccount: require("./BankAccountBusiness")(logger, errors, data.bankAccount),
        bankTransaction: require("./BankTransactionBusiness")(logger, errors,
            data.bankTransaction, data.bankAccount),
        bank: require("./BankBusiness")(logger, errors, data.bank),

        budgetSection: require("./BudgetSectionBusiness")(logger, errors, data.budgetSection),
        budgetCategory: require("./BudgetCategoryBusiness")(logger, errors, data.budgetCategory),
        budgetAccount: require("./BudgetAccountBusiness")(logger, errors, data.budgetAccount),
        budget: require("./BudgetBusiness")(logger, errors, data.budget),
    };
};