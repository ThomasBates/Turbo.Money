
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
        return data;
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
        return transaction;
    }

    const decodeList = (data) => {

        const transactions = data.map(item => {
            return { id: item.id, name: item.name }
        });

        return { list: transactions };
    }

    const validate = (transaction) => {
        if (!transaction.accountId) {
            return "Transaction accountId can not be empty!";
        }
        if (!transaction.timestamp) {
            return "Transaction timestamp can not be empty!";
        }
        if (!transaction.description) {
            return "Transaction description can not be empty!";
        }
        if (!transaction.amount) {
            return "Transaction amount can not be empty!";
        }
        if (!transaction.sequence) {
            return "Transaction sequence can not be empty!";
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

                const existing = await getOneBySequence(transaction.sequence);
                if (!existing.error)
                    return;

                const returnObject = await common.create(transaction);
                if (!returnObject.error) {
                    returnList.push(returnObject);
                }
            })
        );
        if (error)
            return { error };
        else
            return { list: returnList };
    }

    // Find a single Bank transaction with a sequence number
    const getOneBySequence = async (sequence) => {
        try {
            const data = await table.findAll({ where: { sequence: sequence } })

            if (!data || data.length == 0)
                return { error: `Cannot find data object with sequence=${sequence}.` };

            return decode(data[0]);
        }
        catch (ex) {
            const error = ex.message || `Unknown error occurred while finding one database record matching sequence=${sequence}.`;
            logger.error(owner, `${owner}.getOne: error = `, error);
            return { error };
        }
    };

    return {
        ...common,
        storeTransactions
    }
}