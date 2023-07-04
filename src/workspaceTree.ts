import * as vscode from 'vscode';
import * as path from 'path';

export function registerWorkspaceTree(context: vscode.ExtensionContext) {
	const workspaceTreeProvider = new StorageTreeProvider(context);
	vscode.window.registerTreeDataProvider('novelWorkspace', workspaceTreeProvider);
	vscode.commands.registerCommand('workspace.createFile', async (item: StorageTreeItem) => {
		const name = await vscode.window.showInputBox({ title: '文件名称' })
		if (!name) {
			return
		}
		const newFileUri = vscode.Uri.parse(path.posix.join(item.resourceUri?.path ?? '', name))
		await vscode.workspace.fs.writeFile(newFileUri, new Uint8Array())
		return workspaceTreeProvider.refresh()
	});
	vscode.commands.registerCommand('workspace.createDirectory', async (item: StorageTreeItem) => {
		let newDirUri: vscode.Uri
		const name = await vscode.window.showInputBox({ title: '文件夹名称' })
		if (!name) {
			return
		}
		if (!item) {
			newDirUri = vscode.Uri.parse(path.posix.join(workspaceTreeProvider.storage.path ?? '', name))
		} else {
			newDirUri = vscode.Uri.parse(path.posix.join(item.resourceUri?.path ?? '', name))
		}

		await vscode.workspace.fs.createDirectory(newDirUri)
		return workspaceTreeProvider.refresh()
	});
	vscode.commands.registerCommand('workspace.deleteEntry', async (item: StorageTreeItem) => {
		if (!item || !item.resourceUri) {
			return
		}
		await vscode.workspace.fs.delete(item.resourceUri, { recursive: true })
		return workspaceTreeProvider.refresh()
	});
	vscode.commands.registerCommand('workspace.refreshEntry', () => workspaceTreeProvider.refresh());
}

class StorageTreeProvider implements vscode.TreeDataProvider<StorageTreeItem> {
	storage: vscode.Uri;
	private _onDidChangeTreeData: vscode.EventEmitter<StorageTreeItem | undefined | void> = new vscode.EventEmitter<StorageTreeItem | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<StorageTreeItem | undefined | void> = this._onDidChangeTreeData.event;

	constructor(context: vscode.ExtensionContext) {
		const workspaceRoot = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
			? vscode.workspace.workspaceFolders[0].uri.fsPath : 'unknown';
		const dirname = path.parse(workspaceRoot).name
		const storagePath = path.posix.join(context.globalStorageUri.path, dirname)
		const storageUri = vscode.Uri.parse(storagePath)
		vscode.workspace.fs.createDirectory(storageUri)
		this.storage = storageUri
	}

	getTreeItem(element: StorageTreeItem): StorageTreeItem {
		return element;
	}

	async getChildren(element?: StorageTreeItem): Promise<StorageTreeItem[] | null | undefined> {
		if (!element) {
			return this._getItems(this.storage);
		}
		return this._getItems(element.resourceUri);
	}

	getParent(element: StorageTreeItem): vscode.ProviderResult<StorageTreeItem> {
		if (element.resourceUri === this.storage) {
			return undefined;
		}
		const parentPath = path.posix.join(element.resourceUri!.path, "..")
		const parentUri = vscode.Uri.parse(parentPath)
		return this._getItem(parentUri)
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	async _getItems(uri: vscode.Uri | undefined): Promise<vscode.ProviderResult<StorageTreeItem[]>> {
		if (!uri) {
			return undefined
		}
		let items: StorageTreeItem[] = [];
		const files = await vscode.workspace.fs.readDirectory(uri)
		for (const file of files) {
			const filename = file[0];
			const filetype = file[1];
			const itemPath = vscode.Uri.parse(path.posix.join(uri.path, file[0]));
			const item = new StorageTreeItem(itemPath, filename, filetype);
			items.push(item)
		}
		return items
	}

	async _getItem(uri: vscode.Uri): Promise<StorageTreeItem> {
		const stat = await vscode.workspace.fs.stat(uri);
		return new StorageTreeItem(uri, path.basename(uri.path), stat.type);
	}
}

export class StorageTreeItem extends vscode.TreeItem {
	fileType: vscode.FileType;

	constructor(
		uri: vscode.Uri,
		name: string,
		fileType: vscode.FileType,
	) {
		let collapsibleState = vscode.TreeItemCollapsibleState.None;
		let contextValue = 'file';
		if (fileType === vscode.FileType.Directory) {
			collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
			contextValue = 'directory';
		}
		super(uri, collapsibleState);
		this.contextValue = contextValue;
		this.fileType = fileType;
		this.label = name;
		if (this.fileType == vscode.FileType.File) {
			this.command = { command: 'openFile', title: "Open File", arguments: [this.resourceUri] };
		}
	}
}