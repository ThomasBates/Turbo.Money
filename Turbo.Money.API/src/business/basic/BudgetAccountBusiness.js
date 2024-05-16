
module.exports = function BudgetAccountBusiness(logger, errors, data) {
    const module = BudgetAccountBusiness.name;
    const category = 'Business';

    // Validate budget account data
    const validate = async (familyId, periodId, testAccount) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testAccount =', testAccount);

        const amountTypes = ["min", "fix", "max", "est", "avg"];
        if (!amountTypes.includes(testAccount.type)) 
            return errors.create(context, 'InvalidData', 'Budget Account type must be one of "min", "fix", "max", "est", or "avg".');

        const accountList = await data.getListForPeriod(familyId, periodId);
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
            return errors.create(context, 'InvalidData', "Budget Account name must be unique.");

        return {};
    }

    const common = require('./CommonPeriodBusiness')(logger, errors, data);
    return { ...common, validate };
}
