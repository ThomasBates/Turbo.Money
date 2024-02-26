
module.exports = (app, controller) => {
    var router = require("express").Router();
    const validateRequest = require("./validateRequest");

    // Retrieve Budget Structure
    router.get("/", validateRequest, controller.getAll);

    app.use('/api/budgetWorksheet', router);
};