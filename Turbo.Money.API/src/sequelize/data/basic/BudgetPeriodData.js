
module.exports = function BudgetPeriodData(logger, errors, table) {
    const module = BudgetPeriodData.name;

    const validate = (period) => {
        //const context = `${module}.${validate.name}`;

        //if (!period.start)
        //    return errors.create(context, 'InvalidData', "Period start can not be empty!");

        //if (!period.end)
        //    return errors.create(context, 'InvalidData', "Period end can not be empty!");

        return {}
    }

    const encode = (period) => {
        return {
            //id: period.id,
            start: period.start,
            end: period.end,
            name: period.name,
            description: period.description,
            isSandbox: period.isSandbox,
            isClosed: period.isClosed,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            start: data.start,
            end: data.end,
            name: data.name,
            description: data.description,
            isSandbox: data.isSandbox,
            isClosed: data.isClosed,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name,
        };
    }

    return require('./CommonData')(
        logger, errors, "BudgetPeriod", table,
        validate, encode, decode, decodeBrief);
}