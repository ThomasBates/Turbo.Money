
module.exports = function CommonData(logger, category, table, encode, decode, decodeList, validate) {
    const module = 'CommonData';

    // Create and save a new record
    const create = async (userCookie, businessObject) => {
        const context = `${module}.create`;
        logger.debug(category, context, 'businessObject =', businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            logger.error(category, context, 'error =', error);
            return { error };
        }

        // transform business object to data object.
        const dataObject = encode(businessObject);
        logger.debug(category, context, 'dataObject =', dataObject);
        if (dataObject.error) {
            return dataObject;
        }

        dataObject.UserFamilyId = userCookie.familyId;

        // Create record for business object in the database
        try {
            let data = await table.create(dataObject);
            logger.debug(category, context, 'data =', data.toJSON());

            // transform returned data object to return business object.
            const returnObject = decode(userCookie, data.dataValues);
            logger.debug(category, context, 'returnObject =', returnObject);
            if (returnObject.error) {
                return returnObject;
            }

            return returnObject;
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while creating a record.";
            logger.error(category, context, 'error =', error);
            return { error };
        }
    };

    // Retrieve all records from the table.
    const getAll = async (userCookie) => {
        const context = `${module}.getAll`;
        try {
            let dataList = await table.findAll({
                where: { UserFamilyId: userCookie.familyId }
            });
            //logger.verbose(category, context, 'data =', data);

            let error;
            let returnList;

            returnList = dataList.map(dataItem => {
                if (error) {
                    return error;
                }
                const item = decode(userCookie, dataItem);
                if (item.error) {
                    error = item.error;
                    logger.error(category, context, 'item.error =', item.error);
                    return error;
                }
                return item;
            })

            if (error) {
                logger.error(category, context, 'error =', error);
                return { error };
            }

            logger.verbose(category, context, 'returnList =', returnList);
            return { list: returnList };
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all records.";
            logger.error(category, context, 'error =', error);
            return { error };
        }
    };

    // Retrieve all records from the table.
    const getList = async (userCookie) => {
        const context = `${module}.getList`;
        try {
            let data = await table.findAll({
                where: { UserFamilyId: userCookie.familyId }
            });
            //logger.verbose(category, context, 'data =', data);

            const returnList = decodeList(userCookie, data);
            logger.verbose(category, context, 'returnList =', returnList);
            return returnList;
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all records.";
            logger.error(category, context, 'error =', error);
            return { error };
        }
    };

    // Find a single record with an id
    const getOne = async (userCookie, id) => {
        const context = `${module}.getOne`;
        try {
            let data = await table.findByPk(id);

            if (data) {
                return decode(userCookie, data);
            }
            //return Error('CommonData', 'getOne', 'NotFound', 'Cannot find data object with id=${id}.');
            return { error: 'Cannot find data object with id=${id}.' };
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while finding one record.";
            logger.error(category, context, 'error =', error);
            return { error };
        }
    };

    // Update a record by the id in the request
    const update = async (userCookie, businessObject) => {
        const context = `${module}.update`;
        logger.debug(category, context, 'businessObject =', businessObject);

        // Validate incoming business object.
        let error = await validate(userCookie, businessObject);
        if (error) {
            logger.error(category, context, 'error =', error);
            return { error };
        }

        // transform business object to data object.
        const dataObject = encode(businessObject);
        logger.debug(category, context, 'dataObject =', dataObject);
        if (dataObject.error) {
            return dataObject;
        }

        dataObject.UserFamilyId = userCookie.familyId;

        try {
            await table.update(dataObject,
                {
                    where: { id: businessObject.id }
                });

            return await getOne(userCookie, businessObject.id);
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while updating a record.";
            logger.error(category, context, 'error =', error);
            return { error };
        }
    };

    // Delete a record with the specified id in the request
    const deleteOne = async (userCookie, id) => {
        const context = `${module}.deleteOne`;

        const returnObject = await getOne(userCookie, id);
        if (returnObject.error) {
            logger.error(category, context, 'returnObject.error =', returnObject.error);
        }

        try {
            let num = await table.destroy({
                where: { id: id }
            });

            if (num == 1) {
                return returnObject;
            } else {
                return { error: 'Cannot delete record with id=${id}. Maybe record was not found!' };
            }
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while deleting a record.";
            logger.error(category, context, 'catch: error =', error);
            return { error };
        }
    };

    // Delete all records from the table.
    const deleteAll = async (userCookie) => {
        const context = `${module}.deleteAll`;

        const returnList = await getAll(userCookie);
        if (returnList.error) {
            logger.error(category, context, 'returnList.error =', returnList.error);
        }

        try {
            await table.destroy({
                where: { UserFamilyId: userCookie.familyId },
                truncate: false
            });

            return returnList;
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while deleting all records.";
            logger.error(category, context, 'error =', error);
            return { error };
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