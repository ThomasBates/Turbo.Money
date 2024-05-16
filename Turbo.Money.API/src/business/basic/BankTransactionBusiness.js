
module.exports = function BankTransactionBusiness(logger, errors, data, bankAccountData) {
    const module = BankTransactionBusiness.name;
    const category = 'Business';

    // Validate bank transaction data
    const validate = async (familyId, testTransaction) => {
        const context = `${module}.${validate.name}`;
        logger.debug(category, context, 'testTransaction =', testTransaction);

        const accountList = await bankAccountData.getList(familyId);
        logger.debug(category, context, 'accountList =', accountList);

        if (accountList.error) {
            return errors.create(context, accountList.error.code, accountList.error);
        }

        if (!accountList || !accountList.list || accountList.list.length == 0) {
            return errors.create(context, 'InvalidData', 'No bank accounts. Bank accounts must be created before loading bank transactions.');
        }

        return {};
    }

    const importTransactions = async (familyId, file) => {
        const context = `${module}.${importTransactions.name}`;
        logger.debug(category, context, '()');

        const ofx = await ofxToObject(file);

        if (ofx.OFXHEADER !== '100' || ofx.VERSION !== '102')
            return errors.create(context, 'NotSupported', "The format of the imported file is not supported.");

        const ofxStatement = ofx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS;
        const ofxTransactions = ofxStatement.BANKTRANLIST.STMTTRN;

        logger.debug(category, context, 'ofxStatement.BANKACCTFROM =', ofxStatement.BANKACCTFROM);
        let account = await bankAccountData.getOneByNumber(familyId, ofxStatement.BANKACCTFROM.ACCTID);
        logger.debug(category, context, 'account =', account);
        if (account.error)
            return errors.create(context, 'InvalidData', 'The bank account identified in the imported file is not registered in the application.');

        let transactions = [];

        for (const ofxTransaction of ofxTransactions) {
            let transaction = {
                accountId: account.id,
                timestamp: ofxToTimestamp(ofxTransaction.DTPOSTED),
                description: ofxTransaction.NAME,
                amount: ofxTransaction.TRNAMT,
                sequence: ofxTransaction.FITID,
            };
            transactions.push(transaction);
        }

        return await data.storeTransactions(familyId, transactions);
    }

    async function ofxToObject(file) {
        let fileObject = {};
        let currentObject = fileObject;
        let objectStack = [currentObject];

        const lineReader = require('readline').createInterface({
            input: file,
            crlfDelay: Infinity
        });

        for await (const rawline of lineReader) {

            const line = rawline.trim();

            //  blank line
            if (line == "")
                continue;

            //  header line
            if (line.indexOf("<") < 0) {
                let parts = line.split(":");
                currentObject[parts[0]] = parts[1];
                continue;
            }

            const close = line.indexOf(">");
            const objectName = line.substring(1, close);

            //  key/value
            if (close < line.length - 1) {
                const value = line.substring(close + 1);
                currentObject[objectName] = value;
                continue;
            }

            //  close element
            if (objectName.indexOf("/") == 0) {
                currentObject = objectStack.pop();
                continue;
            }

            //  open element
            objectStack.push(currentObject);
            let newObject = {};

            if (objectName in currentObject) {
                if (!Array.isArray(currentObject[objectName])) {
                    const existingObject = currentObject[objectName];
                    currentObject[objectName] = [existingObject];
                }
                currentObject[objectName].push(newObject);
            }
            else {
                currentObject[objectName] = newObject;
            }

            currentObject = newObject;
        }

        return fileObject;
    }

    function ofxToTimestamp(ofxTime) {
        const [time, zone] = ofxTime.split("[");
        const [tzHours, tzName] = zone.split(":");
        const offset = tzHours * 60 * 60 * 1000;

        const year = time.substr(0, 4);
        const month = time.substr(4, 2);
        const day = time.substr(6, 2);
        const hours = time.substr(8, 2);
        const minutes = time.substr(10, 2);
        const seconds = time.substr(12, 2);

        let date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, 0));
        date.setTime(date.getTime() - offset);

        return date.getTime();
    }

    const common = require('./CommonBusiness')(logger, errors, data);
    return {
        ...common,
        validate,
        importTransactions
    };
}
