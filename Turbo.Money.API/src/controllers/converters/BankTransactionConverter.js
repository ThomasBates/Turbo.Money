

module.exports = function BankTransactionConverter(errors) {
    const module = BankTransactionConverter.name;
    const category = 'BankTransaction';

    const jwt = require("jsonwebtoken");

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (!data.accountNumber)
            return errors.create(context, 'ParseError', "data.accountNumber is not defined.");

        if (!data.timeStamp)
            return errors.create(context, 'ParseError', "data.timeStamp is not defined.");

        if (!data.description)
            return errors.create(context, 'ParseError', "data.description is not defined.");

        if (!data.amount)
            return errors.create(context, 'ParseError', "data.amount is not defined.");
        if (isNaN(data.amount))
            return errors.create(context, 'ParseError', "data.amount must be a number.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            accountNumber: data.accountNumber,
            timeStamp: data.timeStamp,
            description: data.description,
            amount: data.amount
        };
    }

    const encode = (transaction) => {
        return {
            id: transaction.id,
            accountNumber: transaction.accountNumber,
            timeStamp: transaction.timeStamp,
            description: transaction.description,
            amount: transaction.amount
        };
    }

    const encodeBrief = (transaction) => {
        return {
            id: transaction.id,
            description: data.description,
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
