# novel

<p align="left">
<a href="https://github.com/eirueirufu/novel"><img src="https://github.com/eirueirufu/novel/workflows/ci/badge.svg?branch=main" alt="CI"></a>
<a href="https://github.com/google/gts"><img src="https://img.shields.io/badge/code%20style-google-blueviolet.svg" alt="Code Style: Google"></a>
</p>

~~你还在为文笔太烂而烦恼吗，还在为没有灵感而发愁吗？~~

为各位~~扑街~~白金大神提供的**网文写作**VSCode插件，提供高亮、提示、gpt等功能。

## 文件

插件编辑的文件后缀名要为`.novel`或缩写`.nv`

## 基本功能

### 高亮

可自由选择与取消高亮关键词，比如人物名称等
![高亮](./media/readme/highlight.gif)

### 提示

根据输入词提示，可自己配置提示词。

注意：在没有触发提示的时候可以手动用`ctrl`+`space`触发提示，快捷键设置可以在键盘快捷键里搜索`触发建议`。

![提示](./media/readme/completion.gif)

### gpt提问

使用条件: 
1. 该功能需要你有自己的gpt账号，并且创建了自己的apikey，在👉[官网](https://platform.openai.com/account/api-keys)创建
2. 你需要一个可以**访问gpt**的网络环境(重要！)

![gpt1](./media/readme/gpt1.gif)
![gpt2](./media/readme/gpt2.gif)

#### 自定义配置

在工作区.vscode目录下的settings.json配置文件中，可以自定义gpt相关的配置
```json
{
    "novel.openaiKey": "your openaiKey",
    "novel.openaiBaseURL": "https://your-proxy.com/v1",
    "novel.gptChatSystem": "See https://platform.openai.com/docs/guides/gpt/chat-completions-api",
    "novel.gptModel": "See https://platform.openai.com/docs/models/overview",
}
```

## 其他

有问题，改进意见可以在[issue](https://github.com/eirueirufu/novel/issues)里提哦。

如果该插件对你有帮助，请给我个star⭐吧~