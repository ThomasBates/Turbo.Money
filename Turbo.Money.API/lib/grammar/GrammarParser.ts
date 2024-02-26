
import { Readable } from "stream";

import { Production, GrammarData } from "./GrammarData";
import { IGrammarParser } from "./IGrammarParser";


export class GrammarParser implements IGrammarParser {

	private grammar: GrammarData;

	private line: number = 0;
	private column: number = 0;
	private nextChar: string = "";
	private nextValue: string = "";
	private scanToken: string = "";

	private parseStack: string[] = [];

	//  Constructors  ------------------------------------------------------------------------------

	constructor(grammar: GrammarData) {
		this.grammar = grammar;
	}

	//  IGrammarParser Events  ---------------------------------------------------------------------

	public onValueEmitted: (token: string, value: string) => void;
	public onTokenEmitted: (token: string, value: string) => void;
	public onLogMessageEmitted: (severity: string, category: string, message: string) => void;

	//  IGrammarParser Methods  --------------------------------------------------------------------

	public parseInputString(input: string, startToken: string): void {
		const stream = new Readable();
		stream.push(input);
		stream.push(null);

		this.parseInputStream(stream, startToken);
	}

	public parseInputStream(input: Readable, startToken: string): void {
		if (startToken === null || startToken === "") {
			startToken = this.grammar.startToken;
		}

		this.parseStack.push(this.grammar.endToken);
		this.parseStack.push(startToken);

		this.nextChar = "\n";
		this.line = 0;
		this.column = 0;

		this.scan(input);
		do {
			const token = this.parseStack.pop();

			if (this.grammar.parseTokens.has(token)) {
				const productions = this.grammar.parseTokens[token];

				let found = false;
				for (const production of productions) {
					if (production.directors.has(this.scanToken)) {
						for (let t = production.tokens.length - 1; t >= 0; t--) {
							this.parseStack.push(production.tokens[t]);
						}
						found = true;
						break;
					}
				}
				if (!found) {
					if (this.grammar.intrinsics.has(this.scanToken)) {
						throw Error(`Parser Error: line ${this.line}, column ${this.column}: "${this.nextValue} cannot appear there."`);
					}
					else {
						throw Error(`Parser Error: line ${this.line}, column ${this.column}: "${this.scanToken} cannot appear there."`);
					}
				}
			}
			else if (this.grammar.codeTokens.has(token)) {
				this.debugPrint("Parser", `token emitted: ${token}`)
				if (this.onTokenEmitted)
					this.onTokenEmitted(token, this.nextValue);
			}
			else {
				if (token !== this.scanToken) {
					if (this.grammar.intrinsics.has(this.scanToken)) {
						throw Error(`Parser Error: line ${this.line}, column ${this.column}: token "${token}" expected, but "${this.nextValue} found."`);
					}
					else {
						throw Error(`Parser Error: line ${this.line}, column ${this.column}: token "${token}" expected, but "${this.scanToken} found."`);
					}
				}

				if (this.grammar.intrinsics.has(token)) {
					if (this.grammar.endToken !== token) {
						this.debugPrint("Parser", `value emitted: ${this.nextValue}`);
						if (this.onValueEmitted)
							this.onValueEmitted(token, this.nextValue);
						this.scan(input);
					}
				}
				else {
					this.scan(input);
				}
			}
		} while (this.parseStack.length > 0);
	}

	//  Private Methods  ---------------------------------------------------------------------------

	private scan(input: Readable): void {

		//  Precondition:  c = next character (unprocessed)

		while (true) {
			if (this.nextChar == ' ' ||
				this.nextChar == '\t' ||
				this.nextChar == '\r') {
				this.nextChar = this.getChar(input);
			}
			else if (this.nextChar == '\n') {
				this.line++;
				this.column = 0;
				this.nextChar = this.getChar(input);
			}
			else if (this.nextChar == String.fromCharCode(26)) {  //  EOF
				this.scanToken = this.grammar.endToken;
				return;
			}
			else {
				let testValue = "";
				let lastToken = "";
				let lastValue = "";
				let foundStart = false;

				while (this.nextChar != String.fromCharCode(26)) {  //  not EOF
					testValue += this.nextChar;

					let count = 0;
					if (" \t\r\n".indexOf(this.nextChar) < 0) {
						if (this.grammar.terminals.has(testValue)) {
							lastToken = testValue;
							lastValue = testValue;
							count++;
						}
						else {
							for (const token in this.grammar.intrinsics) {
								const pattern = this.grammar.intrinsics[token];
								const regex = new RegExp(`^${pattern}$`);
								if (regex.test(testValue)) {
									lastToken = token;
									lastValue = testValue;
									count++;
								}
							}
						}
					}
					if (!foundStart && count > 0) {
						foundStart = true;
					}
					if (foundStart && count == 0) {  //  Current test failed
						this.scanToken = lastToken;
						this.nextValue = lastValue;
						return;
					}
					this.nextChar = this.getChar(input);
				}

				//  EOF:  use last successful value.
				if (lastValue && lastValue !== "")  //  Previous test succeeded:  use last value.
				{
					this.scanToken = lastToken;
					this.nextValue = lastValue;

					//  check for keywords.
					if (this.grammar.terminals.has(this.nextValue)) {
						this.scanToken = this.nextValue;
					}
					return;
				}
			}
		}
	}

	private getChar(input: Readable): string {
		const c = input.read(1);
		this.column++;
		if (!c) {
			return String.fromCharCode(26);   //  ^Z (EOF)
		}
		return c;
	}

	private debugPrint(category: string, message: string): void {
		if (this.onLogMessageEmitted)
			this.onLogMessageEmitted("Verbose", category, message);
	}
}