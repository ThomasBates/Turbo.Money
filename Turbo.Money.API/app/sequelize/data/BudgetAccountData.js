
module.exports = (logger, table) => {

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
        return data;
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
        if (!account.categoryId) {
            return "Account category can not be empty!";
        }
        if (!account.amount) {
            return "Account amount can not be empty!";
        }
        if (!account.method) {
            return "Account method can not be empty!";
        }
        if (!account.type) {
            return "Account type can not be empty!";
        }
        return null
    }

    return require('./CommonData')(logger, "BudgetAccountData", table, encode, decode, decodeList, validate);
}