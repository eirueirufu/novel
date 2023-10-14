import Highlight from './highlight';
import Tag from './tag';
import * as vscode from 'vscode';

export default class Decoration {
	highlight: Highlight;
	tag: Tag;
	timeout: NodeJS.Timer | undefined = undefined;

	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.highlight = new Highlight(this.context);
		this.tag = new Tag(this.context);
	}

	async activate() {
		await this.tag.activate();
		await this.highlight.activate();
		this.context.subscriptions.push(
			vscode.workspace.onDidChangeConfiguration(() => {
				this.triggerUpdateDecorations(true);
			}),
			vscode.window.onDidChangeActiveTextEditor(() => {
				this.triggerUpdateDecorations(true);
			}),
			vscode.workspace.onDidChangeTextDocument(() => {
				this.triggerUpdateDecorations(true);
			})
		);
		this.triggerUpdateDecorations(true);
	}

	updateDecorations() {
		this.highlight.updateDecorations();
		this.tag.decorateTags();
	}

	triggerUpdateDecorations(throttle = false) {
		if (this.timeout) {
			clearTimeout(this.timeout);
			this.timeout = undefined;
		}
		if (throttle) {
			this.timeout = setTimeout(() => {
				this.updateDecorations();
			}, 200);
		} else {
			this.updateDecorations();
		}
	}
}
