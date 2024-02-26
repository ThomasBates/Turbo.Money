
module.exports = (logger, data) => {

    // Validate Budget Category data
    const validate = async (testCategory) => {
        logger.debug("Business", "BudgetCategoryBusiness.validate: testCategory = ", testCategory);
        let [error, categories] = await data.getList();
        if (error) {
            return error;
        }
        if (!categories || categories.length == 0) {
            return null;
        }
        logger.debug("Business", "BudgetCategoryBusiness.validate: categories = ", categories);

        let matching = categories.find(category =>
            category.name.toUpperCase() == testCategory.name.toUpperCase() &&
            category.id != testCategory.id);
        logger.debug("Business", "BudgetCategoryBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Budget Category name must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
