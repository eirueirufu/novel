import * as vscode from 'vscode';
import OpenAI from 'openai';

export default class Gpt {
	configKey: string = 'novel.openaiKey';
	baseURL: string = 'novel.openaiBaseURL';
	gptModel: string = 'novel.gptModel';
	gptChatSystem: string = 'novel.gptChatSystem';

	private context: vscode.ExtensionContext;
	outputChannel: vscode.OutputChannel;
	openai?: OpenAI;
	statusBarItem: vscode.StatusBarItem;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.outputChannel = vscode.window.createOutputChannel(
			'novel',
			'novel'
		);
		this.statusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Left,
			9999
		);
		this.statusBarItem.text = '$(loading~spin) GPT提问中...';
		this.statusBarItem.backgroundColor = new vscode.ThemeColor(
			'statusBarItem.warningBackground'
		);
		this.refreshOpenai();
	}

	async activate() {
		this.context.subscriptions.push(
			vscode.workspace.onDidChangeConfiguration(async event => {
				if (
					!event.affectsConfiguration(this.configKey) &&
					!event.affectsConfiguration(this.baseURL)
				) {
					return;
				}
				this.refreshOpenai();
			}),
			vscode.commands.registerTextEditorCommand(
				'gpt.config',
				async () => {
					await this.inputApiKey();
				}
			),
			vscode.commands.registerTextEditorCommand(
				'gpt.quest',
				async editor => {
					if (!this.openai) {
						await this.inputApiKey();
						return;
					}
					let questText =
						(await vscode.window.showInputBox({
							title: '输入提问内容',
							prompt: '可以右键选择文本进行提问',
						})) ?? '';
					if (questText.length === 0) {
						return;
					}

					let text = '';
					for (const selection of editor.selections) {
						const selectedText = editor.document.getText(selection);
						if (selectedText.length === 0) {
							continue;
						}
						text = text + selectedText;
					}
					if (text.length > 0) {
						questText = questText + '\n' + text + '\n';
					}
					await this.quest(questText);
				}
			)
		);
	}

	refreshOpenai() {
		const key = vscode.workspace
			.getConfiguration()
			.get(this.configKey) as string;
		const url = vscode.workspace
			.getConfiguration()
			.get(this.baseURL) as string;
		if (!key) {
			this.openai = undefined;
			return;
		}

		this.openai = new OpenAI({
			timeout: 10000,
			apiKey: key,
			baseURL: url ? url : undefined,
		});
	}

	async inputApiKey() {
		const openaiKey =
			(await vscode.window.showInputBox({
				title: '请输入你的api key',
				password: true,
				prompt:
					'你可以在👉[官网](https://platform.openai.com/account/api-keys)里生成自己的api key，本插件不会保存你的api key，请放心使用',
			})) ?? '';

		await vscode.workspace
			.getConfiguration()
			.update(this.configKey, openaiKey);
	}

	async quest(questText: string) {
		if (!this.openai) {
			await this.inputApiKey();
			return;
		}

		this.statusBarItem.show();
		this.outputChannel.clear();
		this.outputChannel.show();
		this.outputChannel.append('Q:\n');
		this.outputChannel.append(questText + '\n');
		this.outputChannel.append('A:\n');
		try {
			const chatCompletion = await this.openai.chat.completions.create({
				model: vscode.workspace
					.getConfiguration()
					.get(this.gptModel) as string,
				stream: true,
				messages: [
					{
						role: 'system',
						content: vscode.workspace
							.getConfiguration()
							.get(this.gptChatSystem) as string,
					},
					{role: 'user', content: questText},
				],
			});
			for await (const x of chatCompletion) {
				this.outputChannel.append(x.choices[0].delta.content ?? '');
			}
		} catch (error) {
			this.outputChannel.append(JSON.stringify(error));
		} finally {
			this.statusBarItem.hide();
		}
	}
}
