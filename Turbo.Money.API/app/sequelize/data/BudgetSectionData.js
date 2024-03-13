
module.exports = (logger, table) => {

    const encode = (section) => {
        if (!section)
            return { error: "BudgetSectionData.encode: section is not defined" };

        const data = {
            //id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
        };
        return data;
    }

    const decode = (data) => {
        if (!data)
            return { error: "BudgetSectionData.decode: data is not defined" };

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };
        return section;
    }

    const decodeList = (data) => {
        if (!data)
            return { error: "BudgetSectionData.decodeList: data is not defined" };

        const sections = data.map(item => {
            return { id: item.id, name: item.name }
        });
        return { list: sections };
    }

    const validate = (section) => {
        if (!section.name) {
            return "Section name can not be empty!";
        }
        if (!section.description) {
            return "Section description can not be empty!";
        }
        if (!section.direction) {
            return "Section direction can not be empty!";
        }
        return null
    }

    return require('./CommonData')(logger, "BudgetSectionData", table, encode, decode, decodeList, validate);
}