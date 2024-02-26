
import { GrammarReader } from "./GrammarReader";
import { GrammarParser } from "./GrammarParser";

function createGrammar(logger, grammarFile) {
    const grammarReader = new GrammarReader();
    grammarReader.onLogMessageEmitted = (severity, category, message) =>
        handleLogMessageEmitted(logger, severity, category, message);

    try {
        const grammar = grammarReader.readGrammarDefinitionString(grammarFile);
        return grammar;
    } catch (ex) {
        logger && logger.sendError("Grammar", `${ex}`);
        return null;
    }
}

function createParserWithGrammarFile(
    logger,
    grammarFile,
    scopeControllerAction,
    typeControllerAction,
    codeControllerAction) {

    const grammar = createGrammar(logger, grammarFile);

    if (grammar == null)
        return null;

    return createParserWithGrammar(
        logger,
        grammar,
        scopeControllerAction,
        typeCheckerAction,
        codeGeneratorAction);
}

function createParserWithGrammar(
    logger,
    grammar,
    scopeControllerAction,
    typeControllerAction,
    codeControllerAction) {

    let valueStack = [];

    const parser = new GrammarParser(grammar);
    parser.onLogMessageEmitted = (severity, category, message) =>
        handleLogMessageEmitted(logger, severity, category, message);

    parser.onValueEmitted = (token, value) => valueStack.push(value);

    parser.onTokenEmitted = (token, value) => {
        if (!token || token == "")
            return;

        switch (token[0]) {
            case 's': scopeControllerAction && scopeControllerAction(token, valueStack); break;
            case 't': typeCheckerAction && typeCheckerAction(token, valueStack); break;
            case 'c': codeGeneratorAction && codeGeneratorAction(token, valueStack); break;
            default:
                logger && logger.sendError("Parser", `Unknown token: ${token}`);
                break;
        }
    }

    return parser;
}

function parseInputWithGrammarfile(
    logger,
    input,
    grammarFile,
    scopeControllerAction,
    typeControllerAction,
    codeControllerAction) {

    parser = createParserWithGrammarFile(
        logger,
        grammarFile,
        scopeControllerAction,
        typeControllerAction,
        codeControllerAction);

    return parseInputWithGrammar(logger, parser, input);
}

function parseInputWithParser(logger, parser, input) {
    if (!parser)
        return false;

    try {
        if (typeof input == "string") {
            parser.parseInputString(input);
        }
        else {
            parser.parseInputStream(input);
        }
    } catch (ex) {
        logger && logger.sendError("Parser", `${ex}`);
        return false;
    }

    return true;
}

function parseInputWithGrammar(
    logger,
    input,
    grammar,
    scopeControllerAction,
    typeControllerAction,
    codeControllerAction) {

    parser = createParserWithGrammar(
        logger,
        grammar,
        scopeControllerAction,
        typeControllerAction,
        codeControllerAction);

    return parseInputWithParser(logger, parser, input);
}

function handleLogMessageEmitted(logger, severity, category, message) {
    if (!logger)
        return;

    switch (severity.toLowerCase()) {
        case "error":
            logger.sendError(category, message);
        case "warning":
            logger.sendWarning(category, message);
        case "info":
            logger.sendInfo(category, message);
        case "debug":
            logger.sendDebug(category, message);
        case "verbose":
            logger.sendVerbose(category, message);
    }
}

module.exports = {

    createGrammar,
    createParserWithGrammarFile,
    createParserWithGrammar,
    parseInputWithGrammarfile,
    parseInputWithParser,
    parseInputWithGrammar,
    handleLogMessageEmitted

}