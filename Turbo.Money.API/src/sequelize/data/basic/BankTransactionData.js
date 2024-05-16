
module.exports = function BankTransactionData(logger, errors, table) {
    module = 'BankTransactionData';
    category = 'BankTransaction';

    const validate = (transaction) => {
        const context = `${module}.${validate.name}`;

        if (!transaction.accountId)
            return errors.create(context, 'InvalidData', "Transaction accountId can not be empty!");
        if (isNaN(transaction.accountId))
            return errors.create(context, 'InvalidData', "Transaction accountId must be a number!");

        if (!transaction.timestamp)
            return errors.create(context, 'InvalidData', "Transaction timestamp can not be empty!");

        if (!transaction.description)
            return errors.create(context, 'InvalidData', "Transaction description can not be empty!");

        if (!transaction.amount)
            return errors.create(context, 'InvalidData', "Transaction amount can not be empty!");
        if (isNaN(transaction.amount))
            return errors.create(context, 'InvalidData', "Transaction amount must be a number!");

        if (!transaction.sequence)
            return errors.create(context, 'InvalidData', "Transaction sequence can not be empty!");

        return {}
    }

    const encode = (transaction) => {
        return {
            //id: transaction.id,
            BankAccountId: transaction.accountId,
            timeStamp: transaction.timestamp,
            description: transaction.description,
            amount: transaction.amount,
            sequence: transaction.sequence,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            accountId: data.BankAccountId,
            timestamp: data.timeStamp,
            description: data.description,
            amount: data.amount,
            sequence: data.sequence,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            description: data.description,
            amount: data.amount,
        };
    }

    const common = require('./CommonData')(
        logger, errors, category, table,
        validate, encode, decode, decodeBrief);

    const storeTransactions = async (familyId, transactions) => {
        let returnList = [];

        await Promise.all(
            transactions.map(async transaction => {
                const existing = await getOneBySequence(familyId, transaction.sequence);
                if (!existing.error)  // if existing exists, continue.
                    return;

                const returnObject = await common.create(familyId, transaction);
                if (!returnObject.error) {
                    returnList.push(returnObject);
                }
            })
        );

        return { list: returnList };
    }

    // Find a single Bank transaction with a sequence number
    const getOneBySequence = async (familyId, sequence) => {
        const context = `${module}.${getOneBySequence.name}`;

        try {
            const data = await table.findAll({
                where: {
                    UserFamilyId: familyId,
                    sequence: sequence
                }
            })

            if (!data || data.length == 0)
                return errors.create(context, 'MissingData', `Cannot find transaction record with sequence="${sequence}".`);

            return decode(familyId, data[0]);
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