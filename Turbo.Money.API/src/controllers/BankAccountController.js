
module.exports = function BankAccountController(logger, errors, business) {
    const module = 'BankAccountController';
    const category = 'BankAccount';

    const decode = (data) => {
        const context = `${module}.decode`;

        if (!data)
            return errors.create(context, 'ParseError', "data is not defined.");
        if (!data.name)
            return errors.create(context, 'ParseError', "data.name is not defined.");
        if (!data.bankId)
            return errors.create(context, 'ParseError', "data.bankId is not defined.");
        if (isNaN(data.bankId))
            return errors.create(context, 'ParseError', "data.bankId must be a number.");
        if (!data.number)
            return errors.create(context, 'ParseError', "data.number is not defined.");

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

    return require("./CommonController")(
        logger, errors, category, business,
        decode, encode, encodeList);
}
