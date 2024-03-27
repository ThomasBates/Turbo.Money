
module.exports = function BudgetCategoryData(logger, table) {

    const encode = (category) => {
        const data = {
            //id: category.id,
            name: category.name,
            description: category.description,
            BudgetSectionId: category.sectionId
        };
        return data;
    }

    const decode = (userCookie, data) => {
        if (!data)
            return { error: "decode: data is not defined" };

        if (data.UserFamilyId !== userCookie.familyId)
            return { error: `decode: This data belongs to a family (${data.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: data.BudgetSectionId
        };
        return category;
    }

    const decodeList = (userCookie, data) => {
        if (!data)
            return { error: "decodeList: data is not defined" };

        const categories = data.map(item => {
            if (item.UserFamilyId !== userCookie.familyId)
                return { error: `decodeList: This data item belongs to a family (${item.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

            return { id: item.id, name: item.name }
        });
        return { list: categories };
    }

    const validate = (category) => {
        if (!category.name) {
            return "Category name can not be empty!";
        }
        if (!category.sectionId) {
            return "Category sectionId can not be empty!";
        }
        return null
    }

    return require('./CommonData')(logger, "BudgetCategory", table, encode, decode, decodeList, validate);
}