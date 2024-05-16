
module.exports = (logger, errors, db) => {
    return {
        //  Basic CRUD
        bankBank: require("./basic/BankBankData")(logger, errors, db.bank.bank),
        bankAccount: require("./basic/BankAccountData")(logger, errors, db.bank.account),
        bankTransaction: require("./basic/BankTransactionData")(logger, errors, db.bank.transaction),
        bankAccountPeriod: require("./basic/BankAccountPeriodData")(logger, errors, db.bank.accountPeriod),

        budgetSchedule: require("./basic/BudgetScheduleData")(logger, errors, db.budget.schedule),
        budgetPeriod: require("./basic/BudgetPeriodData")(logger, errors, db.budget.period),
        budgetSection: require("./basic/BudgetSectionData")(logger, errors, db.budget.section),
        budgetCategory: require("./basic/BudgetCategoryData")(logger, errors, db.budget.category),
        budgetAccount: require("./basic/BudgetAccountData")(logger, errors, db.budget.account),
        budgetTransaction: require("./basic/BudgetTransactionData")(logger, errors, db.budget.transaction),

        //  Services
        bank: require("./services/BankData")(logger, errors, db.bank),
        budget: require("./services/BudgetData")(logger, errors, db),
        user: require("./services/UserData")(logger, errors, db.user),
    };
};