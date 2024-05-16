
module.exports = function BankAccountController(logger, errors, business) {
    const category = 'BankAccount';
    const converter = require("../converters/BankAccountConverter")(errors);

    return require("./CommonController")(
        logger, errors, business,
        category, converter);
}
