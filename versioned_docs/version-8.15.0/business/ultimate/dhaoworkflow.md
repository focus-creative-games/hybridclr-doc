# DHAO工作流

:::warning
如果你使用的hybridclr版本 >= v7.7.0，建议使用[MetaVersion工作流](./metaversionworkflow)。
:::

DHAO工作流是DHE热更新使用最悠久的工作流，在v7.6.0及更早版本之前，只支持DHAO工作流。

## 原理

加载DHE程序集时需要知道哪些类型和函数发生了改变，以决策运行时应该调用原始的AOT代码还是解释执行最新的热更新代码。这个差异计算依赖原始DHE和最新DHE程序集，
计算非常复杂而且耗时，不可能运行过程中实时计算，因此使用离线计算的方式。计算出的差异信息保存到dhao文件中。

DHAO工作流原理简单，但由于dhao文件是根据最新DHE与原始DHE计算而来，如果正式上线后存在多个主包，则需要为每个主包生成对应的dhao文件。
当主包较多时这个流程比较复杂，不好管理。[MetaVersion工作流]彻底解决了这个痛点问题。

## 基础概念

了解DHAO工作流需要了解以下几个术语：

- AOT Snapshot
- inject rule文件
- manifest.json
- dhao文件
- spec文件

### AOT Snapshot

AOT Snapshot是一组计算dhao文件所需的文件的集合，它包含以下文件：

- dll文件
- inject rule文件
- manifest.json

AOT Snapshot记录了主包AOT信息，它的核心功能是用于计算热更新时所需的dhao文件。

AOT Snapshot的目录结构如下：

```txt
  AotSnapshotDir
    ├── *.dll
    ├── InjectRules
    └── manifest.json
```

AOT Snapshot信息在构建主包时已经完全确定，请将它加入项目的版本管理系统。

### Inject Rule文件

默认情况下会在几乎所有DHE函数的头部注入代码。注入代码可以极大缓解脏函数传染问题，缺点是增加代码大小以及带来少量的额外开销。Inject Rule文件用于
自定义代码注入规则，允许对于一些函数不注入。详细文档见[函数注入策略](./injectrules)。

### manifest.json

记录了DHE程序集列表之类的信息。

### dhao文件

dhao文件记录了DHE程序集中改变的类型和函数，当执行那些变化的函数时，会自动切换到解释执行。

dhao文件使用`.dhao.bytes`后缀。

### spec文件

spec文件是dhao文件的可阅读版本，运行过程中用不到此文件。建议加入到仓库，但不要加入到热更新资源系统，因为没有任何用处！

## 构建和热更新工作流

- 构建主包
  - 导出主包工程或者直接构建主包
  - 创建AOT Snapshot
- 发布热更新
  - 编译热更新dll
  - 根据AOT Snapshot和最新的热更新dll，计算dhao文件
  - 将热更新dll和dhao文件加入热更新资源系统

## 创建AOT Snapshot

:::warning
AOT Snapshot中的dll必须精确地与构建出的主包中二进制代码一致，请务必在**导出工程**或者**Build**后再创建！不能使用`HybridCLR/Generate/All`生成的AOT dll！
:::

调用`DhaoWorkflow.CreateAotSnapshot(BuildTarget target, string outputSnapshotDir)`创建AOT Snapshot文件。

请将AOT Snapshot加入版本管理，以便后续使用。

## 生成dhao

生成流程：

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 编译最新的热更新dll。
- 调用`DhaoWorkflow.GenerateDhaoFiles(string aotSnapshotDir, string hotUpdateSnapshotDir, string dhaoOutputDir)`生成dhao文件。
  
  aotSnapshotDir为构建主包时创建的AOT Snapshot目录。hotUpdateSnapshotDir为最新的热更新dll目录。dhaoOutputDir为dhao文件输出目录。

## 多平台与多主包

由于dhao的实现原理，每次发布热更新，每个`{主包-平台}`的组合都需要生成单独的dhao文件。

## 合并多个dhao文件（不建议）

:::warning

合并dhao文件会导致性能下降，慎用此功能！！！

:::

如果觉得每个主包都提供单独的dhao文件很麻烦，可以考虑同一平台下的所有主包的dhao文件合并为一个dhao文件，调用`DhaoWorkflow.MergeDhaoFile`完成这个工作。

所有主包的dhao文件合并为一个dhao文件有一个缺点，最终输出的dhao文件中记录的类型和函数变化为所有输入dhao文件中类型和函数变化的并集。这导致如果某个函数只
在旧主包中发生改变，在最新的主包中没有发生改变，合并的dhao文件中会将这个函数标记为变化，导致在最新的主包中也解释方式执行该函数。这带来性能下降。
