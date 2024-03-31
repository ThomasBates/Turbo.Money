import React, { useContext, useState } from 'react';

import AppContext from '../../../AppContext';

import BankTransactionDataService from "../data/BankTransactionDataService";

export default function BankTransactionUploadViewModel() {

    const { logger, errors } = useContext(AppContext);
    const [file, setFile] = useState(null);

    const bankTransactionDataService = BankTransactionDataService(logger, errors)

    const canSubmit = () => {
        return file != null;
    }

    const submit = () => {
        if (canSubmit()) {
            bankTransactionDataService.uploadFile(file);
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
