// Generated from Format.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class FormatLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly WS = 20;
	public static readonly NEWLINE = 21;
	public static readonly WORDS = 22;
	public static readonly EOF = Token.EOF;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, "'\\uFF08'", 
                                                            "'\\uFF09'", 
                                                            "'('", "')'", 
                                                            "'\\u3010'", 
                                                            "'\\u3011'", 
                                                            "'['", "']'", 
                                                            "'\\u300A'", 
                                                            "'\\u300B'", 
                                                            "'<'", "'>'", 
                                                            "'\\u201C'", 
                                                            "'\\u201D'", 
                                                            "'\"'", "'\\u3002'", 
                                                            "'\\uFF01'", 
                                                            "'\\uFF1F'", 
                                                            "'\\u2026\\u2026'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "WS", "NEWLINE", 
                                                             "WORDS" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", ];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
		"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
		"T__17", "T__18", "WS", "NEWLINE", "WORDS",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, FormatLexer._ATN, FormatLexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "Format.g4"; }

	public get literalNames(): (string | null)[] { return FormatLexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return FormatLexer.symbolicNames; }
	public get ruleNames(): string[] { return FormatLexer.ruleNames; }

	public get serializedATN(): number[] { return FormatLexer._serializedATN; }

	public get channelNames(): string[] { return FormatLexer.channelNames; }

	public get modeNames(): string[] { return FormatLexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,22,101,6,-1,2,0,
	7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,
	7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,
	16,2,17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,1,0,1,0,1,1,1,1,1,
	2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,9,1,9,1,10,1,10,
	1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,15,1,15,1,16,1,16,1,17,1,17,1,
	18,1,18,1,18,1,19,4,19,86,8,19,11,19,12,19,87,1,19,1,19,1,20,4,20,93,8,
	20,11,20,12,20,94,1,21,4,21,98,8,21,11,21,12,21,99,0,0,22,1,1,3,2,5,3,7,
	4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,13,27,14,29,15,31,16,33,
	17,35,18,37,19,39,20,41,21,43,22,1,0,3,2,0,9,9,32,32,2,0,10,10,13,13,16,
	0,10,10,13,13,34,34,40,41,60,60,62,62,91,91,93,93,8220,8221,8230,8230,12290,
	12290,12298,12299,12304,12305,65281,65281,65288,65289,65311,65311,103,0,
	1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,
	0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,0,23,1,
	0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,1,0,0,0,0,33,1,0,0,0,
	0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,1,0,0,0,0,43,1,0,0,0,1,45,1,
	0,0,0,3,47,1,0,0,0,5,49,1,0,0,0,7,51,1,0,0,0,9,53,1,0,0,0,11,55,1,0,0,0,
	13,57,1,0,0,0,15,59,1,0,0,0,17,61,1,0,0,0,19,63,1,0,0,0,21,65,1,0,0,0,23,
	67,1,0,0,0,25,69,1,0,0,0,27,71,1,0,0,0,29,73,1,0,0,0,31,75,1,0,0,0,33,77,
	1,0,0,0,35,79,1,0,0,0,37,81,1,0,0,0,39,85,1,0,0,0,41,92,1,0,0,0,43,97,1,
	0,0,0,45,46,5,65288,0,0,46,2,1,0,0,0,47,48,5,65289,0,0,48,4,1,0,0,0,49,
	50,5,40,0,0,50,6,1,0,0,0,51,52,5,41,0,0,52,8,1,0,0,0,53,54,5,12304,0,0,
	54,10,1,0,0,0,55,56,5,12305,0,0,56,12,1,0,0,0,57,58,5,91,0,0,58,14,1,0,
	0,0,59,60,5,93,0,0,60,16,1,0,0,0,61,62,5,12298,0,0,62,18,1,0,0,0,63,64,
	5,12299,0,0,64,20,1,0,0,0,65,66,5,60,0,0,66,22,1,0,0,0,67,68,5,62,0,0,68,
	24,1,0,0,0,69,70,5,8220,0,0,70,26,1,0,0,0,71,72,5,8221,0,0,72,28,1,0,0,
	0,73,74,5,34,0,0,74,30,1,0,0,0,75,76,5,12290,0,0,76,32,1,0,0,0,77,78,5,
	65281,0,0,78,34,1,0,0,0,79,80,5,65311,0,0,80,36,1,0,0,0,81,82,5,8230,0,
	0,82,83,5,8230,0,0,83,38,1,0,0,0,84,86,7,0,0,0,85,84,1,0,0,0,86,87,1,0,
	0,0,87,85,1,0,0,0,87,88,1,0,0,0,88,89,1,0,0,0,89,90,6,19,0,0,90,40,1,0,
	0,0,91,93,7,1,0,0,92,91,1,0,0,0,93,94,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,
	0,95,42,1,0,0,0,96,98,8,2,0,0,97,96,1,0,0,0,98,99,1,0,0,0,99,97,1,0,0,0,
	99,100,1,0,0,0,100,44,1,0,0,0,4,0,87,94,99,1,0,1,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FormatLexer.__ATN) {
			FormatLexer.__ATN = new ATNDeserializer().deserialize(FormatLexer._serializedATN);
		}

		return FormatLexer.__ATN;
	}


	static DecisionsToDFA = FormatLexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}