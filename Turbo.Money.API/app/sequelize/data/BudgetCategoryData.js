
module.exports = (table) => {

    const encode = async (category) => {
        const data = {
            id: category.id,
            name: category.name,
            description: category.description,
            direction: category.direction
        };
        return [null, data];
    }

    const decode = async (data) => {
        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction
        };
        return [null, category];
    }

    const decodeList = async (data) => {
        const categories = data.map(item => {
            return { id: item.id, name: item.name }
        });
        return [null, categories];
    }

    const validate = (category) => {
        if (!category.name || !category.direction) {
            return "Content can not be empty!";
        }
        return null
    }

    return require('./CommonData')("BudgetCategoryData", table, encode, decode, decodeList, validate);
}