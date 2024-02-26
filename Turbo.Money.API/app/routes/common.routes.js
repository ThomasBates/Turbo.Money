
module.exports = (app, controller, api) => {
    const router = require("express").Router();
    const validateRequest = require("./validateRequest");

    // Create a new item
    router.post("/", validateRequest, controller.create);

    // Retrieve all items
    router.get("/all", validateRequest, controller.getAll);

    // Retrieve all items' id and name
    router.get("/list", validateRequest, controller.getList);

    // Retrieve a single item with id
    router.get("/:id", validateRequest, controller.getOne);

    // Update an item with id
    router.put("/:id", validateRequest, controller.update);

    // Delete an item with id
    router.delete("/:id", validateRequest, controller.deleteOne);

    // Delete all items
    router.delete("/", validateRequest, controller.deleteAll);

    app.use(`/api/${api}`, router);
};