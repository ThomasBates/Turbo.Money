
module.exports = function CommonData(
    logger, errors, category, table,
    encode, decode, decodeList, validate) {
    const module = CommonData.name;

    // Create and save a new record
    const create = async (userCookie, businessObject) => {
        const context = `${module}.${create.name}`;
        logger.debug(category, context, 'businessObject =', businessObject);

        // Validate incoming business object.
        let validation = validate(businessObject);
        if (validation.error)
            return errors.create(context, 'InvalidData', validation);

        // transform business object to data object.
        const encodedObject = encode(businessObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (encodedObject.error)
            return errors.create(context, 'InvalidData', encodedObject);

        encodedObject.UserFamilyId = userCookie.familyId;

        // Create record for business object in the database
        try {
            let data = await table.create(encodedObject);
            logger.debug(category, context, 'data =', data.toJSON());

            // transform returned data object to return business object.
            const decodedObject = decode(userCookie, data.dataValues);
            logger.debug(category, context, 'decodedObject =', decodedObject);
            if (decodedObject.error)
                return errors.create(context, 'InvalidData', decodedObject);

            return decodedObject;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Retrieve all records from the table.
    const getAll = async (userCookie) => {
        const context = `${module}.${getAll.name}`;
        try {
            let dataList = await table.findAll({
                where: { UserFamilyId: userCookie.familyId }
            });
            //logger.verbose(category, context, 'data =', data);

            let error;
            let returnList;

            returnList = dataList.map(dataItem => {
                if (error)
                    return error;

                const item = decode(userCookie, dataItem);
                if (item.error) {
                    error = errors.create(context, 'InvalidData', item);
                    return error;
                }

                return item;
            })

            if (error) 
                return error;

            logger.verbose(category, context, 'returnList =', returnList);
            return { list: returnList };
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Retrieve all records from the table.
    const getList = async (userCookie) => {
        const context = `${module}.${getList.name}`;
        try {
            let data = await table.findAll({
                where: { UserFamilyId: userCookie.familyId }
            });
            //logger.verbose(category, context, 'data =', data);

            const returnList = decodeList(userCookie, data);
            logger.verbose(category, context, 'returnList =', returnList);
            if (returnList.error)
                return errors.create(context, 'InvalidData', returnList);

            return returnList;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Find a single record with an id
    const getOne = async (userCookie, id) => {
        const context = `${module}.${getOne.name}`;
        try {
            let data = await table.findByPk(id);

            if (!data)
                return errors.create(context, 'MissingData', `Cannot find data object with id=${id}.`);

            return decode(userCookie, data);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Update a record by the id in the request
    const update = async (userCookie, businessObject) => {
        const context = `${module}.${update.name}`;
        logger.debug(category, context, 'businessObject =', businessObject);

        // Validate incoming business object.
        let validation = validate(businessObject);
        if (validation.error)
            return errors.create(context, 'InvalidData', validation);

        // transform business object to data object.
        const encodedObject = encode(businessObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (encodedObject.error)
            return errors.create(context, 'InvalidData', encodedObject);

        encodedObject.UserFamilyId = userCookie.familyId;

        try {
            await table.update(encodedObject,
                {
                    where: { id: businessObject.id }
                });

            return await getOne(userCookie, businessObject.id);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Delete a record with the specified id in the request
    const deleteOne = async (userCookie, id) => {
        const context = `${module}.${deleteOne.name}`;

        const returnObject = await getOne(userCookie, id);
        if (returnObject.error)
            logger.warning(category, context, 'returnObject =', returnObject);

        try {
            await table.destroy({
                where: { id: id }
            });

            return returnObject;
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    // Delete all records from the table.
    const deleteAll = async (userCookie) => {
        const context = `${module}.${deleteAll.name}`;

        const returnList = await getAll(userCookie);
        if (returnList.error)
            logger.warning(category, context, 'returnList =', returnList);

        try {
            await table.destroy({
                where: { UserFamilyId: userCookie.familyId },
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