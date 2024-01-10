
module.exports = (data) => {

    // Validate Budget Section data
    const validate = async (testSection) => {
        console.log("BudgetSectionBusiness.validate: testSection = ", testSection);
        let [error, sections] = await data.getList();
        if (error) {
            return error;
        }
        if (!sections || sections.length == 0) {
            return null;
        }
        console.log("BudgetSectionBusiness.validate: sections = ", sections);

        let matching = sections.find(section =>
            section.name.toUpperCase() == testSection.name.toUpperCase() &&
            section.id != testSection.id);
        console.log("BudgetSectionBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Budget Section name must be unique.";
        }

        if (testSection.direction != 1 && testSection.direction != -1) {
            return "Validation Error: Budget Section direction must be -1 (for income) or 1 (for expenses)";
        }

        return null;
    }

    const common = require('./CommonBusiness')(data);
    return { ...common, validate };
}
