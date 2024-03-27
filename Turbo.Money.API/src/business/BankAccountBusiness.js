
module.exports = function BankAccountBusiness(logger, data) {
    const module = 'BankAccountBusiness';
    const category = 'Business';

    // Validate bank account data
    const validate = async (userCookie, testAccount) => {
        const context = `${module}.validate`;
        logger.debug(category, context, 'testAccount =', testAccount);

        const accounts = await data.getList(userCookie);
        logger.debug(category, context, 'accounts =', accounts);

        if (accounts.error) {
            return accounts.error;
        }
        if (!accounts || !accounts.list || accounts.list.length == 0) {
            return null;
        }

        let matching = accounts.list.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching) {
            return "Validation Error: Bank account name must be unique.";
        }

        matching = accounts.list.some(account =>
            account.bankId == testAccount.bankId &&
            account.number == testAccount.number &&
            account.id != testAccount.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching) {
            return "Validation Error: Bank account bankId+number must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
