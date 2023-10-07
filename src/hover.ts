import * as vscode from 'vscode';
import wiki from 'wikipedia';

export default class Hover implements vscode.HoverProvider {
	private context: vscode.ExtensionContext;
	constructor(context: vscode.ExtensionContext) {
		wiki.setLang('zh');
		this.context = context;
	}

	async activate() {
		this.context.subscriptions.push(
			vscode.languages.registerHoverProvider('novel', this)
		);
	}

	provideHover(
		document: vscode.TextDocument,
		position: vscode.Position,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		token: vscode.CancellationToken
	): vscode.ProviderResult<vscode.Hover> {
		const editor = vscode.window.activeTextEditor;
		if (!editor || editor.document.languageId !== 'novel') {
			return;
		}
		const selections = editor.selections;
		if (selections.length === 0) {
			return;
		}
		const range = selections[0];
		if (!range.contains(position)) {
			return;
		}
		const selectedText = editor.document.getText(range);

		return wiki.page(selectedText).then(page => {
			return page.intro().then(intro => {
				const content = `\`\`\`\n${intro}\n\`\`\`\n---\n${page.fullurl}`;
				return new vscode.Hover(content, range);
			});
		});
	}
}
