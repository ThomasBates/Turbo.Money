
module.exports = (logger, data) => {

    // Validate bank data
    const validate = async (userCookie, testBank) => {
        logger.debug("Business","BankBusiness.validate: testBank = ", testBank);

        const banks = await data.getList(userCookie);
        if (banks.error) {
            return banks.error;
        }
        if (!banks || !banks.list || banks.list.length == 0) {
            return null;
        }
        logger.debug("Business","BankBusiness.validate: banks = ", banks);

        let matching = banks.list.find(bank =>
            bank.name.toUpperCase() == testBank.name.toUpperCase() &&
            bank.id != testBank.id);
        logger.debug("Business","BankBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank name must be unique.";
        }

        matching = banks.list.find(bank =>
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
