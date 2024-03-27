
module.exports = function BankTransactionData(logger, errors, table) {
    module = 'BankTransactionData';
    category = 'BankTransaction';

    const encode = (transaction) => {
        const context = `${module}.encode`;

        if (!transaction)
            return errors.create(context, 'InvalidArgument', 'transaction is not defined');

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
        const context = `${module}.decode`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        if (data.UserFamilyId !== userCookie.familyId)
            return errors.create(context, 'SecurityBreach', `data's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);

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
        const context = `${module}.decodeList`;

        if (!data)
            return errors.create(context, 'InvalidArgument', 'data is not defined');

        let error;
        const transactions = data.map(item => {
            if (error)
                return error;

            if (item.UserFamilyId !== userCookie.familyId) {
                error = errors.create(context, 'SecurityBreach', `item's family (${data.UserFamilyId}) is not user's family (${userCookie.familyId}).`);
                return error;
            }

            return { id: item.id, name: item.name }
        });

        if (error)
            return error;

        return { list: transactions };
    }

    const validate = (transaction) => {
        const context = `${module}.validate`;

        if (!transaction.accountId)
            return errors.create(context, 'InvalidData', "Transaction accountId can not be empty!");

        if (!transaction.timestamp)
            return errors.create(context, 'InvalidData', "Transaction timestamp can not be empty!");

        if (!transaction.description)
            return errors.create(context, 'InvalidData', "Transaction description can not be empty!");

        if (!transaction.amount)
            return errors.create(context, 'InvalidData', "Transaction amount can not be empty!");

        if (!transaction.sequence)
            return errors.create(context, 'InvalidData', "Transaction sequence can not be empty!");

        return {}
    }

    const common = require('./CommonData')(
        logger, errors, category, table,
        encode, decode, decodeList, validate);

    const storeTransactions = async (transactions) => {
        let returnList = [];

        await Promise.all(
            transactions.map(async transaction => {
                const existing = await getOneBySequence(transaction.sequence);
                if (!existing.error)  // if existing exists, continue.
                    return;

                const returnObject = await common.create(transaction);
                if (!returnObject.error) {
                    returnList.push(returnObject);
                }
            })
        );

        return { list: returnList };
    }

    // Find a single Bank transaction with a sequence number
    const getOneBySequence = async (sequence) => {
        const context = `${module}.getOneBySequence`;

        try {
            const data = await table.findAll({ where: { sequence: sequence } })

            if (!data || data.length == 0)
                return errors.create(context, 'MissingData', `Cannot find transaction record with sequence="${sequence}".`);

            return decode(data[0]);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    return {
        ...common,
        storeTransactions
    }
}