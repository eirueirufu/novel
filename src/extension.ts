import * as vscode from 'vscode';
import Completion from './completion';
import Gpt from './gpt';
import Format from './format/format';
import Hover from './hover';
import Decoration from './decoration';

export async function activate(context: vscode.ExtensionContext) {
	await new Completion(context).activate();
	await new Gpt(context).activate();
	await new Format(context).activate();
	await new Hover(context).activate();
	await new Decoration(context).activate();
}
