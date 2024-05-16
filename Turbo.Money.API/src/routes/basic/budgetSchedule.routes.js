
module.exports = (app, logger, errors, controller) => {
    const router = require("express").Router();
    const { validateUserCookie } = require("../RequestValidation")(logger, errors);
    const api = 'budgetSchedule';

    // Create a new item
    router.post("/", validateUserCookie, controller.create);

    // Retrieve all items
    router.get("/all", validateUserCookie, controller.getAll);

    // Update an item with id
    router.put("/:id", validateUserCookie, controller.update);

    app.use(`/api/${api}`, router);
};