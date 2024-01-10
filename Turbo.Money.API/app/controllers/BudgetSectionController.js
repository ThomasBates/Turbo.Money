
module.exports = (business) => {

    const decode = (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.name)
            return ["parse error: data.name is not defined.", null];
        if (!data.description)
            return ["parse error: data.description is not defined.", null];
        if (!data.direction)
            return ["parse error: data.direction is not defined.", null];

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };

        return [null, section];
    }

    const encode = (section) => {
        if (!section)
            return ["BudgetSectionData.encode: section is not defined", null];

        const data = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
        };
        return [null, data];
    }

    const encodeList = (sectionList) => {
        let dataList = sectionList.map(section => {
            return { id: section.id, name: section.name }
        });
        return [null, dataList];
    }

    return require("./CommonController")("BudgetSectionController", business, decode, encode, encodeList);
}
