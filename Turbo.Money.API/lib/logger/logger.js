
module.exports = (provider) => {

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

    function send(severity, category, message, object) {
        if (!isSeverityEnabled(severity))
            return;
        if (!isCategoryEnabled(category))
            return;
        provider.send(severity, category, message, object);
    }

    function error(category, message, object) {
        send('error', category, message, object);
    }

    function warning(category, message, object) {
        send('warning', category, message, object);
    }

    function info(category, message, object) {
        send('info', category, message, object);
    }

    function debug(category, message, object) {
        send('debug', category, message, object);
    }

    function verbose(category, message, object) {
        send('verbose', category, message, object);
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