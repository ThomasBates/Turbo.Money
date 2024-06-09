
module.exports = function BudgetScheduleData(logger, errors, table) {
    const module = BudgetScheduleData.name;

    const validate = (schedule) => {
        //const context = `${module}.${validate.name}`;

        //if (!schedule.direction)
        //    return errors.create(context, 'InvalidData', 'Schedule direction can not be empty!');
        //if (!(schedule.direction === 1 || schedule.direction === -1))
        //    return errors.create(context, 'InvalidData', 'Schedule direction must be 1 or -1!');

        return {}
    }

    const encode = (schedule) => {
        return {
            //id: schedule.id,
            type: schedule.type,
            multiple: schedule.multiple,
            weekDay: schedule.weekDay,
            monthDays: schedule.monthDays,
            yearDates: schedule.yearDates,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            type: data.type,
            multiple: data.multiple,
            weekDay: data.weekDay,
            monthDays: data.monthDays,
            yearDates: data.yearDates,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.multiple == 1 ? data.type : `${data.type} x${data.multiple}`,
        };
    }

    const common = require('./CommonData')(
        logger, errors, "BudgetSchedule", table,
        validate, encode, decode, decodeBrief);

    return {
        create: common.create,
        getAll: common.getAll,
        //getList,
        //getOne,
        update: common.update,
        //deleteOne,
        //deleteAll,
    }
}