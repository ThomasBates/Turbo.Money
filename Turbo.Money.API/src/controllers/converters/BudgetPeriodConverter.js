
module.exports = function BudgetPeriodConverter(errors) {
    const module = BudgetPeriodConverter.name;

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        //if (!data.name)
        //    return errors.create(context, 'ParseError', "data.name is not defined.");

        //if (!data.description)
        //    return errors.create(context, 'ParseError', "data.description is not defined.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            activeStart: data.activeStart,
            activeEnd: data.activeEnd,
            name: data.name,
            description: data.description,
            isSandbox: data.isSandbox,
            isSealed: data.isSealed,
            state: data.state,
        };
    }

    const encode = (period) => {
        return {
            id: period.id,
            activeStart: period.activeStart,
            activeEnd: period.activeEnd,
            name: period.name,
            description: period.description,
            isSandbox: period.isSandbox,
            isSealed: period.isSealed,
            state: period.state,
        };
    }

    const encodeBrief = (period) => {
        return {
            id: period.id,
            activeStart: period.activeStart,
            activeEnd: period.activeEnd,
            name: period.name,
        }
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
