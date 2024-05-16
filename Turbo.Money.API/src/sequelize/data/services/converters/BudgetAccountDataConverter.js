
module.exports = function BudgetAccountDataConverter(errors) {
    const module = BudgetAccountDataConverter.name;

    const validate = (account) => {
        const context = `${module}.${validate.name}`;

        if (!account.name)
            return errors.create(context, 'InvalidData', "Account name can not be empty!");

        if (!account.categoryId)
            return errors.create(context, 'InvalidData', "Account categoryId can not be empty!");
        if (isNaN(account.categoryId))
            return errors.create(context, 'InvalidData', "Account categoryId must be a number!");

        return {}
    }

    const encode = (account) => {
        return {
            //id: account.id,
            name: account.name,
            description: account.description,
            BudgetCategoryId: account.categoryId,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            categoryId: data.BudgetCategoryId,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        }
    }

    return {
        validate,
        encode,
        decode,
        decodeBrief,
    };
}