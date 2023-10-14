import sinon from 'sinon';
import {afterEach, beforeEach} from 'mocha';
import * as vscode from 'vscode';
import Decoration from '../../decoration';

suite('Decoration Tests', () => {
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;
	let decoration: Decoration;
	let clock: sinon.SinonFakeTimers;

	beforeEach(() => {
		mockContext = {} as vscode.ExtensionContext;
		decoration = new Decoration(mockContext);
		clock = sandbox.useFakeTimers();
	});
	afterEach(() => {
		sandbox.restore();
	});

	suite('triggerUpdateDecorations', () => {
		test('no throttle', async () => {
			const spyHighlight = sandbox.spy(decoration);
			decoration.triggerUpdateDecorations();
			decoration.triggerUpdateDecorations();
			clock.runAll();
			sandbox.assert.calledTwice(spyHighlight.updateDecorations);
			sandbox.verify();
		});

		test('with throttle', async () => {
			const spyHighlight = sandbox.spy(decoration);
			decoration.triggerUpdateDecorations(true);
			decoration.triggerUpdateDecorations(true);
			clock.runAll();
			sandbox.assert.calledOnce(spyHighlight.updateDecorations);
			sandbox.verify();
		});
	});

	test('activate', async () => {
		mockContext = ({
			subscriptions: [],
		} as unknown) as vscode.ExtensionContext;
		const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
		decoration = new Decoration(mockContext);
		mockSubscriptions.expects('push').atLeast(1);
		const spyDecoration = sandbox.spy(decoration);
		const highlight = sandbox.stub(decoration.highlight);
		const tag = sandbox.stub(decoration.tag);
		await decoration.activate();
		sandbox.assert.notCalled(spyDecoration.updateDecorations);
		clock.next();
		sandbox.assert.calledOnce(spyDecoration.updateDecorations);
		sandbox.assert.calledOnce(highlight.activate);
		sandbox.assert.calledOnce(tag.activate);
		sandbox.verify();
	});
});
