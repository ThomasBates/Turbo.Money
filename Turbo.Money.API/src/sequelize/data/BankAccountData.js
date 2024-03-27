
module.exports = (logger, table) => {

    const encode = (account) => {
        const data = {
            //id: account.id,
            name: account.name,
            BankBankId: account.bankId,
            number: account.number,
        };
        return data;
    }

    const decode = (userCookie, data) => {
        if (!data)
            return { error: "decode: data is not defined" };

        if (data.UserFamilyId !== userCookie.familyId)
            return { error: `decode: This data belongs to a family (${data.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

        const account = {
            id: data.id,
            name: data.name,
            bankId: data.BankBankId,
            number: data.number,
        };
        return account;
    }

    const decodeList = (userCookie, data) => {
        if (!data)
            return { error: "decodeList: data is not defined" };

        const accounts = data.map(item => {
            if (item.UserFamilyId !== userCookie.familyId)
                return { error: `decodeList: This data item belongs to a family (${item.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

            return { id: item.id, name: item.name }
        });

        return { list: accounts };
    }

    const validate = (account) => {
        if (!account.name) {
            return "Account name can not be empty!";
        }
        if (!account.bankId) {
            return "Account bankId can not be empty!";
        }
        if (!account.number) {
            return "Account number can not be empty!";
        }
        return null
    }

    const owner = "BankAccountData";
    const common = require('./CommonData')(logger, owner, table, encode, decode, decodeList, validate);

    // Find a single Bank account with an account number
    const getOneByNumber = async (accountNumber) => {
        try {
            let data = await table.findAll({ where: { number: accountNumber } })

            if (!data || data.length == 0)
                return { error: `Cannot find bank account with number=${accountNumber}.` };

            return decode(data[0]);
        }
        catch (ex) {
            let error = ex.message || `Unknown error occurred while finding one database record matching account number ${accountNumber}.`;
            logger.error(owner, `${owner}.getOneByNumber: error = `, error);
            return { error };
        }
    };

    return {
        ...common,
        getOneByNumber
    }
}