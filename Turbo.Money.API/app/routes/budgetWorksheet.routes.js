
module.exports = (app, controller) => {
    var router = require("express").Router();

    // Retrieve Budget Structure
    router.get("/", controller.getAll);

    app.use('/api/budgetWorksheet', router);
};