/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ErrorInfo {
    error: {
        context: string
        code: string
        message: string
    }
}

export default interface IErrorService {
    createError: (context: string, code: string, message: string) => ErrorInfo;
    isError: (data: any) => boolean;
    handleCatch: (ex: unknown, context: string) => ErrorInfo;
}
