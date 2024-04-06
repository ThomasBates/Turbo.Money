/* eslint-disable @typescript-eslint/no-explicit-any */

import ILoggerService from 'services/logger/ILoggerService';

import IErrorService, { ErrorInfo } from './IErrorService';

export default function ErrorService(logger: ILoggerService): IErrorService {

    const createError = (context: string, code: string, message: string): ErrorInfo => {
        const error = { context, code, message };
        logger.error('Error', context, 'error =', error);
        return { error };
    }

    const isError = (data: any): boolean => {
        return ('error' in data);
    }

    const handleCatch = (ex: unknown, context: string): ErrorInfo => {
        logger.error('Catch', context, 'ex =', ex);
        return createError(context, 'Catch', (ex instanceof Error) ? ex.message : 'Unknown catch');
    }

    return {
        createError,
        isError,
        handleCatch,
    };
}