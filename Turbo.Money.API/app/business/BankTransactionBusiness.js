
module.exports = (logger, data, bankAccountData) => {

    // Validate bank transaction data
    const validate = async (userInfo, testAccount) => {
        logger.debug("Transactions", "BankTransactionBusiness.validate: testAccount = ", testAccount);

        const accounts = await data.getList(userInfo);
        if (accounts.error) {
            return accounts.error;
        }
        if (!accounts || !accounts.list || accounts.list.length == 0) {
            return null;
        }
        accounts = accounts.list;
        logger.debug("Transactions", "BankTransactionBusiness.validate: accounts = ", accounts);

        let matching = accounts.find(account =>
            account.name.toUpperCase() == testAccount.name.toUpperCase() &&
            account.id != testAccount.id);
        logger.debug("Transactions", "BankTransactionBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account name must be unique.";
        }

        matching = accounts.some(account =>
            account.bankId == testAccount.bankId &&
            account.number == testAccount.number &&
            account.id != testAccount.id);
        logger.debug("Transactions", "BankTransactionBusiness.validate: matching = ", matching);
        if (matching) {
            return "Validation Error: Bank account bankId+number must be unique.";
        }

        return null;
    }

    const importTransactions = async (userInfo, file) => {

        logger.debug("Transactions", "BankTransactionBusiness.importTransactions()");

        const ofx = await ofxToObject(file);

        if (ofx.OFXHEADER !== '100' || ofx.VERSION !== '102') {
            let error = "The format of the imported file is not supported.";
            logger.error("Transactions", `BankTransactionBusiness.importTransactions: ${error}`);
            return { error };
        }

        const ofxStatement = ofx.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS;
        const ofxTransactions = ofxStatement.BANKTRANLIST.STMTTRN;

        let account = await bankAccountData.getOneByNumber(userInfo, ofxStatement.BANKACCTFROM.ACCTID);
        if (account.error) {
            let error = "The bank account identified in the imported file is not registered in the application.";
            logger.error("Transactions", `BankTransactionBusiness.importTransactions: ${error}`);
            return { error };
        }

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

        return await data.storeTransactions(userInfo, transactions);
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

    const common = require('./CommonBusiness')(logger, data);
    return {
        ...common,
        validate,
        importTransactions
    };
}
