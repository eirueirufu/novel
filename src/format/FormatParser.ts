// Generated from Format.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import FormatListener from "./FormatListener.js";
import FormatVisitor from "./FormatVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class FormatParser extends Parser {
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
	public static readonly RULE_section = 0;
	public static readonly RULE_para = 1;
	public static readonly RULE_sent = 2;
	public static readonly RULE_str = 3;
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
                                                            "'\\u2026'" ];
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
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"section", "para", "sent", "str",
	];
	public get grammarFileName(): string { return "Format.g4"; }
	public get literalNames(): (string | null)[] { return FormatParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return FormatParser.symbolicNames; }
	public get ruleNames(): string[] { return FormatParser.ruleNames; }
	public get serializedATN(): number[] { return FormatParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, FormatParser._ATN, FormatParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public section(): SectionContext {
		let localctx: SectionContext = new SectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, FormatParser.RULE_section);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 9;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 8;
				this.para();
				}
				}
				this.state = 11;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public para(): ParaContext {
		let localctx: ParaContext = new ParaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, FormatParser.RULE_para);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 14;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 13;
					this.sent();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 16;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 19;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===21) {
				{
				this.state = 18;
				this.match(FormatParser.NEWLINE);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sent(): SentContext {
		let localctx: SentContext = new SentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, FormatParser.RULE_sent);
		let _la: number;
		try {
			let _alt: number;
			this.state = 86;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 21;
				this.match(FormatParser.T__0);
				this.state = 25;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 22;
					this.sent();
					}
					}
					this.state = 27;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 28;
				this.match(FormatParser.T__1);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 29;
				this.match(FormatParser.T__2);
				this.state = 33;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 30;
					this.sent();
					}
					}
					this.state = 35;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 36;
				this.match(FormatParser.T__3);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 37;
				this.match(FormatParser.T__4);
				this.state = 41;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 38;
					this.sent();
					}
					}
					this.state = 43;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 44;
				this.match(FormatParser.T__5);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 45;
				this.match(FormatParser.T__6);
				this.state = 49;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 46;
					this.sent();
					}
					}
					this.state = 51;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 52;
				this.match(FormatParser.T__7);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 53;
				this.match(FormatParser.T__8);
				this.state = 57;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 54;
					this.sent();
					}
					}
					this.state = 59;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 60;
				this.match(FormatParser.T__9);
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 61;
				this.match(FormatParser.T__10);
				this.state = 65;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 62;
					this.sent();
					}
					}
					this.state = 67;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 68;
				this.match(FormatParser.T__11);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 69;
				this.match(FormatParser.T__12);
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5221034) !== 0)) {
					{
					{
					this.state = 70;
					this.sent();
					}
					}
					this.state = 75;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 76;
				this.match(FormatParser.T__13);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 77;
				this.match(FormatParser.T__14);
				this.state = 81;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 78;
						this.sent();
						}
						}
					}
					this.state = 83;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
				}
				this.state = 84;
				this.match(FormatParser.T__14);
				}
				break;
			case 16:
			case 17:
			case 18:
			case 19:
			case 22:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 85;
				this.str();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public str(): StrContext {
		let localctx: StrContext = new StrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, FormatParser.RULE_str);
		let _la: number;
		try {
			let _alt: number;
			this.state = 97;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 89;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===22) {
					{
					this.state = 88;
					this.match(FormatParser.WORDS);
					}
				}

				this.state = 92;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 91;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 983040) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 94;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 96;
				this.match(FormatParser.WORDS);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,22,100,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,1,0,4,0,10,8,0,11,0,12,0,11,1,1,4,1,15,8,1,11,1,12,
	1,16,1,1,3,1,20,8,1,1,2,1,2,5,2,24,8,2,10,2,12,2,27,9,2,1,2,1,2,1,2,5,2,
	32,8,2,10,2,12,2,35,9,2,1,2,1,2,1,2,5,2,40,8,2,10,2,12,2,43,9,2,1,2,1,2,
	1,2,5,2,48,8,2,10,2,12,2,51,9,2,1,2,1,2,1,2,5,2,56,8,2,10,2,12,2,59,9,2,
	1,2,1,2,1,2,5,2,64,8,2,10,2,12,2,67,9,2,1,2,1,2,1,2,5,2,72,8,2,10,2,12,
	2,75,9,2,1,2,1,2,1,2,5,2,80,8,2,10,2,12,2,83,9,2,1,2,1,2,3,2,87,8,2,1,3,
	3,3,90,8,3,1,3,4,3,93,8,3,11,3,12,3,94,1,3,3,3,98,8,3,1,3,0,0,4,0,2,4,6,
	0,1,1,0,16,19,117,0,9,1,0,0,0,2,14,1,0,0,0,4,86,1,0,0,0,6,97,1,0,0,0,8,
	10,3,2,1,0,9,8,1,0,0,0,10,11,1,0,0,0,11,9,1,0,0,0,11,12,1,0,0,0,12,1,1,
	0,0,0,13,15,3,4,2,0,14,13,1,0,0,0,15,16,1,0,0,0,16,14,1,0,0,0,16,17,1,0,
	0,0,17,19,1,0,0,0,18,20,5,21,0,0,19,18,1,0,0,0,19,20,1,0,0,0,20,3,1,0,0,
	0,21,25,5,1,0,0,22,24,3,4,2,0,23,22,1,0,0,0,24,27,1,0,0,0,25,23,1,0,0,0,
	25,26,1,0,0,0,26,28,1,0,0,0,27,25,1,0,0,0,28,87,5,2,0,0,29,33,5,3,0,0,30,
	32,3,4,2,0,31,30,1,0,0,0,32,35,1,0,0,0,33,31,1,0,0,0,33,34,1,0,0,0,34,36,
	1,0,0,0,35,33,1,0,0,0,36,87,5,4,0,0,37,41,5,5,0,0,38,40,3,4,2,0,39,38,1,
	0,0,0,40,43,1,0,0,0,41,39,1,0,0,0,41,42,1,0,0,0,42,44,1,0,0,0,43,41,1,0,
	0,0,44,87,5,6,0,0,45,49,5,7,0,0,46,48,3,4,2,0,47,46,1,0,0,0,48,51,1,0,0,
	0,49,47,1,0,0,0,49,50,1,0,0,0,50,52,1,0,0,0,51,49,1,0,0,0,52,87,5,8,0,0,
	53,57,5,9,0,0,54,56,3,4,2,0,55,54,1,0,0,0,56,59,1,0,0,0,57,55,1,0,0,0,57,
	58,1,0,0,0,58,60,1,0,0,0,59,57,1,0,0,0,60,87,5,10,0,0,61,65,5,11,0,0,62,
	64,3,4,2,0,63,62,1,0,0,0,64,67,1,0,0,0,65,63,1,0,0,0,65,66,1,0,0,0,66,68,
	1,0,0,0,67,65,1,0,0,0,68,87,5,12,0,0,69,73,5,13,0,0,70,72,3,4,2,0,71,70,
	1,0,0,0,72,75,1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,76,1,0,0,0,75,73,1,
	0,0,0,76,87,5,14,0,0,77,81,5,15,0,0,78,80,3,4,2,0,79,78,1,0,0,0,80,83,1,
	0,0,0,81,79,1,0,0,0,81,82,1,0,0,0,82,84,1,0,0,0,83,81,1,0,0,0,84,87,5,15,
	0,0,85,87,3,6,3,0,86,21,1,0,0,0,86,29,1,0,0,0,86,37,1,0,0,0,86,45,1,0,0,
	0,86,53,1,0,0,0,86,61,1,0,0,0,86,69,1,0,0,0,86,77,1,0,0,0,86,85,1,0,0,0,
	87,5,1,0,0,0,88,90,5,22,0,0,89,88,1,0,0,0,89,90,1,0,0,0,90,92,1,0,0,0,91,
	93,7,0,0,0,92,91,1,0,0,0,93,94,1,0,0,0,94,92,1,0,0,0,94,95,1,0,0,0,95,98,
	1,0,0,0,96,98,5,22,0,0,97,89,1,0,0,0,97,96,1,0,0,0,98,7,1,0,0,0,15,11,16,
	19,25,33,41,49,57,65,73,81,86,89,94,97];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FormatParser.__ATN) {
			FormatParser.__ATN = new ATNDeserializer().deserialize(FormatParser._serializedATN);
		}

		return FormatParser.__ATN;
	}


	static DecisionsToDFA = FormatParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class SectionContext extends ParserRuleContext {
	constructor(parser?: FormatParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public para_list(): ParaContext[] {
		return this.getTypedRuleContexts(ParaContext) as ParaContext[];
	}
	public para(i: number): ParaContext {
		return this.getTypedRuleContext(ParaContext, i) as ParaContext;
	}
    public get ruleIndex(): number {
    	return FormatParser.RULE_section;
	}
	public enterRule(listener: FormatListener): void {
	    if(listener.enterSection) {
	 		listener.enterSection(this);
		}
	}
	public exitRule(listener: FormatListener): void {
	    if(listener.exitSection) {
	 		listener.exitSection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FormatVisitor<Result>): Result {
		if (visitor.visitSection) {
			return visitor.visitSection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParaContext extends ParserRuleContext {
	constructor(parser?: FormatParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sent_list(): SentContext[] {
		return this.getTypedRuleContexts(SentContext) as SentContext[];
	}
	public sent(i: number): SentContext {
		return this.getTypedRuleContext(SentContext, i) as SentContext;
	}
	public NEWLINE(): TerminalNode {
		return this.getToken(FormatParser.NEWLINE, 0);
	}
    public get ruleIndex(): number {
    	return FormatParser.RULE_para;
	}
	public enterRule(listener: FormatListener): void {
	    if(listener.enterPara) {
	 		listener.enterPara(this);
		}
	}
	public exitRule(listener: FormatListener): void {
	    if(listener.exitPara) {
	 		listener.exitPara(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FormatVisitor<Result>): Result {
		if (visitor.visitPara) {
			return visitor.visitPara(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SentContext extends ParserRuleContext {
	constructor(parser?: FormatParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sent_list(): SentContext[] {
		return this.getTypedRuleContexts(SentContext) as SentContext[];
	}
	public sent(i: number): SentContext {
		return this.getTypedRuleContext(SentContext, i) as SentContext;
	}
	public str(): StrContext {
		return this.getTypedRuleContext(StrContext, 0) as StrContext;
	}
    public get ruleIndex(): number {
    	return FormatParser.RULE_sent;
	}
	public enterRule(listener: FormatListener): void {
	    if(listener.enterSent) {
	 		listener.enterSent(this);
		}
	}
	public exitRule(listener: FormatListener): void {
	    if(listener.exitSent) {
	 		listener.exitSent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FormatVisitor<Result>): Result {
		if (visitor.visitSent) {
			return visitor.visitSent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StrContext extends ParserRuleContext {
	constructor(parser?: FormatParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WORDS(): TerminalNode {
		return this.getToken(FormatParser.WORDS, 0);
	}
    public get ruleIndex(): number {
    	return FormatParser.RULE_str;
	}
	public enterRule(listener: FormatListener): void {
	    if(listener.enterStr) {
	 		listener.enterStr(this);
		}
	}
	public exitRule(listener: FormatListener): void {
	    if(listener.exitStr) {
	 		listener.exitStr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FormatVisitor<Result>): Result {
		if (visitor.visitStr) {
			return visitor.visitStr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
