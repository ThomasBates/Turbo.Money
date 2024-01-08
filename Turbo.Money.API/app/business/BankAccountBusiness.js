
module.exports = (data) => {

    // Validate bank account data
    const validate = async (testAccount, callback) => {
        console.log("BankAccountBusiness.validate: testAccount = ", testAccount);

        let [error, accounts] = await data.findAll();
        if (error) {
            return error;
        }
        if (!accounts || accounts.length == 0) {
            return null;
        }
        console.log("BankAccountBusiness.validate: accounts = ", accounts);

        let matching = accounts.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        console.log("BankAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account name must be unique.";
        }

        matching = accounts.some(account =>
            account.bankId == testAccount.bankId &&
            account.number == testAccount.number &&
            account.id != testAccount.id);
        console.log("BankAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account bankId+number must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(data);
    return { ...common, validate };
}
