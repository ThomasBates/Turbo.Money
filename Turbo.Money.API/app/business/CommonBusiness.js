
module.exports = (data) => {

    // Save Bank in the database
    const create = async (businessObject) => {
        return await data.create(businessObject);
    }

    const getAll = async () => {
        return await data.getAll();
    }

    const getList = async () => {
        return await data.getList();
    }

    const getOne = async (id) => {
        return await data.getOne(id);
    }

    const update = async (businessObject) => {
        return await data.update(businessObject);
    }

    const deleteById = async (id) => {
        return await data.deleteOne(id);
    }

    const deleteAll = async () => {
        return await data.deleteAll();
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
