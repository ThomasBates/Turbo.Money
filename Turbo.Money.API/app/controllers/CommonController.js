
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
        const { user: userInfo } = jwt.decode(req.cookies.user);

        logger.debug(owner, `${owner}.create: req.body = `, req.body);
        const businessObject = decode(req.body);
        logger.debug(owner, `${owner}.create: businessObject = `, businessObject);
        if (handleError("create", res, 400, businessObject.error))
            return;

        const error = await business.validate(userInfo, businessObject);
        if (handleError("create", res, 400, error))
            return;

        const returnObject = await business.create(userInfo, businessObject);
        logger.debug(owner, `${owner}.create: returnObject = `, returnObject);
        if (handleError("create", res, 500, returnObject.error))
            return;

        const data = encode(returnObject);
        logger.debug(owner, `${owner}.create: data = `, data);
        if (handleError("create", res, 500, data.error))
            return;
        res.send(data);
    };

    // Retrieve all objects from the database.
    const getAll = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);

        const returnList = await business.getAll(userInfo);
        logger.verbose(owner, `${owner}.getAll: returnList = `, returnList);
        if (handleError("getAll", res, 500, returnList.error))
            return;

        let error = null;
        let dataList = returnList.list.map(businessObject => {
            if (error) {
                return error;
            }
            const data = encode(businessObject);
            if (data.error) {
                error = data.error;
                logger.error(owner, `${owner}.getAll: error = `, error);
                return error;
            }
            return data;
        });

        if (handleError("getAll", res, 500, error))
            return;

        logger.verbose(owner, `${owner}.getAll: dataList = `, dataList);
        res.send(dataList);
    };

    // Retrieve all objects from the database.
    const getList = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);

        const returnList = await business.getList(userInfo);
        logger.verbose(owner, `${owner}.getList: returnList = `, returnList);
        if (handleError("getList", res, 500, returnList.error))
            return;

        const dataList = encodeList(returnList.list);
        logger.verbose(owner, `${owner}.getList: dataList = `, dataList);
        if (handleError("getList", res, 500, dataList.error))
            return;

        res.send(dataList.list);
    };

    // Find a single object with an id
    const getOne = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);
        const id = req.params.id;
        logger.debug(owner, `${owner}.getOne: id = ${id}`);

        const businessObject = await business.getOne(userInfo, id);
        logger.verbose(owner, `${owner}.getOne: businessObject = `, businessObject);
        if (handleError("getOne", res, 500, businessObject.error))
            return;

        const data = encode(businessObject);
        logger.verbose(owner, `${owner}.getOne: data = `, data);
        if (handleError("getOne", res, 500, data.error))
            return;
        res.send(data);
    };

    // Update an object by the id in the request
    const update = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);
        const id = req.params.id;
        logger.debug(owner, `${owner}.update: id = ${id}`);
        logger.debug(owner, `${owner}.update: req.body =`, req.body);

        const businessObject = decode(req.body);
        logger.debug(owner, `${owner}.update: businessObject =`, businessObject);
        if (handleError("update", res, 400, businessObject.error))
            return;

        const error = await business.validate(userInfo, businessObject);
        if (handleError("update", res, 400, error))
            return;

        const returnObject = await business.update(userInfo, businessObject);
        logger.debug(owner, `${owner}.update: returnObject =`, returnObject);
        if (handleError("update", res, 500, returnObject.error))
            return;

        const data = encode(returnObject);
        logger.debug(owner, `${owner}.update: data =`, data);
        if (handleError("update", res, 500, data.error))
            return;

        logger.debug(owner, `${owner}.update: return`, data);
        res.send(data);
    };

    // Delete an object with the specified id in the request
    const deleteOne = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);
        const id = req.params.id;
        logger.debug(owner, `${owner}.deleteOne: id = ${id}`);

        const deletedObject = await business.deleteById(userInfo, id);
        if (handleError("deleteOne", res, 500, deletedObject.error))
            return;

        const data = encode(deletedObject);
        if (handleError("deleteOne", res, 500, data.error))
            return;

        res.send(data);
    };

    // Delete all objects from the database.
    const deleteAll = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);

        const deletedList = await business.deleteAll(userInfo);
        if (handleError("deleteAll", res, 500, deletedList.error))
            return;

        let error = null;
        let dataList = deletedList.map(deletedObject => {
            if (error) {
                return error;
            }
            const data = encode(deletedObject);
            if (data.error) {
                error = data.error;
                logger.error(owner, `${owner}.deleteAll: error = `, error);
                return error;
            }
            return data;
        });

        if (handleError("getAll", res, 500, error))
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
