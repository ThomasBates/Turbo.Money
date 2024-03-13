
module.exports = (logger, data) => {

    // Validate Budget Category data
    const validate = async (userInfo, testCategory) => {
        logger.debug("Business", "BudgetCategoryBusiness.validate: testCategory = ", testCategory);

        const categories = await data.getList(userInfo);
        logger.debug("Business", "BudgetCategoryBusiness.validate: categories = ", categories);

        if (categories.error) {
            return categories.error;
        }
        if (!categories || !categories.list || categories.length == 0) {
            return null;
        }
        categories = categories.list;

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
