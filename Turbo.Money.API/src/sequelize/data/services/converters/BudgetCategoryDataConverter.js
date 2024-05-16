
module.exports = function BudgetCategoryDataConverter(errors) {
    const module = BudgetCategoryDataConverter.name;

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
            BudgetSectionId: category.sectionId
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: data.BudgetSectionId
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        };
    }

    return {
        validate,
        encode,
        decode,
        decodeBrief,
    };
}