
module.exports = function ConverterHelper(_logger, errors) {
    const module = ConverterHelper.name;

    const encodeObject = (businessObject, validateItem, encodeItem) => {
        const context = `${module}.${encodeObject.name}`;

        if (!businessObject)
            return errors.create(context, 'InvalidArgument', 'businessObject is not defined');

        // Validate incoming business object.
        let validation = validateItem(businessObject);
        if (validation.error)
            return errors.create(context, 'InvalidData', validation);

        return encodeItem(businessObject);
    }

    const decodeObject = (familyId, dataObject, decodeItem) => {
        const context = `${module}.${decodeObject.name}`;

        if (!dataObject)
            return errors.create(context, 'InvalidArgument', 'dataObject is not defined');

        if (dataObject.UserFamilyId !== familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${dataObject.UserFamilyId}) is not user's family (${familyId}).`);

        return decodeItem(dataObject);
    }

    const decodeList = (familyId, dataList, decodeItem) => {
        const context = `${module}.${decodeList.name}`;

        if (!dataList)
            return errors.create(context, 'InvalidArgument', 'dataList is not defined');

        let error;
        const returnList = dataList.map(dataItem => {
            if (error)
                return error;

            if (dataItem.UserFamilyId !== familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${dataList.UserFamilyId}) is not user's family (${familyId}).`);
                return error;
            }

            const decodedItem = decodeItem(dataItem);
            if (decodedItem.error) {
                error = errors.create(context, 'InvalidData', decodedItem);
                return error;
            }

            return decodedItem;
        });

        if (error)
            return error;

        return { list: returnList };
    }

    return {
        encodeObject,
        decodeObject,
        decodeList,
    };
}