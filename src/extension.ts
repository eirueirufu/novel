import * as vscode from 'vscode';
import {registerCommonCmd} from './commonCmd';
import {registerHighlight} from './heighlight';
import {registerCompletion} from './completion';
import {registerGpt} from './gpt';

export async function activate(context: vscode.ExtensionContext) {
	registerCommonCmd();
	registerHighlight(context);
	registerCompletion(context);
	registerGpt(context);
}
