
module.exports = function BudgetCategoryBusiness(logger, data) {
    const module = 'BudgetCategoryBusiness';
    const category = 'Business';

    // Validate Budget Category data
    const validate = async (userCookie, testCategory) => {
        const context = `${module}.validate`;
        logger.debug(category, context, 'testCategory =', testCategory);

        const categories = await data.getList(userCookie);
        logger.debug(category, context, 'categories =', categories);

        if (categories.error) {
            return categories.error;
        }
        if (!categories || !categories.list || categories.length == 0) {
            return null;
        }

        let matching = categories.list.find(category =>
            category.name.toUpperCase() == testCategory.name.toUpperCase() &&
            category.id != testCategory.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching) {
            return "Validation Error: Budget Category name must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
