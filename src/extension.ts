import * as vscode from 'vscode';

const tokenTypes = new Map<string, number>();
const tokenModifiers = new Map<string, number>();

const tokenTypesLegend = [
	'你', '我', '他', '她', '它', '，', '。',
	'！', '？', '……', '：'
];

const legend = (function () {

	tokenTypesLegend.forEach((tokenType, index) => tokenTypes.set(tokenType, index));

	// const tokenModifiersLegend = [];
	// tokenModifiersLegend.forEach((tokenModifier, index) => tokenModifiers.set(tokenModifier, index));

	return new vscode.SemanticTokensLegend(tokenTypesLegend);
	// return new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
})();

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'novel' }, new DocumentSemanticTokensProvider(), legend));
}

interface IParsedToken {
	line: number;
	startCharacter: number;
	length: number;
	tokenType: string;
}

class DocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
	async provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): Promise<vscode.SemanticTokens> {
		const allTokens = this._parseText(tokenTypesLegend, document.getText());
		const builder = new vscode.SemanticTokensBuilder();
		allTokens.forEach((token) => {
			builder.push(token.line, token.startCharacter, token.length, this._encodeTokenType(token.tokenType));
		});
		return builder.build();
	}

	private _encodeTokenType(tokenType: string): number {
		if (tokenTypes.has(tokenType)) {
			return tokenTypes.get(tokenType)!;
		} else if (tokenType === 'notInLegend') {
			return tokenTypes.size + 2;
		}
		return 0;
	}

	private _parseText(keywords: string[], text: string): IParsedToken[] {
		const r: IParsedToken[] = [];
		const lines = text.split(/\r\n|\r|\n/);
		for (let j = 0; j < lines.length; j++) {
			const line = lines[j];
			let offset = 0
			r.push({
				line: j,
				startCharacter: 3,
				length: 1,
				tokenType: "我",
			});
		}
		// for (let i = 0; i < keywords.length; i++) {
		// 	const keyword = keywords[i];
		// 	for (let j = 0; j < lines.length; j++) {
		// 		const line = lines[j];
		// 		let offset = 0
		// 		for (; offset < line.length;) {
		// 			const openOffset = line.indexOf(keyword, offset);
		// 			if (openOffset === -1) {
		// 				break;
		// 			}
		// 			const closeOffset = openOffset + keyword.length;
		// 			const token = line.substring(openOffset, closeOffset);
		// 			r.push({
		// 				line: j,
		// 				startCharacter: openOffset,
		// 				length: keyword.length,
		// 				tokenType: token,
		// 			});
		// 			offset = closeOffset
		// 		}
		// 	}
		// }
		return r;
	}
}
