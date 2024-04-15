
export interface IErrorInfo {
    error: {
        context: string
        code: string
        message: string
    }
}

export default interface IErrorService {
    createError: (context: string, code: string, message: string) => IErrorInfo;
    isError: (data: object) => boolean;
    handleCatch: (ex: unknown, context: string) => IErrorInfo;
}
