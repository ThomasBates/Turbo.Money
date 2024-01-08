
module.exports = (data) => {

    // Validate budget account data
    const validate = async (testAccount, callback) => {
        console.log("BudgetAccountBusiness.validate: testAccount = ", testAccount);

        let [error, accounts] = await data.findAll();
        if (error) {
            return error;
        }
        if (!accounts || accounts.length == 0) {
            return null;
        }
        console.log("BudgetAccountBusiness.validate: accounts = ", accounts);

        let matching = accounts.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        console.log("BudgetAccountBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Budget account name must be unique.";
        }

        const accountTypes = ["min", "fix", "max", "est", "avg"];
        if (!accountTypes.includes(testAccount.type)) {
            return "Validation Error: Budget account type is not a valid value.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(data);
    return { ...common, validate };
}
