
module.exports = function BudgetCategoryBusiness(logger, errors, data) {
    const module = BudgetCategoryBusiness.name;
    const category = 'Business';

    // Validate Budget Category data
    const validate = async (familyId, periodId, testCategory) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testCategory =', testCategory);

        const categoryList = await data.getListForPeriod(familyId, periodId);
        logger.debug(category, context, 'categoryList =', categoryList);
        if (categoryList.error)
            return errors.create(context, categoryList.error.code, categoryList);

        if (!categoryList || !categoryList.list || categoryList.length == 0)
            return {};

        let matching = categoryList.list.find(category =>
            category.name.toUpperCase() == testCategory.name.toUpperCase() &&
            category.id != testCategory.id);
        logger.debug(category, context, 'matching =', matching);
        if (matching)
            return errors.create(context, 'InvalidData', "Budget Category name must be unique.");

        return {};
    }

    const common = require('./CommonPeriodBusiness')(logger, errors, data);
    return { ...common, validate };
}
