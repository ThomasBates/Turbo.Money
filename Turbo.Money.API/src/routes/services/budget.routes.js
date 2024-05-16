
module.exports = (app, logger, errors, controller) => {
    const router = require("express").Router();
    const { validateUserCookie } = require("../RequestValidation")(logger, errors);

    router.post('/create_sample_data', validateUserCookie, controller.createSampleData);

    router.get('/period_list', validateUserCookie, controller.getBudgetPeriodList);
    router.get('/worksheet/:periodId', validateUserCookie, controller.loadBudgetWorksheet);
    router.post('/worksheet', validateUserCookie, controller.saveBudgetWorksheet);

    app.use(`/api/budget`, router);
}