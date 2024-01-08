
module.exports = (business) => {

    const decode = async (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.description)
            return ["parse error: data.description is not defined.", null];
        if (!data.direction)
            return ["parse error: data.direction is not defined.", null];

        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction
        };

        return [null, category];
    }

    const encode = async (category) => {
        return [null, category];
    }

    const encodeList = async (categoryList) => {
        let dataList = categoryList.map(category => {
            return { id: category.id, name: category.name }
        });
        return [null, dataList];
    }

    return require("./CommonController")("BudgetCategoryController", business, decode, encode, encodeList);
}
