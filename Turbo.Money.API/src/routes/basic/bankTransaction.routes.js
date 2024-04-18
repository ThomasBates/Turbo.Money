
module.exports = (app, logger, errors, controller) => {
    require("./common.routes")(app, logger, errors, controller, 'bankTransaction');

    const router = require("express").Router();
    const { validateUserCookie } = require("../RequestValidation")(logger, errors);

    router.post("/upload", validateUserCookie, controller.upload);

    app.use('/api/bankTransaction', router);
};