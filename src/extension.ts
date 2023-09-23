import * as vscode from 'vscode';
import {registerHighlight} from './heighlight';
import {registerGpt} from './gpt';
import Completion from './completion';

export async function activate(context: vscode.ExtensionContext) {
	await new Completion(context).activate();
	registerHighlight(context);
	registerGpt(context);
}
