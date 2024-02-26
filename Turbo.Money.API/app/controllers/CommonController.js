
module.exports = (logger, owner, business, decode, encode, encodeList) => {

    const jwt = require("jsonwebtoken");

    const handleError = (source, res, code, error) => {
        if (error) {
            logger.error(owner, `${owner}.${source}: error = `, error);
            res.status(code).send({
                message: error
            });
            return true;
        }
        return false;
    }

    // Create and save a new object record
    const create = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);

        logger.debug(owner, `${owner}.create: req.body = `, req.body);
        let [error, businessObject] = decode(req.body);
        if (handleError("create", res, 400, error))
            return;
        logger.debug(owner, `${owner}.create: businessObject = `, businessObject);

        error = await business.validate(userInfo, businessObject);
        if (handleError("create", res, 400, error))
            return;

        [error, returnObject] = await business.create(userInfo, businessObject);
        if (handleError("create", res, 500, error))
            return;

        logger.debug(owner, `${owner}.create: returnObject = `, returnObject);
        [error, data] = encode(returnObject);
        if (handleError("create", res, 500, error))
            return;
        logger.debug(owner, `${owner}.create: data = `, data);
        res.send(data);
    };

    // Retrieve all objects from the database.
    const getAll = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);

        let [error, returnList] = await business.getAll(userInfo);
        if (handleError("getAll", res, 500, error))
            return;

        logger.verbose(owner, `${owner}.getAll: returnList = `, returnList);

        let dataList = returnList.map(businessObject => {
            if (error) {
                return error;
            }
            [error, item] = encode(businessObject);
            if (error) {
                logger.error(owner, `${owner}.getAll: error = `, error);
                return error;
            }
            return item;
        });

        if (handleError("getAll", res, 500, error))
            return;

        logger.verbose(owner, `${owner}.getAll: dataList = `, dataList);
        res.send(dataList);
    };

    // Retrieve all objects from the database.
    const getList = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);

        let [error, returnList] = await business.getList(userInfo);
        if (handleError("getList", res, 500, error))
            return;

        logger.verbose(owner, `${owner}.getList: returnList = `, returnList);
        [error, dataList] = encodeList(returnList);
        if (handleError("getList", res, 500, error))
            return;

        logger.verbose(owner, `${owner}.getList: dataList = `, dataList);
        res.send(dataList);
    };

    // Find a single object with an id
    const getOne = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);
        const id = req.params.id;

        let [error, businessObject] = await business.getOne(userInfo, id);
        if (handleError("getOne", res, 500, error))
            return;

        [error, data] = encode(businessObject);
        if (handleError("getOne", res, 500, error))
            return;
        res.send(data);
    };

    // Update an object by the id in the request
    const update = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);
        const id = req.params.id;
        logger.debug(owner, `${owner}.update: id = ${id}`);

        logger.debug(owner, `${owner}.update: req.body = `, req.body);
        let [error, businessObject] = decode(req.body);
        if (handleError("update", res, 400, error))
            return;
        logger.debug(owner, `${owner}.update: businessObject = `, businessObject);

        error = await business.validate(userInfo, businessObject);
        if (handleError("update", res, 400, error))
            return;

        [error, returnObject] = await business.update(userInfo, businessObject);
        if (handleError("update", res, 500, error))
            return;

        logger.debug(owner, `${owner}.update: returnObject = `, returnObject);
        [error, data] = encode(returnObject);
        if (handleError("update", res, 500, error))
            return;
        logger.debug(owner, `${owner}.update: data = `, data);
        res.send(data);
    };

    // Delete an object with the specified id in the request
    const deleteOne = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);
        const id = req.params.id;

        let [error, deletedObject] = await business.deleteById(userInfo, id);
        if (handleError("deleteOne", res, 500, error))
            return;

        [error, data] = encode(deletedObject);
        if (handleError("deleteOne", res, 500, error))
            return;

        res.send(data);
    };

    // Delete all objects from the database.
    const deleteAll = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.token);

        let [error, deletedList] = await business.deleteAll(userInfo);
        if (handleError("deleteAll", res, 500, error))
            return;

        let dataList = deletedList.map(async (deletedObject) => {
            [error, item] = encode(deletedObject);
            return item;
        });

        if (handleError("deleteAll", res, 500, error))
            return;

        res.send(dataList);
    };

    return {
        handleError,
        create,
        getAll,
        getList,
        getOne,
        update,
        deleteOne,
        deleteAll
    };
}
