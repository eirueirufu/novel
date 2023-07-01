import * as vscode from 'vscode';
import { StorageTreeItem } from './characterTree';
import * as path from 'path';

export function registerHighlight(context: vscode.ExtensionContext) {
	const configKey = "novel.highlightWords"
	let highlightWords = refreshHighlightWordsConf();

	updateDecorations();
	vscode.commands.registerTextEditorCommand('highlight.select', async editor => {
		const color = await vscode.window.showInputBox({
			title: '高亮颜色', value: 'pink', valueSelection: [0, 4],
			prompt: '[👉选择自己喜欢的颜色](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool)'
		})
		if (!color) {
			return
		}

		let words = vscode.workspace.getConfiguration().get(configKey) as [string, string][] ?? []
		let selectedWords: [string, string][] = []
		for (const selection of editor.selections) {
			const word = editor.document.getText(selection);
			selectedWords.push([word, color]);
		}

		const filteredWords = words.filter(x => {
			return selectedWords.some(y => x[0] === y[0]);
		});
		words.push(...selectedWords)
		words = words.filter(x => {
			return !filteredWords.some(y => x[0] === y[0])
		});
		return vscode.workspace.getConfiguration().update(configKey, words)
	});

	function refreshHighlightWordsConf() {
		return vscode.workspace.getConfiguration().get(configKey) as [string, string][] ?? [];
	}
	function updateDecorations() {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor || activeEditor.document.languageId !== "novel") {
			return;
		}
		const mp = new Map<string, vscode.DecorationOptions[]>();
		for (const highlightWord of highlightWords) {
			const word = highlightWord[0];
			const color = highlightWord[1];
			const regEx = new RegExp(word, "g");
			const text = activeEditor.document.getText();
			let match;
			const array = mp.get(color) ?? [];
			while ((match = regEx.exec(text))) {
				const startPos = activeEditor.document.positionAt(match.index);
				const endPos = activeEditor.document.positionAt(match.index + word.length);
				const decoration = { range: new vscode.Range(startPos, endPos) };
				array.push(decoration);
			}
			mp.set(color, array);
		}
		mp.forEach((v, k) => {
			const decorationType = vscode.window.createTextEditorDecorationType({ color: k });
			activeEditor.setDecorations(decorationType, v);
		});
	}

	vscode.workspace.onDidChangeConfiguration(event => {
		if (!event.affectsConfiguration("novel.highlightWords")) {
			return undefined
		}
		highlightWords = refreshHighlightWordsConf();
		updateDecorations();
	})

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		updateDecorations();
	}));

	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
		updateDecorations();
	}));
}