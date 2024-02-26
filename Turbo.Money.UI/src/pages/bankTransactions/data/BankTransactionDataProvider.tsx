import React from 'react';

import http from "../../../axios/AxiosCommon";
import CommonDataProvider from "../../../axios/CommonDataProvider";

function BankTransactionDataProvider() {

    const common = CommonDataProvider("bankTransactions")

    function uploadFile(file) {

        const formData = new FormData();
        formData.append("file", file);

        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        http.post("bankTransactions/upload", formData)
            .then((response) => {
                // handle the response
                console.log(".then:", response);
            })
            .catch((error) => {
                // handle errors
                console.log(".catch:", error);
            });
    };

    return {
        ...common,
        uploadFile,
    };
}

export default BankTransactionDataProvider;