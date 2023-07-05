import * as vscode from 'vscode';

export function registerCommonCmd() {
	vscode.commands.registerCommand(
		'openFile',
		(uri: vscode.Uri | undefined) => {
			if (!uri) {
				return;
			}
			return vscode.window.showTextDocument(uri);
		}
	);
}
