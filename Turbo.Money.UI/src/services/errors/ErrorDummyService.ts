/* eslint-disable @typescript-eslint/no-unused-vars */

import IErrorService, { IErrorInfo } from './IErrorService';

export default function ErrorService(): IErrorService {

    const createError = (context: string, code: string, message: string): IErrorInfo => {
        return { error: { context, code, message } };
    }

    const isError = (_data: object): boolean => {
        return false;
    }

    const handleCatch = (_ex: unknown, context: string): IErrorInfo => {
        return createError(context, 'Catch', 'Dummy');
    }

    return {
        createError,
        isError,
        handleCatch,
    };
}