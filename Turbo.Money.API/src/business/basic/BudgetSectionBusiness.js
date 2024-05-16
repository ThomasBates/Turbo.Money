
module.exports = function BudgetSectionBusiness(logger, errors, data) {
    const module = BudgetSectionBusiness.name;
    const category = 'Business';

    // Validate Budget Section data
    const validate = async (familyId, periodId, testSection) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testSection =', testSection);

        if (testSection.direction != 1 && testSection.direction != -1)
            return errors.create(context, 'InvalidData', "Budget Section direction must be -1 (for income) or 1 (for expenses)");

        const sectionList = await data.getListForPeriod(familyId, periodId);
        logger.debug(category, context, 'sectionList =', sectionList);
        if (sectionList.error)
            return errors.create(context, sectionList.error.code, sectionList);

        if (!sectionList || !sectionList.list || sectionList.length == 0)
            return {};

        let matching = sectionList.list.find(section =>
            section.name.toUpperCase() == testSection.name.toUpperCase() &&
            section.id != testSection.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Budget Section name must be unique.");

        return {};
    }

    const common = require('./CommonPeriodBusiness')(logger, errors, data);
    return { ...common, validate };
}
