import * as vscode from 'vscode';
import { registerHighlight } from './heighlight'

export function activate(context: vscode.ExtensionContext) {
	registerHighlight(context);

	const storageProvider = new StorageProvider()
	vscode.window.registerTreeDataProvider('novelCharacters', storageProvider);
	vscode.commands.registerCommand('characters.addCharacter', () => {
		vscode.window.showInformationMessage('todo');
	});
}

class StorageProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
	getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
		const mockItems: vscode.TreeItem[] = [{ label: "人物1", contextValue: "folder" }, { label: "人物2", contextValue: "folder" }, { label: "人物3", contextValue: "folder" }];
		return Promise.resolve(mockItems)
	}
}