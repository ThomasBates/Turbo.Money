
export class Production {
    tokens: string[];
    directors: Set<string>;
}

export class GrammarData {
    startToken: string;
    endToken: string;
    intrinsics: Map<string,string>;
    terminals: Set<string>;
    codeTokens: Set<string>;
    parseTokens: Map<string, Set<Production>>;
}
