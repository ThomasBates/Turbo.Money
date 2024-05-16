
module.exports = function CommonPeriodData(
    logger, errors, category, table,
    validate, encode, decode, decodeBrief) {

    const module = CommonPeriodData.name;

    //  Local functions  -------------------------------------------------------

    const encodeObject = (familyId, periodId, businessObject) => {
        const context = `${module}.${encodeObject.name}`;

        if (!businessObject)
            return errors.create(context, 'InvalidArgument', 'businessObject is not defined');

        // Validate incoming business object.
        let validation = validate(businessObject);
        if (validation.error)
            return errors.create(context, validation.error.code, validation);

        const encodedObject = encode(businessObject);
        encodedObject.UserFamilyId = familyId;
        encodedObject.BudgetPeriodId = periodId;
        return encodedObject;
    }

    const decodeObject = (familyId, periodId, dataObject) => {
        const context = `${module}.${decodeObject.name}`;

        if (!dataObject)
            return errors.create(context, 'InvalidArgument', 'dataObject is not defined');

        if (dataObject.UserFamilyId !== familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${dataObject.UserFamilyId}) is not user's family (${familyId}).`);

        //if (dataObject.BudgetPeriodId !== periodId)
        //    return errors.create(context, 'InvalidData', `data's period (${dataObject.BudgetPeriodId }) is not the selected period (${periodId}).`);

        return decode(dataObject);
    }

    const decodeList = (familyId, periodId, dataList, decodeItem) => {
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

            //if (dataItem.BudgetPeriodId !== periodId) {
            //    error = errors.create(context, 'InvalidData', `item's period (${dataList.BudgetPeriodId}) is not the selected period (${periodId}).`);
            //    return error;
            //}

            logger.verbose(category, context, 'dataItem =', dataItem.toJSON());
            const decodedItem = decodeItem(dataItem);
            logger.verbose(category, context, 'decodedItem =', decodedItem);
            return decodedItem;
        });

        if (error)
            return error;

        return { list: returnList };
    }

    //  Exported functions  ----------------------------------------------------

    // Create and save a new record
    const createForPeriod = async (familyId, periodId, businessObject) => {
        const context = `${module}.${createForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);
        logger.debug(category, context, 'businessObject =', businessObject);

        // transform business object to data object.
        const encodedObject = encodeObject(familyId, periodId, businessObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (encodedObject.error)
            return errors.create(context, encodedObject.error.code, encodedObject);

        // Create record for business object in the database
        try {
            let createdObject = await table.create(encodedObject);
            logger.debug(category, context, 'createdObject =', createdObject.toJSON());

            // transform returned data object to return business object.
            const decodedObject = decodeObject(familyId, periodId, createdObject);
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
    const getAllForPeriod = async (familyId, periodId) => {
        const context = `${module}.${getAllForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);

        try {
            let dataList = await table.findAll({
                where: {
                    UserFamilyId: familyId,
                    BudgetPeriodId: periodId
                }
            });
            logger.verbose(category, context, 'dataList =', dataList.map(item => item.toJSON()));

            const decodedList = decodeList(familyId, periodId, dataList, decode);
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
    const getListForPeriod = async (familyId, periodId) => {
        const context = `${module}.${getListForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);

        try {
            let dataList = await table.findAll({
                where: {
                    UserFamilyId: familyId,
                    BudgetPeriodId: periodId
                }
            });
            logger.verbose(category, context, 'dataList =', dataList.map(item => item.toJSON()));

            const decodedList = decodeList(familyId, periodId, dataList, decodeBrief);
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
    const getOneForPeriod = async (familyId, periodId, id) => {
        const context = `${module}.${getOneForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);
        logger.debug(category, context, 'id =', id);

        try {
            let dataObject = await table.findByPk(id);

            if (!dataObject)
                return errors.create(context, 'MissingData', `Cannot find data object with id=${id}.`);

            // transform returned data object to return business object.
            const decodedObject = decodeObject(familyId, periodId, dataObject);
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
    const updateForPeriod = async (familyId, periodId, businessObject) => {
        const context = `${module}.${updateForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);
        logger.debug(category, context, 'businessObject =', businessObject);

        // transform business object to data object.
        const encodedObject = encodeObject(familyId, periodId, businessObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (encodedObject.error)
            return errors.create(context, encodedObject.error.code, encodedObject);

        try {
            await table.update(encodedObject,
                {
                    where: { id: businessObject.id }
                });

            return await getOneForPeriod(familyId, periodId, businessObject.id);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Delete a record with the specified id in the request
    const deleteOneForPeriod = async (familyId, periodId, id) => {
        const context = `${module}.${deleteOneForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);
        logger.debug(category, context, 'id =', id);

        const returnObject = await getOneForPeriod(familyId, periodId, id);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (returnObject.error)
            return errors.create(context, returnObject.error.code, returnObject);

        try {
            await table.destroy({
                where: {
                    id: id,
                    UserFamilyId: familyId,
                    BudgetPeriodId: periodId,
                }
            });

            return returnObject;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Delete all records from the table.
    const deleteAllForPeriod = async (familyId, periodId) => {
        const context = `${module}.${deleteAllForPeriod.name}`;
        logger.debug(category, context, 'familyId =', familyId);
        logger.debug(category, context, 'periodId =', periodId);

        const returnList = await getAllForPeriod(familyId, periodId);
        logger.debug(category, context, 'returnList =', returnList);
        if (returnList.error)
            return errors.create(context, returnList.error.code, returnList);

        try {
            await table.destroy({
                where: {
                    UserFamilyId: familyId,
                    BudgetPeriodId: periodId,
                },
                truncate: false
            });

            return returnList;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    const common = require('./CommonData')(
        logger, errors, "BudgetSection", table,
        validate, encode, decode, decodeBrief);

    return {
        ...common,
        createForPeriod,
        getAllForPeriod,
        getListForPeriod,
        getOneForPeriod,
        updateForPeriod,
        deleteOneForPeriod,
        deleteAllForPeriod
    };
}