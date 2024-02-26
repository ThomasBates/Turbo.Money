

module.exports = (logger, business) => {

    const decode = (data) => {
        if (!data)
            return ["parse error: data is not defined.", null];
        if (!data.accountNumber)
            return ["parse error: data.accountNumber is not defined.", null];
        if (!data.timeStamp)
            return ["parse error: data.timeStamp is not defined.", null];
        if (!data.description)
            return ["parse error: data.description must be a number.", null];
        if (!data.amount)
            return ["parse error: data.amount is not defined.", null];

        const transaction = {
            id: data.id,
            accountNumber: data.accountNumber,
            timeStamp: data.timeStamp,
            description: data.description,
            amount: data.amount
        };

        return [null, transaction];
    }

    const encode = (transaction) => {
        return [null, transaction];
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
        return [null, dataList];
    }

    const owner = "BankTransactionController";
    const common = require("./CommonController")(logger, owner, business, decode, encode, encodeList);

    const upload = async (req, res) => {
        var busboy = require('busboy')({ headers: req.headers });

        logger.debug(owner, `${owner}.upload()`);

        busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
            logger.debug(owner, `${owner}.upload(): busboy.onFile()`);

            let [error, returnList] = await business.importTransactions(file);
            if (common.handleError("upload", res, 500, error))
                return;

            logger.debug(owner, `${owner}.upload: returnList = `, returnList);

            let dataList = returnList.map(businessObject => {
                if (error) {
                    return error;
                }
                [error, item] = encode(businessObject);
                if (error) {
                    logger.error(owner, `${owner}.getAll: error = `, error);
                    return error;
                }
                return item;
            });

            if (common.handleError("upload", res, 500, error))
                return;

            logger.debug(owner, `${owner}.upload: dataList = `, dataList);
            res.send(dataList);
        });

        result = req.pipe(busboy);
        return result;
    };

    return {
        ...common,
        upload
        }
}
