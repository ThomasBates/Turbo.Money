
module.exports = function BankAccountData(logger, errors, table) {
    const module = BankAccountData.name;
    const category = 'BankAccount';

    const validate = (account) => {
        const context = `${module}.${validate.name}`;

        if (!account.name)
            return errors.create(context, 'InvalidData', "Account name can not be empty!");

        if (!account.bankId)
            return errors.create(context, 'InvalidData', "Account bankId can not be empty!");
        if (isNaN(account.bankId))
            return errors.create(context, 'InvalidData', "Account bankId must be a number!");

        if (!account.number)
            return errors.create(context, 'InvalidData', "Account number can not be empty!");

        return {}
    }

    const encode = (account) => {
        return {
            //id: account.id,
            name: account.name,
            description: account.description,
            BankBankId: account.bankId,
            number: account.number,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            bankId: data.BankBankId,
            number: data.number,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        }
    }

    const common = require('./CommonData')(
        logger, errors, category, table,
        validate, encode, decode, decodeBrief);

    // Find a single Bank account with an account number
    const getOneByNumber = async (familyId, accountNumber) => {
        const context = `${module}.${getOneByNumber.name}`;
        try {
            let data = await table.findAll({
                where: {
                    UserFamilyId: familyId,
                    number: accountNumber
                }
            })

            if (!data || data.length == 0)
                return { error: `Cannot find bank account with number=${accountNumber}.` };

            return decode(familyId, data[0]);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    return {
        ...common,
        getOneByNumber
    }
}