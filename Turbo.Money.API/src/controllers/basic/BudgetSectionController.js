
module.exports = function BudgetSectionController(logger, errors, business) {
    const category = 'BudgetSection';
    const converter = require("../converters/BudgetSectionConverter")(errors);

    return require("./CommonPeriodController")(
        logger, errors, business,
        category, converter);
}
