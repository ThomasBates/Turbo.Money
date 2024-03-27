
module.exports = function CommonBusiness(logger, errors, data) {

    const create = async (userCookie, businessObject) => {
        return await data.create(userCookie, businessObject);
    }

    const getAll = async (userCookie) => {
        return await data.getAll(userCookie);
    }

    const getList = async (userCookie) => {
        return await data.getList(userCookie);
    }

    const getOne = async (userCookie, id) => {
        return await data.getOne(userCookie, id);
    }

    const update = async (userCookie, businessObject) => {
        return await data.update(userCookie, businessObject);
    }

    const deleteById = async (userCookie, id) => {
        return await data.deleteOne(userCookie, id);
    }

    const deleteAll = async (userCookie) => {
        return await data.deleteAll(userCookie);
    }

    return {
        create,
        getAll,
        getList,
        getOne,
        update,
        deleteById,
        deleteAll
    };
}
