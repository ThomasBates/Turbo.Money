
module.exports = (logger, data) => {

    const create = async (userInfo, businessObject) => {
        return await data.create(userInfo, businessObject);
    }

    const getAll = async (userInfo) => {
        return await data.getAll(userInfo);
    }

    const getList = async () => {
        return await data.getList(userInfo);
    }

    const getOne = async (id) => {
        return await data.getOne(userInfo, id);
    }

    const update = async (businessObject) => {
        return await data.update(userInfo, businessObject);
    }

    const deleteById = async (id) => {
        return await data.deleteOne(userInfo, id);
    }

    const deleteAll = async () => {
        return await data.deleteAll(userInfo);
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
