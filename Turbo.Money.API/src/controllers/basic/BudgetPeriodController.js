
module.exports = function BudgetPeriodController(logger, errors, business) {
    const category = 'BudgetPeriod';
    const converter = require("../converters/BudgetPeriodConverter")(logger, errors);

    return require("./CommonController")(
        logger, errors, business,
        category, converter);
}
