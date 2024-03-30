import React from 'react';

import dataProvider from "./BankTransactionDataProvider";

export default function BankTransactionDataService() {

    function uploadFile(file) {
        dataProvider().uploadFile(file);
    }

    return {
        uploadFile
    };
}
