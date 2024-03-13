
module.exports = (logger, owner, table, encode, decode, decodeList, validate) => {

    // Create and save a new record
    const create = async (userInfo, businessObject) => {
        logger.debug(owner, `${owner}.create: businessObject =`, businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            logger.error(owner, `${owner}.create: error =`, error);
            return { error };
        }

        // transform business object to data object.
        const dataObject = encode(businessObject);
        logger.debug(owner, `${owner}.create: dataObject =`, dataObject);
        if (dataObject.error) {
            return dataObject;
        }

        // Create record for business object in the database
        try {
            let data = await table.create(dataObject);
            logger.debug(owner, `${owner}.create: data.dataValues =`, data.dataValues);
            logger.debug(owner, `${owner}.create: data.toJSON() =`, data.toJSON());

            // transform returned data object to return business object.
            const returnObject = decode(data.dataValues);
            logger.debug(owner, `${owner}.create: returnObject =`, returnObject);
            if (returnObject.error) {
                return returnObject;
            }

            return returnObject;
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while creating a record.";
            logger.error(owner, `${owner}.create: error =`, error);
            return { error };
        }
    };

    // Retrieve all records from the table.
    const getAll = async (userInfo) => {
        try {
            let dataList = await table.findAll();
            //logger.verbose(owner, `${owner}.getAll: data =`, data);

            let error;
            let returnList;

            returnList = dataList.map(dataItem => {
                if (error) {
                    return error;
                }
                const item = decode(dataItem);
                if (item.error) {
                    error = item.error;
                    logger.error(owner, `${owner}.getAll: item.error =`, item.error);
                    return error;
                }
                return item;
            })

            if (error) {
                logger.error(owner, `${owner}.getAll: error =`, error);
                return { error };
            }

            logger.verbose(owner, `${owner}.getAll: returnList =`, returnList);
            return { list: returnList };
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all records.";
            logger.error(owner, `${owner}.getAll: error =`, error);
            return { error };
        }
    };

    // Retrieve all records from the table.
    const getList = async (userInfo) => {
        try {
            let data = await table.findAll();
            //logger.verbose(owner, `${owner}.getList: data =`, data);

            const returnList = decodeList(data);
            if (returnList.error) {
                logger.error(owner, `${owner}.getList: returnList.error =`, returnList.error);
                return returnList;
            }

            logger.verbose(owner, `${owner}.getList: returnList =`, returnList);
            return returnList;
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all records.";
            logger.error(owner, `${owner}.getList: error =`, error);
            return { error };
        }
    };

    // Find a single record with an id
    const getOne = async (userInfo, id) => {
        try {
            let data = await table.findByPk(id);

            if (data) {
                return decode(data);
            }

            return { error: `Cannot find data object with id=${id}.` };
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while finding one record.";
            logger.error(owner, `${owner}.getOne: error =`, error);
            return { error };
        }
    };

    // Update a record by the id in the request
    const update = async (userInfo, businessObject) => {
        logger.debug(owner, `${owner}.update: businessObject =`, businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            logger.error(owner, `${owner}.update: error =`, error);
            return { error };
        }

        // transform business object to data object.
        const dataObject = encode(businessObject);
        logger.debug(owner, `${owner}.update: dataObject =`, dataObject);
        if (dataObject.error) {
            return dataObject;
        }

        try {
            await table.update(dataObject,
                {
                    where: { id: businessObject.id }
                });

            return await getOne(businessObject.id);
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while updating a record.";
            logger.error(owner, `${owner}.update: error =`, error);
            return { error };
        }
    };

    // Delete a record with the specified id in the request
    const deleteOne = async (userInfo, id) => {

        const returnObject = await getOne(id);
        if (returnObject.error) {
            logger.error(owner, `${owner}.deleteOne: returnObject.error =`, returnObject.error);
        }

        try {
            let num = await table.destroy({
                where: { id: id }
            });

            if (num == 1) {
                return returnObject;
            } else {
                return { error: `Cannot delete record with id=${id}. Maybe record was not found!` };
            }
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while deleting a record.";
            logger.error(owner, `${owner}.deleteOne: catch: error =`, error);
            return { error };
        }
    };

    // Delete all records from the table.
    const deleteAll = async (userInfo) => {

        const returnList = await getAll();
        if (returnList.error) {
            logger.error(owner, `${owner}.deleteAll: returnList.error =`, returnList.error);
        }

        try {
            await table.destroy({
                where: {},
                truncate: false
            });

            return returnList;
        }
        catch (ex) {
            const error = ex.message || "Unknown error occurred while deleting all records.";
            logger.error(owner, `${owner}.deleteAll: error =`, error);
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