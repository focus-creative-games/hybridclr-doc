# 加载热更新程序集

旗舰版本相比社区版本和专业版本增加了DHE程序集。由于DHE程序集需要额外的参数要指示运行时如何动态选择执行原始AOT代码还是热更新代码，它无法使用`Assembly.Load`接口加载。
因此需要特殊的加载规则。

## 支持的程序集类型

旗舰版本是社区版本和专业版的超集，它即支持加载普通的纯解释的热更新程序集，也支持加载DHE程序集。
如果不配置任何DHE程序集，旗舰版本退化为专业版（或者可以认为是运行更快一些的社区版本）。

## 加载顺序

旗舰版本使用社区版本一样的依赖加载规则，即如果B程序集依赖A程序集，则需要先加载A程序集，再加载B程序集。

由于DHE程序集会被编译到AOT中，因此它不能依赖热更新程序集，否则打包时会出错。我们已经在`HybridCLR.Editor.BuildProcessors.CheckSettings`中加了依赖检查，可以提前发现错误。

由于这个特点，一个比较简单的办法是先按顺序加载所有DHE程序集，然后再按顺序加载普通热更新程序集。

## 加载DHE程序集

RuntimeApi中提供三个加载DHE程序集的接口：

- LoadOriginalDifferentialHybridAssembly 用于加载没有发生任何改变的DHE程序集
- LoadDifferentialHybridAssemblyWithDHAO 用于加载没有改变或者改变的DHE程序集，使用dhao文件
- LoadDifferentialHybridAssemblyWithMetaVersion 用于加载没有改变或者改变的DHE程序集，使用meta version文件

在明确知道没有发生任何改变时，可以调用LoadOriginalDifferentialHybridAssembly接口指示直接使用原始的DHE程序集，仅需要传递程序集名，不需要传递原始DHE程序集数据，因为AOT中
已经包含完整的原始DHE程序集信息。

无论有没有改变，都可以调用LoadDifferentialHybridAssemblyWithXxx加载DHE程序集。

对于调用LoadOriginalDifferentialHybridAssembly有一些限制：

1. 它所依赖的DHE程序集必须也是用LoadOriginalDifferentialHybridAssembly加载的，即Original加载依赖性
2. AOT泛型实例化问题
  
  用它加载的DHE程序集等价于普通的AOT程序集。如果其他热更新程序集使用到该DHE程序集中的泛型，并且Unity版本小于2021或等于2021但`Il2Cpp Code Generation`选项同样会有AOT泛型实例化问题。
  尽管可以补充元数据解决此问题，不过更好的办法是换成LoadOriginalDifferentialHybridAssembly加载。

实际的项目可能有许多DHE程序集，判断每个DHE程序集到底该使用哪个接口来加载是困难的。甚至判断一个程序集到底改变了没，也不是一件容易的事情。
我们建议使用以下简单规则：

- 发布主包后，未发生任何热更新时，使用LoadOriginalDifferentialHybridAssembly加载所有DHE程序集
- 发布热更新后，无论有没有改变，统一使用LoadDifferentialHybridAssemblyWithXxx加载DHE程序集

## LoadDifferentialHybridAssemblyWithDHAO

该函数有如下参数：

|参数|描述|
|-|-|
|currentDllBytes|最新的DHE程序集的文件内容|
|currentDllSymbolBytes|最新DHE程序集的pdb文件内容，此参数可以为null|
|dhaoBytes|使用最新DHE程序集生成的dhao文件内容|

## LoadDifferentialHybridAssemblyWithMetaVersion

该函数有如下参数：

|参数|描述|
|-|-|
|currentDllBytes|最新的DHE程序集的文件内容|
|currentDllSymbolBytes|最新DHE程序集的pdb文件内容，此参数可以为null|
|originalMetaVersinFileBytes|原始的DHE程序集的meta version文件内容|
|currentMetaVersionFileBytes|最新的DHE程序集的meta version文件内容|

originalMetaVersinFileBytes在构建主包时已经完全确定，并且与该主包一一对应。我们强烈建议将它加入StreamingAssets目录随包携带。
