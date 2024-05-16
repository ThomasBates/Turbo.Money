
module.exports = function BudgetCategoryController(logger, errors, business) {
    const category = 'BudgetCategory';
    const converter = require("../converters/BudgetCategoryConverter")(errors);

    return require("./CommonPeriodController")(
        logger, errors, business,
        category, converter);
}
