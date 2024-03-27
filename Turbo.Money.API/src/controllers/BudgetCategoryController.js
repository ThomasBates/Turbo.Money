
module.exports = function BudgetCategoryController(logger, errors, business) {
    const module = 'BudgetCategoryController';
    const category = 'BudgetCategory';

    const decode = (data) => {
        const context = `${module}.decode`;

        if (!data)
            return errors.create(context, 'ParseError', "data is not defined.");

        if (!data.name)
            return errors.create(context, 'ParseError', "data.name is not defined.");

        if (!data.description)
            return errors.create(context, 'ParseError', "data.description is not defined.");

        if (!data.sectionId)
            return errors.create(context, 'ParseError', "data.sectionId is not defined.");

        if (isNaN(data.sectionId))
            return errors.create(context, 'ParseError', "data.sectionId must be a number.");

        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: parseInt(data.sectionId)
        };

        return category;
    }

    const encode = (category) => {
        return category;
    }

    const encodeList = (categoryList) => {
        let dataList = categoryList.map(category => {
            return { id: category.id, name: category.name }
        });
        return { list: dataList };
    }

    return require("./CommonController")(
        logger, errors, category, business,
        decode, encode, encodeList);
}
