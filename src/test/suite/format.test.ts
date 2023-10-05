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
		format = new Format();
	});
	afterEach(() => {
		sandbox.restore();
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
});
