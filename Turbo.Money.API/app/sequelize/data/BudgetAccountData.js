
module.exports = (table) => {

    const encode = (account) => {
        const data = {
            //id: account.id,
            name: account.name,
            description: account.description,
            category_id: account.categoryId,
            amount: account.amount,
            method: account.method,
            type: account.type
        };
        return [null, data];
    }

    const decode = (data) => {
        const account = {
            id: data.id,
            name: data.name,
            description: data.description,
            categoryId: data.category_id,
            amount: data.amount,
            method: data.method,
            type: data.type
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
        if (!account.name || !account.categoryId || !account.amount || !account.method || !account.type) {
            return "Content can not be empty!";
        }
        return null
    }

    return require('./CommonData')("BudgetAccountData", table, encode, decode, decodeList, validate);
}