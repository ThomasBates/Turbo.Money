
import IBankTransactionDataProvider from "data/interfaces/basic/IBankTransactionDataProvider";

import IBankTransactionDataService from "./IBankTransactionDataService";

export default function BankTransactionDataService(
    bankTransactionDataProvider: IBankTransactionDataProvider
): IBankTransactionDataService {

    function uploadFile(file: File) {
        bankTransactionDataProvider.uploadFile(file);
    }

    return {
        uploadFile
    };
}
