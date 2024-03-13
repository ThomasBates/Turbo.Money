
module.exports = (logger, data) => {

    // Validate Budget Section data
    const validate = async (userInfo, testSection) => {
        logger.debug("Business", "BudgetSectionBusiness.validate: testSection = ", testSection);

        const sections = await data.getList(userInfo);
        logger.debug("Business", "BudgetSectionBusiness.validate: sections = ", sections);

        if (sections.error) {
            return sections.error;
        }
        if (!sections || !sections.list || sections.length == 0) {
            return null;
        }
        sections = sections.list;

        let matching = sections.find(section =>
            section.name.toUpperCase() == testSection.name.toUpperCase() &&
            section.id != testSection.id);
        logger.debug("Business", "BudgetSectionBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Budget Section name must be unique.";
        }

        if (testSection.direction != 1 && testSection.direction != -1) {
            return "Validation Error: Budget Section direction must be -1 (for income) or 1 (for expenses)";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
