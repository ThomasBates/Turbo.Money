
module.exports = function BudgetCategoryConverter(errors) {
    const module = BudgetCategoryConverter.name;

    const accountConverter = require("./BudgetAccountConverter")(errors);
    const helper = require("./ConverterHelper")(errors);

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (!data.sectionId)
            return errors.create(context, 'ParseError', "data.sectionId is not defined.");
        if (isNaN(data.sectionId))
            return errors.create(context, 'ParseError', "data.sectionId must be a number.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            displayOrder: data.displayOrder,
            sectionId: parseInt(data.sectionId),
            state: data.state,
        };
    }

    const encode = (category) => {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            displayOrder: category.displayOrder,
            sectionId: category.sectionId,
            state: category.state,
        }
    }

    const encodeBrief = (category) => {
        return {
            id: category.id,
            name: category.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
