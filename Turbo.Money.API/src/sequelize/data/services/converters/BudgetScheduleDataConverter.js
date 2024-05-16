
module.exports = function BudgetPeriodDataConverter(errors) {
    const module = BudgetPeriodDataConverter.name;

    const validate = (period) => {
        const context = `${module}.${validate.name}`;

        if (!period.activeStart)
            return errors.create(context, 'InvalidData', "Period activeStart can not be empty!");

        if (!period.activeEnd)
            return errors.create(context, 'InvalidData', "Period activeEnd can not be empty!");

        return {}
    }

    const encode = (period) => {
        return {
            //id: period.id,
            activeStart: period.activeStart,
            activeEnd: period.activeEnd,
            name: period.name,
            description: period.description,
            isSandbox: period.isSandbox,
            isSealed: period.isSealed,
        };
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
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name,
        };
    }

    return {
        validate,
        encode,
        decode,
        decodeBrief,
    };
}