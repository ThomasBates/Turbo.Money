
module.exports = (table) => {

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

    return require('./CommonData')("BankAccountData", table, encode, decode, decodeList, validate);
}