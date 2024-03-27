
module.exports = function BudgetCategoryController(logger, business) {

    const decode = (data) => {
        if (!data)
            return { error: "parse error: data is not defined." };
        if (!data.name)
            return { error: "parse error: data.name is not defined." };
        if (!data.description)
            return { error: "parse error: data.description is not defined." };
        if (!data.sectionId)
            return { error: "parse error: data.sectionId is not defined." };
        if (isNaN(data.sectionId))
            return { error: "parse error: data.sectionId must be a number." };

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

    return require("./CommonController")(logger, "BudgetCategory", business, decode, encode, encodeList);
}
