
import { Readable } from "stream";

import { Production, GrammarData } from "./GrammarData";
import { IGrammarReader } from "./IGrammarReader";


export class GrammarReader implements IGrammarReader {

	private EOF: string = "EOF";

	private rules: Map<string, string[]> = new Map<string, string[]>();

	private directorParseTokenStack: string[] = [];
	private followerParseTokenStack: string[] = [];

	private grammar: GrammarData;

	//  Constructors  ------------------------------------------------------------------------------

	//constructor(onLogMessageEmitted: (severity: string, category: string, message: string) => void) {
	//	this.onLogMessageEmitted = onLogMessageEmitted;
	//}

	//  IGrammarReader Events  ---------------------------------------------------------------------

	public onLogMessageEmitted: (severity: string, category: string, message: string) => void;

	//  IGrammarReader Methods  --------------------------------------------------------------------

	public readGrammarDefinitionString(grammarDefinition: string): GrammarData {

		const grammarQueue: string[] = [];
		for (const c of grammarDefinition) {
			grammarQueue.push(c);
		}

		return this.readGrammarDefinitionQueue(grammarQueue);
	}

	public readGrammarDefinitionStream(grammarDefinition: Readable): GrammarData {
		const grammarQueue: string[] = [];
		const chunks = [];

		grammarDefinition.on("data", function (chunk) {
			chunks.push(chunk);
		});

		// Send the buffer or you can put it into a var
		grammarDefinition.on("end", function () {
			for (const chunk of chunks) {
				for (const c of chunk.toString()) {
					grammarQueue.push(c);
				}
			}
		});

		return this.readGrammarDefinitionQueue(grammarQueue);
	}

	//  Private Methods  ---------------------------------------------------------------------------

	private readGrammarDefinitionQueue(grammarQueue: string[]): GrammarData {

		this.rules.clear();
		this.directorParseTokenStack = [];
		this.followerParseTokenStack = [];
		this.grammar = new GrammarData();

		this.addGrammarDefinition2(this.EOF, this.EOF);

		let doDefinitions = false;
		let doGrammar = false;
		let isFinished = false;

		let line: string = this.readGrammarLine(grammarQueue);
		while (!isFinished) {
			if (line.toUpperCase() === "#DEFINITIONS") {
				doDefinitions = true;
			}
			else if (line.toUpperCase() === "#GRAMMAR") {
				doGrammar = true;
			}
			else if (line.toUpperCase() === "#END") {
				isFinished = true;
			}
			else if (doGrammar) {
				this.addGrammarRule(line);
			}
			else if (doDefinitions) {
				this.addGrammarDefinition(line);
			}

			if (grammarQueue.length === 0) {
				isFinished = true;
			}

			line = this.readGrammarLine(grammarQueue);
		}

		this.initializeGrammar();

		return this.grammar;
	};

	private addGrammarDefinition(definition: string): void {
		const parts: string[] = definition.split(/( = | \| )/g);
		if (parts.length == 2) {
			this.addGrammarDefinition2(parts[0], parts[1]);
		}
		else if (parts.length == 3) {
			this.addGrammarDefinition2(parts[0], parts[2]);
		}
	}

	private addGrammarDefinition2(definitionName: string, pattern: string): void {
		if (!this.grammar.intrinsics.has(definitionName)) {
			this.grammar.intrinsics.set(definitionName, pattern);
			if (this.grammar.endToken === "") {
				this.grammar.endToken = definitionName;
			}
		}
	}

	private addGrammarRule(rule: string): void {
		const parts: string[] = rule.split(" = ");
		if (parts.length == 2) {
			this.addGrammarRule2(parts[0], parts[1]);
		}
	}

	private addGrammarRule2(ruleName: string, expression: string): void {
		if (this.grammar.startToken == "") {
			this.grammar.startToken = ruleName;
		}

		if (!this.rules.has(ruleName)) {
			this.rules.set(ruleName, [])
		}

		if (expression.startsWith("|")) {
			expression = " " + expression;
		}

		const rules = expression.split(" | ");

		for (let i = 0; i < rules.length; i++) {
			let rule = rules[i].trim();
			if (!this.rules[ruleName].contains(rule)) {
				this.rules[ruleName].add(rule);
			}
		}
	}

