
module.exports = (app, logger, errors, controller) => {
    const router = require("express").Router();
    const { validateUserCookie } = require("../RequestValidation")(logger, errors);

    router.post('/create_sample_data', validateUserCookie, controller.createSampleData);

    app.use(`/api/budget`, router);
}