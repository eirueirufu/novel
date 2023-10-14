import * as vscode from 'vscode';
import {tag} from 'nodejieba';

// https://github.com/fxsjy/jieba
export const TagColor: {tag: string; color: {dark: string; light: string}}[] = [
	{
		tag: 'n',
		color: {
			dark: '#F3D673',
			light: '#978365',
		},
	},
	{
		tag: 'a',
		color: {
			dark: '#BEE7F5',
			light: '#74DAF8',
		},
	},
	{
		tag: 'v',
		color: {
			dark: '#FFDCE1',
			light: '#DC3B5D',
		},
	},
	{
		tag: 'vd',
		color: {
			dark: '#FFDCE1',
			light: '#DC3B5D',
		},
	},
	{
		tag: 'vn',
		color: {
			dark: '#FFDCE1',
			light: '#DC3B5D',
		},
	},
];

export default class Tag {
	configKey: string = 'novel.tagMode';
	decorationMap: Map<string, vscode.TextEditorDecorationType>;

	private context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		this.context = context;
		this.decorationMap = new Map<string, vscode.TextEditorDecorationType>();
		TagColor.forEach(val => {
			const t = vscode.window.createTextEditorDecorationType({
				dark: {
					color: val.color.dark,
				},
				light: {
					color: val.color.light,
				},
			});
			this.decorationMap.set(val.tag, t);
		});
	}

	async activate() {
		this.context.subscriptions.push(
			vscode.commands.registerTextEditorCommand(
				'highlight.onOffTagMode',
				async () => {
					const tagMode = vscode.workspace
						.getConfiguration()
						.get(this.configKey) as boolean;
					await vscode.workspace
						.getConfiguration()
						.update(this.configKey, !tagMode);
				}
			)
		);
	}

	decorateTags() {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor || activeEditor.document.languageId !== 'novel') {
			return;
		}

		const tagMode = vscode.workspace
			.getConfiguration()
			.get(this.configKey) as boolean;

		if (!tagMode) {
			this.decorationMap.forEach(val => {
				activeEditor.setDecorations(val, []);
			});
			return;
		}

		const text = activeEditor.document.getText();
		const words = tag(text);

		const mp = new Map<string, vscode.DecorationOptions[]>();
		let index = 0;
		words.forEach(val => {
			const array = mp.get(val.tag) ?? [];
			const startPos = activeEditor.document.positionAt(index);
			const endPos = activeEditor.document.positionAt(
				index + val.word.length
			);
			const decoration = {range: new vscode.Range(startPos, endPos)};
			array.push(decoration);
			mp.set(val.tag, array);
			index += val.word.length;
		});

		this.decorationMap.forEach((val, key) => {
			const decos = mp.get(key) ?? [];
			activeEditor.setDecorations(val, decos);
		});
	}
}
