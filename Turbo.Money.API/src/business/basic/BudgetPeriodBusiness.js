
module.exports = function BudgetPeriodBusiness(logger, errors, data, budgetBusiness) {
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

        if (testPeriod.isSandbox) {

            let matching = periodList.list.find(period =>
                period.name == testPeriod.name &&
                period.id != testPeriod.id);
            logger.debug(category, context, 'matching =', matching);
            if (matching)
                return errors.create(context, 'InvalidData', "Budget Period name must be unique.");

        } else {

            if (!testPeriod.start)
                return errors.create(context, 'InvalidData', "Period start must not be empty!");

            logger.verbose(category, context, `testPeriod.start instanceof Date = "${testPeriod.start instanceof Date}"`);

            if (!(testPeriod.start instanceof Date) || isNaN(testPeriod.start))
                return errors.create(context, 'InvalidData', "Period start must be a date type!");

            if (!testPeriod.end)
                return errors.create(context, 'InvalidData', "Period end must not be empty!");

            if (!(testPeriod.end instanceof Date) || isNaN(testPeriod.end))
                return errors.create(context, 'InvalidData', "Period end must be a date type!");

            let matching = periodList.list.find(period =>
                period.start < testPeriod.end &&
                period.end > testPeriod.start &&
                period.id != testPeriod.id);
            logger.debug(category, context, 'matching =', matching);
            if (matching)
                return errors.create(context, 'InvalidData', "Budget Periods must not overlap.");
        }

        return {};
    }

    const create = async (familyId, period) => {
        const result = await data.create(familyId, period);

        if (!period.templateId)
            return result;

        return await budgetBusiness.copyBudgetWorksheet(familyId, result.id, period.templateId);
    }

    const common = require('./CommonBusiness')(logger, errors, data);

    return { ...common, validate, create };
}
