
module.exports = function BankAccountPeriodController(logger, errors, business) {
    const category = 'BankAccountPeriod';
    const converter = require("../converters/BankAccountPeriodConverter")(errors);

    return require("./CommonController")(
        logger, errors, business,
        category, converter);
}
