
module.exports = function BankAccountPeriodBusiness(logger, errors, data) {
    const module = BankAccountPeriodBusiness.name;
    const category = 'Business';

    // Validate Bank Account Period data
    const validate = async (familyId, testAccountPeriod) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testAccountPeriod =', testAccountPeriod);

        const accountPeriodList = await data.getList(familyId);
        logger.debug(category, context, 'accountPeriodList =', accountPeriodList);

        if (accountPeriodList.error)
            return errors.create(context, accountPeriodList.error.code, accountPeriodList);

        if (!accountPeriodList || !accountPeriodList.list || accountPeriodList.length == 0)
            return {};

        let matching = accountPeriodList.list.find(accountPeriod =>
            accountPeriod.activeStart < testAccountPeriod.activeEnd &&
            accountPeriod.activeEnd > testAccountPeriod.activeStart &&
            accountPeriod.id != testAccountPeriod.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Bank Account Periods must not overlap.");

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return { ...common, validate };
}
