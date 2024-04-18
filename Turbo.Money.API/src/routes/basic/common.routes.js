
module.exports = (app, logger, errors, controller, api) => {
    const router = require("express").Router();
    const { validateUserCookie } = require("../RequestValidation")(logger, errors);

    // Create a new item
    router.post("/", validateUserCookie, controller.create);

    // Retrieve all items
    router.get("/all", validateUserCookie, controller.getAll);

    // Retrieve all items' id and name
    router.get("/list", validateUserCookie, controller.getList);

    // Retrieve a single item with id
    router.get("/:id", validateUserCookie, controller.getOne);

    // Update an item with id
    router.put("/:id", validateUserCookie, controller.update);

    // Delete an item with id
    router.delete("/:id", validateUserCookie, controller.deleteOne);

    // Delete all items
    router.delete("/", validateUserCookie, controller.deleteAll);

    app.use(`/api/${api}`, router);
};