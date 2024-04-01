import React from 'react';

import axios from "data/axios/AxiosCommon";
import CommonDataProvider from "data/axios/CommonDataProvider";

export default function BankTransactionDataProvider(logger, errors) {
    const module = BankTransactionDataProvider.name;
    const category = 'Bank';

    const common = CommonDataProvider("bankTransactions")

    const uploadFile = async (file) => {
        const context = `${module}.${uploadFile.name}`;

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
