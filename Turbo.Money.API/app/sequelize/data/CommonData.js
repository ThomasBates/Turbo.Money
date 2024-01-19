
module.exports = (owner, table, encode, decode, decodeList, validate) => {

    // Create and save a new business object
    const create = async (businessObject) => {
        console.log(`${owner}.create: businessObject = `, businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            console.log(`${owner}.create: error = `, error);
            return [error, null];
        }

        // transform business object to data object.
        [error, dataObject] = encode(businessObject);
        if (error) {
            console.log(`${owner}.create: error = `, error);
            return [error, null];
        }
        console.log(`${owner}.create: dataObject = `, dataObject);

        // Create record for business object in the database
        try {
            let data = await table.create(dataObject);
            console.log(`${owner}.create: data.dataValues = `, data.dataValues);

            // transform returned data object to return business object.
            [error, returnObject] = decode(data.dataValues);
            if (error) {
                console.log(`${owner}.create: error = `, error);
                return [error, null];
            }

            console.log(`${owner}.create: returnObject = `, returnObject);
            return [null, returnObject];
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while creating a database record.";
            console.log(`${owner}.create: error = `, error);
            return [error, null];
        }
    };

    // Retrieve all business objects from the database.
    const getAll = async () => {
        try {
            let dataList = await table.findAll();
            //console.log(`${owner}.getAll: data = `, data);

            let error;
            let returnList;

            returnList = dataList.map(dataItem => {
                if (error) {
                    return error;
                }
                [error, item] = decode(dataItem);
                if (error) {
                    console.log(`${owner}.getAll: error = `, error);
                    return error;
                }
                return item;
            })

            if (error) {
                console.log(`${owner}.getAll: error = `, error);
                return [error, null];
            }

            console.log(`${owner}.getAll: returnList = `, returnList);
            return [null, returnList];
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all database records.";
            console.log(`${owner}.getAll: error = `, error);
            return [error, null];
        }
    };

    // Retrieve all business objects from the database.
    const getList = async () => {
        try {
            let data = await table.findAll();
            //console.log(`${owner}.getList: data = `, data);

            let [error, returnList] = decodeList(data);
            if (error) {
                console.log(`${owner}.getList: error = `, error);
                return [error, null];
            }

            console.log(`${owner}.getList: returnList = `, returnList);
            return [null, returnList];
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding all database records.";
            console.log(`${owner}.getList: error = `, error);
            return [error, null];
        }
    };

    // Find a single Bank with an id
    const getOne = async (id) => {
        try {
            let data = await table.findByPk(id);

            if (data) {
                return decode(data);
            }

            return [`Cannot find data object with id=${id}.`, null];
        }
        catch (ex) {
            let error = ex.message || "Unknown error occurred while finding one database record.";
            console.log(`${owner}.getOne: error = `, error);
            return [error, null];
        }
    };

    // Update a Bank by the id in the request
    const update = async (businessObject) => {
        console.log(`${owner}.update: businessObject = `, businessObject);

        // Validate incoming business object.
        let error = await validate(businessObject);
        if (error) {
            console.log(`${owner}.update: error = `, error);
            return [error, null];
        }

        // transform business object to data object.
        [error, dataObject] = encode(businessObject);
        if (error) {
            console.log(`${owner}.update: error = `, error);
            return [error, null];
        }
        console.log(`${owner}.update: dataObject = `, dataObject);

        try {
            let num = await table.update(dataObject,
                {
                    where: { id: businessObject.id }
                });

            if (num == 1) {
                return await getOne(businessObject.id);
            } else {
                return [`Cannot update Bank with id=${businessObject.id}. Maybe Bank was not found or req.body is empty!`, null];
            }
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while updating a database record.";
            console.log(`${owner}.update: error = `, error);
            return [error, null];
        }
    };

    // Delete a Bank with the specified id in the request
    const deleteOne = async (id) => {

        let [error, returnObject] = await getOne(id);
        if (error) {
            console.log(`${owner}.deleteOne: error = `, error);
        }

        try {
            let num = await table.destroy({
                where: { id: id }
            });

            if (num == 1) {
                return [null, returnObject];
            } else {
                return [`Cannot delete Bank with id=${id}. Maybe Bank was not found!`, null];
            }
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while deleting a database record.";
            console.log(`${owner}.deleteOne: error = `, error);
            return [error, null];
        }
    };

    // Delete all Banks from the database.
    const deleteAll = async () => {

        let [error, returnList] = await getList();
        if (error) {
            console.log(`${owner}.deleteAll: error = `, error);
        }

        try {
            await table.destroy({
                where: {},
                truncate: false
            });

            return [null, returnList];
        }
        catch (ex) {
            error = ex.message || "Unknown error occurred while deleting all database records.";
            console.log(`${owner}.deleteAll: error = `, error);
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