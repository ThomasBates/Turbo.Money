
module.exports = (app, controllers) => {
    require("./bank.routes")(app, controllers.banks);
    require("./bankAccount.routes")(app, controllers.bankAccounts);

    require("./BudgetSection.routes")(app, controllers.budgetSections)
    require("./BudgetCategory.routes")(app, controllers.budgetCategories)
    require("./budgetAccount.routes")(app, controllers.budgetAccounts);

    require("./BudgetWorksheet.routes")(app, controllers.budgetWorksheet);
}

