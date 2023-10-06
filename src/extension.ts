import * as vscode from 'vscode';
import Highlight from './highlight';
import Completion from './completion';
import Gpt from './gpt';
import Format from './format/format';

export async function activate(context: vscode.ExtensionContext) {
	await new Completion(context).activate();
	await new Gpt(context).activate();
	await new Highlight(context).activate();
	await new Format(context).activate();
}
