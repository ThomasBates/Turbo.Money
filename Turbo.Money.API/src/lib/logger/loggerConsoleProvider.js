
module.exports = () => {

    //  Use this for front-end.
    //var isPerformanceSupported = (
    //    window.performance &&
    //    window.performance.now &&
    //    window.performance.timing &&
    //    window.performance.timing.navigationStart
    //);
    //function timeStampInMs() {
    //    return (
    //        isPerformanceSupported
    //            ? window.performance.now() + window.performance.timing.navigationStart
    //            : Date.now()
    //    );
    //}

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

    function send(severity, category, message, object) {
        if (object) {
            func[severity](`${getFullTimestamp()} [${severityDisplay[severity]}] ${category}: ${message}`, object);
        }
        else {
            func[severity](`${getFullTimestamp()} [${severityDisplay[severity]}] ${category}: ${message}`);
        }
    }

    return {
        send,
    };
}