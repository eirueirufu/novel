import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let highlightWords = refreshHighlightWordsConf();
	const decorationType = vscode.window.createTextEditorDecorationType({
		color: "pink",
	});
	let activeEditor = vscode.window.activeTextEditor;
	updateDecorations();

	function refreshHighlightWordsConf() {
		return vscode.workspace.getConfiguration().get("novel.highlightWords") as string[] ?? ["你", "我", "他", "她", "它"];
	}
	function updateDecorations() {
		if (!activeEditor || activeEditor.document.languageId !== "novel") {
			return;
		}
		const dec: vscode.DecorationOptions[] = [];
		for (const word of highlightWords) {
			const regEx = new RegExp(word, "g");
			const text = activeEditor.document.getText();
			let match;
			while ((match = regEx.exec(text))) {
				const startPos = activeEditor.document.positionAt(match.index);
				const endPos = activeEditor.document.positionAt(match.index + match[0].length);
				const decoration = { range: new vscode.Range(startPos, endPos) };
				dec.push(decoration);
			}
		}
		activeEditor.setDecorations(decorationType, dec);
	}

	vscode.workspace.onDidChangeConfiguration(event => {
		if (!event.affectsConfiguration("novel.highlightWords")) {
			return null
		}
		highlightWords = refreshHighlightWordsConf();
		updateDecorations();
	})

	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		activeEditor = editor;
		updateDecorations();
	}));

	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(event => {
		if (activeEditor && event.document === activeEditor.document) {
			updateDecorations();
		}
	}));


}

