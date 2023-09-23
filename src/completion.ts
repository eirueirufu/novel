import * as vscode from 'vscode';
import Fuse from 'fuse.js';
import * as path from 'path';

export default class Completion {
	dictPathConfig = 'novel.completionFilePath';

	private context: vscode.ExtensionContext;
	private completionItemProvider: CompletionItemProvider;
	private fs: vscode.FileSystem = vscode.workspace.fs;

	constructor(context: vscode.ExtensionContext, fs?: vscode.FileSystem) {
		this.context = context;
		this.completionItemProvider = new CompletionItemProvider();
		if (fs) {
			this.fs = fs;
		}
	}

	async getCompletionWords() {
		let completionFilePath = vscode.workspace
			.getConfiguration()
			.get(this.dictPathConfig) as string;
		if (!completionFilePath) {
			completionFilePath = this.context.asAbsolutePath(
				path.join('media', 'completion')
			);
		}
		const data = await this.fs.readFile(
			vscode.Uri.file(completionFilePath)
		);
		const textDecoder = new TextDecoder();
		const result = textDecoder.decode(data);
		const list = result.split(/\r?\n/);
		this.completionItemProvider.refreshFuse(list);
	}

	async activate() {
		await this.getCompletionWords();
		this.context.subscriptions.push(
			vscode.commands.registerCommand(
				'completion.selectConfigFile',
				async () => {
					const result = await vscode.window.showOpenDialog({
						canSelectFiles: true,
						canSelectFolders: false,
						canSelectMany: true,
						title: '请选择提示配置文件，每个提示之间要用换行',
					});
					if (!result || result.length === 0) {
						return;
					}
					const configPath = result[0].path;
					await vscode.workspace
						.getConfiguration()
						.update(this.dictPathConfig, configPath);
				}
			),
			vscode.languages.registerCompletionItemProvider(
				'novel',
				this.completionItemProvider
			),
			vscode.workspace.onDidChangeConfiguration(async event => {
				if (!event.affectsConfiguration(this.dictPathConfig)) {
					return;
				}
				await this.getCompletionWords();
			})
		);
	}
}

export class CompletionItemProvider implements vscode.CompletionItemProvider {
	private fuse: Fuse<string>;

	constructor() {
		this.fuse = new Fuse([]);
	}

	provideCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position
	): vscode.CompletionItem[] {
		const linePrefix = document
			.lineAt(position)
			.text.substring(0, position.character);
		const regex = /[\u4e00-\u9fa5]{1,4}$/;
		const match = linePrefix.match(regex);
		if (!match) {
			return [];
		}
		const str = match[0];

		const items: vscode.CompletionItem[] = [];
		const added = new Set<string>();
		for (let start = 0; start < str.length; start++) {
			const substr = str.substring(start);
			const result = this.fuse.search(substr);
			const range = new vscode.Range(
				new vscode.Position(
					position.line,
					position.character - substr.length
				),
				position
			);
			const labels = result.map(item => {
				return item.item;
			});
			for (const label of labels) {
				if (added.has(label)) {
					continue;
				}
				added.add(label);
				const item = new vscode.CompletionItem(
					label,
					vscode.CompletionItemKind.Text
				);
				item.range = range;
				items.push(item);
			}
		}

		return items;
	}

	refreshFuse(words: string[]) {
		this.fuse = new Fuse(words, {threshold: 0});
	}
}
