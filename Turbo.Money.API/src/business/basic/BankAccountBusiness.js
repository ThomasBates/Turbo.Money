
module.exports = function BankAccountBusiness(logger, errors, data) {
    const module = BankAccountBusiness.name;
    const category = 'Business';

    // Validate bank account data
    const validate = async (userCookie, testAccount) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testAccount =', testAccount);

        const accounts = await data.getList(userCookie);
        logger.debug(category, context, 'accounts =', accounts);

        if (accounts.error)
            return errors.create(context, accounts.error.code, accounts);

        if (!accounts || !accounts.list || accounts.length == 0)
            return {};

        let matching = accounts.list.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank Account name must be unique.");

        matching = accounts.list.some(account =>
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
