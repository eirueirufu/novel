// Generated from Format.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { SectionContext } from "./FormatParser";
import { ParaContext } from "./FormatParser";
import { SentContext } from "./FormatParser";
import { StrContext } from "./FormatParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `FormatParser`.
 */
export default class FormatListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `FormatParser.section`.
	 * @param ctx the parse tree
	 */
	enterSection?: (ctx: SectionContext) => void;
	/**
	 * Exit a parse tree produced by `FormatParser.section`.
	 * @param ctx the parse tree
	 */
	exitSection?: (ctx: SectionContext) => void;
	/**
	 * Enter a parse tree produced by `FormatParser.para`.
	 * @param ctx the parse tree
	 */
	enterPara?: (ctx: ParaContext) => void;
	/**
	 * Exit a parse tree produced by `FormatParser.para`.
	 * @param ctx the parse tree
	 */
	exitPara?: (ctx: ParaContext) => void;
	/**
	 * Enter a parse tree produced by `FormatParser.sent`.
	 * @param ctx the parse tree
	 */
	enterSent?: (ctx: SentContext) => void;
	/**
	 * Exit a parse tree produced by `FormatParser.sent`.
	 * @param ctx the parse tree
	 */
	exitSent?: (ctx: SentContext) => void;
	/**
	 * Enter a parse tree produced by `FormatParser.str`.
	 * @param ctx the parse tree
	 */
	enterStr?: (ctx: StrContext) => void;
	/**
	 * Exit a parse tree produced by `FormatParser.str`.
	 * @param ctx the parse tree
	 */
	exitStr?: (ctx: StrContext) => void;
}

