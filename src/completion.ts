import * as vscode from 'vscode';
import Fuse from 'fuse.js'
import * as fs from 'fs';
import * as path from 'path';

export async function registerCompletion(context: vscode.ExtensionContext) {
	const configKey = "novel.completionFilePath";

	vscode.commands.registerCommand('completion.selectConfigFile', async () => {
		const result = await vscode.window.showOpenDialog({
			canSelectFiles: true,
			canSelectFolders: false,
			canSelectMany: true,
			title: '请选择提示配置文件，每个提示之间要用换行'
		});
		if (!result || result.length == 0) {
			return
		}
		const configPath = result[0].path
		await vscode.workspace.getConfiguration().update(configKey, configPath)
	});

	const completionItemProvider = new CompletionItemProvider();
	const words = await getCompletionWords();
	if (words) {
		completionItemProvider.refreshFuse(words);
	}

	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider('novel', completionItemProvider)
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(async event => {
			if (!event.affectsConfiguration(configKey)) {
				return
			}
			const words = await getCompletionWords();
			if (!words) {
				return
			}
			completionItemProvider.refreshFuse(words);
		})
	);

	async function getCompletionWords() {
		let completionFilePath = vscode.workspace.getConfiguration().get(configKey) as string
		if (!completionFilePath) {
			completionFilePath = context.asAbsolutePath(path.posix.join('media', 'completion'));
		}
		const data = await vscode.workspace.fs.readFile(vscode.Uri.parse(completionFilePath))
		const textDecoder = new TextDecoder();
		const result = textDecoder.decode(data);
		const list = result.split(/\r?\n/);
		return list;
	}
}

export class CompletionItemProvider implements vscode.CompletionItemProvider {
	fuse: Fuse<string>
	constructor() {
		this.fuse = new Fuse([]);
	}
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position,
		token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] {
		const linePrefix = document.lineAt(position).text.substring(0, position.character);
		const regex = /[\u4e00-\u9fa5]{1,4}$/;
		const match = linePrefix.match(regex);
		if (!match) {
			return [];
		}
		const str = match[0];

		const items: vscode.CompletionItem[] = [];
		const added = new Set<string>();
		for (let start = 0; start < str.length; start++) {
			const substr = str.substring(start)
			const result = this.fuse.search(substr)
			const range = new vscode.Range(new vscode.Position(position.line, position.character - substr.length), position);
			let labels = result.map(item => {
				return item.item;
			})
			for (const label of labels) {
				if (added.has(label)) {
					continue
				}
				added.add(label);
				const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Text);
				item.range = range
				items.push(item);
			}
		}

		return items;
	}

	refreshFuse(words: string[]) {
		this.fuse = new Fuse(words, { threshold: 0 });
	}
}