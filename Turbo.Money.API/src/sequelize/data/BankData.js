
module.exports = function BankData(logger, errors, db) {
    const module = 'BankData';
    const category = 'Bank';

    const createSampleData = async (userCookie, banks, bankAccounts) => {
        const context = `${module}.${createSampleData.name}`;
        logger.debug(category, context, 'userCookie =', userCookie);

        try {

            await Promise.all(
                banks.map(async bank => {
                    let data = await db.bank.create({
                        name: bank.name,
                        number: bank.number,
                        branch: bank.branch,
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
            logger.error(category, context, 'ex =', ex);
            return errors.create(context, 'Catch', ex.message);
        }
    };

    return {
        createSampleData,
    }
}