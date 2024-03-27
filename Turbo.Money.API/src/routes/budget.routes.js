
module.exports = (app, controller) => {
    const router = require("express").Router();

    router.post('/create_sample_data', controller.createSampleData);

    app.use(`/api/budget`, router);
}