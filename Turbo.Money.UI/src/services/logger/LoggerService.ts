/* eslint-disable @typescript-eslint/no-explicit-any */

import ILoggerProvider from './ILoggerProvider';
import ILoggerService from './ILoggerService';

export default function LoggerService(provider: ILoggerProvider): ILoggerService {

    const levels: Record<string, number> = {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3,
        verbose: 4
    }

    let categories: Record<string, boolean> = {};
    let severityLevel = levels.debug;

    function enableSeverity(level: string) {
        severityLevel = levels[level];
    }

    function isSeverityEnabled(level: string) {
        return levels[level] <= severityLevel;
    }

    function enableCategory(category: string) {
        if (category === 'all') {
            categories = { all: true };
        }
        else {
            categories[category] = true;
        }
    }

    function disableCategory(category: string) {
        if (category === 'all') {
            categories = { };
        }
        else {
            categories[category] = false;
        }
    }

    function isCategoryEnabled(category: string) {
        const all = ('all' in categories && categories['all']);
        if (all) {
            return !(category in categories) || categories[category];
        }
        else {
            return (category in categories) && categories[category];
        }
    }

    function send(severity: string, category: string, context: string, message: string, object?: any) {
        if (!isSeverityEnabled(severity))
            return;
        if ((levels[severity] > levels.error) && !isCategoryEnabled(category))
            return;
        provider.send(severity, category, context, message, object);
    }

    function error(category: string, context: string, message: string, object?: any) {
        send('error', category, context, message, object);
    }

    function warning(category: string, context: string, message: string, object?: any) {
        send('warning', category, context, message, object);
    }

    function info(category: string, context: string, message: string, object?: any) {
        send('info', category, context, message, object);
    }

    function debug(category: string, context: string, message: string, object?: any) {
        send('debug', category, context, message, object);
    }

    function verbose(category: string, context: string, message: string, object?: any) {
        send('verbose', category, context, message, object);
    }

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