	private initializeGrammar(): void {

		this.rules.forEach((rules: string[], parseToken: string) => {
			this.grammar.parseTokens.set(parseToken, new Set<Production>);
		});

		this.rules.forEach((rules: string[], parseToken: string) => {
			for (let rule of rules) {
				let production = new Production();
				this.grammar.parseTokens[parseToken].add(production);

				let tokens = rule.split(" ");
				for (let token of tokens) {
					if (token === "")
						continue;

					const fTerminal = token.startsWith("'") || token.startsWith('"');

					if (fTerminal) {
						//  Strip quotation marks from keywords and symbols and production tokens list.
						let stripped = token;
						if ((token[0] === '"' && token[token.length - 1] === '"') ||
							(token[0] === "'" && token[token.length - 1] === "'")) {
							stripped = token.substring(1, token.length - 2);
						}

						//if (char.IsLetter(stripped[0]) || stripped[0] == '_' || !char.IsNumber(stripped[0]))
						this.grammar.terminals.add(stripped);
						production.tokens.push(stripped);
					}
					else if (!this.grammar.intrinsics.has(token) &&
						!this.grammar.parseTokens.has(token)) {
						this.grammar.codeTokens.add(token);
						production.tokens.push(token);
					}
					else {
						production.tokens.push(token);
					}
				}
			}
		});

		this.calculateDirectors();

		this.debugDumpLists();
	}

	private readGrammarLine(grammarQueue: string[]): string {

		const TAB: string = String.fromCharCode(9);
		const SPACE: string = ' ';
		const CR: string = String.fromCharCode(13);
		const LF: string = String.fromCharCode(10);
		const EQUALS: string = '=';
		const PIPE: string = '|';
		const QUOTE1: string = "'";
		const QUOTE2: string = '"';

		let line: string = "";
		let inQuotes1: boolean = false;
		let inQuotes2: boolean = false;
		let newLine: boolean = false;

		let char = grammarQueue.shift();
		while (char) {
			const nextChar = char;
			switch (char) {
				case TAB:
				case SPACE:
					if (inQuotes1 || inQuotes2 || !line.endsWith(" ")) {
						line += " ";
					}
					break;

				case CR:    //  ignore
					break;

				case LF:
					newLine = true;
					break;

				case EQUALS:
				case PIPE:
					line += nextChar;
					newLine = false;
					break;

				case QUOTE1:
					if (newLine) {
						grammarQueue.unshift(char);
						return line;
					}
					if (!inQuotes2) {
						inQuotes1 = !inQuotes1;
					}
					line += nextChar;
					break;

				case QUOTE2:
					if (newLine) {
						grammarQueue.unshift(char);
						return line;
					}
					if (!inQuotes1) {
						inQuotes2 = !inQuotes2;
					}
					line += nextChar;
					break;

				default:
					if (newLine) {
						grammarQueue.unshift(char);
						return line;
					}
					line += nextChar;
					break;
			}

			char = grammarQueue.shift();
		}

		return line;
	}


	//  Director Calculation Methods  --------------------------------------------------------------

	private calculateDirectors(): void {
		this.debugPrint("Grammar1", "calculateDirectors ...");
		this.debugIndent();

		for (const parseToken in this.grammar.parseTokens) {
			this.calcParseDirectors(parseToken);
		}

		this.debugUnindent();
		this.debugPrint("Grammar1", "... calculateDirectors");
	}

	private calcParseDirectors(parseToken: string): void {
		this.debugPrint("Grammar1", `calcParseDirectors(${parseToken}) ...`);
		this.debugIndent();

		this.debugShowStack(`if (directorParseTokenStack.Contains(${parseToken}))`, "directorParseTokenStack", this.directorParseTokenStack);
		if (this.directorParseTokenStack.indexOf(parseToken) > -1) {
			throw Error("Grammar is not L2");
		}

		this.directorParseTokenStack.push(parseToken);
		this.debugShowStack(`directorParseTokenStack.Push(${parseToken});`, "directorParseTokenStack", this.directorParseTokenStack);

		const productions = this.grammar.parseTokens[parseToken];

		for (let production of productions) {
			if (production.directors.length > 0)
				continue;

			for (const token of production.tokens) {
				const isTerminal =
					this.grammar.intrinsics.has(token) ||
					this.grammar.terminals.has(token);

				if (isTerminal) {
					production.directors.add(token);
					break;
				}
				else if (this.grammar.parseTokens.has(token)) {
					this.addDirectors(production.directors, token);
					break;
				}
			}

			if (production.directors.length == 0) {
				this.addFollowers(production.directors, parseToken);
			}
		}

		this.debugShowStack(`if (directorParseTokenStack.Pop() != ${parseToken})`, "directorParseTokenStack", this.directorParseTokenStack);
		if (this.directorParseTokenStack.pop() != parseToken) {
			throw Error("Internal Stack Error.");
		}

		this.debugUnindent();
		this.debugPrint("Grammar1", `... calcParseDirectors(${parseToken})`);
	}

