import React from 'react';

import dataProvider from "./BankTransactionDataProvider";

function BankTransactionDataService() {

    function uploadFile(file) {
        dataProvider().uploadFile(file);
    }

    return {
        uploadFile
    };
}

export default BankTransactionDataService;