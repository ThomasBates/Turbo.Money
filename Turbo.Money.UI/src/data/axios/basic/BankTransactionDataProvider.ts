
import axios from "data/axios/AxiosCommon";

import IBankTransactionDataProvider from "data/interfaces/basic/IBankTransactionDataProvider";

import IBankTransaction from "models/bank/IBankTransaction";

import ILoggerService from 'services/logger/ILoggerService';

import CommonDataProvider from "./CommonDataProvider";

export default function BankTransactionDataProvider(
    logger: ILoggerService
): IBankTransactionDataProvider {

    const module = BankTransactionDataProvider.name;
    const category = 'Bank';

    const common = CommonDataProvider<IBankTransaction>("bankTransaction")

    const uploadFile = async (file: File) => {
        const context = `${module}.${uploadFile.name}`;

        logger.debug(category, context, 'file =', file);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // make a POST request to the File Upload API with the FormData object and Rapid API headers
            const response = await axios.post("bankTransaction/upload", formData);
            logger.debug(category, context, 'response = ', response);
        } catch (ex) {
            logger.error(category, context, 'ex =', ex);
        }
    };

    return {
        ...common,
        uploadFile,
    };
}