	private addDirectors(directors: Set<string>, parseToken: string): void {
		this.debugPrint("Grammar1", `addDirectors(directors, ${parseToken}) ...`);
		this.debugIndent();

		//  Make sure the specified parse token's director set has been calculated.
		this.calcParseDirectors(parseToken);

		//  For each production of the specified parse token ...
		for (const production of this.grammar.parseTokens[parseToken]) {
			production.directors.map(director => {
				directors.add(director);
			});
		}

		this.debugUnindent();
		this.debugPrint("Grammar1", `... addDirectors(directors, ${parseToken})`);
	}

	private addFollowers(directors: Set<string>, parseToken: string): void {
		this.debugPrint("Grammar1", `addFollowers(directors, ${parseToken}) ...`);
		this.debugIndent();
        try {
			this.debugShowStack(`if (followerParseTokenStack.Contains(${parseToken}))`, "followerParseTokenStack", this.followerParseTokenStack);
			if (this.followerParseTokenStack.indexOf(parseToken) > -1) {
				return;
			}

			if (parseToken === this.grammar.startToken) {
				directors.add(this.grammar.endToken);
				return;
			}

			this.followerParseTokenStack.push(parseToken);
			this.debugShowStack(`followerParseTokenStack.push(${parseToken});`, "followerParseTokenStack", this.followerParseTokenStack);

			for (const key in this.grammar.parseTokens) {
				const productions = this.grammar.parseTokens[key];
				for (const production of productions) {
					let fInProd = false;
					let fFollowed = false;

					for (const token of production.tokens) {
						if (fInProd) {
							const isTerminal =
								this.grammar.intrinsics.has(token) ||
								this.grammar.terminals.has(token);

							if (isTerminal) {
								directors.add(token);
								fFollowed = true;
								break;
							}
							else if (!this.grammar.codeTokens.has(token)) {
								this.addDirectors(directors, token);
								fFollowed = true;
								break;
							}
						}
						if (token === parseToken) {
							fInProd = true;
						}
					}
					if (fInProd && !fFollowed) {
						this.addFollowers(directors, key);
					}
				}
			}

			this.debugShowStack(`if (followerParseTokenStack.pop() != ${parseToken})`, "followerParseTokenStack", this.followerParseTokenStack);
			if (this.followerParseTokenStack.pop() != parseToken) {
				throw Error("Internal Stack Error.");
			}

        } finally {
			this.debugUnindent();
			this.debugPrint("Grammar1", `... addFollowers(directors, ${parseToken})`);
        }
	}

	//  Private Debug Methods  ---------------------------------------------------------------------

	private indent: string = "";

	private debugPrint(category: string, message: string): void {
		//const timestamp = (new Date()).toISOString(); // .replace(/[^0-9]/g, "").slice(0, -3);
		//console.log(`${timestamp} - ${category} - ${this.indent}${message}`);

		if (this.onLogMessageEmitted) {
			this.onLogMessageEmitted("Verbose", category, this.indent + message);
		}
	}

	private debugIndent(): void {
		this.indent = "  " + this.indent;
	}

	private debugUnindent(): void {
		if (this.indent.length > 2)
			this.indent = this.indent.substring(2);
		else
			this.indent = "";
	}

	private debugShowStack(caption: string, stackName: string, stack: string[]): void {
		this.debugPrint("Grammar1", caption);
		this.debugPrint("Grammar1", `  ${stackName}: ${stack.join(", ")}`);
	}

	private debugDumpLists(): void {
		if (this.onLogMessageEmitted) {
			this.debugPrint("Grammar2", "");
			this.debugDumpSet("Intrinsics", this.grammar.intrinsics.keys);
			this.debugDumpSet("Terminals", this.grammar.terminals);
			this.debugDumpSet("Code Tokens", this.grammar.codeTokens);

			this.debugPrint("Grammar2", "Parse Tokens");
			for (const parseToken in this.grammar.parseTokens) {
				this.debugPrint("Grammar2", `  ${parseToken}`);
				for (const production of this.grammar.parseTokens[parseToken]) {
					this.debugPrint("Grammar2", `    ==> ${production.tokens.join(" ")}`);
					this.debugPrint("Grammar2", `        (${production.directors.join(", ")})`);
				}
			}
			this.debugPrint("Grammar2", "");
		}
	}

	private debugDumpSet(caption: string, list: any): void {
		this.debugPrint("Grammar2", caption);
		for (const token of list) {
			this.debugPrint("Grammar2", `  ${token}`);
		}
		this.debugPrint("Grammar2", "");
	}
}