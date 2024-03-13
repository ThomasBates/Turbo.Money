
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return { error: "parse error: data is not defined." };
        if (!data.name)
            return { error: "parse error: data.name is not defined." };
        if (!data.bankId)
            return { error: "parse error: data.bankId is not defined." };
        if (isNaN(data.bankId))
            return { error: "parse error: data.bankId must be a number." };
        if (!data.number)
            return { error: "parse error: data.number is not defined." };

        const account = {
            id: data.id,
            name: data.name,
            bankId: parseInt(data.bankId),
            number: data.number
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

    return require("./CommonController")(logger, "BankAccountController", business, decode, encode, encodeList);
}
