
module.exports = (app, logger, controllers) => {

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to Turbo Money." });
    });

    require("./user.routes")(app, controllers.users);

    require("./bankBank.routes")(app, controllers.bankBank);
    require("./bankAccount.routes")(app, controllers.bankAccount);
    require("./bankTransaction.routes")(app, controllers.bankTransaction);
    require("./bank.routes")(app, controllers.bank);

    require("./budgetSection.routes")(app, controllers.budgetSection)
    require("./budgetCategory.routes")(app, controllers.budgetCategory)
    require("./budgetAccount.routes")(app, controllers.budgetAccount);
    require("./budget.routes")(app, controllers.budget);

    require("./post.routes")(app);
}

