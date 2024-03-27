
module.exports = (logger, data) => {

    // Validate bank account data
    const validate = async (userCookie, testAccount) => {
        logger.debug("Business","BankAccountBusiness.validate: testAccount = ", testAccount);

        const accounts = await data.getList(userCookie);
        logger.debug("Business", "BankAccountBusiness.validate: accounts = ", accounts);

        if (accounts.error) {
            return accounts.error;
        }
        if (!accounts || !accounts.list || accounts.list.length == 0) {
            return null;
        }

        let matching = accounts.list.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug("Business","BankAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account name must be unique.";
        }

        matching = accounts.list.some(account =>
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
