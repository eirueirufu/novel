# 格式化

使用[antlr](https://www.antlr.org/)进行语法解析

## 生成文件命令

```g4
antlr4 -Dlanguage=TypeScript -visitor Format.g4
```

## 格式化规则

1. 对文章进行默认分段: 以`\r\n`进行分隔
2. 分段后分句子: 
	- 以`。！？…`进行分句
	- 在`（）()【】[]《》<>“”""`中的句子，以最外层为一句
3. 一段过长的话（默认超过20，可在配置中修改），则对将句子进行分段