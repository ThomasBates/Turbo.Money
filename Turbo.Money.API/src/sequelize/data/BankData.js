
module.exports = function BankData(logger, db) {
    const module = 'BankData';
    const category = "Bank";

    const createError = (context, code, message) => {
        const error = { error: message, context, code, message };
        logger.error('Error', `${context}: error =`, error);
        return error;
    }

    const createSampleData = async (userCookie, banks, bankAccounts) => {
        const context = `${module}.createSampleData`;
        logger.debug(category, `${context}: userCookie =`, userCookie);

        try {

            await Promise.all(
                banks.map(async bank => {
                    let data = await db.bank.create({
                        name: bank.name,
                        number: bank.number,
                        transit: bank.transit,
                        UserFamilyId: userCookie.familyId,
                    });
                    bank.id = data.id;
                })
            );

            await Promise.all(
                bankAccounts.map(async account => {
                    let bank = banks.find(bank => bank.name === account.bankName);
                    await db.account.create({
                        name: account.name,
                        BankBankId: bank.id,
                        number: account.number,
                        UserFamilyId: userCookie.familyId,
                    });
                })
            );

            return {};
        }
        catch (ex) {
            logger.error(category, `${context}: ex =`, ex);
            return createError(context, 'Catch', ex.message || 'Unknown catch');
        }
    };

    return {
        createSampleData,
    }
}