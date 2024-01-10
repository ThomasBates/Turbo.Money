
module.exports = (data) => {

    // Validate bank data
    const validate = async (testBank) => {
        console.log("BankBusiness.validate: testBank = ", testBank);

        let [error, banks] = await data.getList();
        if (error) {
            return error;
        }
        if (!banks || banks.length == 0) {
            return null;
        }
        console.log("BankBusiness.validate: banks = ", banks);

        let matching = banks.find(bank =>
            bank.name.toUpperCase() == testBank.name.toUpperCase() &&
            bank.id != testBank.id);
        console.log("BankBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank name must be unique.";
        }

        matching = banks.find(bank =>
            bank.number == testBank.number &&
            bank.transit == testBank.transit &&
            bank.id != testBank.id);
        console.log("BankBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank number+transit must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(data);
    return { ...common, validate };
}
