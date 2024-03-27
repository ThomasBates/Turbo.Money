
module.exports = function CommonController(logger, category, business, decode, encode, encodeList) {
    const module = 'CommonController';

    const jwt = require("jsonwebtoken");

    const handleError = (context, res, code, error) => {
        if (error) {
            logger.error(category, context, 'error =', error);
            res.status(code).send({
                message: error
            });
            return true;
        }
        return false;
    }

    // Create and save a new object record
    const create = async (req, res) => {
        const context = `${module}.create`;
        const userCookie = jwt.decode(req.cookies.user);

        logger.debug(category, context, 'req.body =', req.body);
        const businessObject = decode(req.body);
        logger.debug(category, context, 'businessObject =', businessObject);
        if (handleError(context, res, 400, businessObject.error))
            return;

        const error = await business.validate(userCookie, businessObject);
        if (handleError(context, res, 400, error))
            return;

        const returnObject = await business.create(userCookie, businessObject);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (handleError(context, res, 500, returnObject.error))
            return;

        const data = encode(returnObject);
        logger.debug(category, context, 'data =', data);
        if (handleError(context, res, 500, data.error))
            return;
        res.send(data);
    };

    // Retrieve all objects from the database.
    const getAll = async (req, res) => {
        const context = `${module}.getAll`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnList = await business.getAll(userCookie);
        logger.verbose(category, context, 'returnList =', returnList);
        if (handleError(context, res, 500, returnList.error))
            return;

        let error = null;
        let dataList = returnList.list.map(businessObject => {
            if (error) {
                return error;
            }
            const data = encode(businessObject);
            if (data.error) {
                error = data.error;
                logger.error(category, context, 'error =', error);
                return error;
            }
            return data;
        });

        if (handleError(context, res, 500, error))
            return;

        logger.verbose(category, context, 'dataList =', dataList);
        res.send(dataList);
    };

    // Retrieve all objects from the database.
    const getList = async (req, res) => {
        const context = `${module}.getList`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnList = await business.getList(userCookie);
        logger.verbose(category, context, 'returnList =', returnList);
        if (handleError(context, res, 500, returnList.error))
            return;

        const dataList = encodeList(returnList.list);
        logger.verbose(category, context, 'dataList =', dataList);
        if (handleError(context, res, 500, dataList.error))
            return;

        res.send(dataList.list);
    };

    // Find a single object with an id
    const getOne = async (req, res) => {
        const context = `${module}.getOne`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const businessObject = await business.getOne(userCookie, id);
        logger.verbose(category, context, 'businessObject =', businessObject);
        if (handleError(context, res, 500, businessObject.error))
            return;

        const data = encode(businessObject);
        logger.verbose(category, context, 'data =', data);
        if (handleError(context, res, 500, data.error))
            return;
        res.send(data);
    };

    // Update an object by the id in the request
    const update = async (req, res) => {
        const context = `${module}.update`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);
        logger.debug(category, context, 'req.body =', req.body);

        const businessObject = decode(req.body);
        logger.debug(category, context, 'businessObject =', businessObject);
        if (handleError(context, res, 400, businessObject.error))
            return;

        const error = await business.validate(userCookie, businessObject);
        if (handleError(context, res, 400, error))
            return;

        const returnObject = await business.update(userCookie, businessObject);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (handleError(context, res, 500, returnObject.error))
            return;

        const data = encode(returnObject);
        logger.debug(category, context, 'data =', data);
        if (handleError(context, res, 500, data.error))
            return;

        logger.debug(category, context, 'return', data);
        res.send(data);
    };

    // Delete an object with the specified id in the request
    const deleteOne = async (req, res) => {
        const context = `${module}.deleteOne`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const deletedObject = await business.deleteById(userCookie, id);
        if (handleError(context, res, 500, deletedObject.error))
            return;

        const data = encode(deletedObject);
        if (handleError(context, res, 500, data.error))
            return;

        res.send(data);
    };

    // Delete all objects from the database.
    const deleteAll = async (req, res) => {
        const context = `${module}.deleteAll`;
        const userCookie = jwt.decode(req.cookies.user);

        const deletedList = await business.deleteAll(userCookie);
        if (handleError(context, res, 500, deletedList.error))
            return;

        let error = null;
        let dataList = deletedList.map(deletedObject => {
            if (error) {
                return error;
            }
            const data = encode(deletedObject);
            if (data.error) {
                error = data.error;
                logger.error(category, context, 'error =', error);
                return error;
            }
            return data;
        });

        if (handleError(context, res, 500, error))
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
