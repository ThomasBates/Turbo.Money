
import BankTransactionDataProvider from "data/axios/basic/BankTransactionDataProvider";

import ILoggerService from "services/logger/ILoggerService";

export default function BankTransactionDataService(logger: ILoggerService) {

    const bankTransactionDataProvider = BankTransactionDataProvider(logger);

    function uploadFile(file: File | null) {
        bankTransactionDataProvider.uploadFile(file);
    }

    return {
        uploadFile
    };
}
