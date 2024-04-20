

module.exports = function BankTransactionController(logger, errors, business) {
    const module = BankTransactionController.name;
    const category = 'BankTransaction';

    const jwt = require("jsonwebtoken");

    const decode = (data) => {
        const context = `${module}.${decode.name}`;

        if (!data)
            return errors.create(context, 'ParseError', "data is not defined.");

        if (!data.accountNumber)
            return errors.create(context, 'ParseError', "data.accountNumber is not defined.");

        if (!data.timeStamp)
            return errors.create(context, 'ParseError', "data.timeStamp is not defined.");

        if (!data.description)
            return errors.create(context, 'ParseError', "data.description must be a number.");

        if (!data.amount)
            return errors.create(context, 'ParseError', "data.amount is not defined.");

        const transaction = {
            id: data.id,
            accountNumber: data.accountNumber,
            timeStamp: data.timeStamp,
            description: data.description,
            amount: data.amount
        };

        return transaction;
    }

    const encode = (transaction) => {
        return transaction;
    }

    const encodeList = (transactionList) => {
        let dataList = transactionList.map(transaction => {
            return {
                id: transaction.id,
                accountNumber: data.accountNumber,
                timeStamp: data.timeStamp,
                description: data.description,
                amount: data.amount
            }
        });
        return { list: dataList };
    }

    const common = require("./CommonController")(
        logger, errors, category, business,
        decode, encode, encodeList);

    const upload = async (req, res) => {
        const context = `${module}.${upload.name}`;
        const userCookie = jwt.decode(req.cookies.user);
        var busboy = require('busboy')({ headers: req.headers });

        logger.debug(category, context, '()');

        busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
            logger.debug(category, context, 'busboy.onFile()');

            const returnList = await business.importTransactions(userCookie, file);
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
