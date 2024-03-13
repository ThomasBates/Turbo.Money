
module.exports = (logger, table) => {

    const encode = (account) => {
        const data = {
            //id: account.id,
            name: account.name,
            bank_id: account.bankId,
            number: account.number,
        };
        return data;
    }

    const decode = (data) => {
        const account = {
            id: data.id,
            name: data.name,
            bankId: data.bank_id,
            number: data.number,
        };
        return account;
    }

    const decodeList = (data) => {

        const accounts = data.map(item => {
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