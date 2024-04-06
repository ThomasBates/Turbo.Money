/* eslint-disable @typescript-eslint/no-explicit-any */

export default interface ILoggerProvider {
    send: (severity: string, category: string, context: string, message: string, object: any) => void;
}