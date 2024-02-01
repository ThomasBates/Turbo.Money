
module.exports = (app, controllers) => {
    require("./bank.routes")(app, controllers.banks);
    require("./bankAccount.routes")(app, controllers.bankAccounts);

    require("./budgetSection.routes")(app, controllers.budgetSections)
    require("./budgetCategory.routes")(app, controllers.budgetCategories)
    require("./budgetAccount.routes")(app, controllers.budgetAccounts);

    require("./budgetWorksheet.routes")(app, controllers.budgetWorksheet);
}

