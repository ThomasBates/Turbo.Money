
module.exports = function BankBankBusiness(logger, errors, data) {
    const module = BankBankBusiness.name;
    const category = 'Business';

    // Validate bank data
    const validate = async (familyId, testBank) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testBank =', testBank);

        const bankList = await data.getList(familyId);
        logger.debug(category, context, 'bankList =', bankList);

        if (bankList.error)
            return errors.create(context, bankList.error.code, bankList);

        if (!bankList || !bankList.list || bankList.list.length == 0)
            return {};

        let matching = bankList.list.find(bank =>
            bank.name.toUpperCase() == testBank.name.toUpperCase() &&
            bank.id != testBank.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank name must be unique.");

        matching = bankList.list.find(bank =>
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
