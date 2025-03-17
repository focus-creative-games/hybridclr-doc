# 配置程序集

一般来说，必须将热更新代码独立为assembly，才能方便地进行热更新。

## 程序集分类

### Assembly Definition定义的程序集

这是Unity推荐的程序集方式。将一个大的Unity项目代码拆分为多个程序集模块，便于管理，缩短编译时间。

请阅读文档[Assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html)了解如何创建程序集。

### Assembly-CSharp 程序集

这是Unity的默认全局程序集。它可以像普通dll一样当作热更新程序集。

### 普通的dll程序集

一些代码被提前编译成dll文件，再移到项目中。

## 划分程序集

很显然，项目代码必须合理拆分为`AOT`（即编译到游戏主包内）程序集 和 `热更新`程序集，才能进行热更新。HybridCLR对于
怎么拆分程序集并无任何限制，甚至可以把第三方工程中的代码作为热更新程序集。一般来说，游戏刚启动时，至少需要一个AOT程序集来负责启动及热更新相关工作。



常见的拆分方式有几种：

- Assembly-CSharp作为AOT程序集。剩余代码自己拆分为N个AOT程序集和M个热更新程序集。
- Assembly-CSharp作为热更新程序集。剩余代码自己拆分为N个AOT程序集和M个热更新程序集。

无论哪种拆分方式，正确设置好程序集之间的引用关系即可。请不要在AOT程序集中引用热更新程序集，这会导致打包出错。如果
你们项目把Assembly-CSharp作为AOT程序集，强烈建议关闭热更新程序集的`auto reference`选项。因为Assembly-CSharp是最顶层assembly，它会自动引用剩余所有assembly，很容易就出现失误引用热更新程序集的情况。
