
module.exports = (logger, errors, data) => {

    const budgetBusiness = require("./services/BudgetBusiness")(logger, errors, data);
    return {
        //  Basic CRUD
        bankBank: require("./basic/BankBankBusiness")(logger, errors, data.bankBank),
        bankAccount: require("./basic/BankAccountBusiness")(logger, errors, data.bankAccount),
        bankTransaction: require("./basic/BankTransactionBusiness")(logger, errors, data.bankTransaction, data.bankAccount),
        bankAccountPeriod: require("./basic/BankAccountPeriodBusiness")(logger, errors, data.bankAccountPeriod),

        budgetSchedule: require("./basic/BudgetScheduleBusiness")(logger, errors, data.budgetSchedule),
        budgetPeriod: require("./basic/BudgetPeriodBusiness")(logger, errors, data.budgetPeriod, budgetBusiness),
        budgetSection: require("./basic/BudgetSectionBusiness")(logger, errors, data.budgetSection),
        budgetCategory: require("./basic/BudgetCategoryBusiness")(logger, errors, data.budgetCategory),
        budgetAccount: require("./basic/BudgetAccountBusiness")(logger, errors, data.budgetAccount),
        budgetTransaction: require("./basic/BudgetTransactionBusiness")(logger, errors, data.budgetTransaction),

        //  Services
        bank: require("./services/BankBusiness")(logger, errors, data.bank),
        budget: budgetBusiness,
        user: require("./services/UserBusiness")(logger, errors, data.user),
    };
};