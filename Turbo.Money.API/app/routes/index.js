
module.exports = (app, logger, controllers) => {

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to Turbo Money." });
    });

    require("./auth.routes")(app, controllers.auth);
    require("./user.routes")(app, controllers.users);

    require("./bank.routes")(app, controllers.banks);
    require("./bankAccount.routes")(app, controllers.bankAccounts);
    require("./bankTransaction.routes")(app, controllers.bankTransactions);

    require("./budgetSection.routes")(app, controllers.budgetSections)
    require("./budgetCategory.routes")(app, controllers.budgetCategories)
    require("./budgetAccount.routes")(app, controllers.budgetAccounts);

    require("./budgetWorksheet.routes")(app, controllers.budgetWorksheet);

    require("./post.routes")(app);
}

