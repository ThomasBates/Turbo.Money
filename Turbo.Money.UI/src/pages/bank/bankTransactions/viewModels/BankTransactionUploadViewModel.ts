/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

import BankTransactionDataService from "../data/BankTransactionDataService";
import IBankTransactionUploadViewModel from './IBankTransactionUploadViewModel';

export default function BankTransactionUploadViewModel(): IBankTransactionUploadViewModel {

    const { logger, errors } = useAppContext();
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

    const handleFileChanged = (event: any) => {
        const file = event.target.files[0];
        setFile(file);
    };

    return {
        handleFileChanged,
        canSubmit: canSubmit(),
        submit,
    };
}
