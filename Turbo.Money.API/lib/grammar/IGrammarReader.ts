
import { Readable } from "stream";

import { GrammarData } from "./GrammarData";

export interface IGrammarReader {
    onLogMessageEmitted: (severity: string, category: string, message: string) => void;

    readGrammarDefinitionString(string): GrammarData;
    readGrammarDefinitionStream(Readable): GrammarData;
}
