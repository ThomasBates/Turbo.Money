
module.exports = function BudgetScheduleController(logger, errors, business) {
    const category = 'BudgetSchedule';

    const converter = require("../converters/BudgetScheduleConverter")(errors);

    const common = require("./CommonController")(
        logger, errors, business,
        category, converter);

    return {
        create: common.create,
        getAll: common.getAll,
        //getList,
        //getOne,
        update: common.update,
        //deleteOne,
        //deleteAll,
    };
}
