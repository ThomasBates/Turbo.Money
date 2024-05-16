
module.exports = (app, logger, errors, controller, api) => {
    const router = require("express").Router();
    const { validateUserCookie } = require("../RequestValidation")(logger, errors);
/*
    // Create a new item
    router.post("/period/:periodId", validateUserCookie, controller.createForPeriod);

    // Retrieve all items
    router.get("/all/period/:periodId", validateUserCookie, controller.getAllForPeriod);

    // Retrieve all items' id and name
    router.get("/list/period/:periodId", validateUserCookie, controller.getListForPeriod);

    // Update an item with id
    router.put("/period/:periodId/:id", validateUserCookie, controller.updateForPeriod);

    // Delete an item with id
    router.delete("/period/:periodId/:id", validateUserCookie, controller.deleteOneForPeriod);

    // Delete all items
    router.delete("/period/:periodId", validateUserCookie, controller.deleteAllForPeriod);

    app.use(`/api/${api}`, router);
*/
    // Create a new item
    router.post("/", validateUserCookie, controller.createForPeriod);

    // Retrieve all items
    router.get("/all", validateUserCookie, controller.getAllForPeriod);

    // Retrieve all items' id and name
    router.get("/list", validateUserCookie, controller.getListForPeriod);

    // Retrieve a single item with id
    router.get("/:id", validateUserCookie, controller.getOneForPeriod);

    // Update an item with id
    router.put("/:id", validateUserCookie, controller.updateForPeriod);

    // Delete an item with id
    router.delete("/:id", validateUserCookie, controller.deleteOneForPeriod);

    // Delete all items
    router.delete("/", validateUserCookie, controller.deleteAllForPeriod);

    app.use(`/api/${api}/period/:periodId`, router);

    require("./common.routes")(app, logger, errors, controller, api);
};