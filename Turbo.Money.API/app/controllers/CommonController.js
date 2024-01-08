
module.exports = (owner, business, decode, encode, encodeList) => {

    const handleError = (source, res, code, error) => {
        if (error) {
            console.log(`${owner}.${source}: error = `, error);
            res.status(code).send({
                message: error
            });
            return true;
        }
        return false;
    }

    // Create and save a new object record
    const create = async (req, res) => {
        console.log(`${owner}.create: req.body = `, req.body);
        let [error, businessObject] = await decode(req.body);
        if (handleError("create", res, 400, error))
            return;
        console.log(`${owner}.create: businessObject = `, businessObject);

        error = await business.validate(businessObject);
        if (handleError("create", res, 400, error))
            return;

        [error, returnObject] = await business.create(businessObject);
        if (handleError("create", res, 500, error))
            return;

        console.log(`${owner}.create: returnObject = `, returnObject);
        [error, data] = await encode(returnObject);
        if (handleError("create", res, 500, error))
            return;
        console.log(`${owner}.create: data = `, data);
        res.send(data);
    };

    // Retrieve all objects from the database.
    const findAll = async (req, res) => {
        let [error, returnList] = await business.findAll();
        if (handleError("findAll", res, 500, error))
            return;

        console.log(`${owner}.findAll: returnList = `, returnList);
        [error, dataList] = await encodeList(returnList);
        if (handleError("findAll", res, 500, error))
            return;

        console.log(`${owner}.findAll: dataList = `, dataList);
        res.send(dataList);
    };

    // Find a single object with an id
    const findOne = async (req, res) => {
        const id = req.params.id;

        let [error, businessObject] = await business.findById(id);
        if (handleError("findOne", res, 500, error))
            return;

        [error, data] = await encode(businessObject);
        if (handleError("findOne", res, 500, error))
            return;
        res.send(data);
    };

    // Update an object by the id in the request
    const update = async (req, res) => {
        const id = req.params.id;
        console.log(`${owner}.update: id = ${id}`);

        console.log(`${owner}.update: req.body = `, req.body);
        let [error, businessObject] = await decode(req.body);
        if (handleError("update", res, 400, error))
            return;
        console.log(`${owner}.update: businessObject = `, businessObject);

        error = await business.validate(businessObject);
        if (handleError("update", res, 400, error))
            return;

        [error, returnObject] = await business.update(businessObject);
        if (handleError("update", res, 500, error))
            return;

        console.log(`${owner}.update: returnObject = `, returnObject);
        [error, data] = await encode(returnObject);
        if (handleError("update", res, 500, error))
            return;
        console.log(`${owner}.update: data = `, data);
        res.send(data);
    };

    // Delete an object with the specified id in the request
    const deleteOne = async (req, res) => {
        const id = req.params.id;

        let [error, deletedObject] = await business.deleteById(id);
        if (handleError("deleteOne", res, 500, error))
            return;

        [error, data] = await encode(deletedObject);
        if (handleError("deleteOne", res, 500, error))
            return;

        res.send(data);
    };

    // Delete all objects from the database.
    const deleteAll = async (req, res) => {
        let [error, deletedList] = await business.deleteAll();
        if (handleError("deleteAll", res, 500, error))
            return;

        let dataList = deletedList.map(async (deletedObject) => {
            [error, item] = await encode(deletedObject);
            return item;
        });

        if (handleError("deleteAll", res, 500, error))
            return;

        res.send(dataList);
    };

    return {
        create,
        findAll,
        findOne,
        update,
        deleteOne,
        deleteAll
    };
}
