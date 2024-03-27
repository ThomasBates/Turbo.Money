
module.exports = (app, controller) => {
    require("./common.routes")(app, controller, 'bankTransaction');

    const router = require("express").Router();
    const validateRequest = require("./validateRequest");

    router.post("/upload", validateRequest, controller.upload);

    app.use('/api/bankTransaction', router);
};