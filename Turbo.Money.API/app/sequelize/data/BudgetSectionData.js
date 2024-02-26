
module.exports = (logger, table) => {

    const encode = (section) => {
        if (!section)
            return ["BudgetSectionData.encode: section is not defined", null];

        const data = {
            //id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
        };
        return [null, data];
    }

    const decode = (data) => {
        if (!data)
            return ["BudgetSectionData.decode: data is not defined", null];

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };
        return [null, section];
    }

    const decodeList = (data) => {
        if (!data)
            return ["BudgetSectionData.decodeList: data is not defined", null];

        const sections = data.map(item => {
            return { id: item.id, name: item.name }
        });
        return [null, sections];
    }

    const validate = (section) => {
        if (!section.name || !section.description ||  !section.direction ) {
            return "Content can not be empty!";
        }
        return null
    }

    return require('./CommonData')(logger, "BudgetSectionData", table, encode, decode, decodeList, validate);
}