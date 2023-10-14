import sinon from 'sinon';
import {afterEach, beforeEach} from 'mocha';
import * as vscode from 'vscode';
import Tag from '../../tag';
import assert from 'assert';

suite('Decoration Tests', () => {
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;
	let tag: Tag;

	beforeEach(() => {
		mockContext = {} as vscode.ExtensionContext;
		tag = new Tag(mockContext);
	});
	afterEach(() => {
		sandbox.restore();
	});

	test('activate', async () => {
		mockContext = ({
			subscriptions: [],
		} as unknown) as vscode.ExtensionContext;
		const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
		tag = new Tag(mockContext);
		mockSubscriptions.expects('push').atLeast(1);
		await tag.activate();
		sandbox.verify();
	});

	test('decorateTags', async () => {
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
			tagMode?: boolean;
			expected: Map<string, vscode.DecorationOptions[]>;
		}

		const testCases: TestCase[] = [
			{
				text: '',
				expected: new Map([]),
			},
			{
				text: '测试',
				expected: new Map([]),
			},
			{
				text: '愉快',
				tagMode: true,
				expected: new Map([
					[
						'a',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 0),
									new vscode.Position(0, 2)
								),
							},
						],
					],
				]),
			},
			{
				text: '看',
				tagMode: true,
				expected: new Map([
					[
						'v',
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
				text: '脸颊',
				tagMode: true,
				expected: new Map([
					[
						'n',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 0),
									new vscode.Position(0, 2)
								),
							},
						],
					],
				]),
			},
			{
				text: '看温柔的脸颊',
				tagMode: true,
				expected: new Map([
					[
						'v',
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
						'a',
						[
							{
								range: new vscode.Range(
									new vscode.Position(0, 1),
									new vscode.Position(0, 3)
								),
							},
						],
					],
					[
						'n',
						[
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
				text: `
看。
温柔的，测试。
 脸颊 
`,
				tagMode: true,
				expected: new Map([
					[
						'v',
						[
							{
								range: new vscode.Range(
									new vscode.Position(1, 0),
									new vscode.Position(1, 1)
								),
							},
						],
					],
					[
						'vn',
						[
							{
								range: new vscode.Range(
									new vscode.Position(2, 4),
									new vscode.Position(2, 6)
								),
							},
						],
					],
					[
						'a',
						[
							{
								range: new vscode.Range(
									new vscode.Position(2, 0),
									new vscode.Position(2, 2)
								),
							},
						],
					],
					[
						'n',
						[
							{
								range: new vscode.Range(
									new vscode.Position(3, 1),
									new vscode.Position(3, 3)
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

			if (testCase.tagMode) {
				const configuration = ({
					get: sandbox.stub().returns(true),
				} as unknown) as vscode.WorkspaceConfiguration;

				sandbox
					.stub(vscode.workspace, 'getConfiguration')
					.returns(configuration);
			}
			tag = new Tag(mockContext);
			tag.decorateTags();

			testCase.expected.forEach((v, k) => {
				const type = tag.decorationMap.get(k);
				const actual = decorationSetMap.get(type!);
				assert.deepEqual(actual, v);
			});

			sandbox.restore();
		});
	});
});
