
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.categoryId)
            return ["parse error: data.categoryId is not defined.", null];
        if (isNaN(data.categoryId))
            return ["parse error: data.categoryId must be a number.", null];
        if (!data.amount)
            return ["parse error: data.amount is not defined.", null];
        if (isNaN(data.amount))
            return ["parse error: data.amount must be a number.", null];
        if (!data.method)
            return ["parse error: data.method is not defined.", null];
        if (!data.type)
            return ["parse error: data.type is not defined.", null];

        const account = {
            id: data.id,
            name: data.name,
            description: data.description,
            categoryId: parseInt(data.categoryId),
            amount: data.amount,
            method: data.method,
            type: data.type
        };

        return [null, account];
    }

    const encode = (account) => {
        return [null, account];
    }

    const encodeList = (accountList) => {
        let dataList = accountList.map(account => {
            return { id: account.id, name: account.name }
        });
        return [null, dataList];
    }

    return require("./CommonController")(logger, "BudgetAccountController", business, decode, encode, encodeList);
}
