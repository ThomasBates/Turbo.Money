
module.exports = (app, controller) => {
    var router = require("express").Router();

    // Create a new Budget Account
    router.post("/", controller.create);

    // Retrieve all Budget Accounts
    router.get("/", controller.findAll);

    // Retrieve a single Budget Account with id
    router.get("/:id", controller.findOne);

    // Update a Budget Account with id
    router.put("/:id", controller.update);

    // Delete a Budget Account with id
    router.delete("/:id", controller.deleteOne);

    // Delete all Budget Accounts
    router.delete("/", controller.deleteAll);

    app.use('/api/budgetAccounts', router);
};