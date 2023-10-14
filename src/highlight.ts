import * as vscode from 'vscode';

export default class Highlight {
	configKey: string = 'novel.highlightWords';
	decorationMap: Map<string, vscode.TextEditorDecorationType>;
	highlightWords: [string, string][] = [];

	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.decorationMap = new Map<string, vscode.TextEditorDecorationType>();
	}

	async activate() {
		this.highlightWords =
			(vscode.workspace.getConfiguration().get(this.configKey) as [
				string,
				string
			][]) ?? [];
		this.context.subscriptions.push(
			vscode.commands.registerTextEditorCommand(
				'highlight.select',
				async editor => {
					const color = await vscode.window.showInputBox({
						title: '高亮颜色',
						value: 'pink',
						valueSelection: [0, 4],
						prompt:
							'[👉选择自己喜欢的颜色](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool)',
					});
					if (!color) {
						return;
					}

					let words =
						(vscode.workspace
							.getConfiguration()
							.get(this.configKey) as [string, string][]) ?? [];
					const selectedWords: [string, string][] = [];
					for (const selection of editor.selections) {
						const word = editor.document.getText(selection);
						if (word.length === 0) {
							continue;
						}
						selectedWords.push([word, color]);
					}

					const filteredWords = words.filter(x => {
						return selectedWords.some(y => x[0] === y[0]);
					});
					words.push(...selectedWords);
					words = words.filter(x => {
						return !filteredWords.some(y => x[0] === y[0]);
					});
					await vscode.workspace
						.getConfiguration()
						.update(this.configKey, words);
				}
			),
			vscode.commands.registerTextEditorCommand(
				'highlight.selectCancel',
				async editor => {
					let words =
						(vscode.workspace
							.getConfiguration()
							.get(this.configKey) as [string, string][]) ?? [];
					const selectedWords: string[] = [];
					for (const selection of editor.selections) {
						const word = editor.document.getText(selection);
						if (word.length === 0) {
							continue;
						}
						selectedWords.push(word);
					}

					words = words.filter(x => {
						return !selectedWords.includes(x[0]);
					});
					await vscode.workspace
						.getConfiguration()
						.update(this.configKey, words);
				}
			)
		);
	}

	updateDecorations() {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor || activeEditor.document.languageId !== 'novel') {
			return;
		}
		const mp = new Map<string, vscode.DecorationOptions[]>();
		for (const highlightWord of this.highlightWords) {
			const word = highlightWord[0];
			const color = highlightWord[1];
			const regEx = new RegExp(word, 'g');
			const text = activeEditor.document.getText();
			let match;
			const array = mp.get(color) ?? [];
			while ((match = regEx.exec(text))) {
				const startPos = activeEditor.document.positionAt(match.index);
				const endPos = activeEditor.document.positionAt(
					match.index + word.length
				);
				const decoration = {range: new vscode.Range(startPos, endPos)};
				array.push(decoration);
			}
			mp.set(color, array);
		}

		this.decorationMap.forEach((v, k) => {
			if (mp.has(k)) {
				return;
			}
			activeEditor.setDecorations(v, []);
		});
		mp.forEach((v, k) => {
			let decorationType = this.decorationMap.get(k);
			if (!decorationType) {
				decorationType = vscode.window.createTextEditorDecorationType({
					color: k,
				});
				this.decorationMap.set(k, decorationType);
			}
			activeEditor.setDecorations(decorationType, v);
		});
	}
}
