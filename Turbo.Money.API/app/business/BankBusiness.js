
module.exports = (logger, data) => {

    // Validate bank data
    const validate = async (testBank) => {
        logger.debug("Business","BankBusiness.validate: testBank = ", testBank);

        let [error, banks] = await data.getList();
        if (error) {
            return error;
        }
        if (!banks || banks.length == 0) {
            return null;
        }
        logger.debug("Business","BankBusiness.validate: banks = ", banks);

        let matching = banks.find(bank =>
            bank.name.toUpperCase() == testBank.name.toUpperCase() &&
            bank.id != testBank.id);
        logger.debug("Business","BankBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank name must be unique.";
        }

        matching = banks.find(bank =>
            bank.number == testBank.number &&
            bank.transit == testBank.transit &&
            bank.id != testBank.id);
        logger.debug("Business","BankBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank number+transit must be unique.";
        }

        return null;
    }

    const common = require('./CommonBusiness')(logger, data);
    return { ...common, validate };
}
