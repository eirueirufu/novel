import sinon from 'sinon';
import * as vscode from 'vscode';
import {afterEach, beforeEach} from 'mocha';
import assert from 'assert';
import Format, {Section} from '../../format/format';

suite('Format Tests', () => {
	let format: Format;
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;

	beforeEach(() => {
		mockContext = {} as vscode.ExtensionContext;
		format = new Format(mockContext);
	});
	afterEach(() => {
		sandbox.restore();
	});

	test('activate', async () => {
		mockContext = ({
			subscriptions: [],
		} as unknown) as vscode.ExtensionContext;
		const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
		format = new Format(mockContext);
		mockSubscriptions.expects('push').atLeast(1);
		await format.activate();
		sandbox.verify();
	});

	test('Visitor Tests', () => {
		interface TestCase {
			text: string;
			expected: Section;
		}
		const testCases: TestCase[] = [
			// ws
			{text: ' ', expected: {Paras: []}},
			{text: '\t', expected: {Paras: []}},
			{text: ' \t', expected: {Paras: []}},
			// 文字
			{text: '', expected: {Paras: []}},
			{text: '123', expected: {Paras: [{Sents: ['123']}]}},
			{text: 'test', expected: {Paras: [{Sents: ['test']}]}},
			{text: '测试', expected: {Paras: [{Sents: ['测试']}]}},
			{
				text: '测试123test',
				expected: {Paras: [{Sents: ['测试123test']}]},
			},
			{
				text: '。！？……',
				expected: {Paras: [{Sents: ['。！？……']}]},
			},
			// 句子
			{text: '测试。', expected: {Paras: [{Sents: ['测试。']}]}},
			{text: '测试！', expected: {Paras: [{Sents: ['测试！']}]}},
			{text: '测试？', expected: {Paras: [{Sents: ['测试？']}]}},
			{text: '测试……', expected: {Paras: [{Sents: ['测试……']}]}},
			{
				text: '测试。测试！测试？测试……',
				expected: {
					Paras: [{Sents: ['测试。', '测试！', '测试？', '测试……']}],
				},
			},
			{text: '“测试。”', expected: {Paras: [{Sents: ['“测试。”']}]}},
			{text: '“测试！”', expected: {Paras: [{Sents: ['“测试！”']}]}},
			{text: '“测试？”', expected: {Paras: [{Sents: ['“测试？”']}]}},
			{text: '“测试……”', expected: {Paras: [{Sents: ['“测试……”']}]}},
			{
				text: '“测试。测试！测试？测试……”',
				expected: {Paras: [{Sents: ['“测试。测试！测试？测试……”']}]},
			},
			{
				text: '测试“测试。测试！测试？测试……”',
				expected: {
					Paras: [{Sents: ['测试', '“测试。测试！测试？测试……”']}],
				},
			},
			{
				text: '测试：“测试。测试！测试？测试……”',
				expected: {
					Paras: [{Sents: ['测试：', '“测试。测试！测试？测试……”']}],
				},
			},
			{
				text: '"测试。测试！测试？测试……"',
				expected: {
					Paras: [
						{
							Sents: ['"测试。测试！测试？测试……"'],
						},
					],
				},
			},
			{
				text: '“测试。测试！测试？测试……”',
				expected: {
					Paras: [
						{
							Sents: ['“测试。测试！测试？测试……”'],
						},
					],
				},
			},
			{
				text: '<测试。测试！测试？测试……>',
				expected: {
					Paras: [
						{
							Sents: ['<测试。测试！测试？测试……>'],
						},
					],
				},
			},
			{
				text: '《测试。测试！测试？测试……》',
				expected: {
					Paras: [
						{
							Sents: ['《测试。测试！测试？测试……》'],
						},
					],
				},
			},
			{
				text: '[测试。测试！测试？测试……]',
				expected: {
					Paras: [
						{
							Sents: ['[测试。测试！测试？测试……]'],
						},
					],
				},
			},
			{
				text: '【测试。测试！测试？测试……】',
				expected: {
					Paras: [
						{
							Sents: ['【测试。测试！测试？测试……】'],
						},
					],
				},
			},
			{
				text: '(测试。测试！测试？测试……)',
				expected: {
					Paras: [
						{
							Sents: ['(测试。测试！测试？测试……)'],
						},
					],
				},
			},
			{
				text: '（测试。测试！测试？测试……）',
				expected: {
					Paras: [
						{
							Sents: ['（测试。测试！测试？测试……）'],
						},
					],
				},
			},
			{
				text: '(测试。测试！测试？测试……)（测试。测试！测试？测试……）',
				expected: {
					Paras: [
						{
							Sents: [
								'(测试。测试！测试？测试……)',
								'（测试。测试！测试？测试……）',
							],
						},
					],
				},
			},
			{
				text: '（(【[《<“"测试。测试！测试？测试……"”>》]】)）',
				expected: {
					Paras: [
						{
							Sents: [
								'（(【[《<“"测试。测试！测试？测试……"”>》]】)）',
							],
						},
					],
				},
			},
			{
				text:
					'(测试。测试！测试？测试……)（测试。测试！测试？测试……）\n(测试。测试！测试？测试……)（测试。测试！测试？测试……）',
				expected: {
					Paras: [
						{
							Sents: [
								'(测试。测试！测试？测试……)',
								'（测试。测试！测试？测试……）',
							],
						},
						{
							Sents: [
								'(测试。测试！测试？测试……)',
								'（测试。测试！测试？测试……）',
							],
						},
					],
				},
			},
			// 段落
			{text: '\n', expected: {Paras: []}},
			{text: '\n\n', expected: {Paras: []}},
			{
				text: '测试\n测试',
				expected: {Paras: [{Sents: ['测试']}, {Sents: ['测试']}]},
			},
			{
				text: '测试\n测试\n',
				expected: {Paras: [{Sents: ['测试']}, {Sents: ['测试']}]},
			},
			// 章节
			{
				text: '',
				expected: {Paras: []},
			},
			{
				text: '\n',
				expected: {Paras: []},
			},
		];
		testCases.map(testCase => {
			const actual = format.parse(testCase.text);
			assert.deepEqual(actual, testCase.expected);
		});
	});

	test('Format Tests', () => {
		interface TestCase {
			text: string;
			len?: number;
			expected: string;
		}
		const testCases: TestCase[] = [
			{
				text: '',
				expected: '',
			},
			{
				text: '测试',
				expected: '\t测试',
			},
			{
				text: '\t测试',
				expected: '\t测试',
			},
			{
				text: '测试\n测试',
				expected: '\t测试\n\t测试',
			},
			{
				text: '测试\r\n测试',
				expected: '\t测试\n\t测试',
			},
			{
				text: '\t  测试  \t\n\t  测试  \t',
				expected: '\t测试\n\t测试',
			},
			{
				text: '测。试。',
				len: 1,
				expected: '\t测。\n\t试。',
			},
			{
				text: '测试。',
				len: 1,
				expected: '\t测试。',
			},
			{
				text: '测试。测试测试！测试测试测试？？测试测试测试测试……',
				len: 2,
				expected:
					'\t测试。\n\t测试测试！\n\t测试测试测试？？\n\t测试测试测试测试……',
			},
			{
				text: '测试：“测试中。”',
				len: 20,
				expected: '\t测试：“测试中。”',
			},
			{
				text: '测试：“测试中。”',
				len: 2,
				expected: '\t测试：\n\t“测试中。”',
			},
			{
				text: '<测试：“测试中。”>',
				len: 2,
				expected: '\t<测试：“测试中。”>',
			},
		];
		testCases.map(testCase => {
			format = new Format(mockContext);
			if (testCase.len) {
				format.maxParaLen = testCase.len;
			}
			const actual = format.format(testCase.text);
			assert.equal(actual, testCase.expected);
		});
	});
});
