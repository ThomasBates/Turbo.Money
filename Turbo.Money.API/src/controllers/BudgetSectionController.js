
module.exports = function BudgetSectionController(logger, errors, business) {
    const module = 'BudgetSectionController';
    const category = 'BudgetSection';

    const decode = (data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'ParseError', "data is not defined.");

        if (!data.name)
            return errors.create(context, 'ParseError', "data.name is not defined.");

        if (!data.description)
            return errors.create(context, 'ParseError', "data.description is not defined.");

        if (!data.direction)
            return errors.create(context, 'ParseError', "data.direction is not defined.");

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };

        return section;
    }

    const encode = (section) => {
        const context = `${module}.${encode.name}`;

        if (!section)
            return errors.create(context, 'InvalidArgument', "section is not defined");

        const data = {
            id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
        };
        return data;
    }

    const encodeList = (sectionList) => {
        const context = `${module}.${encodeList.name}`;

        if (!sectionList)
            return errors.create(context, 'InvalidArgument', "sectionList is not defined");

        let dataList = sectionList.map(section => {
            return { id: section.id, name: section.name }
        });
        return { list: dataList };
    }

    return require("./CommonController")(
        logger, errors, category, business,
        decode, encode, encodeList);
}
