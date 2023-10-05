import {CharStream, CommonTokenStream} from 'antlr4';
import Lexer from './FormatLexer';
import Parser, {ParaContext, SectionContext, SentContext} from './FormatParser';
import FormatVisitor from './FormatVisitor';
import * as vscode from 'vscode';

export default class Format implements vscode.DocumentFormattingEditProvider {
	maxParaLenConfig = 'novel.maxParaLen';

	private visitor: Visitor;
	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.visitor = new Visitor();
	}

	provideDocumentFormattingEdits(
		document: vscode.TextDocument
	): vscode.TextEdit[] {
		const text = document.getText();
		const format = this.format(text);
		const range = new vscode.Range(
			document.positionAt(0),
			document.positionAt(text.length)
		);
		return [new vscode.TextEdit(range, format)];
	}

	async activate() {
		this.context.subscriptions.push(
			vscode.languages.registerDocumentFormattingEditProvider(
				'novel',
				this
			)
		);
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
		const maxParaLen = vscode.workspace
			.getConfiguration()
			.get(this.maxParaLenConfig) as number;
		const section = this.parse(text);
		const paras: string[] = [];
		section.Paras.forEach(para => {
			let formatting = '';
			para.Sents.forEach(sent => {
				if (formatting.length > maxParaLen) {
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
