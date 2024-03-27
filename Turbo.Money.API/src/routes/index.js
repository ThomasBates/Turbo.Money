
module.exports = (app, logger, errors, controllers) => {

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to Turbo Money." });
    });

    require("./user.routes")(app, logger, errors, controllers.users);

    require("./bankBank.routes")(app, logger, errors, controllers.bankBank);
    require("./bankAccount.routes")(app, logger, errors, controllers.bankAccount);
    require("./bankTransaction.routes")(app, logger, errors, controllers.bankTransaction);
    require("./bank.routes")(app, logger, errors, controllers.bank);

    require("./budgetSection.routes")(app, logger, errors, controllers.budgetSection)
    require("./budgetCategory.routes")(app, logger, errors, controllers.budgetCategory)
    require("./budgetAccount.routes")(app, logger, errors, controllers.budgetAccount);
    require("./budget.routes")(app, logger, errors, controllers.budget);

    require("./post.routes")(app);
}

