
module.exports = function BudgetAccountConverter(errors) {
    const module = BudgetAccountConverter.name;

    const helper = require("./ConverterHelper")(errors);

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (data.type != 'arbitrary' && !data.multiple)
            return errors.create(context, 'ParseError', "data.multiple is not defined.");
        if (data.multiple && isNaN(data.multiple))
            return errors.create(context, 'ParseError', "data.multiple must be a number.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            type: data.type,
            multiple: data.multiple && parseInt(data.multiple),
            weekDay: data.weekDay,
            monthDays: data.monthDays,
            yearDates: data.yearDates,
        };
    }

    const encode = (schedule) => {
        return {
            id: schedule.id,
            type: schedule.type,
            multiple: schedule.multiple,
            weekDay: schedule.weekDay,
            monthDays: schedule.monthDays,
            yearDates: schedule.yearDates,
        };
    }

    const encodeBrief = (schedule) => {
        return {
            id: schedule.id,
            name: schedule.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
