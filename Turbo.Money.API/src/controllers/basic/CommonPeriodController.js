
module.exports = function CommonPeriodController(
    logger, errors, business,
    category, converter) {
    const module = CommonPeriodController.name;

    const jwt = require("jsonwebtoken");
    const helper = require("../converters/ConverterHelper")(errors, converter);

    // Create and save a new object record
    const createForPeriod = async (req, res) => {
        const context = `${module}.${createForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        logger.debug(category, context, 'req.body =', req.body);
        const decodedObject = helper.decodeObject(req.body, converter.validate, converter.decode);
        logger.debug(category, context, 'decodedObject =', decodedObject);
        if (errors.handle(context, res, 400, decodedObject.error))
            return;

        const validation = await business.validateForPeriod(userCookie.familyId, periodId, decodedObject);
        if (errors.handle(context, res, 400, validation.error))
            return;

        const returnObject = await business.createForPeriod(userCookie.familyId, periodId, decodedObject);
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
    const getAllForPeriod = async (req, res) => {
        const context = `${module}.${getAllForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const returnList = await business.getAllForPeriod(userCookie.familyId, periodId);
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
    const getListForPeriod = async (req, res) => {
        const context = `${module}.${getListForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const returnList = await business.getListForPeriod(userCookie.familyId, periodId);
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
    const getOneForPeriod = async (req, res) => {
        const context = `${module}.${getOneForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const businessObject = await business.getOneForPeriod(userCookie.familyId, periodId, id);
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
    const updateForPeriod = async (req, res) => {
        const context = `${module}.${updateForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);
        logger.debug(category, context, 'req.body =', req.body);

        const decodedObject = helper.decodeObject(req.body, converter.validate, converter.decode);
        logger.debug(category, context, 'decodedObject =', decodedObject);
        if (errors.handle(context, res, 400, decodedObject.error))
            return;

        const validation = await business.validateForPeriod(userCookie.familyId, periodId, decodedObject);
        if (errors.handle(context, res, 400, validation.error))
            return;

        const returnObject = await business.updateForPeriod(userCookie.familyId, periodId, decodedObject);
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
    const deleteOneForPeriod = async (req, res) => {
        const context = `${module}.${deleteOneForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const id = req.params.id;
        logger.debug(category, context, 'id =', id);

        const deletedObject = await business.deleteOneForPeriod(userCookie.familyId, periodId, id);
        if (errors.handle(context, res, 500, deletedObject.error))
            return;

        const encodedObject = helper.encodeObject(deletedObject, converter.encode);
        if (errors.handle(context, res, 500, encodedObject.error))
            return;

        res.send(encodedObject);
    };

    // Delete all objects from the database.
    const deleteAllForPeriod = async (req, res) => {
        const context = `${module}.${deleteAllForPeriod.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const deletedList = await business.deleteAllForPeriod(userCookie.familyId, periodId);
        if (errors.handle(context, res, 500, deletedList.error))
            return;

        let encodedList = helper.encodeList(deletedList.list, converter.encode);
        if (errors.handle(context, res, 500, encodedList.error))
            return;

        res.send(encodedList);
    };

    const common = require("./CommonController")(
        logger, errors, business,
        category, converter);

    return {
        ...common,
        createForPeriod,
        getAllForPeriod,
        getListForPeriod,
        getOneForPeriod,
        updateForPeriod,
        deleteOneForPeriod,
        deleteAllForPeriod
    };
}
