import * as vscode from 'vscode';
import { registerCommonCmd } from './commonCmd'
import { registerHighlight } from './heighlight'
import { registerCharacterTree } from './characterTree'
import { registerCompletion } from './completion'

export async function activate(context: vscode.ExtensionContext) {
	registerCommonCmd(context);
	registerHighlight(context);
	registerCharacterTree(context);
	registerCompletion(context);
}

