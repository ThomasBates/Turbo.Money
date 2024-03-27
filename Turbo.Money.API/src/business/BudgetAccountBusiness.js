
module.exports = function BudgetAccountBusiness(logger, data) {
    const module = 'BudgetAccountBusiness';
    const category = 'Business';

    // Validate budget account data
    const validate = async (userCookie, testAccount) => {
        const context = `${module}.validate`;
        logger.debug(category, context, 'testAccount =', testAccount);

        const accounts = await data.getList(userCookie);
        logger.debug(category, context, 'accounts =', accounts);

        if (accounts.error) {
            return accounts.error;
        }
        if (!accounts || !accounts.list || accounts.length == 0) {
            return null;
        }

        let matching = accounts.list.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching) {
            return "Validation Error: Budget account name must be unique.";
        }

        const accountTypes = ["min", "fix", "max", "est", "avg"];
        if (!accountTypes.includes(testAccount.type)) {
            return "Validation Error: Budget account type is not a valid value.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
