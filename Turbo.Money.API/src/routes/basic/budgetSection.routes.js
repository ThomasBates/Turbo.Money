
module.exports = (app, logger, errors, controller) => {
    require("./commonPeriod.routes")(app, logger, errors, controller, 'budgetSection');
};