

module.exports = function BudgetController(logger, errors, business) {
    const module = BudgetController.name;
    const category = 'Budget';

    const jwt = require("jsonwebtoken");

    const periodConverter = require("../converters/BudgetPeriodConverter")(errors);
    const worksheetConverter = require("../converters/BudgetWorksheetConverter")(errors);
    const helper = require("../converters/ConverterHelper")(errors);

    //  Local functions  -------------------------------------------------------

    //  Exported functions  ----------------------------------------------------

    const createSampleData = async (req, res) => {
        const context = `${module}.${createSampleData.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const returnPeriod = await business.createSampleData(userCookie.familyId);
        logger.verbose(category, context, 'returnPeriod =', returnPeriod);
        if (errors.handle(context, res, 500, returnPeriod.error))
            return;

        const encodedPeriod = helper.encodeObject(returnPeriod, periodConverter.encode);
        logger.verbose(category, context, 'encodedPeriod =', encodedPeriod);
        if (errors.handle(context, res, 500, encodedPeriod.error))
            return;

        return res.json(encodedPeriod);
    };

    const getBudgetPeriodList = async (req, res) => {
        const context = `${module}.${getBudgetPeriodList.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodList = await business.getBudgetPeriodList(userCookie.familyId);
        logger.verbose(category, context, 'periodList =', periodList);
        if (errors.handle(context, res, 500, periodList.error))
            return;

        const encodedList = helper.encodeList(periodList.list, periodConverter.encode);
        logger.verbose(category, context, 'encodedList =', encodedList);
        if (errors.handle(context, res, 500, encodedList.error))
            return;

        res.send(encodedList);
    };

    const loadBudgetWorksheet = async (req, res) => {
        const context = `${module}.${loadBudgetWorksheet.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        const periodId = req.params.periodId;
        logger.debug(category, context, 'periodId =', periodId);

        const returnWorksheet = await business.loadBudgetWorksheet(userCookie.familyId, periodId);
        logger.verbose(category, context, 'returnWorksheet =', returnWorksheet);
        if (errors.handle(context, res, 500, returnWorksheet.error))
            return;

        const encodedWorksheet = helper.encodeObject(returnWorksheet, worksheetConverter.encode);
        logger.verbose(category, context, 'encodedWorksheet =', encodedWorksheet);
        if (errors.handle(context, res, 500, encodedWorksheet.error))
            return;

        res.send(encodedWorksheet);
    };

    const saveBudgetWorksheet = async (req, res) => {
        const context = `${module}.${saveBudgetWorksheet.name}`;
        const userCookie = jwt.decode(req.cookies.user);

        logger.debug(category, context, 'req.body =', req.body);
        const decodedWorksheet = helper.decodeObject(req.body, worksheetConverter.validate, worksheetConverter.decode);
        logger.debug(category, context, 'decodedWorksheet =', decodedWorksheet);
        if (errors.handle(context, res, 400, decodedWorksheet.error))
            return;

        const returnPeriod = await business.saveBudgetWorksheet(userCookie.familyId, decodedWorksheet);
        logger.verbose(category, context, 'returnPeriod =', returnPeriod);
        if (errors.handle(context, res, 500, returnPeriod.error))
            return;

        const encodedPeriod = helper.encodeObject(returnPeriod, periodConverter.encode);
        logger.verbose(category, context, 'encodedPeriod =', encodedPeriod);
        if (errors.handle(context, res, 500, encodedPeriod.error))
            return;

        return res.json(encodedPeriod);
    };

    return {
        createSampleData,

        getBudgetPeriodList,
        loadBudgetWorksheet,
        saveBudgetWorksheet,
    };
}
