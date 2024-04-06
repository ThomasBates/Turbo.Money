/* eslint-disable @typescript-eslint/no-explicit-any */

import ILoggerProvider from './ILoggerProvider';

export default function LoggerConsoleProvider(): ILoggerProvider {

    function getFullTimestamp() {
        const pad = (n: number, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date();

        return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
    }

    const severityDisplay: Record<string, string> = {
        error: 'ERROR',
        warning: 'WARN ',
        info: 'INFO ',
        debug: 'DEBUG',
        verbose: 'VERB '
    }

    const funcMap: Record<string, (message: string, ...optionalParams: any[]) => void> = {
        'error': console.error,
        'warning': console.warn,
        'info': console.info,
        'debug': console.log,
        'verbose': console.log
    };

    function send(severity: string, category: string, context: string, message: string, object: any) {
        if (object)
            funcMap[severity](`${getFullTimestamp()} [${severityDisplay[severity]}] ${category}: ${context}: ${message}`, object);
        else
            funcMap[severity](`${getFullTimestamp()} [${severityDisplay[severity]}] ${category}: ${context}: ${message}`);
    }

    return {
        send,
    };
}