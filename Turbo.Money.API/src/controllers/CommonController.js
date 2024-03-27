
module.exports = function CommonController(
    logger, errors, category, business,
    decode, encode, encodeList) {
    const module = 'CommonController';

    const jwt = require("jsonwebtoken");

    // Create and save a new object record
    const create = async (req, res) => {
        const context = `${module}.create`;
        const userCookie = jwt.decode(req.cookies.user);

        logger.debug(category, context, 'req.body =', req.body);
        const decodedObject = decode(req.body);
        logger.debug(category, context, 'decodedObject =', decodedObject);
        if (errors.handle(context, res, 400, decodedObject.error))
            return;

        const validation = await business.validate(userCookie, decodedObject);
        if (errors.handle(context, res, 400, validation.error))
            return;

        const returnObject = await business.create(userCookie, decodedObject);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (errors.handle(context, res, 500, returnObject.error))
            return;

        const encodedObject = encode(returnObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        res.send(encodedObject);
    };

    // Retrieve all objects from the database.
    const getAll = async (req, res) => {
        const context = `${module}.getAll`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnList = await business.getAll(userCookie);
        logger.verbose(category, context, 'returnList =', returnList);
        if (errors.handle(context, res, 500, returnList.error))
            return;

        let error = null;
        let encodedList = returnList.list.map(businessObject => {
            if (error)
                return error;

            const encodedObject = encode(businessObject);
            if (encodedObject.error) {
                error = errors.create(context, encodedObject.error.code, encodedObject);
                return error;
            }
            return encodedObject;
        });

        if (errors.handle(context, res, 500, error))
            return;

        logger.verbose(category, context, 'encodedList =', encodedList);
        res.send(encodedList);
    };

    // Retrieve all objects from the database.
    const getList = async (req, res) => {
        const context = `${module}.getList`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnList = await business.getList(userCookie);
        logger.verbose(category, context, 'returnList =', returnList);
        if (errors.handle(context, res, 500, returnList.error))
            return;

        const encodedList = encodeList(returnList.list);
        logger.verbose(category, context, 'encodedList =', encodedList);
        if (errors.handle(context, res, 500, encodedList.error))
            return;

        res.send(encodedList.list);
    };

    // Find a single object with an id
    const getOne = async (req, res) => {
        const context = `${module}.getOne`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const businessObject = await business.getOne(userCookie, id);
        logger.verbose(category, context, 'businessObject =', businessObject);
        if (errors.handle(context, res, 500, businessObject.error))
            return;

        const encodedObject = encode(businessObject);
        logger.verbose(category, context, 'encodedObject =', encodedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;
        res.send(encodedObject);
    };

    // Update an object by the id in the request
    const update = async (req, res) => {
        const context = `${module}.update`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);
        logger.debug(category, context, 'req.body =', req.body);

        const decodedObject = decode(req.body);
        logger.debug(category, context, 'decodedObject =', decodedObject);
        if (errors.handle(context, res, 400, decodedObject.error))
            return;

        const validation = await business.validate(userCookie, decodedObject);
        if (errors.handle(context, res, 400, validation.error))
            return;

        const returnObject = await business.update(userCookie, decodedObject);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (errors.handle(context, res, 500, returnObject.error))
            return;

        const encodedObject = encode(returnObject);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        logger.debug(category, context, 'return', encodedObject);
        res.send(encodedObject);
    };

    // Delete an object with the specified id in the request
    const deleteOne = async (req, res) => {
        const context = `${module}.deleteOne`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const deletedObject = await business.deleteById(userCookie, id);
        if (errors.handle(context, res, 500, deletedObject.error))
            return;

        const encodedObject = encode(deletedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        res.send(encodedObject);
    };

    // Delete all objects from the database.
    const deleteAll = async (req, res) => {
        const context = `${module}.deleteAll`;
        const userCookie = jwt.decode(req.cookies.user);

        const deletedList = await business.deleteAll(userCookie);
        if (errors.handle(context, res, 500, deletedList.error))
            return;

        let error = null;
        let encodedList = deletedList.map(deletedObject => {
            if (error)
                return error;

            const encodedObject = encode(deletedObject);
            if (encodedObject.error) {
                error = errors.create(context, encodedObject.error.code, encodedObject);
                return error;
            }
            return encodedObject;
        });

        if (errors.handle(context, res, 500, error))
            return;

        res.send(encodedList);
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
