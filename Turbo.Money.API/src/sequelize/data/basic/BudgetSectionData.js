
module.exports = function BudgetSectionData(logger, errors, table) {
    const module = BudgetSectionData.name;
    const category = 'BudgetSection';

    const sectionConverter = require("../services/converters/BudgetSectionDataConverter")(errors);
    const helper = require('../services/converters/ConverterHelper')(logger, errors);

    const validate = (section) => {
        const context = `${module}.${validate.name}`;

        if (!section.name)
            return errors.create(context, 'InvalidData', 'Section name can not be empty!');

        if (!section.description)
            return errors.create(context, 'InvalidData', 'Section description can not be empty!');

        if (!section.direction)
            return errors.create(context, 'InvalidData', 'Section direction can not be empty!');
        if (!(section.direction === 1 || section.direction === -1))
            return errors.create(context, 'InvalidData', 'Section direction must be 1 or -1!');

        return {}
    }

    const encode = (section) => {
        return {
            //id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other",
            displayOrder: section.displayOrder,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0,
            displayOrder: data.displayOrder,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        };
    }

    return require('./CommonPeriodData')(
        logger, errors, "BudgetSection", table,
        validate, encode, decode, decodeBrief);
}