
module.exports = function BankAccountBusiness(logger, errors, data) {
    const module = BankAccountBusiness.name;
    const category = 'Business';

    // Validate bank account data
    const validate = async (familyId, testAccount) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testAccount =', testAccount);

        const accountList = await data.getList(familyId);
        logger.debug(category, context, 'accountList =', accountList);

        if (accountList.error)
            return errors.create(context, accountList.error.code, accountList);

        if (!accountList || !accountList.list || accountList.length == 0)
            return {};

        let matching = accountList.list.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank Account name must be unique.");

        matching = accountList.list.some(account =>
            account.bankId == testAccount.bankId &&
            account.number == testAccount.number &&
            account.id != testAccount.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank Account bankId+number must be unique.");

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return { ...common, validate };
}
