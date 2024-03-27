
module.exports = (logger, table) => {

    const encode = (account) => {
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
        if (!data)
            return { error: "decode: data is not defined" };

        if (data.UserFamilyId !== userCookie.familyId)
            return { error: `decode: This data belongs to a family (${data.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

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
        if (!data)
            return { error: "decodeList: data is not defined" };

        const accounts = data.map(item => {
            if (item.UserFamilyId !== userCookie.familyId)
                return { error: `decodeList: This data item belongs to a family (${item.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

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