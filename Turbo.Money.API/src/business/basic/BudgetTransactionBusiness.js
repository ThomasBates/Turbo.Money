
module.exports = function BudgetTransactionBusiness(logger, errors, data, budgetAccountData) {
    const module = BudgetTransactionBusiness.name;
    const category = 'Business';

    // Validate budget transaction data
    const validate = async (familyId, testTransaction) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testTransaction =', testTransaction);

        const accountList = await budgetAccountData.getList(familyId);
        logger.debug(category, context, 'accountList =', accountList);

        if (accountList.error) {
            return errors.create(context, accountList.error.code, accountList.error);
        }

        if (!accountList || !accountList.list || accountList.list.length == 0) {
            return errors.create(context, 'InvalidData', 'No budget accounts. Budget accounts must be created before loading budget transactions.');
        }

        return {};
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return {
        ...common,
        validate
    };
}
