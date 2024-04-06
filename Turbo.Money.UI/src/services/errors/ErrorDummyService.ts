/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import IErrorService, { ErrorInfo } from './IErrorService';

export default function ErrorService(): IErrorService {

    const createError = (context: string, code: string, message: string): ErrorInfo => {
        return { error: { context, code, message } };
    }

    const isError = (_data: any): boolean => {
        return false;
    }

    const handleCatch = (_ex: unknown, context: string): ErrorInfo => {
        return createError(context, 'Catch', 'Dummy');
    }

    return {
        createError,
        isError,
        handleCatch,
    };
}