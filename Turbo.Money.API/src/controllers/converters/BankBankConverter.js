
module.exports = function BankBankConverter(errors) {
    const module = BankBankConverter.name;

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        //if (!data.id)
        //    return errors.create(context, 'ParseError', "data.id is not defined.");
        //if (isNaN(data.id))
        //    return errors.create(context, 'ParseError', "data.id must be a number.");

        //if (!data.name)
        //    return errors.create(context, 'ParseError', "data.name is not defined.");
        //if (!data.number)
        //    return errors.create(context, 'ParseError', "data.number is not defined.");
        //if (!data.branch)
        //    return errors.create(context, 'ParseError', "data.branch is not defined.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            number: data.number,
            branch: data.branch,
        };
    }

    const encode = (bank) => {
        return {
            id: bank.id,
            name: bank.name,
            description: bank.description,
            number: bank.number,
            branch: bank.branch,
        };
    }

    const encodeBrief = (bank) => {
        return {
            id: bank.id,
            name: bank.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
