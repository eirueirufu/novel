import sinon from 'sinon';
import {afterEach, beforeEach} from 'mocha';
import * as vscode from 'vscode';
import Hover from '../../hover';

suite('Hover Tests', () => {
	const sandbox = sinon.createSandbox();
	let mockContext: vscode.ExtensionContext;
	let hover: Hover;

	beforeEach(() => {
		mockContext = {} as vscode.ExtensionContext;
		hover = new Hover(mockContext);
	});
	afterEach(() => {
		sandbox.restore();
	});

	test('activate', async () => {
		mockContext = ({
			subscriptions: [],
		} as unknown) as vscode.ExtensionContext;
		const mockSubscriptions = sandbox.mock(mockContext.subscriptions);
		hover = new Hover(mockContext);
		mockSubscriptions.expects('push').atLeast(1);
		await hover.activate();
		sandbox.verify();
	});
});
