import { useState } from 'react';

import IBankTransactionDataService from '../data/IBankTransactionDataService';

import IBankTransactionUploadViewModel from './IBankTransactionUploadViewModel';

export default function BankTransactionUploadViewModel(
    bankTransactionDataService: IBankTransactionDataService
): IBankTransactionUploadViewModel {

    const [file, setFile] = useState<File | null>(null);

    const canSubmit = () => {
        return file != null;
    }

    const submit = () => {
        if (file != null) {
            bankTransactionDataService.uploadFile(file);
        }
    };

    return {
        setFile,
        canSubmit: canSubmit(),
        submit,
    };
}
