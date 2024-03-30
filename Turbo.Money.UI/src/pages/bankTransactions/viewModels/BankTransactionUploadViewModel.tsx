import React, { useState } from 'react';

import dataService from "../data/BankTransactionDataService";

export default function BankTransactionUploadViewModel() {
    const [file, setFile] = useState(null);

    const canSubmit = () => {
        return file != null;
    }

    const submit = () => {
        if (canSubmit()) {
            dataService().uploadFile(file);
        }
    };

    const handleFileChanged = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    return {
        handleFileChanged,
        canSubmit,
        submit,
    };
}
