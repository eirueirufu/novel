import * as vscode from 'vscode'
import { Configuration, OpenAIApi } from 'openai'

export async function registerGpt(context: vscode.ExtensionContext) {
	const configKey = "novel.openaiKey";

	let openaiKey = vscode.workspace.getConfiguration().get(configKey) as string
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(async event => {
			if (!event.affectsConfiguration(configKey)) {
				return
			}
			openaiKey = vscode.workspace.getConfiguration().get(configKey) as string
		})
	);

	const config = new Configuration({
		apiKey: openaiKey
	})
	const openai = new OpenAIApi(config)
	const outputChannel = vscode.window.createOutputChannel('novel', 'novel');

	vscode.commands.registerTextEditorCommand('gpt.quest', async editor => {
		if (!openaiKey) {
			const apiKey = await vscode.window.showInputBox({
				title: '请输入你的api key',
				prompt: '你可以在👉[官网](https://platform.openai.com/account/api-keys)里生成自己的api key，本插件不会保存你的api key，请放心使用'
			});
			await vscode.workspace.getConfiguration().update(configKey, apiKey)
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
			questText = questText + '\n```plaintext\n' + text + '\n```'
		}

		const statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 9999);
		statusBarItem.text = "$(loading~spin) GPT提问中...";
		statusBarItem.backgroundColor = new vscode.ThemeColor("statusBarItem.warningBackground");
		statusBarItem.show();
		outputChannel.clear();

		try {
			const chatCompletion = await openai.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [{ role: "user", content: "Hello world" }],
			});
			outputChannel.append('以下是gpt的回答：\n' + chatCompletion);
		} catch (error) {
			const msg = error as string
			outputChannel.append('请求错误：\n' + msg);
		} finally {
			outputChannel.show();
			statusBarItem.dispose();
		}
	});
}