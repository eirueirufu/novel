import * as vscode from 'vscode';
import OpenAI from 'openai';

export async function registerGpt(context: vscode.ExtensionContext) {
	const configKey = 'novel.openaiKey';
	const baseURL = 'novel.openaiBaseURL';
	const gptModel = 'novel.gptModel';
	const gptChatSystem = 'novel.gptChatSystem';

	const newOpenai = () => {
		const url = vscode.workspace.getConfiguration().get(baseURL) as string;
		return new OpenAI({
			timeout: 10000,
			apiKey: vscode.workspace.getConfiguration().get(configKey),
			baseURL: url ? url : undefined,
		});
	};

	const outputChannel = vscode.window.createOutputChannel('novel', 'novel');
	let openai = newOpenai();

	const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
		vscode.StatusBarAlignment.Left,
		9999
	);
	statusBarItem.text = '$(loading~spin) GPT提问中...';
	statusBarItem.backgroundColor = new vscode.ThemeColor(
		'statusBarItem.warningBackground'
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(async event => {
			if (
				!event.affectsConfiguration(configKey) &&
				!event.affectsConfiguration(baseURL)
			) {
				return;
			}
			openai = newOpenai();
		})
	);

	async function inputApiKey() {
		const openaiKey =
			(await vscode.window.showInputBox({
				title: '请输入你的api key',
				password: true,
				prompt:
					'你可以在👉[官网](https://platform.openai.com/account/api-keys)里生成自己的api key，本插件不会保存你的api key，请放心使用',
			})) ?? '';

		await vscode.workspace.getConfiguration().update(configKey, openaiKey);
	}
	vscode.commands.registerTextEditorCommand('gpt.config', async () => {
		await inputApiKey();
	});
	vscode.commands.registerTextEditorCommand('gpt.quest', async editor => {
		if (!vscode.workspace.getConfiguration().get(configKey)) {
			await inputApiKey();
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

		statusBarItem.show();
		outputChannel.clear();
		outputChannel.show();
		outputChannel.append('Q:\n');
		outputChannel.append(questText + '\n');
		outputChannel.append('A:\n');

		try {
			const chatCompletion = await openai.chat.completions.create({
				model: vscode.workspace
					.getConfiguration()
					.get(gptModel) as string,
				stream: true,
				messages: [
					{
						role: 'system',
						content: vscode.workspace
							.getConfiguration()
							.get(gptChatSystem) as string,
					},
					{role: 'user', content: questText},
				],
			});
			for await (const x of chatCompletion) {
				outputChannel.append(x.choices[0].delta.content ?? '');
			}
		} catch (error) {
			outputChannel.append(JSON.stringify(error));
		} finally {
			statusBarItem.hide();
		}
	});
}
