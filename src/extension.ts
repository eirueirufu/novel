import * as vscode from 'vscode';
import * as path from 'path';
import { registerCommonCmd } from './commonCmd'
import { registerHighlight } from './heighlight'
import { registerCharacterTree } from './characterTree'

export function activate(context: vscode.ExtensionContext) {
	registerCommonCmd(context);
	registerHighlight(context);
	registerCharacterTree(context);
}

