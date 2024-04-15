
import ILoggerService from 'services/logger/ILoggerService';

import IErrorService, { IErrorInfo } from './IErrorService';

export default function ErrorService(logger: ILoggerService): IErrorService {

    const createError = (context: string, code: string, message: string): IErrorInfo => {
        const error = { context, code, message };
        logger.error('Error', context, 'error =', error);
        return { error };
    }

    const isError = (data: object): boolean => {
        return ('error' in data);
    }

    const handleCatch = (ex: unknown, context: string): IErrorInfo => {
        logger.error('Catch', context, 'ex =', ex);
        return createError(context, 'Catch', (ex instanceof Error) ? ex.message : 'Unknown catch');
    }

    return {
        createError,
        isError,
        handleCatch,
    };
}