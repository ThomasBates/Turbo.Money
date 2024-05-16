
module.exports = function BankBankController(logger, errors, business) {
    const category = 'BankBank';
    const converter = require("../converters/BankBankConverter")(errors);

    return require("./CommonController")(
        logger, errors, business,
        category, converter);
}
