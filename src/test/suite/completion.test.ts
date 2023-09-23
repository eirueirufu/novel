import sinon from 'sinon';
import Completion, {CompletionItemProvider} from '../../completion';
import * as vscode from 'vscode';
import {afterEach, beforeEach} from 'mocha';
import assert from 'assert';

suite('Completion Tests', () => {
	let completion: Completion;
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;

	beforeEach(() => {
		completion = new Completion(mockContext);
		mockContext = {} as vscode.ExtensionContext;
	});
	afterEach(() => {
		sandbox.restore();
	});

	test('activate', async () => {
		mockContext = ({
			subscriptions: [],
			asAbsolutePath: sandbox.stub(),
		} as unknown) as vscode.ExtensionContext;
		const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
		completion = new Completion(mockContext);
		const stubGetWords = sandbox.stub(completion, 'getCompletionWords');
		mockSubscriptions.expects('push').atLeast(1);
		await completion.activate();
		sandbox.assert.calledOnce(stubGetWords);
		sandbox.verify();
	});
});

suite('CompletionItemProvider Tests', () => {
	let provider: CompletionItemProvider;

	beforeEach(() => {
		provider = new CompletionItemProvider();
	});

	test('provideCompletionItems', async () => {
		interface TestCase {
			documentContent: string;
			position: {
				line: number;
				character: number;
			};
			words: string[];
			expected: vscode.CompletionItem[];
		}
		const testCases: TestCase[] = [
			{
				documentContent: '',
				position: {
					line: 0,
					character: 0,
				},
				words: [],
				expected: [],
			},
			{
				documentContent: '',
				position: {
					line: 0,
					character: 0,
				},
				words: ['测试'],
				expected: [],
			},
			{
				documentContent: '',
				position: {
					line: 0,
					character: 0,
				},
				words: ['测试', '试测'],
				expected: [],
			},
			{
				documentContent: '测试',
				position: {
					line: 0,
					character: 0,
				},
				words: [''],
				expected: [],
			},
			{
				documentContent: `测试
				测试`,
				position: {
					line: 1,
					character: 0,
				},
				words: [''],
				expected: [],
			},
			{
				documentContent: '测试',
				position: {
					line: 0,
					character: 1,
				},
				words: [''],
				expected: [],
			},
			{
				documentContent: '测试',
				position: {
					line: 0,
					character: 0,
				},
				words: ['测试'],
				expected: [],
			},
			{
				documentContent: '测试',
				position: {
					line: 0,
					character: 2,
				},
				words: ['测试'],
				expected: [
					{
						label: '测试',
						kind: vscode.CompletionItemKind.Text,
						range: new vscode.Range(
							new vscode.Position(0, 0),
							new vscode.Position(0, 2)
						),
					},
				],
			},
			{
				documentContent: '测试测试',
				position: {
					line: 0,
					character: 2,
				},
				words: ['测试'],
				expected: [
					{
						label: '测试',
						kind: vscode.CompletionItemKind.Text,
						range: new vscode.Range(
							new vscode.Position(0, 0),
							new vscode.Position(0, 2)
						),
					},
				],
			},
			{
				documentContent: '测试测试',
				position: {
					line: 0,
					character: 2,
				},
				words: ['测试', '试'],
				expected: [
					{
						label: '测试',
						kind: vscode.CompletionItemKind.Text,
						range: new vscode.Range(
							new vscode.Position(0, 0),
							new vscode.Position(0, 2)
						),
					},
					{
						label: '试',
						kind: vscode.CompletionItemKind.Text,
						range: new vscode.Range(
							new vscode.Position(0, 1),
							new vscode.Position(0, 2)
						),
					},
				],
			},
			{
				documentContent: '测试测试',
				position: {
					line: 0,
					character: 2,
				},
				words: ['试测'],
				expected: [
					{
						label: '试测',
						kind: vscode.CompletionItemKind.Text,
						range: new vscode.Range(
							new vscode.Position(0, 1),
							new vscode.Position(0, 2)
						),
					},
				],
			},
			{
				documentContent: '测试测试',
				position: {
					line: 0,
					character: 2,
				},
				words: ['策士'],
				expected: [],
			},
		];

		const document = {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			lineAt(line: number): vscode.TextLine {
				return {} as vscode.TextLine;
			},
		} as vscode.TextDocument;

		testCases.map(testCase => {
			provider.refreshFuse(testCase.words);
			const stub = sinon
				.stub(document, 'lineAt')
				.callsFake((position: vscode.Position) => {
					return {
						text: testCase.documentContent.split(/\r?\n/)[
							position.line
						],
					} as vscode.TextLine;
				});
			const position = new vscode.Position(
				testCase.position.line,
				testCase.position.character
			);
			const actual = provider.provideCompletionItems(document, position);
			assert.deepEqual(actual, testCase.expected);
			stub.restore();
		});
	});
});
