
module.exports = (logger, errors, data) => {
    return {
        //  Basic CRUD
        bankBank: require("./basic/BankBankBusiness")(logger, errors, data.bankBank),
        bankAccount: require("./basic/BankAccountBusiness")(logger, errors, data.bankAccount),
        bankTransaction: require("./basic/BankTransactionBusiness")(logger, errors, data.bankTransaction, data.bankAccount),

        budgetSection: require("./basic/BudgetSectionBusiness")(logger, errors, data.budgetSection),
        budgetCategory: require("./basic/BudgetCategoryBusiness")(logger, errors, data.budgetCategory),
        budgetAccount: require("./basic/BudgetAccountBusiness")(logger, errors, data.budgetAccount),

        //  Services
        bank: require("./services/BankBusiness")(logger, errors, data.bank),
        budget: require("./services/BudgetBusiness")(logger, errors, data.budget),
        user: require("./services/UserBusiness")(logger, errors, data.user),
    };
};