/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import ILogger from './ILoggerService';

export default function LoggerDummyService(): ILogger {

    function enableSeverity(_level: string) { }
    function isSeverityEnabled(_level: string) { return false; }
    function enableCategory(_category: string) { }
    function disableCategory(_category: string) { }
    function isCategoryEnabled(_category: string) { return false; }
    function send(_severity: string, _category: string, _context: string, _message: string, _object?: any) { }
    function error(_category: string, _context: string, _message: string, _object?: any) { }
    function warning(_category: string, _context: string, _message: string, _object?: any) { }
    function info(_category: string, _context: string, _message: string, _object?: any) { }
    function debug(_category: string, _context: string, _message: string, _object?: any) { }
    function verbose(_category: string, _context: string, _message: string, _object?: any) { }

    return {
        enableSeverity,
        isSeverityEnabled,

        enableCategory,
        disableCategory,
        isCategoryEnabled,

        send,
        error,
        warning,
        info,
        debug,
        verbose
    };
}
