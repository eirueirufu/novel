import * as vscode from 'vscode';
import { registerHighlight } from './heighlight'

export function activate(context: vscode.ExtensionContext) {
	registerHighlight(context);
}

