
module.exports = (logger, table) => {

    const encode = (category) => {
        const data = {
            //id: category.id,
            name: category.name,
            description: category.description,
            section_id: category.sectionId
        };
        return data;
    }

    const decode = (data) => {
        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: data.section_id
        };
        return category;
    }

    const decodeList = (data) => {
        const categories = data.map(item => {
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

    return require('./CommonData')(logger, "BudgetCategoryData", table, encode, decode, decodeList, validate);
}