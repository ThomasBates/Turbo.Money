
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.description)
            return ["parse error: data.description is not defined.", null];
        if (!data.sectionId)
            return ["parse error: data.sectionId is not defined.", null];
        if (isNaN(data.sectionId))
            return ["parse error: data.sectionId must be a number.", null];

        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: parseInt(data.sectionId)
        };

        return [null, category];
    }

    const encode = (category) => {
        return [null, category];
    }

    const encodeList = (categoryList) => {
        let dataList = categoryList.map(category => {
            return { id: category.id, name: category.name }
        });
        return [null, dataList];
    }

    return require("./CommonController")(logger, "BudgetCategoryController", business, decode, encode, encodeList);
}
