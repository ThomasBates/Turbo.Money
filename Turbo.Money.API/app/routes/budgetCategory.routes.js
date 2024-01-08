
module.exports = (app, controller) => {
    var router = require("express").Router();

    // Create a new Budget Category
    router.post("/", controller.create);

    // Retrieve all Budget Categories
    router.get("/", controller.findAll);

    // Retrieve a single Budget Category with id
    router.get("/:id", controller.findOne);

    // Update a Budget Category with id
    router.put("/:id", controller.update);

    // Delete a Budget Category with id
    router.delete("/:id", controller.deleteOne);

    // Delete all Budget Categories
    router.delete("/", controller.deleteAll);

    app.use('/api/budgetCategories', router);
};