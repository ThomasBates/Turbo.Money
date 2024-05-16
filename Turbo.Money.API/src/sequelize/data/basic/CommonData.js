
module.exports = function CommonData(
    logger, errors, category, table,
    validate, encode, decode, decodeBrief) {
    const module = CommonData.name;

    //  Local functions  -------------------------------------------------------

    const encodeObject = (familyId, businessObject) => {
        const context = `${module}.${encodeObject.name}`;

        if (!businessObject)
            return errors.create(context, 'InvalidArgument', 'businessObject is not defined');

        // Validate incoming business object.
        let validation = validate(businessObject);
        if (validation.error)
            return errors.create(context, 'InvalidData', validation);

        const encodedObject = encode(businessObject);
        encodedObject.UserFamilyId = familyId;
        return encodedObject;
    }

    const decodeObject = (familyId, dataObject) => {
        const context = `${module}.${decodeObject.name}`;

        if (!dataObject)
            return errors.create(context, 'InvalidArgument', 'dataObject is not defined');

        if (dataObject.UserFamilyId !== familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${dataObject.UserFamilyId}) is not user's family (${familyId}).`);

        return decode(dataObject);
    }

    const decodeList = (familyId, dataList, decodeItem) => {
        const context = `${module}.${decodeList.name}`;

        if (!dataList || dataList.length == 0)
            return { list: [] };

        let error;
        const returnList = dataList.map(dataItem => {
            if (error)
                return error;

            if (dataItem.UserFamilyId !== familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${dataList.UserFamilyId}) is not user's family (${familyId}).`);
                return error;
            }

            return decodeItem(dataItem);
        });

        if (error)
            return error;

        return { list: returnList };
    }

    //  Exported functions  ----------------------------------------------------

    // Create and save a new record
    const create = async (familyId, businessObject) => {
        const context = `${module}.${create.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'businessObject =', businessObject);

        // transform business object to data object.
        const encodedObject = encodeObject(familyId, businessObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (encodedObject.error)
            return errors.create(context, encodedObject.error.code, encodedObject);

        // Create record for business object in the database
        try {
            let createdObject = await table.create(encodedObject);
            logger.debug(category, context, 'createdObject =', createdObject.toJSON());

            // transform returned data object to return business object.
            const decodedObject = decodeObject(familyId, createdObject);
            logger.debug(category, context, 'decodedObject =', decodedObject);
            if (decodedObject.error)
                return errors.create(context, decodedObject.error.code, decodedObject);

            return decodedObject;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Retrieve all records from the table.
    const getAll = async (familyId) => {
        const context = `${module}.${getAll.name}`;
        logger.debug(category, context, 'familyId =', familyId);

        try {
            let dataList = await table.findAll({
                where: { UserFamilyId: familyId }
            });
            logger.verbose(category, context, 'dataList =', dataList.map(item => item.toJSON()));

            const decodedList = decodeList(familyId, dataList, decode);
            logger.verbose(category, context, 'decodedList =', decodedList);
            if (decodedList.error)
                return errors.create(context, decodedList.error.code, decodedList);

            return decodedList;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Retrieve all records from the table.
    const getList = async (familyId) => {
        const context = `${module}.${getList.name}`;
        logger.debug(category, context, 'familyId =', familyId);

        try {
            let dataList = await table.findAll({
                where: { UserFamilyId: familyId }
            });
            logger.verbose(category, context, 'dataList =', dataList.map(item => item.toJSON()));

            const decodedList = decodeList(familyId, dataList, decodeBrief);
            logger.verbose(category, context, 'decodedList =', decodedList);
            if (decodedList.error)
                return errors.create(context, decodedList.error.code, decodedList);

            return decodedList;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Find a single record with an id
    const getOne = async (familyId, id) => {
        const context = `${module}.${getOne.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'id =', id);

        try {
            let dataObject = await table.findByPk(id);

            if (!dataObject)
                return errors.create(context, 'MissingData', `Cannot find data object with id=${id}.`);

            // transform returned data object to return business object.
            const decodedObject = decodeObject(familyId, dataObject);
            logger.debug(category, context, 'decodedObject =', decodedObject);
            if (decodedObject.error)
                return errors.create(context, decodedObject.error.code, decodedObject);

            return decodedObject;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Update a record by the id in the request
    const update = async (familyId, businessObject) => {
        const context = `${module}.${update.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'businessObject =', businessObject);

        // transform business object to data object.
        const encodedObject = encodeObject(familyId, businessObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (encodedObject.error)
            return errors.create(context, encodedObject.error.code, encodedObject);

        try {
            await table.update(encodedObject,
                {
                    where: { id: businessObject.id }
                });

            return await getOne(familyId, businessObject.id);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Delete a record with the specified id in the request
    const deleteOne = async (familyId, id) => {
        const context = `${module}.${deleteOne.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'id =', id);

        const returnObject = await getOne(familyId, id);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (returnObject.error)
            return errors.create(context, returnObject.error.code, returnObject);

        try {
            await table.destroy({
                where: {
                    id: id,
                    UserFamilyId: familyId,
                }
            });

            return returnObject;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Delete all records from the table.
    const deleteAll = async (familyId) => {
        const context = `${module}.${deleteAll.name}`;
        logger.debug(category, context, 'familyId =', familyId);

        const returnList = await getAll(familyId);
        logger.debug(category, context, 'returnList =', returnList);
        if (returnList.error)
            return errors.create(context, returnList.error.code, returnList);

        try {
            await table.destroy({
                where: {
                    UserFamilyId: familyId,
                },
                truncate: false
            });

            return returnList;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    return {
        create,
        getAll,
        getList,
        getOne,
        update,
        deleteOne,
        deleteAll
    };
}