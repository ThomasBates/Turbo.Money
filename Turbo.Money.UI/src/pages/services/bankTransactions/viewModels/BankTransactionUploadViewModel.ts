import { useState } from 'react';

import { useAppContext } from 'app/AppContextAccess';

import BankTransactionDataService from "../data/BankTransactionDataService";
import IBankTransactionUploadViewModel from './IBankTransactionUploadViewModel';

export default function BankTransactionUploadViewModel(): IBankTransactionUploadViewModel {

    const { logger } = useAppContext();
    const [file, setFile] = useState<File | null>(null);

    const bankTransactionDataService = BankTransactionDataService(logger)

    const canSubmit = () => {
        return file != null;
    }

    const submit = () => {
        if (canSubmit()) {
            bankTransactionDataService.uploadFile(file);
        }
    };

    return {
        setFile,
        canSubmit: canSubmit(),
        submit,
    };
}
