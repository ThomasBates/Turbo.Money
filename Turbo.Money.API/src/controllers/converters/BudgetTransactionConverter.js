

module.exports = function BudgetTransactionConverter(errors) {
    const module = BudgetTransactionConverter.name;

    const jwt = require("jsonwebtoken");

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (!data.accountId)
            return errors.create(context, 'ParseError', "data.accountId is not defined.");
        if (isNaN(data.accountId))
            return errors.create(context, 'ParseError', "data.accountId must be a number.");

        //if (!data.timeStamp)
        //    return errors.create(context, 'ParseError', "data.timeStamp is not defined.");

        //if (!data.description)
        //    return errors.create(context, 'ParseError', "data.description is not defined.");

        if (!data.amount)
            return errors.create(context, 'ParseError', "data.amount is not defined.");
        if (isNaN(data.amount))
            return errors.create(context, 'ParseError', "data.amount must be a number.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            accountId: data.accountId,
            timeStamp: data.timeStamp,
            description: data.description,
            amount: data.amount
        };
    }

    const encode = (transaction) => {
        return transaction;
    }

    const encodeBrief = (transaction) => {
        return {
            id: transaction.id,
            accountId: data.accountId,
            timeStamp: data.timeStamp,
            description: data.description,
            amount: data.amount
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
