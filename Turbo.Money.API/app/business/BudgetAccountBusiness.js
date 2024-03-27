
module.exports = (logger, data) => {

    // Validate budget account data
    const validate = async (userCookie, testAccount) => {
        logger.debug("Business", "BudgetAccountBusiness.validate: testAccount = ", testAccount);

        const accounts = await data.getList(userCookie);
        logger.debug("Business", "BudgetAccountBusiness.validate: accounts = ", accounts);

        if (accounts.error) {
            return accounts.error;
        }
        if (!accounts || !accounts.list || accounts.length == 0) {
            return null;
        }

        let matching = accounts.list.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug("Business", "BudgetAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Budget account name must be unique.";
        }

        const accountTypes = ["min", "fix", "max", "est", "avg"];
        if (!accountTypes.includes(testAccount.type)) {
            return "Validation Error: Budget account type is not a valid value.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
