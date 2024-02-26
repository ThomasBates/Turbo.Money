
module.exports = (logger, table) => {

    const encode = (category) => {
        const data = {
            //id: category.id,
            name: category.name,
            description: category.description,
            section_id: category.sectionId
        };
        return [null, data];
    }

    const decode = (data) => {
        const category = {
            id: data.id,
            name: data.name,
            description: data.description,
            sectionId: data.section_id
        };
        return [null, category];
    }

    const decodeList = (data) => {
        const categories = data.map(item => {
            return { id: item.id, name: item.name }
        });
        return [null, categories];
    }

    const validate = (category) => {
        if (!category.name || !category.sectionId) {
            return "Content can not be empty!";
        }
        return null
    }

    return require('./CommonData')(logger, "BudgetCategoryData", table, encode, decode, decodeList, validate);
}