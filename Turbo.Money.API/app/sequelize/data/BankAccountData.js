
module.exports = (logger, table) => {

    const encode = (account) => {
        const data = {
            //id: account.id,
            name: account.name,
            bank_id: account.bankId,
            number: account.number,
        };
        return [null, data];
    }

    const decode = (data) => {
        const account = {
            id: data.id,
            name: data.name,
            bankId: data.bank_id,
            number: data.number,
        };
        return [null, account];
    }

    const decodeList = (data) => {

        const accounts = data.map(item => {
            return { id: item.id, name: item.name }
        });

        return [null, accounts];
    }

    const validate = (account) => {
        if (!account.name || !account.bankId || !account.number) {
            return "Content can not be empty!";
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
                return [`Cannot find bank account with number=${accountNumber}.`, null];

            let [error, account] = decode(data[0]);
            if (error) {
                return [error, null];
            }

            return [null, account];
        }
        catch (ex) {
            let error = ex.message || `Unknown error occurred while finding one database record matching account number ${accountNumber}.`;
            logger.error(owner, `${owner}.getOneByNumber: error = `, error);
            return [error, null];
        }
    };

    return {
        ...common,
        getOneByNumber
    }
}