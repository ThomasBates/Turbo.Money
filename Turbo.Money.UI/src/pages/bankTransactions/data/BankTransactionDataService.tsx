import React from 'react';

import BankTransactionDataProvider from "data/bankTransaction/BankTransactionDataProvider";

export default function BankTransactionDataService(logger, errors) {

    const bankTransactionDataProvider = BankTransactionDataProvider(logger, errors);

    function uploadFile(file) {
        bankTransactionDataProvider.uploadFile(file);
    }

    return {
        uploadFile
    };
}
