
module.exports = function BankAccountConverter(errors) {
    const module = BankAccountConverter.name;

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        //if (!data.name)
        //    return errors.create(context, 'ParseError', "data.name is not defined.");

        //if (!data.description)
        //    return errors.create(context, 'ParseError', "data.description is not defined.");

        if (!data.bankId)
            return errors.create(context, 'ParseError', "data.bankId is not defined.");
        if (isNaN(data.bankId))
            return errors.create(context, 'ParseError', "data.bankId must be a number.");

        //if (!data.number)
        //    return errors.create(context, 'ParseError', "data.number is not defined.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            number: data.number,
            bankId: parseInt(data.bankId),
        };
    }

    const encode = (account) => {
        return {
            id: account.id,
            name: account.name,
            description: account.description,
            number: account.number,
            bankId: account.bankId,
        };
    }

    const encodeBrief = (account) => {
        return {
            id: account.id,
            name: account.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
