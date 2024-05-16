
module.exports = function BudgetScheduleBusiness(logger, errors, data) {
    const module = BudgetScheduleBusiness.name;
    const category = 'Business';

    // Validate budget schedule data
    const validate = async (familyId, testSchedule) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testSchedule =', testSchedule);

        switch (testSchedule.type) {
            case "Daily":
                break;
            case "Weekly":
                if (!testSchedule.weekDay)
                    return errors.create(context, 'InvalidData', 'If budget schedule type is "Weekly", then weekDay must be defined.');
                if (!(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].includes(testSchedule.weekDay)))
                    return errors.create(context, 'InvalidData', 'Budget Schedule weekDay must be one of "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", or "Saturday".');
                break;
            case "Monthly":
                if (!testSchedule.monthDays)
                    return errors.create(context, 'InvalidData', 'If budget schedule type is "Monthly", then monthDays must be defined.');
                const dayParts = testSchedule.monthDays.split(",");
                if (dayParts.length == 0)
                    return errors.create(context, 'InvalidData', 'Budget Schedule monthDays must be a comma-delimited list of days of the month.');

                for (const part of dayParts) {
                    if (isNaN(part)) {
                        if (!(["first", "last"].includes(part))) 
                            return errors.create(context, 'InvalidData', 'Budget Schedule monthDays day must be one of "last", ..., or a number from 1 to 31.');
                    } else {
                        if (Number(part) < 1 || Number(part) > 31)
                            return errors.create(context, 'InvalidData', 'Budget Schedule monthDays day must be a number from 1 to 31, or one of "last", ....');
                    }
                }
                break;
            case "Yearly":
                if (!testSchedule.yearDates)
                    return errors.create(context, 'InvalidData', 'If budget schedule type is "Yearly", then yearDates must be defined.');
                const yearParts = testSchedule.yearDates.split(",");
                if (yearParts.length == 0)
                    return errors.create(context, 'InvalidData', 'Budget Schedule yearDates must be a comma-delimited list of dates of the year.');

                for (const yearPart of yearParts) {
                    const validYearPart = validateYearpart(yearPart);
                    if (validYearPart.error)
                        return errors.create(context, validYearPart.error.code, validYearPart);
                }
                break;
            case "Arbitrary":
                break;
            default:
                return errors.create(context, 'InvalidData', 'Budget Schedule type must be one of "Daily", "Weekly", "Monthly", "Yearly", or "Arbitrary".');
        }

        return {};
    }

    const validateYearPart = (yearPart) => {
        const dateParts = yearPart.split("-");
        if (dateParts.length != 2)
            return errors.create(context, 'InvalidData', 'Budget Schedule yearDay date must be formatted as MM-DD.');
        if (isNaN(dateParts[0]))
            return errors.create(context, 'InvalidData', 'Budget Schedule yearDay date month must be a number.');
        if (isNaN(dateParts[1]))
            return errors.create(context, 'InvalidData', 'Budget Schedule yearDay date day must be a number.');

        const month = Number(dateParts[0]);
        if (month < 1 || month > 12)
            return errors.create(context, 'InvalidData', 'Budget Schedule yearDay date month must be a number from 1 to 12.');

        const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const maxDay = monthDays[month - 1];

        const day = Number(dateParts[1]);

        if (day < 1 || day > maxDay)
            return errors.create(context, 'InvalidData', `Budget Schedule yearDay date day must be a number from 1 to ${maxDay}.`);

        return {}
    }

    const common = require('./CommonBusiness')(logger, errors, data);

    return {
        create: common.create,
        getAll: common.getAll,
        //getList,
        //getOne,
        update: common.update,
        //deleteOne,
        //deleteAll,

        validate
    };
}
