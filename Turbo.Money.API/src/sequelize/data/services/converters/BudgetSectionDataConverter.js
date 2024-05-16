
module.exports = function BudgetSectionDataConverter(errors) {
    const module = BudgetSectionDataConverter.name;

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

        //if (!section.periodId)
        //    return errors.create(context, 'InvalidData', "Section periodId can not be empty!");
        //if (isNaN(section.periodId))
        //    return errors.create(context, 'InvalidData', "Section periodId must be a number!");

        return {}
    }

    const encode = (section) => {
        return {
            //id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other",
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0,
            periodId: data.BudgetPeriodId
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