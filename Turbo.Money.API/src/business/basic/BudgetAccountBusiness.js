
module.exports = function BudgetAccountBusiness(logger, errors, data) {
    const module = BudgetAccountBusiness.name;
    const category = 'Business';

    // Validate budget account data
    const validate = async (userCookie, testAccount) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testAccount =', testAccount);

        const accountTypes = ["min", "fix", "max", "est", "avg"];
        if (!accountTypes.includes(testAccount.type)) {
            return errors.create(context, 'InvalidData', "Validation Error: Budget account type is not a valid value.");
        }

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
            return errors.create(context, 'InvalidData', "Budget Account name must be unique.");

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return { ...common, validate };
}
