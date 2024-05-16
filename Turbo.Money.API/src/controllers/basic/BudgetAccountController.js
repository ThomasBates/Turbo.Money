
module.exports = function BudgetAccountController(logger, errors, business) {
    const category = 'BudgetAccount';
    const converter = require("../converters/BudgetAccountConverter")(errors);

    return require("./CommonPeriodController")(
        logger, errors, business,
        category, converter);
}
