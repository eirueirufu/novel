import * as vscode from 'vscode'
import { registerCommonCmd } from './commonCmd'
import { registerHighlight } from './heighlight'
import { registerWorkspaceTree } from './workspaceTree'
import { registerCompletion } from './completion'
import { registerGpt } from './gpt'

export async function activate(context: vscode.ExtensionContext) {
	registerCommonCmd(context);
	registerHighlight(context);
	registerWorkspaceTree(context);
	registerCompletion(context);
	registerGpt(context);
}