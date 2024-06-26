
module.exports = function loggerConsoleProvider() {

    function getFullTimestamp() {
        const pad = (n, s = 2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
        const d = new Date();

        return `${pad(d.getFullYear(), 4)}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${pad(d.getMilliseconds(), 3)}`;
    }

    const severityDisplay = {
        error: 'ERROR',
        warning: 'WARN ',
        info: 'INFO ',
        debug: 'DEBUG',
        verbose: 'VERB '
    }

    const func = {
        error: console.error,
        warning: console.warn,
        info: console.info,
        debug: console.log,
        verbose: console.log
    };

    function send(severity, category, context, message, object) {
        if (object) {
            func[severity](`${getFullTimestamp()} [${severityDisplay[severity]}] ${category}: ${context}: ${message}`, object);
        }
        else {
            func[severity](`${getFullTimestamp()} [${severityDisplay[severity]}] ${category}: ${context}: ${message}`);
        }
    }

    return {
        send,
    };
}