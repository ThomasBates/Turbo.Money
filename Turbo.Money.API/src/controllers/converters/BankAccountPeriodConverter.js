
module.exports = function BankAccountPeriodConverter(errors) {
    const module = BankAccountPeriodConverter.name;

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (!data.openingBalance)
            return errors.create(context, 'ParseError', "data.openingBalance can not be empty!");
        if (isNaN(data.openingBalance))
            return errors.create(context, 'ParseError', "data.openingBalance must be a number!");

        if (!data.closingBalance)
            return errors.create(context, 'ParseError', "data.closingBalance can not be empty!");
        if (isNaN(data.closingBalance))
            return errors.create(context, 'ParseError', "data.closingBalance must be a number!");

        if (!data.accountId)
            return errors.create(context, 'ParseError', "data.accountId can not be empty!");
        if (isNaN(data.accountId))
            return errors.create(context, 'ParseError', "data.accountId must be a number!");

        if (!data.PeriodId)
            return errors.create(context, 'ParseError', "data.PeriodId can not be empty!");
        if (isNaN(data.PeriodId))
            return errors.create(context, 'ParseError', "data.PeriodId must be a number!");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            openingBalance: data.openingBalance,
            closingBalance: data.closingBalance,
            accountId: data.accountId,
            periodId: data.periodId,
        };
    }

    const encode = (accountPeriod) => {
        return {
            id: accountPeriod.id,
            openingBalance: accountPeriod.openingBalance,
            closingBalance: accountPeriod.closingBalance,
            accountId: accountPeriod.accountId,
            periodId: accountPeriod.periodId,
        };
    }

    const encodeBrief = (accountPeriod) => {
        return {
            id: accountPeriod.id,
            accountId: accountPeriod.accountId,
            closingBalance: accountPeriod.closingBalance,
        }
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
