grammar Format;

NEWLINE: [\r\n]+;
WORDS: (~[\r\n。！？…（）()【】[\]《》<>“”"])+;

// 章节
section: para*;
// 段落
para: sent+ NEWLINE? | NEWLINE;
// 句子
sent:
	'（' sent* '）'
	| '(' sent* ')'
	| '【' sent* '】'
	| '[' sent* ']'
	| '《' sent* '》'
	| '<' sent* '>'
	| '“' sent* '”'
	| '"' sent* '"'
	| str;

str: WORDS? ('。' | '！' | '？' | '…')+ | WORDS;