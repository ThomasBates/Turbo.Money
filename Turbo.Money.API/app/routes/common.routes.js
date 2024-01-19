
module.exports = (app, controller, api) => {
    var router = require("express").Router();

    // Create a new item
    router.post("/", controller.create);

    // Retrieve all items
    router.get("/all", controller.getAll);

    // Retrieve all items' id and name
    router.get("/list", controller.getList);

    // Retrieve a single item with id
    router.get("/:id", controller.getOne);

    // Update an item with id
    router.put("/:id", controller.update);

    // Delete an item with id
    router.delete("/:id", controller.deleteOne);

    // Delete all items
    router.delete("/", controller.deleteAll);

    app.use(`/api/${api}`, router);
};