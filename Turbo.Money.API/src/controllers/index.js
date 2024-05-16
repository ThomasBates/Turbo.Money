
module.exports = (logger, errors, business) => {
    return {
        //  Basic CRUD
        bankBank: require("./basic/BankBankController")(logger, errors, business.bankBank),
        bankAccount: require("./basic/BankAccountController")(logger, errors, business.bankAccount),
        bankTransaction: require("./basic/BankTransactionController")(logger, errors, business.bankTransaction),
        bankAccountPeriod: require("./basic/BankAccountPeriodController")(logger, errors, business.bankAccountPeriod),

        budgetSchedule: require("./basic/BudgetScheduleController")(logger, errors, business.budgetSchedule),
        budgetPeriod: require("./basic/BudgetPeriodController")(logger, errors, business.budgetPeriod),
        budgetSection: require("./basic/BudgetSectionController")(logger, errors, business.budgetSection),
        budgetCategory: require("./basic/BudgetCategoryController")(logger, errors, business.budgetCategory),
        budgetAccount: require("./basic/BudgetAccountController")(logger, errors, business.budgetAccount),
        budgetTransaction: require("./basic/BudgetTransactionController")(logger, errors, business.budgetTransaction),

        //  Services
        bank: require("./services/BankController")(logger, errors, business.bank),
        budget: require("./services/BudgetController")(logger, errors, business.budget),
        user: require("./services/UserController")(logger, errors, business.user),
    };
};