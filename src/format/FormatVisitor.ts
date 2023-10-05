// Generated from Format.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { SectionContext } from "./FormatParser";
import { ParaContext } from "./FormatParser";
import { SentContext } from "./FormatParser";
import { StrContext } from "./FormatParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FormatParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class FormatVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `FormatParser.section`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSection?: (ctx: SectionContext) => Result;
	/**
	 * Visit a parse tree produced by `FormatParser.para`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPara?: (ctx: ParaContext) => Result;
	/**
	 * Visit a parse tree produced by `FormatParser.sent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSent?: (ctx: SentContext) => Result;
	/**
	 * Visit a parse tree produced by `FormatParser.str`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStr?: (ctx: StrContext) => Result;
}

