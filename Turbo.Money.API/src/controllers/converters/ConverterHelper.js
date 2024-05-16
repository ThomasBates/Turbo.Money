

module.exports = function ConverterHelper(errors) {
    const module = ConverterHelper.name;

    const decodeObject = (dataObject, validateItem, decodeItem) => {
        const context = `${module}.${decodeObject.name}`;

        if (!dataObject)
            return errors.create(context, 'InvalidArgument', 'dataObject is not defined');

        const validation = validateItem(dataObject);
        if (validation.error)
            return validation;

        const decodedObject = decodeItem(dataObject);
        return decodedObject;
    }

    const decodeList = (dataList, validateItem, decodeItem) => {
        const context = `${module}.${decodeList.name}`;

        if (!dataList)
            return errors.create(context, 'InvalidArgument', 'dataList is not defined');

        const decodedList = [];
        for (const dataObject of dataList) {
            const validation = validateItem(dataObject);
            if (validation.error) 
                return validation;

            const decodedObject = decodeItem(dataObject);
            decodedList.push(decodedObject);
        }

        return decodedList;
    }

    const encodeObject = (businessObject, encodeItem) => {
        const context = `${module}.${encodeObject.name}`;

        if (!businessObject)
            return errors.create(context, 'InvalidArgument', 'businessObject is not defined');

        const encodedObject = encodeItem(businessObject);
        return encodedObject;
    }

    const encodeList = (businessList, encodeItem) => {
        const context = `${module}.${encodeList.name}`;

        if (!businessList)
            return errors.create(context, 'InvalidArgument', 'returnList is not defined');

        let encodedList = businessList.map(businessObject => {
            const encodedObject = encodeItem(businessObject);
            return encodedObject;
        });
        return encodedList;
    }

    return {
        decodeObject,
        decodeList,
        encodeObject,
        encodeList,
    };
}
