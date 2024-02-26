
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.bankId)
            return ["parse error: data.bankId is not defined.", null];
        if (isNaN(data.bankId))
            return ["parse error: data.bankId must be a number.", null];
        if (!data.number)
            return ["parse error: data.number is not defined.", null];

        const account = {
            id: data.id,
            name: data.name,
            bankId: parseInt(data.bankId),
            number: data.number
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

    return require("./CommonController")(logger, "BankAccountController", business, decode, encode, encodeList);
}
