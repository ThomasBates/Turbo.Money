
module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return { error: "parse error: data is not defined." };
        if (!data.name)
            return { error: "parse error: data.name is not defined." };
        if (!data.description)
            return { error: "parse error: data.description is not defined." };
        if (!data.direction)
            return { error: "parse error: data.direction is not defined." };

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };

        return section;
    }

    const encode = (section) => {
        if (!section)
            return { error: "BudgetSectionData.encode: section is not defined" };

        const data = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
        };
        return data;
    }

    const encodeList = (sectionList) => {
        let dataList = sectionList.map(section => {
            return { id: section.id, name: section.name }
        });
        return { list: dataList };
    }

    return require("./CommonController")(logger, "BudgetSectionController", business, decode, encode, encodeList);
}
