
module.exports = function BudgetCategoryData(logger, errors, table) {
    const module = BudgetCategoryData.name;
    const loggerCategory = 'BudgetCategory';

    const categoryConverter = require("../services/converters/BudgetCategoryDataConverter")(errors);
    const helper = require('../services/converters/ConverterHelper')(logger, errors);

    const validate = (category) => {
        const context = `${module}.${validate.name}`;

        if (!category.name)
            return errors.create(context, 'InvalidData', "Category name can not be empty!");

        if (!category.description)
            return errors.create(context, 'InvalidData', 'Category description can not be empty!');

        if (!category.sectionId)
            return errors.create(context, 'InvalidData', "Category sectionId can not be empty!");
        if (isNaN(category.sectionId))
            return errors.create(context, 'InvalidData', "Category sectionId must be a number!");

        return {}
    }

    const encode = (category) => {
        return {
            //id: category.id,
            name: category.name,
            description: category.description,
            displayOrder: category.displayOrder,
            BudgetSectionId: category.sectionId
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            displayOrder: data.displayOrder,
            sectionId: data.BudgetSectionId
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        };
    }

    return require('./CommonPeriodData')(
        logger, errors, "BudgetCategory", table, 
        validate, encode, decode, decodeBrief);
}