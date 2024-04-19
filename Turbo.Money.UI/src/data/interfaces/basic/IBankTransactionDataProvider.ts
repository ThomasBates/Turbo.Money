
import IBankTransaction from "models/bank/IBankTransaction";

import IBasicDataProvider from "./IBasicDataProvider";

export default interface IBankTransactionDataProvider extends IBasicDataProvider<IBankTransaction> {
    uploadFile: (file: File) => Promise<void>;
}
