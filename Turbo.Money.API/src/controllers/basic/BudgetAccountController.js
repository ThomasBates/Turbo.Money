
module.exports = function BudgetAccountController(logger, errors, business) {
    const module = BudgetAccountController.name;
    const category = 'BudgetAccount';

    const decode = (data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'ParseError', "data is not defined.");

        if (!data.name)
            return errors.create(context, 'ParseError', "data.name is not defined.");

        if (!data.categoryId)
            return errors.create(context, 'ParseError', "data.categoryId is not defined.");

        if (isNaN(data.categoryId))
            return errors.create(context, 'ParseError', "data.categoryId must be a number.");

        if (!data.amount)
            return errors.create(context, 'ParseError', "data.amount is not defined.");

        if (isNaN(data.amount))
            return errors.create(context, 'ParseError', "data.amount must be a number.");

        if (!data.method)
            return errors.create(context, 'ParseError', "data.method is not defined.");

        if (!data.type)
            return errors.create(context, 'ParseError', "data.type is not defined.");

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

    return require("./CommonController")(
        logger, errors, category, business,
        decode, encode, encodeList);
}
