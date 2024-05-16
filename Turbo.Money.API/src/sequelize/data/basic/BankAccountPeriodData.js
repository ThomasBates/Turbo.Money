
module.exports = function BankAccountData(logger, errors, table) {
    const module = BankAccountData.name;

    const validate = (accountPeriod) => {
        const context = `${module}.${validate.name}`;

        if (!accountPeriod.openingBalance)
            return errors.create(context, 'InvalidData', "Account period openingBalance can not be empty!");
        if (isNaN(accountPeriod.openingBalance))
            return errors.create(context, 'InvalidData', "Account openingBalance must be a number!");

        if (!accountPeriod.closingBalance)
            return errors.create(context, 'InvalidData', "Account closingBalance can not be empty!");
        if (isNaN(accountPeriod.closingBalance))
            return errors.create(context, 'InvalidData', "Account closingBalance must be a number!");

        if (!accountPeriod.accountId)
            return errors.create(context, 'InvalidData', "Account accountId can not be empty!");
        if (isNaN(accountPeriod.accountId))
            return errors.create(context, 'InvalidData', "Account accountId must be a number!");

        if (!accountPeriod.PeriodId)
            return errors.create(context, 'InvalidData', "Account PeriodId can not be empty!");
        if (isNaN(accountPeriod.PeriodId))
            return errors.create(context, 'InvalidData', "Account PeriodId must be a number!");

        return {}
    }

    const encode = (accountPeriod) => {
        return {
            //id: accountPeriod.id,
            openingBalance: accountPeriod.openingBalance,
            closingBalance: accountPeriod.closingBalance,
            BankAccountId: accountPeriod.accountId,
            BudgetPeriodId: accountPeriod.PeriodId,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            openingBalance: data.openingBalance,
            closingBalance: data.closingBalance,
            accountId: data.BankAccountId,
            PeriodId: data.BudgetPeriodId,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            accountId: data.accountId,
            closingBalance: data.closingBalance,
        }
    }

    return require('./CommonData')(
        logger, errors, "BankAccountPeriod", table,
        validate, encode, decode, decodeBrief);
}