
module.exports = (data) => {

    // Save Bank in the database
    const create = async (businessObject) => {
        return await data.create(businessObject);
    }

    const findAll = async () => {
        return await data.findAll();
    }

    const findById = async (id) => {
        return await data.findOne(id);
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
        findAll,
        findById,
        update,
        deleteById,
        deleteAll
    };
}
