/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface ILoggerService {
    enableSeverity: (severity: string)=>void,
    isSeverityEnabled: (severity: string)=>boolean,

    enableCategory: (category: string) => void,
    disableCategory: (category: string) => void,
    isCategoryEnabled: (category: string) => boolean,

    send: (severity: string, category: string, context: string, message: string, object?: any) => void;
    error: (category: string, context: string, message: string, object?: any) => void;
    warning: (category: string, context: string, message: string, object?: any) => void;
    info: (category: string, context: string, message: string, object?: any) => void;
    debug: (category: string, context: string, message: string, object?: any) => void;
    verbose: (category: string, context: string, message: string, object?: any) => void;
}