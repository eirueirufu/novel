import sinon from 'sinon';
import {afterEach, beforeEach} from 'mocha';
import * as vscode from 'vscode';
import assert from 'assert';
import Highlight from '../../highlight';

suite('Highlight Tests', () => {
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;
	let highlight: Highlight;

	beforeEach(() => {
		mockContext = {} as vscode.ExtensionContext;
		highlight = new Highlight(mockContext);
	});
	afterEach(() => {
		sandbox.restore();
	});

	test('activate', async () => {
		mockContext = ({
			subscriptions: [],
		} as unknown) as vscode.ExtensionContext;
		const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
		highlight = new Highlight(mockContext);
		mockSubscriptions.expects('push').atLeast(1);
		await highlight.activate();
		sandbox.verify();
	});

	test('updateDecorations', async () => {
		class MockDocument {
			text: string;
			languageId = 'novel';

			private lines: string[];
			constructor(text: string) {
				this.text = text;
				this.lines = this.text.split(/\r?\n/);
			}
			getText() {
				return this.text;
			}
			positionAt(offset: number) {
				for (let i = 0; i < this.lines.length; i++) {
					const count = this.lines[i].length;
					if (offset <= count) {
						return new vscode.Position(i, offset);
					}
					offset -= count + 1;
				}
				return new vscode.Position(0, 0);
			}
		}
		interface TestCase {
			text: string;
			highlightWords: [string, string][];
			expected: Map<string, vscode.DecorationOptions[]>;
		}

		const testCases: TestCase[] = [
			{
				text: '',
				highlightWords: [],
				expected: new Map([]),
			},
			{
				text: '测试',
				highlightWords: [],
				expected: new Map([]),
			},
			{
				text: '',
				highlightWords: [['测', 'red']],
				expected: new Map([]),
			},
			{
				text: '测试',
				highlightWords: [['测', 'red']],
				expected: new Map([
					[
						'red',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 0),
									new vscode.Position(0, 1)
								),
							},
						],
					],
				]),
			},
			{
				text: '测试',
				highlightWords: [['试', 'red']],
				expected: new Map([
					[
						'red',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 1),
									new vscode.Position(0, 2)
								),
							},
						],
					],
				]),
			},
			{
				text: '测试',
				highlightWords: [
					['测', 'red'],
					['试', 'blue'],
				],
				expected: new Map([
					[
						'red',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 0),
									new vscode.Position(0, 1)
								),
							},
						],
					],
					[
						'blue',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 1),
									new vscode.Position(0, 2)
								),
							},
						],
					],
				]),
			},
			{
				text: '测试测 试测试',
				highlightWords: [['试测', 'red']],
				expected: new Map([
					[
						'red',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 1),
									new vscode.Position(0, 3)
								),
							},
							{
								range: new vscode.Range(
									new vscode.Position(0, 4),
									new vscode.Position(0, 6)
								),
							},
						],
					],
				]),
			},
			{
				text: `测测试试
试测测试
试试测测`,
				highlightWords: [['测测', 'red']],
				expected: new Map([
					[
						'red',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 0),
									new vscode.Position(0, 2)
								),
							},
							{
								range: new vscode.Range(
									new vscode.Position(1, 1),
									new vscode.Position(1, 3)
								),
							},
							{
								range: new vscode.Range(
									new vscode.Position(2, 2),
									new vscode.Position(2, 4)
								),
							},
						],
					],
				]),
			},
		];

		testCases.map(testCase => {
			const decorationSetMap = new Map<
				vscode.TextEditorDecorationType,
				vscode.DecorationOptions[]
			>();
			const mockEditor = ({
				document: (new MockDocument(
					testCase.text
				) as unknown) as vscode.TextDocument,
				setDecorations: (
					decorationType: vscode.TextEditorDecorationType,
					options: vscode.DecorationOptions[]
				) => {
					decorationSetMap.set(decorationType, options);
				},
			} as unknown) as vscode.TextEditor;
			sandbox.stub(vscode.window, 'activeTextEditor').value(mockEditor);

			const decorationTypeMap: Map<
				string,
				vscode.TextEditorDecorationType
			> = new Map();
			testCase.expected.forEach((v, k) => {
				decorationTypeMap.set(
					k,
					vscode.window.createTextEditorDecorationType({
						color: k,
					})
				);
			});
			highlight = new Highlight(mockContext);
			highlight.highlightWords = testCase.highlightWords;
			highlight.decorationMap = decorationTypeMap;
			highlight.updateDecorations();

			testCase.expected.forEach((v, k) => {
				const type = decorationTypeMap.get(k);
				const actual = decorationSetMap.get(type!);
				assert.deepEqual(actual, v);
			});

			sandbox.restore();
		});
	});
});
