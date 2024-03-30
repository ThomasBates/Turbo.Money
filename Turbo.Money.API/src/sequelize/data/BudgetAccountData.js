
module.exports = function BudgetAccountData(logger, errors, table) {
    const module = 'BudgetAccountData';

    const encode = (account) => {
        const context = `${module}.${encode.name}`;

        if (!account)
            return errors.create(context, 'InvalidArgument', 'account is not defined');

        const data = {
            //id: account.id,
            name: account.name,
            description: account.description,
            BudgetCategoryId: account.categoryId,
            amount: account.amount,
            method: account.method,
            type: account.type
        };
        return data;
    }

    const decode = (userCookie, data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        if (data.UserFamilyId !== userCookie.familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);

        const account = {
            id: data.id,
            name: data.name,
            description: data.description,
            categoryId: data.BudgetCategoryId,
            amount: data.amount,
            method: data.method,
            type: data.type
        };
        return account;
    }

    const decodeList = (userCookie, data) => {
        const context = `${module}.${decodeList.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        let error;
        const accounts = data.map(item => {
            if (error)
                return error;

            if (item.UserFamilyId !== userCookie.familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);
                return error;
            }

            return { id: item.id, name: item.name }
        });

        if (error)
            return error;

        return { list: accounts };
    }

    const validate = (account) => {
        const context = `${module}.${validate.name}`;

        if (!account.name)
            return errors.create(context, 'InvalidData', "Account name can not be empty!");

        if (!account.categoryId)
            return errors.create(context, 'InvalidData', "Account category can not be empty!");

        if (!account.amount)
            return errors.create(context, 'InvalidData', "Account amount can not be empty!");

        if (!account.method)
            return errors.create(context, 'InvalidData', "Account method can not be empty!");

        if (!account.type)
            return errors.create(context, 'InvalidData', "Account type can not be empty!");

        return {}
    }

    return require('./CommonData')(
        logger, errors, "BudgetAccount", table,
        encode, decode, decodeList, validate);
}