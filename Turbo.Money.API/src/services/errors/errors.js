
module.exports = function errors(logger) {

    const create = (context, code, message) => {
        const error = { context, code, message };
        logger.error('Error', context, 'error =', error);
        return { error };
    }

    const handle = (context, res, code, error) => {
        if (error) {
            logger.error('Error', context, 'error =', error);
            res.status(code).send(error);
            return true;
        }
        return false;
    }

    return {
        create,
        handle,
    };
}