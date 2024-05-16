
module.exports = (app, logger, errors, controller) => {
    require("./common.routes")(app, logger, errors, controller, 'budgetTransaction');
};