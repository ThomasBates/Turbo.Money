
module.exports = function CommonBusiness(logger, errors, data) {

    const create = async (familyId, businessObject) => {
        return await data.create(familyId, businessObject);
    }

    const getAll = async (familyId) => {
        return await data.getAll(familyId);
    }

    const getList = async (familyId) => {
        return await data.getList(familyId);
    }

    const getOne = async (familyId, id) => {
        return await data.getOne(familyId, id);
    }

    const update = async (familyId, businessObject) => {
        return await data.update(familyId, businessObject);
    }

    const deleteOne = async (familyId, id) => {
        return await data.deleteOne(familyId, id);
    }

    const deleteAll = async (familyId) => {
        return await data.deleteAll(familyId);
    }

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
