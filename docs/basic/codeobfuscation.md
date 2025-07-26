# 代码混淆

如果没有对热更新代码进行混淆，经过ILSpy之类的反编译工具，可以轻易还原近乎源码的C#代码，这对商业游戏项目和独游开发的知识产权和代码安全产生严重威胁。

目前的开源代码混淆工具中，只有[Obfuz](https://github.com/focus-creative-games/obfuz)与Unity深度集成，并且完整支持HybridCLR。

**Obfuz** 是一款开源、强大、易用及稳定可靠的充分满足商业化游戏项目需求的Unity代码混淆和加固解决方案。强烈建议使用Obfuz来加密和保护你的代码。

Obfuz已经提供了以下相关文档：

- [Obfuz+HybridCLR](https://www.obfuz.com/docs/beginner/work-with-hybridclr)
- [构建过程中执行混淆](https://www.obfuz.com/docs/manual/build-pipeline)
- [增量混淆与代码热更新](https://www.obfuz.com/docs/manual/incremental-obfuscation-and-hotupdate)
- [与HybridCLR协同工作](https://www.obfuz.com/docs/manual/work-with-hybridclr)
- **[多态dll文件](https://www.obfuz.com/docs/manual/hybridclr/polymorphic-dll)**

:::tip
**多态dll文件**能有效对抗破解和篡改dll，强烈建议商业项目使用此特性。
:::
