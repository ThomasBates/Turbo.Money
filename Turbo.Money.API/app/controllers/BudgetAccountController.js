
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return { error: "parse error: data is not defined." };
        if (!data.name)
            return { error: "parse error: data.name is not defined." };
        if (!data.categoryId)
            return { error: "parse error: data.categoryId is not defined." };
        if (isNaN(data.categoryId))
            return { error: "parse error: data.categoryId must be a number." };
        if (!data.amount)
            return { error: "parse error: data.amount is not defined." };
        if (isNaN(data.amount))
            return { error: "parse error: data.amount must be a number." };
        if (!data.method)
            return { error: "parse error: data.method is not defined." };
        if (!data.type)
            return { error: "parse error: data.type is not defined." };

        const account = {
            id: data.id,
            name: data.name,
            description: data.description,
            categoryId: parseInt(data.categoryId),
            amount: data.amount,
            method: data.method,
            type: data.type
        };

        return account;
    }

    const encode = (account) => {
        return account;
    }

    const encodeList = (accountList) => {
        let dataList = accountList.map(account => {
            return { id: account.id, name: account.name }
        });
        return { list: dataList };
    }

    return require("./CommonController")(logger, "BudgetAccountController", business, decode, encode, encodeList);
}
