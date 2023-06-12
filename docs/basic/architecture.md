# HybridCLR代码结构及版本

完整的HybridCLR代码由三个仓库构成：

- il2cpp_plus
- hybridclr
- com.code-philosophy.hybridclr


这三个仓库有独立的版本号，因此谈到HybridCLR版本时，一般包含这三个版本号。

## il2cpp_plus

仓库地址 [github](https://github.com/focus-creative-games/il2cpp_plus) [gitee](https://gitee.com/focus-creative-games/il2cpp_plus)。


HybridCLR扩展il2cpp运行时，需要对原始il2cpp代码作少量调整，以支持混合运行模式。这部分代码对应了 il2cpp_plus 仓库。由于il2cpp每个年度大版本变化较大，需要对每个Unity大版本单独进行适配。

每个年度版本都对应一个 `{version}-main`主分支，如 `2021-main`。

当前每个年度版本还有一个老的1.0分支 `{version}-1.0`，如 `2019-1.0`。

## hybridclr


仓库地址 [github](https://github.com/focus-creative-games/hybridclr) [gitee](https://gitee.com/focus-creative-games/hybridclr) 

hybridclr仓库中包含了解释器的核心代码，所有il2cpp_plus共享同一套hybridclr代码，不区分Unity大版本。当前有两个分支：

- main
- 1.0

## com.code-philosophy.hybridclr

仓库地址 [github](https://github.com/focus-creative-games/hybridclr_unity) [gitee](https://gitee.com/focus-creative-games/hybridclr_unity)

com.code-philosophy.hybridclr是Unity Package，包含一些使用HybridCLR所需的运行时代码及编辑器工作流工具。

com.code-philosophy.hybridclr也不区分Unity大版本，因此像hybridclr一样，当前有两个分支：

- main
- 1.0

在早期版本中（如1.0分支）,需要在Installer中指定你要安装的il2cpp_plus和hybridclr的分支。这两个仓库的分支必须匹配，
即 il2cpp_plus 的`{version}-main`与hybridclr的`main`匹配， `{version}-1.0`与`1.0`匹配。

自 `v2.0.0-rc`版本（属于main分支）起，com.code-philosophy.hybridclr中直接配置了与它兼容的 il2cpp_plus及hybridclr仓库的版本号。对于开发者来说，
只需要安装合适的com.code-philosophy.hybridclr版本即可。