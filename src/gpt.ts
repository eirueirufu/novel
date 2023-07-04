import * as vscode from 'vscode'
import { OpenAIClient } from '@fern-api/openai'

export async function registerGpt(context: vscode.ExtensionContext) {
	const configKey = "novel.openaiKey";

	const outputChannel = vscode.window.createOutputChannel('novel', 'novel');
	let openaiKey = vscode.workspace.getConfiguration().get(configKey) as string
	let client = new OpenAIClient({
		token: openaiKey,
	});

	const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 9999);
	statusBarItem.text = "$(loading~spin) GPT提问中...";
	statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(async event => {
			if (!event.affectsConfiguration(configKey)) {
				return
			}
			openaiKey = vscode.workspace.getConfiguration().get(configKey) as string;
			client = new OpenAIClient({
				token: openaiKey,
			});
		})
	);

	vscode.commands.registerTextEditorCommand('gpt.quest', async editor => {
		if (!openaiKey) {
			openaiKey = await vscode.window.showInputBox({
				title: '请输入你的api key',
				prompt: '你可以在👉[官网](https://platform.openai.com/account/api-keys)里生成自己的api key，本插件不会保存你的api key，请放心使用'
			}) ?? "";

			await vscode.workspace.getConfiguration().update(configKey, openaiKey)
			return
		}

		let questText = await vscode.window.showInputBox({
			title: '输入提问内容',
			prompt: '可以右键选择文本进行提问'
		}) ?? ''
		if (questText.length === 0) {
			return
		}

		let text: string = '';
		for (const selection of editor.selections) {
			const selectedText = editor.document.getText(selection);
			if (selectedText.length == 0) {
				continue
			}
			text = text + selectedText
		}

		if (text.length > 0) {
			questText = questText + '\n' + text + '\n'
		}


		statusBarItem.show();
		outputChannel.clear();
		outputChannel.show();
		outputChannel.append("Q:\n");
		outputChannel.append(questText + "\n");
		outputChannel.append("A:\n");

		try {
			await client.chat.createCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{ role: "system", content: "你是一个专业的网文作者" },
					{ role: "user", content: questText }
				],
				stream: true,
			}, (data) => {
				const content = data.choices[0].delta.content;
				if (content) {
					outputChannel.append(content);
				}
			}, {
				onError: (error) => {
					const msg = error as string
					outputChannel.append('请求错误：\n' + msg);
				},
				onFinish: () => {
					outputChannel.append("\n回答完毕");
				}
			});
		} finally {
			statusBarItem.hide();
		}
	});
}