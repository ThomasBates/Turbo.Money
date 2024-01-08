
module.exports = (app, controller) => {
    var router = require("express").Router();

    // Create a new Bank
    router.post("/", controller.create);

    // Retrieve all Banks
    router.get("/", controller.findAll);

    // Retrieve a single Bank with id
    router.get("/:id", controller.findOne);

    // Update a Bank with id
    router.put("/:id", controller.update);

    // Delete a Bank with id
    router.delete("/:id", controller.deleteOne);

    // Delete all Banks
    router.delete("/", controller.deleteAll);

    app.use('/api/banks', router);
};