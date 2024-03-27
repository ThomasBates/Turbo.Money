
module.exports = (logger, data) => {
    return {
        user: require("./UserBusiness")(logger, data.user),

        bankBank: require("./BankBankBusiness")(logger, data.bankBank),
        bankAccount: require("./BankAccountBusiness")(logger, data.bankAccount),
        bankTransaction: require("./BankTransactionBusiness")(logger, 
            data.bankTransaction, data.bankAccount),
        bank: require("./BankBusiness")(logger, data.bank),

        budgetSection: require("./BudgetSectionBusiness")(logger, data.budgetSection),
        budgetCategory: require("./BudgetCategoryBusiness")(logger, data.budgetCategory),
        budgetAccount: require("./BudgetAccountBusiness")(logger, data.budgetAccount),
        budget: require("./BudgetBusiness")(logger, data.budget),
    };
};