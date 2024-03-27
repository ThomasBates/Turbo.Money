
module.exports = function BudgetSectionData(logger, table) {

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

    const decode = (userCookie, data) => {
        if (!data)
            return { error: "decode: data is not defined" };

        if (data.UserFamilyId !== userCookie.familyId)
            return { error: `decode: This data belongs to a family (${data.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };
        return section;
    }

    const decodeList = (userCookie, data) => {
        if (!data)
            return { error: "decodeList: data is not defined" };

        const sections = data.map(item => {
            if (item.UserFamilyId !== userCookie.familyId)
                return { error: `decodeList: This data item belongs to a family (${item.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

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

    return require('./CommonData')(logger, "BudgetSection", table, encode, decode, decodeList, validate);
}