
module.exports = function BudgetPeriodConverter(logger, errors) {
    const module = BudgetPeriodConverter.name;
    const category = 'BudgetPeriod';

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (data.isSandbox) {

            if (!data.name)
                return errors.create(context, 'ParseError', "data.name is not defined.");

            if (!data.description)
                return errors.create(context, 'ParseError', "data.description is not defined.");

        } else {

            if (!data.start)
                return errors.create(context, 'ParseError', "data.start is not defined.");
            const startDate = new Date(data.start);

            logger.verbose(category, context, 'data.start =', data.start);
            logger.verbose(category, context, 'startDate =', startDate.toString());

            if (!(startDate instanceof Date) || isNaN(startDate))
                return errors.create(context, 'ParseError', "data.start is not a valid date.");

            if (!data.end)
                return errors.create(context, 'ParseError', "data.end is not defined.");
            const endDate = new Date(data.end);
            if (!(endDate instanceof Date) || isNaN(endDate))
                return errors.create(context, 'ParseError', "data.end is not a valid date.");

        }

        return {};
    }

    const decodeDate = (data) => {

    }

    const decode = (data) => {
        const context = `${module}.${decode.name}`;

        if (!data.isSandbox) {
            const startDate = new Date(data.start);

            logger.verbose(category, context, 'data.start =', data.start);
            logger.verbose(category, context, 'startDate =', startDate.toString());
        }

        return {
            id: data.id,
            name: data.name,
            description: data.description,
            start: data.isSandbox ? null : new Date(data.start),
            end: data.isSandbox ? null : new Date(data.end),
            isSandbox: data.isSandbox,
            isClosed: data.isClosed,
            state: data.state,
            templateId: data.templateId,
        };
    }

    const encode = (period) => {
        return {
            id: period.id,
            name: period.name,
            description: period.description,
            start: period.isSandbox ? null : period.start.toISOString().split('T')[0],
            end: period.isSandbox ? null : period.end.toISOString().split('T')[0],
            isSandbox: period.isSandbox,
            isClosed: period.isClosed,
            state: period.state,
        };
    }

    const encodeBrief = (period) => {
        return {
            id: period.id,
            name: period.name,
            description: period.description,
            start: period.isSandbox ? null : period.start.toISOString().split('T')[0],
            end: period.isSandbox ? null : period.end.toISOString().split('T')[0],
        }
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
