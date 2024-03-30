
module.exports = function BudgetSectionBusiness(logger, errors, data) {
    const module = 'BudgetSectionBusiness';
    const category = 'Business';

    // Validate Budget Section data
    const validate = async (userCookie, testSection) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testSection =', testSection);

        if (testSection.direction != 1 && testSection.direction != -1)
            return errors.create(context, 'InvalidData', "Budget Section direction must be -1 (for income) or 1 (for expenses)");

        const sections = await data.getList(userCookie);
        logger.debug(category, context, 'sections =', sections);

        if (sections.error)
            return errors.create(context, sections.error.code, sections);

        if (!sections || !sections.list || sections.length == 0)
            return {};

        let matching = sections.list.find(section =>
            section.name.toUpperCase() == testSection.name.toUpperCase() &&
            section.id != testSection.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Budget Section name must be unique.");

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return { ...common, validate };
}
