
module.exports = function CommonController(
    logger, errors, business,
    category, converter) {
    const module = CommonController.name;

    const jwt = require("jsonwebtoken");
    const helper = require("../converters/ConverterHelper")(errors, converter);

    // Create and save a new object record
    const create = async (req, res) => {
        const context = `${module}.${create.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        logger.debug(category, context, 'req.body =', req.body);
        const decodedObject = helper.decodeObject(req.body, converter.validate, converter.decode);
        logger.debug(category, context, 'decodedObject =', decodedObject);
        if (errors.handle(context, res, 400, decodedObject.error))
            return;

        const validation = await business.validate(userCookie.familyId, decodedObject);
        if (errors.handle(context, res, 400, validation.error))
            return;

        const returnObject = await business.create(userCookie.familyId, decodedObject);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (errors.handle(context, res, 500, returnObject.error))
            return;

        const encodedObject = helper.encodeObject(returnObject, converter.encode);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        res.send(encodedObject);
    };

    // Retrieve all objects from the database.
    const getAll = async (req, res) => {
        const context = `${module}.${getAll.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnList = await business.getAll(userCookie.familyId);
        logger.verbose(category, context, 'returnList =', returnList);
        if (errors.handle(context, res, 500, returnList.error))
            return;

        const encodedList = helper.encodeList(returnList.list, converter.encode);
        logger.verbose(category, context, 'encodedList =', encodedList);
        if (errors.handle(context, res, 500, encodedList.error))
            return;

        res.send(encodedList);
    };

    // Retrieve all objects from the database.
    const getList = async (req, res) => {
        const context = `${module}.${getList.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnList = await business.getList(userCookie.familyId);
        logger.verbose(category, context, 'returnList =', returnList);
        if (errors.handle(context, res, 500, returnList.error))
            return;

        const encodedList = helper.encodeList(returnList.list, converter.encodeBrief);
        logger.verbose(category, context, 'encodedList =', encodedList);
        if (errors.handle(context, res, 500, encodedList.error))
            return;

        res.send(encodedList.list);
    };

    // Find a single object with an id
    const getOne = async (req, res) => {
        const context = `${module}.${getOne.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const businessObject = await business.getOne(userCookie.familyId, id);
        logger.verbose(category, context, 'businessObject =', businessObject);
        if (errors.handle(context, res, 500, businessObject.error))
            return;

        const encodedObject = helper.encodeObject(businessObject, converter.encode);
        logger.verbose(category, context, 'encodedObject =', encodedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;
        res.send(encodedObject);
    };

    // Update an object by the id in the request
    const update = async (req, res) => {
        const context = `${module}.${update.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);
        logger.debug(category, context, 'req.body =', req.body);

        const decodedObject = helper.decodeObject(req.body, converter.validate, converter.decode);
        logger.debug(category, context, 'decodedObject =', decodedObject);
        if (errors.handle(context, res, 400, decodedObject.error))
            return;

        const validation = await business.validate(userCookie.familyId, decodedObject);
        if (errors.handle(context, res, 400, validation.error))
            return;

        const returnObject = await business.update(userCookie.familyId, decodedObject);
        logger.debug(category, context, 'returnObject =', returnObject);
        if (errors.handle(context, res, 500, returnObject.error))
            return;

        const encodedObject = helper.encodeObject(returnObject, converter.encode);
        logger.debug(category, context, 'encodedObject =', encodedObject);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        logger.debug(category, context, 'return', encodedObject);
        res.send(encodedObject);
    };

    // Delete an object with the specified id in the request
    const deleteOne = async (req, res) => {
        const context = `${module}.${deleteOne.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const deletedObject = await business.deleteOne(userCookie.familyId, id);
        if (errors.handle(context, res, 500, deletedObject.error))
            return;

        const encodedObject = helper.encodeObject(deletedObject, converter.encode);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        res.send(encodedObject);
    };

    // Delete all objects from the database.
    const deleteAll = async (req, res) => {
        const context = `${module}.${deleteAll.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const deletedList = await business.deleteAll(userCookie.familyId);
        if (errors.handle(context, res, 500, deletedList.error))
            return;

        let encodedList = helper.encodeList(deletedList.list, converter.encode);
        if (errors.handle(context, res, 500, encodedList.error))
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
