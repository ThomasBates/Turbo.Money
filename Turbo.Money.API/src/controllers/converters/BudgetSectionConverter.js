
module.exports = function BudgetSectionConverter(errors) {
    const module = BudgetSectionConverter.name;

    const categoryConverter = require("./BudgetCategoryConverter")(errors);
    const helper = require("./ConverterHelper")(errors);

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (!data.direction)
            return errors.create(context, 'ParseError', "data.direction is not defined.");
        if (!(data.direction === "in" || data.direction === "out"))
            return errors.create(context, 'ParseError', "data.direction must be 'in' or 'out'.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0,
            displayOrder: data.displayOrder,
            state: data.state,
        };
    }

    const encode = (section) => {
        return {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other",
            displayOrder: section.displayOrder,
            state: section.state,
        }
    }

    const encodeBrief = (section) => {
        return {
            id: section.id,
            name: section.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
