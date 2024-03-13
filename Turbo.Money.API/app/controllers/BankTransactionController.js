

module.exports = (logger, business) => {

    const jwt = require("jsonwebtoken");

    const decode = (data) => {
        if (!data)
            return { error: "parse error: data is not defined." };
        if (!data.accountNumber)
            return { error: "parse error: data.accountNumber is not defined." };
        if (!data.timeStamp)
            return { error: "parse error: data.timeStamp is not defined." };
        if (!data.description)
            return { error: "parse error: data.description must be a number." };
        if (!data.amount)
            return { error: "parse error: data.amount is not defined." };

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

    const owner = "BankTransactionController";
    const common = require("./CommonController")(logger, owner, business, decode, encode, encodeList);

    const upload = async (req, res) => {
        const { user: userInfo } = jwt.decode(req.cookies.user);
        var busboy = require('busboy')({ headers: req.headers });

        logger.debug(owner, `${owner}.upload()`);

        busboy.on('file', async function (fieldname, file, filename, encoding, mimetype) {
            logger.debug(owner, `${owner}.upload(): busboy.onFile()`);

            const returnList = await business.importTransactions(userInfo, file);
            logger.debug(owner, `${owner}.upload: returnList = `, returnList);
            if (common.handleError("upload", res, 500, returnList.error))
                return;

            let error = null;
            let dataList = returnList.list.map(businessObject => {
                if (error) {
                    return error;
                }
                item = encode(businessObject);
                if (item.error) {
                    error = item.error;
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
