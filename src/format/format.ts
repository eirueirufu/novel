import {CharStream, CommonTokenStream} from 'antlr4';
import Lexer from './FormatLexer';
import Parser, {ParaContext, SectionContext, SentContext} from './FormatParser';
import FormatVisitor from './FormatVisitor';

export default class Format {
	private visitor: Visitor;
	maxParaLen: number;
	constructor() {
		this.visitor = new Visitor();
		this.maxParaLen = 200;
	}

	parse(text: string): Section {
		const chars = new CharStream(text);
		const lexer = new Lexer(chars);
		const tokens = new CommonTokenStream(lexer);
		const parser = new Parser(tokens);
		const tree = parser.section();
		return this.visitor.visit(tree) as Section;
	}

	format(text: string): string {
		const section = this.parse(text);
		const paras: string[] = [];
		section.Paras.forEach(para => {
			let formatting = '';
			para.Sents.forEach(sent => {
				if (formatting.length > this.maxParaLen) {
					paras.push(formatting.trim());
					formatting = '';
				}
				formatting += sent;
			});
			paras.push(formatting.trim());
		});
		if (paras.length > 0) {
			paras[0] = '\t' + paras[0];
		}
		return paras.join('\n\t');
	}
}

export interface Section {
	Paras: Para[];
}

export interface Para {
	Sents: string[];
}

export class Visitor extends FormatVisitor<unknown> {
	visitSection = (ctx: SectionContext): Section => {
		const paras: Para[] = [];
		ctx.para_list().forEach(item => {
			const para = super.visit(item) as Para;
			if (para.Sents.length > 0) {
				paras.push(para);
			}
		});
		return {Paras: paras};
	};
	visitPara = (ctx: ParaContext): Para => {
		const sents: string[] = [];
		ctx.sent_list().forEach(item => {
			const sent = super.visit(item) as string;
			if (sent) {
				sents.push(super.visit(item) as string);
			}
		});
		return {Sents: sents};
	};
	visitSent = (ctx: SentContext): string => {
		return ctx.getText();
	};
}
