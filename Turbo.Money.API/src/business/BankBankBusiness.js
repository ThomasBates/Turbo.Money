
module.exports = function BankBankBusiness(logger, data) {
    const module = 'BankBankBusiness';
    const category = 'Business';

    // Validate bank data
    const validate = async (userCookie, testBank) => {
        const context = `${module}.validate`;
        logger.debug(category, context, 'testBank =', testBank);

        const banks = await data.getList(userCookie);
        if (banks.error) {
            return banks.error;
        }
        if (!banks || !banks.list || banks.list.length == 0) {
            return null;
        }
        logger.debug(category, context, 'banks =', banks);

        let matching = banks.list.find(bank =>
            bank.name.toUpperCase() == testBank.name.toUpperCase() &&
            bank.id != testBank.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching) {
            return "Validation Error: Bank name must be unique.";
        }

        matching = banks.list.find(bank =>
            bank.number == testBank.number &&
            bank.transit == testBank.transit &&
            bank.id != testBank.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching) {
            return "Validation Error: Bank number+transit must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
