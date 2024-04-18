
module.exports = function BudgetCategoryData(logger, errors, table) {
    const module = BudgetCategoryData.name;

    const encode = (category) => {
        const context = `${module}.${encode.name}`;

        if (!category)
            return errors.create(context, 'InvalidArgument', 'category is not defined');

        const data = {
            //id: category.id,
            name: category.name,
            description: category.description,
            BudgetSectionId: category.sectionId
        };
        return data;
    }

    const decode = (userCookie, data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        if (data.UserFamilyId !== userCookie.familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);

        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: data.BudgetSectionId
        };
        return category;
    }

    const decodeList = (userCookie, data) => {
        const context = `${module}.${decodeList.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        let error;
        const categories = data.map(item => {
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

        return { list: categories };
    }

    const validate = (category) => {
        const context = `${module}.${validate.name}`;

        if (!category.name)
            return errors.create(context, 'InvalidData', "Category name can not be empty!");

        if (!category.sectionId)
            return errors.create(context, 'InvalidData', "Category sectionId can not be empty!");

        return {}
    }

    return require('./CommonData')(
        logger, errors, "BudgetCategory", table,
        encode, decode, decodeList, validate);
}