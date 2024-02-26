
module.exports = (logger, table) => {

    const encode = (transaction) => {
        const data = {
            //id: transaction.id,
            account_id: transaction.accountId,
            time_stamp: transaction.timestamp,
            description: transaction.description,
            amount: transaction.amount,
            sequence: transaction.sequence,
        };
        return [null, data];
    }

    const decode = (data) => {
        const transaction = {
            id: data.id,
            accountId: data.account_id,
            timestamp: data.time_stamp,
            description: data.description,
            amount: data.amount,
            sequence: data.sequence,
        };
        return [null, transaction];
    }

    const decodeList = (data) => {

        const accounts = data.map(item => {
            return { id: item.id, name: item.name }
        });

        return [null, accounts];
    }

    const validate = (account) => {
        if (!account.accountId ||
            !account.timestamp ||
            !account.description ||
            !account.amount ||
            !account.sequence) {
            return "Content can not be empty!";
        }
        return null
    }

    const owner = "BankTransactionData";
    const common = require('./CommonData')(logger, owner, table, encode, decode, decodeList, validate);

    const storeTransactions = async (transactions) => {

        let error = null;
        let returnList = [];

        await Promise.all(
            transactions.map(async transaction => {
                if (error)
                    return;

                [error, existing] = await getOneBySequence(transaction.sequence);
                if (existing)
                    return;

                [error, returnObject] = await common.create(transaction);
                if (!error) {
                    returnList.push(returnObject);
                }
            })
        );
        if (error)
            return [error, null];
        else
            return [null, returnList];
    }

    // Find a single Bank transaction with a sequence number
    const getOneBySequence = async (sequence) => {
        try {
            let data = await table.findAll({ where: { sequence: sequence } })

            if (!data || data.length == 0)
                return [`Cannot find data object with sequence=${sequence}.`, null];

            let [error, transaction] = decode(data[0]);
            if (error) {
                return [error, null];
            }

            return [null, transaction];
        }
        catch (ex) {
            let error = ex.message || `Unknown error occurred while finding one database record matching sequence=${sequence}.`;
            logger.error(owner, `${owner}.getOne: error = `, error);
            return [error, null];
        }
    };

    return {
        ...common,
        storeTransactions
    }
}