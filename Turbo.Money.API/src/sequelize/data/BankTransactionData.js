
module.exports = (logger, table) => {

    const encode = (transaction) => {
        const data = {
            //id: transaction.id,
            BankAccountId: transaction.accountId,
            timeStamp: transaction.timestamp,
            description: transaction.description,
            amount: transaction.amount,
            sequence: transaction.sequence,
        };
        return data;
    }

    const decode = (userCookie, data) => {
        if (!data)
            return { error: "decode: data is not defined" };

        if (data.UserFamilyId !== userCookie.familyId)
            return { error: `decode: This data belongs to a family (${data.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

        const transaction = {
            id: data.id,
            accountId: data.BankAccountId,
            timestamp: data.timeStamp,
            description: data.description,
            amount: data.amount,
            sequence: data.sequence,
        };
        return transaction;
    }

    const decodeList = (userCookie, data) => {
        if (!data)
            return { error: "decodeList: data is not defined" };

        const transactions = data.map(item => {
            if (item.UserFamilyId !== userCookie.familyId)
                return { error: `decodeList: This data item belongs to a family (${item.UserFamilyId}) that is different from the user's family (${userCookie.familyId}).` };

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