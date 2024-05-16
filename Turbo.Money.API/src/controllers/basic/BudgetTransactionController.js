
module.exports = function BudgetTransactionController(logger, errors, business) {
    const category = 'BudgetTransaction';
    const converter = require("../converters/BudgetTransactionConverter")(errors);

    return require("./CommonController")(
        logger, errors, business, 
        category, converter);
}
