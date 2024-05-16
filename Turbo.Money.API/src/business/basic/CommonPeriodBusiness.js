
module.exports = function CommonPeriodBusiness(logger, errors, data) {

    const createForPeriod = async (familyId, periodId, businessObject) => {
        return await data.createForPeriod(familyId, periodId, businessObject);
    }

    const getAllForPeriod = async (familyId, periodId) => {
        return await data.getAllForPeriod(familyId, periodId);
    }

    const getListForPeriod = async (familyId, periodId) => {
        return await data.getListForPeriod(familyId, periodId);
    }

    const getOneForPeriod = async (familyId, periodId, id) => {
        return await data.getOneForPeriod(familyId, periodId, id);
    }

    const updateForPeriod = async (familyId, periodId, businessObject) => {
        return await data.updateForPeriod(familyId, periodId, businessObject);
    }

    const deleteOneForPeriod = async (familyId, periodId, id) => {
        return await data.deleteOneForPeriod(familyId, periodId, id);
    }

    const deleteAllForPeriod = async (familyId, periodId) => {
        return await data.deleteAllForPeriod(familyId, periodId);
    }

    const common = require('./CommonBusiness')(logger, errors, data);

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
