
module.exports = (app, logger, errors, controllers) => {

    //  Simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to Turbo Money." });
    });

    //  Basic CRUD
    require("./basic/bankBank.routes")(app, logger, errors, controllers.bankBank);
    require("./basic/bankAccount.routes")(app, logger, errors, controllers.bankAccount);
    require("./basic/bankTransaction.routes")(app, logger, errors, controllers.bankTransaction);

    require("./basic/budgetSection.routes")(app, logger, errors, controllers.budgetSection)
    require("./basic/budgetCategory.routes")(app, logger, errors, controllers.budgetCategory)
    require("./basic/budgetAccount.routes")(app, logger, errors, controllers.budgetAccount);

    //  Services
    require("./services/bank.routes")(app, logger, errors, controllers.bank);
    require("./services/budget.routes")(app, logger, errors, controllers.budget);
    require("./services/post.routes")(app);
    require("./services/user.routes")(app, logger, errors, controllers.user);
}
