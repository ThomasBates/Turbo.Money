
module.exports = function BudgetScheduleDataConverter(errors) {
    const module = BudgetScheduleDataConverter.name;

    const validate = (schedule) => {
        const context = `${module}.${validate.name}`;

        if (!schedule.activeStart)
            return errors.create(context, 'InvalidData', "Schedule activeStart can not be empty!");

        if (!schedule.activeEnd)
            return errors.create(context, 'InvalidData', "Schedule activeEnd can not be empty!");

        return {}
    }

    const encode = (schedule) => {
        return {
            //id: schedule.id,
            type: schedule.type,
            multiple: schedule.activeStart,
            activeEnd: schedule.activeEnd,
            name: schedule.name,
            description: schedule.description,
            isSandbox: schedule.isSandbox,
            isSealed: schedule.isSealed,
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