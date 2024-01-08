
module.exports = (app, controller) => {
    var router = require("express").Router();

    // Create a new Bank Account
    router.post("/", controller.create);

    // Retrieve all Bank Accounts
    router.get("/", controller.findAll);

    // Retrieve a single Bank Account with id
    router.get("/:id", controller.findOne);

    // Update a Bank Account with id
    router.put("/:id", controller.update);

    // Delete a Bank Account with id
    router.delete("/:id", controller.deleteOne);

    // Delete all Bank Accounts
    router.delete("/", controller.deleteAll);

    app.use('/api/bankAccounts', router);
};