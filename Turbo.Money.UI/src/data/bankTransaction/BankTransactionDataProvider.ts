/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "data/axios/AxiosCommon";
import CommonDataProvider from "data/axios/CommonDataProvider";

import ILoggerService from 'services/logger/ILoggerService';

export default function BankTransactionDataProvider(logger: ILoggerService) {
    const module = BankTransactionDataProvider.name;
    const category = 'Bank';

    const common = CommonDataProvider("bankTransactions")

    const uploadFile = async (file: any) => {
        const context = `${module}.${uploadFile.name}`;

        logger.debug(category, context, 'file =', file);

        try {
            const formData = new FormData();
            formData.append("file", file);

            // make a POST request to the File Upload API with the FormData object and Rapid API headers
            const response = await axios.post("bankTransactions/upload", formData);
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
