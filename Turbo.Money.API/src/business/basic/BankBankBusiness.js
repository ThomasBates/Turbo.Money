
module.exports = function BankBankBusiness(logger, errors, data) {
    const module = BankBankBusiness.name;
    const category = 'Business';

    // Validate bank data
    const validate = async (userCookie, testBank) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testBank =', testBank);

        const banks = await data.getList(userCookie);
        logger.debug(category, context, 'banks =', banks);

        if (banks.error)
            return errors.create(context, banks.error.code, banks);

        if (!banks || !banks.list || banks.list.length == 0)
            return {};

        let matching = banks.list.find(bank =>
            bank.name.toUpperCase() == testBank.name.toUpperCase() &&
            bank.id != testBank.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank name must be unique.");

        matching = banks.list.find(bank =>
            bank.number == testBank.number &&
            bank.branch == testBank.branch &&
            bank.id != testBank.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank number+branch must be unique.");

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return { ...common, validate };
}
