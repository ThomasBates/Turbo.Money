
module.exports = function BudgetSectionData(logger, errors, table) {
    const module = 'BudgetSectionData';

    const encode = (section) => {
        const context = `${module}.${encode.name}`;

        if (!section)
            return errors.create(context, 'InvalidArgument', 'section is not defined');

        const data = {
            //id: section.id,
            name: section.name,
            description: section.description,
            direction: section.direction < 0 ? "in" : section.direction > 0 ? "out" : "other"
        };
        return data;
    }

    const decode = (userCookie, data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        if (data.UserFamilyId !== userCookie.familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);

        const section = {
            id: data.id,
            name: data.name,
            description: data.description,
            direction: data.direction === "in" ? -1 : data.direction === "out" ? 1 : 0
        };
        return section;
    }

    const decodeList = (userCookie, data) => {
        const context = `${module}.${decodeList.name}`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        let error;
        const sections = data.map(item => {
            if (error)
                return error;

            if (item.UserFamilyId !== userCookie.familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);
                return error;
            }

            return { id: item.id, name: item.name }
        });

        if (error)
            return error;

        return { list: sections };
    }

    const validate = (section) => {
        const context = `${module}.${validate.name}`;

        if (!section.name)
            return errors.create(context, 'InvalidData', 'Section name can not be empty!');

        if (!section.description)
            return errors.create(context, 'InvalidData', 'Section description can not be empty!');

        if (!section.direction)
            return errors.create(context, 'InvalidData', 'Section direction can not be empty!');

        return {}
    }

    return require('./CommonData')(
        logger, errors, "BudgetSection", table,
        encode, decode, decodeList, validate);
}