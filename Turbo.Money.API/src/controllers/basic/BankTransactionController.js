

module.exports = function BankTransactionController(logger, errors, business) {
    const module = BankTransactionController.name;
    const category = 'BankTransaction';

    const jwt = require("jsonwebtoken");

    const converter = require("../converters/BankTransactionConverter")(errors);

    const common = require("./CommonController")(
        logger, errors, business,
        category, converter);

    const upload = async (req, res) => {
        const context = `${module}.${upload.name}`;
        const userCookie = jwt.decode(req.cookies.user);
        var busboy = require('busboy')({ headers: req.headers });

        logger.debug(category, context, '()');

        busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
            logger.debug(category, context, 'busboy.onFile()');

            const returnList = await business.importTransactions(userCookie.familyId, file);
            logger.debug(category, context, 'returnList =', returnList);
            if (errors.handle(context, res, 500, returnList.error))
                return;

            let error = null;
            let encodedList = returnList.list.map(businessItem => {
                if (error) {
                    return error;
                }
                const encodedItem = encode(businessItem);
                if (encodedItem.error) {
                    error = errors.create(context, encodedItem.error.code, encodedItem);
                    return error;
                }
                return encodedItem;
            });

            if (errors.handle(context, res, 500, error))
                return;

            logger.debug(category, context, 'encodedList =', encodedList);
            res.send(encodedList);
        });

        result = req.pipe(busboy);
        return result;
    };

    return {
        ...common,
        upload
        }
}
