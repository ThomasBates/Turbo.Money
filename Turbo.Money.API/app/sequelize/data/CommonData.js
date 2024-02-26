
module.exports = (logger, owner, table, encode, decode, decodeList, validate) => {

    // Create and save a new record
    const create = async (businessObject) => {
        logger.debug(owner, `${owner}.create: businessObject = `, businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            logger.error(owner, `${owner}.create: error = `, error);
            return [error, null];
        }

        // transform business object to data object.
        [error, dataObject] = encode(businessObject);
        if (error) {
            logger.error(owner, `${owner}.create: error = `, error);
            return [error, null];
        }
        logger.debug(owner, `${owner}.create: dataObject = `, dataObject);

        // Create record for business object in the database
        try {
            let data = await table.create(dataObject);
            logger.debug(owner, `${owner}.create: data.dataValues = `, data.dataValues);

            // transform returned data object to return business object.
            [error, returnObject] = decode(data.dataValues);
            if (error) {
                logger.error(owner, `${owner}.create: error = `, error);
                return [error, null];
            }

            logger.debug(owner, `${owner}.create: returnObject = `, returnObject);
            return [null, returnObject];
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while creating a record.";
            logger.error(owner, `${owner}.create: error = `, error);
            return [error, null];
        }
    };

    // Retrieve all records from the table.
    const getAll = async () => {
        try {
            let dataList = await table.findAll();
            //logger.debug(owner, `${owner}.getAll: data = `, data);

            let error;
            let returnList;

            returnList = dataList.map(dataItem => {
                if (error) {
                    return error;
                }
                [error, item] = decode(dataItem);
                if (error) {
                    logger.error(owner, `${owner}.getAll: error = `, error);
                    return error;
                }
                return item;
            })

            if (error) {
                logger.error(owner, `${owner}.getAll: error = `, error);
                return [error, null];
            }

            logger.verbose(owner, `${owner}.getAll: returnList = `, returnList);
            return [null, returnList];
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all records.";
            logger.error(owner, `${owner}.getAll: error = `, error);
            return [error, null];
        }
    };

    // Retrieve all records from the table.
    const getList = async () => {
        try {
            let data = await table.findAll();
            //logger.debug(owner, `${owner}.getList: data = `, data);

            let [error, returnList] = decodeList(data);
            if (error) {
                logger.error(owner, `${owner}.getList: error = `, error);
                return [error, null];
            }

            logger.verbose(owner, `${owner}.getList: returnList = `, returnList);
            return [null, returnList];
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all records.";
            logger.error(owner, `${owner}.getList: error = `, error);
            return [error, null];
        }
    };

    // Find a single record with an id
    const getOne = async (id) => {
        try {
            let data = await table.findByPk(id);

            if (data) {
                return decode(data);
            }

            return [`Cannot find data object with id=${id}.`, null];
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding one record.";
            logger.error(owner, `${owner}.getOne: error = `, error);
            return [error, null];
        }
    };

    // Update a record by the id in the request
    const update = async (businessObject) => {
        logger.debug(owner, `${owner}.update: businessObject = `, businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            logger.error(owner, `${owner}.update: error = `, error);
            return [error, null];
        }

        // transform business object to data object.
        let dataObject;
        [error, dataObject] = encode(businessObject);
        if (error) {
            logger.error(owner, `${owner}.update: error = `, error);
            return [error, null];
        }
        logger.debug(owner, `${owner}.update: dataObject = `, dataObject);

        try {
            await table.update(dataObject,
                {
                    where: { id: businessObject.id }
                });

            return await getOne(businessObject.id);
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while updating a record.";
            logger.error(owner, `${owner}.update: error = `, error);
            return [error, null];
        }
    };

    // Delete a record with the specified id in the request
    const deleteOne = async (id) => {

        let [error, returnObject] = await getOne(id);
        if (error) {
            logger.error(owner, `${owner}.deleteOne: error = `, error);
        }

        try {
            let num = await table.destroy({
                where: { id: id }
            });

            if (num == 1) {
                return [null, returnObject];
            } else {
                return [`Cannot delete record with id=${id}. Maybe record was not found!`, null];
            }
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while deleting a record.";
            logger.error(owner, `${owner}.deleteOne: catch: error = `, error);
            return [error, null];
        }
    };

    // Delete all records from the table.
    const deleteAll = async () => {

        let [error, returnList] = await getList();
        if (error) {
            logger.error(owner, `${owner}.deleteAll: error = `, error);
        }

        try {
            await table.destroy({
                where: {},
                truncate: false
            });

            return [null, returnList];
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while deleting all records.";
            logger.error(owner, `${owner}.deleteAll: error = `, error);
            return [error, null];
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