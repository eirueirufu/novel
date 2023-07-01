import * as vscode from 'vscode';
import { StorageTreeItem } from './characterTree';
import * as path from 'path';

export function registerHighlight(context: vscode.ExtensionContext) {
	const configKey = "novel.highlightWords";
	const decorationMap = new Map<string, vscode.TextEditorDecorationType>();
	let highlightWords: [string, string][] = [];
	let timeout: NodeJS.Timer | undefined = undefined;
	triggerUpdateDecorations(true);
	vscode.commands.registerTextEditorCommand('highlight.select', async editor => {
		const color = await vscode.window.showInputBox({
			title: '高亮颜色', value: 'pink', valueSelection: [0, 4],
			prompt: '[👉选择自己喜欢的颜色](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Colors/Color_picker_tool), 取消时可随意选择颜色'
		})
		if (!color) {
			return
		}

		let words = vscode.workspace.getConfiguration().get(configKey) as [string, string][] ?? []
		let selectedWords: [string, string][] = []
		for (const selection of editor.selections) {
			const word = editor.document.getText(selection);
			if (word.length == 0) {
				continue
			}
			selectedWords.push([word, color]);
		}

		const filteredWords = words.filter(x => {
			return selectedWords.some(y => x[0] === y[0]);
		});
		words.push(...selectedWords)
		words = words.filter(x => {
			return !filteredWords.some(y => x[0] === y[0])
		});
		await vscode.workspace.getConfiguration().update(configKey, words)
	});

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

		decorationMap.forEach((v, k) => {
			if (mp.has(k)) {
				return
			}
			activeEditor.setDecorations(v, []);
		});
		mp.forEach((v, k) => {
			let decorationType = decorationMap.get(k)
			if (!decorationType) {
				decorationType = vscode.window.createTextEditorDecorationType({ color: k });
				decorationMap.set(k, decorationType)
			}
			activeEditor.setDecorations(decorationType, v);
		});
	}

	function triggerUpdateDecorations(throttle = false) {
		if (timeout) {
			clearTimeout(timeout);
			timeout = undefined;
		}
		if (throttle) {
			timeout = setTimeout(updateDecorations, 200);
		} else {
			updateDecorations();
		}
	}

	vscode.workspace.onDidChangeConfiguration(event => {
		if (!event.affectsConfiguration(configKey)) {
			return undefined
		}
		highlightWords = vscode.workspace.getConfiguration().get(configKey) as [string, string][] ?? [];
		triggerUpdateDecorations(true);
	})

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		triggerUpdateDecorations(true);
	}));

	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
		triggerUpdateDecorations(true);
	}));
}