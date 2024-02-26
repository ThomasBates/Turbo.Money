
module.exports = (logger, data) => {

    // Validate bank account data
    const validate = async (testAccount, callback) => {
        logger.debug("Business","BankAccountBusiness.validate: testAccount = ", testAccount);

        let [error, accounts] = await data.getList();
        if (error) {
            return error;
        }
        if (!accounts || accounts.length == 0) {
            return null;
        }
        logger.debug("Business","BankAccountBusiness.validate: accounts = ", accounts);

        let matching = accounts.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug("Business","BankAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account name must be unique.";
        }

        matching = accounts.some(account =>
            account.bankId == testAccount.bankId &&
            account.number == testAccount.number &&
            account.id != testAccount.id);
        logger.debug("Business","BankAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account bankId+number must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
