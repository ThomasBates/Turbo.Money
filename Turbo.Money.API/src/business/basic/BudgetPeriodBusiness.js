
module.exports = function BudgetPeriodBusiness(logger, errors, data) {
    const module = BudgetPeriodBusiness.name;
    const category = 'Business';

    // Validate Budget Period data
    const validate = async (familyId, testPeriod) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testPeriod =', testPeriod);

        const periodList = await data.getList(familyId);
        logger.debug(category, context, 'periodList =', periodList);

        if (periodList.error)
            return errors.create(context, periodList.error.code, periodList);

        if (!periodList || !periodList.list || periodList.length == 0)
            return {};

        let matching = periodList.list.find(period =>
            period.activeStart < testPeriod.activeEnd &&
            period.activeEnd > testPeriod.activeStart &&
            period.id != testPeriod.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Budget Periods must not overlap.");

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return { ...common, validate };
}
