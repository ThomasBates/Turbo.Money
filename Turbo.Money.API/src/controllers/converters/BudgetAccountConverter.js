
module.exports = function BudgetAccountConverter(errors) {
    const module = BudgetAccountConverter.name;

    const helper = require("./ConverterHelper")(errors);

    const validate = (data) => {
        const context = `${module}.${validate.name}`;

        if (!data.id)
            return errors.create(context, 'ParseError', "data.id is not defined.");
        if (isNaN(data.id))
            return errors.create(context, 'ParseError', "data.id must be a number.");

        if (!data.amount)
            return errors.create(context, 'ParseError', "data.amount is not defined.");
        if (isNaN(data.amount))
            return errors.create(context, 'ParseError', "data.amount must be a number.");

        if (!data.categoryId)
            return errors.create(context, 'ParseError', "data.categoryId is not defined.");
        if (isNaN(data.categoryId))
            return errors.create(context, 'ParseError', "data.categoryId must be a number.");

        return {};
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            amount: parseInt(data.amount),
            type: data.type,
            method: data.method,
            displayOrder: data.displayOrder,
            categoryId: parseInt(data.categoryId),
            state: data.state,
        };
    }

    const encode = (account) => {
        return {
            id: account.id,
            name: account.name,
            description: account.description,
            amount: account.amount,
            type: account.type,
            method: account.method,
            displayOrder: account.displayOrder,
            categoryId: account.categoryId,
            state: account.state,
        };
    }

    const encodeBrief = (account) => {
        return {
            id: account.id,
            name: account.name
        };
    }

    return {
        validate,
        decode,
        encode,
        encodeBrief,
    }
}
