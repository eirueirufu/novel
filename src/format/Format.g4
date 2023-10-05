grammar Format;

// WS: [ \t]+ -> channel(HIDDEN);
WS: [ \t]+;
NEWLINE: [\r\n]+;
WORDS: (~[\r\n。！？…（）()【】[\]《》<>“”"])+;

// 章节
section: para+;
// 段落
para: WS? sent+ WS? NEWLINE?;
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

str: WORDS? ('。' | '！' | '？' | '……')+ | WORDS;