
module.exports = function BudgetAccountData(logger, errors, table) {
    const module = BudgetAccountData.name;
    const loggerCategory = 'BudgetAccount';

    const accountConverter = require("../services/converters/BudgetAccountDataConverter")(errors);
    const helper = require('../services/converters/ConverterHelper')(logger, errors);

    const validate = (account) => {
        const context = `${module}.${validate.name}`;

        if (!account.name)
            return errors.create(context, 'InvalidData', "Account name can not be empty!");

        if (!account.description)
            return errors.create(context, 'InvalidData', 'Account description can not be empty!');

        if (!account.categoryId)
            return errors.create(context, 'InvalidData', "Account categoryId can not be empty!");
        if (isNaN(account.categoryId))
            return errors.create(context, 'InvalidData', "Account categoryId must be a number!");

        return {}
    }

    const encode = (account) => {
        return {
            //id: account.id,
            name: account.name,
            description: account.description,
            displayOrder: account.displayOrder,
            amount: account.amount,
            type: account.type,
            method: account.method,
            BudgetCategoryId: account.categoryId,
        };
    }

    const decode = (data) => {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            displayOrder: data.displayOrder,
            amount: data.amount,
            type: data.type,
            method: data.method,
            categoryId: data.BudgetCategoryId,
        };
    }

    const decodeBrief = (data) => {
        return {
            id: data.id,
            name: data.name
        }
    }

    return require('./CommonPeriodData')(
        logger, errors, "BudgetAccount", table,
        validate, encode, decode, decodeBrief);
}