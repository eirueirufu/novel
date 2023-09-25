import sinon from 'sinon';
import {afterEach, beforeEach} from 'mocha';
import * as vscode from 'vscode';
import Gpt from '../../gpt';
import assert from 'assert';

suite('Gpt Tests', () => {
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;
	let gpt: Gpt;

	beforeEach(() => {
		mockContext = {} as vscode.ExtensionContext;
		gpt = new Gpt(mockContext);
	});
	afterEach(() => {
		sandbox.restore();
	});

	suite('activate', () => {
		test('no openai', async () => {
			mockContext = ({
				subscriptions: [],
			} as unknown) as vscode.ExtensionContext;
			const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
			gpt = new Gpt(mockContext);
			mockSubscriptions.expects('push').atLeast(1);
			await gpt.activate();
			assert(!gpt.openai);
			sandbox.verify();
		});

		test('with openai', async () => {
			mockContext = ({
				subscriptions: [],
			} as unknown) as vscode.ExtensionContext;

			const configuration = ({
				get: sandbox.stub().returns('test'),
			} as unknown) as vscode.WorkspaceConfiguration;

			sandbox
				.stub(vscode.workspace, 'getConfiguration')
				.returns(configuration);
			sandbox.stub(vscode.commands);
			const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
			gpt = new Gpt(mockContext);
			mockSubscriptions.expects('push').atLeast(1);
			await gpt.activate();
			assert(gpt.openai);
			sandbox.verify();
		});
	});

	test('refreshOpenai', async () => {
		const before = gpt.openai;

		const configuration = ({
			get: sandbox.stub().returns('test'),
		} as unknown) as vscode.WorkspaceConfiguration;

		sandbox
			.stub(vscode.workspace, 'getConfiguration')
			.returns(configuration);
		gpt.refreshOpenai();
		const after = gpt.openai;
		assert.notEqual(before, after);
	});

	suite('quest', () => {
		test('no key', async () => {
			sandbox.stub(vscode.workspace);
			const stubInputKey = sandbox.stub(gpt, 'inputApiKey');
			await gpt.quest('测试');
			assert(stubInputKey.calledOnce);
		});

		test('with key', async () => {
			const configuration = ({
				get: sandbox.stub().returns('test'),
			} as unknown) as vscode.WorkspaceConfiguration;

			sandbox
				.stub(vscode.workspace, 'getConfiguration')
				.returns(configuration);

			gpt = new Gpt(mockContext);

			const spyStatusBarItem = sandbox.spy(gpt.statusBarItem);
			const spyOutputChannel = sandbox.spy(gpt.outputChannel);
			const stubOpenai = sandbox.stub(gpt.openai!.chat.completions);

			await gpt.quest('测试');
			assert(stubOpenai.create.called);
			assert(spyOutputChannel.append.called);
			assert(spyOutputChannel.clear.called);
			assert(spyStatusBarItem.hide.calledAfter(spyStatusBarItem.show));
		});
	});
});
