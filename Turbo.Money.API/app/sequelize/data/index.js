
module.exports = (logger, db) => {
    db.initialize();

    const userData = require("./UserData")(logger, db.user);

    return {
        users: userData,

        banks: require("./BankData")(logger, db.bank.bank, userData),
        bankAccounts: require("./BankAccountData")(logger, db.bank.account, userData),
        bankTransactions: require("./BankTransactionData")(logger, db.bank.transaction, userData),

        budgetSections: require("./BudgetSectionData")(logger, db.budget.section, userData),
        budgetCategories: require("./BudgetCategoryData")(logger, db.budget.category, userData),
        budgetAccounts: require("./BudgetAccountData")(logger, db.budget.account, userData),
    };
};