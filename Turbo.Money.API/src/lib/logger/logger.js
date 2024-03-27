
module.exports = function logger(provider) {

    const levels = {
        error: 0,
        warning: 1,
        info: 2,
        debug: 3,
        verbose: 4
    }

    let categories = {};
    let severityLevel = levels.debug;

    function enableSeverity(level) {
        severityLevel = levels[level];
    }

    function isSeverityEnabled(level) {
        return levels[level] <= severityLevel;
    }

    function enableCategory(category) {
        if (category === 'all') {
            categories = { all: true };
        }
        else {
            categories[category] = true;
        }
    }

    function disableCategory(category) {
        if (category === 'all') {
            categories = { };
        }
        else {
            categories[category] = false;
        }
    }

    function isCategoryEnabled(category) {
        const all = ('all' in categories && categories['all']);
        if (all) {
            return !(category in categories) || categories[category];
        }
        else {
            return (category in categories) && categories[category];
        }
    }

    function send(severity, category, context, message, object) {
        if (!isSeverityEnabled(severity))
            return;
        if ((levels[severity] > levels.error) && !isCategoryEnabled(category))
            return;
        provider.send(severity, category, context, message, object);
    }

    function error(category, context, message, object) {
        send('error', category, context, message, object);
    }

    function warning(category, context, message, object) {
        send('warning', category, context, message, object);
    }

    function info(category, context, message, object) {
        send('info', category, context, message, object);
    }

    function debug(category, context, message, object) {
        send('debug', category, context, message, object);
    }

    function verbose(category, context, message, object) {
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