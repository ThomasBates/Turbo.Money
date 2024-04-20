
module.exports = function BankAccountData(logger, errors, table) {
    const module = BankAccountData.name;
    const category = 'BankAccount';

    const encode = (account) => {
        const context = `${module}.${encode.name}`;

        if (!account)
            return errors.create(context, 'InvalidArgument', 'account is not defined');

        const data = {
            //id: account.id,
            name: account.name,
            description: account.description,
            BankBankId: account.bankId,
            number: account.number,
        };
        return data;
    }

    const decode = (userCookie, data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        if (data.UserFamilyId !== userCookie.familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);

        const account = {
            id: data.id,
            name: data.name,
            description: data.description,
            bankId: data.BankBankId,
            number: data.number,
        };
        return account;
    }

    const decodeList = (userCookie, data) => {
        const context = `${module}.${decodeList.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        let error;
        const accounts = data.map(item => {
            if (error)
                return error;

            if (item.UserFamilyId !== userCookie.familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);
                return error;
            }

            return { id: item.id, name: item.name }
        });

        if (error)
            return error;

        return { list: accounts };
    }

    const validate = (account) => {
        const context = `${module}.${validate.name}`;

        if (!account.name)
            return errors.create(context, 'InvalidData', "Account name can not be empty!");

        if (!account.bankId)
            return errors.create(context, 'InvalidData', "Account bankId can not be empty!");

        if (!account.number)
            return errors.create(context, 'InvalidData', "Account number can not be empty!");

        return {}
    }

    const common = require('./CommonData')(
        logger, errors, category, table,
        encode, decode, decodeList, validate);

    // Find a single Bank account with an account number
    const getOneByNumber = async (userCookie, accountNumber) => {
        const context = `${module}.${getOneByNumber.name}`;
        try {
            let data = await table.findAll({
                where: {
                    UserFamilyId: userCookie.familyId,
                    number: accountNumber
                }
            })

            if (!data || data.length == 0)
                return { error: `Cannot find bank account with number=${accountNumber}.` };

            return decode(userCookie, data[0]);
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