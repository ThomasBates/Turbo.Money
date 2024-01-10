
module.exports = (app, controller, api) => {
    var router = require("express").Router();

    // Create a new Budget Section
    router.post("/", controller.create);

    // Retrieve all Budget Sections
    router.get("/", controller.getList);

    // Retrieve a single Budget Section with id
    router.get("/:id", controller.getOne);

    // Update a Budget Section with id
    router.put("/:id", controller.update);

    // Delete a Budget Section with id
    router.delete("/:id", controller.deleteOne);

    // Delete all Budget Sections
    router.delete("/", controller.deleteAll);

    app.use(`/api/${api}`, router);
};