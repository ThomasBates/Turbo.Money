
import { Readable } from "stream";

export interface IGrammarParser {
    onValueEmitted: (token: string, value: string) => void;
    onTokenEmitted: (token: string, value: string) => void;
    onLogMessageEmitted: (severity: string, category: string, message: string) => void;

    parseInputString(input: string, startToken: string): void;
    parseInputStream(input: Readable, startToken: string): void;
}
