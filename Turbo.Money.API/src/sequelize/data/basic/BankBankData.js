
module.exports = function BankBankData(logger, errors, table) {
    const module = BankBankData.name;

    const validate = (bank) => {
        const context = `${module}.${validate.name}`;

        if (!bank.name)
            return errors.create(context, 'InvalidData', "Bank name can not be empty!");

        if (!bank.number)
            return errors.create(context, 'InvalidData', "Bank number can not be empty!");

        //if (!bank.branch)
        //    return errors.create(context, 'InvalidData', "Bank branch can not be empty!");

        return {}
    }

    const encode = (bank) => {
        return {
            //id: bank.id,
            name: bank.name,
            description: bank.description,
            number: bank.number,
            branch: bank.branch,
        };
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

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        };
    }

    return require('./CommonData')(
        logger, errors, "BankBank", table,
        validate, encode, decode, decodeBrief);
}