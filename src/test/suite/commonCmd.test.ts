import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';

suite('Register Common Commands', () => {
	test('openFile Command', async () => {
		await vscode.commands.executeCommand('openFile');
		let editor = vscode.window.activeTextEditor;
		assert.equal(editor, undefined);

		const filepath = path.join(
			__dirname,
			'..',
			'..',
			'..',
			'src',
			'test',
			'testdata',
			'empty'
		);
		const uri = vscode.Uri.file(filepath);
		await vscode.commands.executeCommand('openFile', uri);
		editor = vscode.window.activeTextEditor;
		assert.notEqual(editor, undefined);
	});
});
