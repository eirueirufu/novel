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
	public static readonly NEWLINE = 20;
	public static readonly WORDS = 21;
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
                                                             "NEWLINE", 
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
			this.state = 11;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4172458) !== 0)) {
				{
				{
				this.state = 8;
				this.para();
				}
				}
				this.state = 13;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
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
	public para(): ParaContext {
		let localctx: ParaContext = new ParaContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, FormatParser.RULE_para);
		try {
			let _alt: number;
			this.state = 23;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 9:
			case 11:
			case 13:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 21:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 15;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 14;
						this.sent();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 17;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 20;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
				case 1:
					{
					this.state = 19;
					this.match(FormatParser.NEWLINE);
					}
					break;
				}
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 22;
				this.match(FormatParser.NEWLINE);
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
	public sent(): SentContext {
		let localctx: SentContext = new SentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, FormatParser.RULE_sent);
		let _la: number;
		try {
			let _alt: number;
			this.state = 90;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 25;
				this.match(FormatParser.T__0);
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 26;
					this.sent();
					}
					}
					this.state = 31;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 32;
				this.match(FormatParser.T__1);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 33;
				this.match(FormatParser.T__2);
				this.state = 37;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 34;
					this.sent();
					}
					}
					this.state = 39;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 40;
				this.match(FormatParser.T__3);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 41;
				this.match(FormatParser.T__4);
				this.state = 45;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 42;
					this.sent();
					}
					}
					this.state = 47;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 48;
				this.match(FormatParser.T__5);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 49;
				this.match(FormatParser.T__6);
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 50;
					this.sent();
					}
					}
					this.state = 55;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 56;
				this.match(FormatParser.T__7);
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 57;
				this.match(FormatParser.T__8);
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 58;
					this.sent();
					}
					}
					this.state = 63;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 64;
				this.match(FormatParser.T__9);
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 65;
				this.match(FormatParser.T__10);
				this.state = 69;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 66;
					this.sent();
					}
					}
					this.state = 71;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 72;
				this.match(FormatParser.T__11);
				}
				break;
			case 13:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 73;
				this.match(FormatParser.T__12);
				this.state = 77;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3123882) !== 0)) {
					{
					{
					this.state = 74;
					this.sent();
					}
					}
					this.state = 79;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 80;
				this.match(FormatParser.T__13);
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 81;
				this.match(FormatParser.T__14);
				this.state = 85;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 82;
						this.sent();
						}
						}
					}
					this.state = 87;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
				}
				this.state = 88;
				this.match(FormatParser.T__14);
				}
				break;
			case 16:
			case 17:
			case 18:
			case 19:
			case 21:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 89;
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
			this.state = 101;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 93;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===21) {
					{
					this.state = 92;
					this.match(FormatParser.WORDS);
					}
				}

				this.state = 96;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 95;
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
					this.state = 98;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 100;
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

	public static readonly _serializedATN: number[] = [4,1,21,104,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,1,0,5,0,10,8,0,10,0,12,0,13,9,0,1,1,4,1,16,8,1,11,
	1,12,1,17,1,1,3,1,21,8,1,1,1,3,1,24,8,1,1,2,1,2,5,2,28,8,2,10,2,12,2,31,
	9,2,1,2,1,2,1,2,5,2,36,8,2,10,2,12,2,39,9,2,1,2,1,2,1,2,5,2,44,8,2,10,2,
	12,2,47,9,2,1,2,1,2,1,2,5,2,52,8,2,10,2,12,2,55,9,2,1,2,1,2,1,2,5,2,60,
	8,2,10,2,12,2,63,9,2,1,2,1,2,1,2,5,2,68,8,2,10,2,12,2,71,9,2,1,2,1,2,1,
	2,5,2,76,8,2,10,2,12,2,79,9,2,1,2,1,2,1,2,5,2,84,8,2,10,2,12,2,87,9,2,1,
	2,1,2,3,2,91,8,2,1,3,3,3,94,8,3,1,3,4,3,97,8,3,11,3,12,3,98,1,3,3,3,102,
	8,3,1,3,0,0,4,0,2,4,6,0,1,1,0,16,19,122,0,11,1,0,0,0,2,23,1,0,0,0,4,90,
	1,0,0,0,6,101,1,0,0,0,8,10,3,2,1,0,9,8,1,0,0,0,10,13,1,0,0,0,11,9,1,0,0,
	0,11,12,1,0,0,0,12,1,1,0,0,0,13,11,1,0,0,0,14,16,3,4,2,0,15,14,1,0,0,0,
	16,17,1,0,0,0,17,15,1,0,0,0,17,18,1,0,0,0,18,20,1,0,0,0,19,21,5,20,0,0,
	20,19,1,0,0,0,20,21,1,0,0,0,21,24,1,0,0,0,22,24,5,20,0,0,23,15,1,0,0,0,
	23,22,1,0,0,0,24,3,1,0,0,0,25,29,5,1,0,0,26,28,3,4,2,0,27,26,1,0,0,0,28,
	31,1,0,0,0,29,27,1,0,0,0,29,30,1,0,0,0,30,32,1,0,0,0,31,29,1,0,0,0,32,91,
	5,2,0,0,33,37,5,3,0,0,34,36,3,4,2,0,35,34,1,0,0,0,36,39,1,0,0,0,37,35,1,
	0,0,0,37,38,1,0,0,0,38,40,1,0,0,0,39,37,1,0,0,0,40,91,5,4,0,0,41,45,5,5,
	0,0,42,44,3,4,2,0,43,42,1,0,0,0,44,47,1,0,0,0,45,43,1,0,0,0,45,46,1,0,0,
	0,46,48,1,0,0,0,47,45,1,0,0,0,48,91,5,6,0,0,49,53,5,7,0,0,50,52,3,4,2,0,
	51,50,1,0,0,0,52,55,1,0,0,0,53,51,1,0,0,0,53,54,1,0,0,0,54,56,1,0,0,0,55,
	53,1,0,0,0,56,91,5,8,0,0,57,61,5,9,0,0,58,60,3,4,2,0,59,58,1,0,0,0,60,63,
	1,0,0,0,61,59,1,0,0,0,61,62,1,0,0,0,62,64,1,0,0,0,63,61,1,0,0,0,64,91,5,
	10,0,0,65,69,5,11,0,0,66,68,3,4,2,0,67,66,1,0,0,0,68,71,1,0,0,0,69,67,1,
	0,0,0,69,70,1,0,0,0,70,72,1,0,0,0,71,69,1,0,0,0,72,91,5,12,0,0,73,77,5,
	13,0,0,74,76,3,4,2,0,75,74,1,0,0,0,76,79,1,0,0,0,77,75,1,0,0,0,77,78,1,
	0,0,0,78,80,1,0,0,0,79,77,1,0,0,0,80,91,5,14,0,0,81,85,5,15,0,0,82,84,3,
	4,2,0,83,82,1,0,0,0,84,87,1,0,0,0,85,83,1,0,0,0,85,86,1,0,0,0,86,88,1,0,
	0,0,87,85,1,0,0,0,88,91,5,15,0,0,89,91,3,6,3,0,90,25,1,0,0,0,90,33,1,0,
	0,0,90,41,1,0,0,0,90,49,1,0,0,0,90,57,1,0,0,0,90,65,1,0,0,0,90,73,1,0,0,
	0,90,81,1,0,0,0,90,89,1,0,0,0,91,5,1,0,0,0,92,94,5,21,0,0,93,92,1,0,0,0,
	93,94,1,0,0,0,94,96,1,0,0,0,95,97,7,0,0,0,96,95,1,0,0,0,97,98,1,0,0,0,98,
	96,1,0,0,0,98,99,1,0,0,0,99,102,1,0,0,0,100,102,5,21,0,0,101,93,1,0,0,0,
	101,100,1,0,0,0,102,7,1,0,0,0,16,11,17,20,23,29,37,45,53,61,69,77,85,90,
	93,98,101];

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
