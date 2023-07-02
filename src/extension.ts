import * as vscode from 'vscode';
import { registerCommonCmd } from './commonCmd'
import { registerHighlight } from './heighlight'
import { registerCharacterTree } from './characterTree'

export function activate(context: vscode.ExtensionContext) {
	registerCommonCmd(context);
	registerHighlight(context);
	registerCharacterTree(context);

	const completionItemProvider = new CompletionItemProvider();
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('novel', completionItemProvider)
	);
}

export class CompletionItemProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position,
		token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] {
		const linePrefix = document.lineAt(position).text.substring(0, position.character);
		const regex = /[\u4e00-\u9fa5]+$/;
		const match = linePrefix.match(regex);
		if (!match) {
			return [];
		}

		let toMatchStr = match[0];
		if (toMatchStr.length > 10) {
			toMatchStr = toMatchStr.substring(toMatchStr.length - 10)
		}
		console.log(toMatchStr);

		// todo 根据需要的匹配字符串返回提示
		const items: vscode.CompletionItem[] = [
			{
				label: '测试',
				kind: vscode.CompletionItemKind.Text,
			}
		];
		return items;
	}
}