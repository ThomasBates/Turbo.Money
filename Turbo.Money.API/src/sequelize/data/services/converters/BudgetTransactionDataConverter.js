
module.exports = function BudgetTransactionDataConverter(errors) {
    module = BudgetTransactionDataConverter.name;

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
            BudgetAccountId: transaction.accountId,
            timeStamp: transaction.timestamp,
            description: transaction.description,
            amount: transaction.amount,
            sequence: transaction.sequence,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            accountId: data.BudgetAccountId,
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

    return {
        validate,
        encode,
        decode,
        decodeBrief,
    };
}