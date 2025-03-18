# MetaVersion工作流

DHE热更新曾存在两种工作流：

- DHAO工作流
- MetaVersion工作流

在`v7.6.0`及更早版本，构建工作流为DHAO工作流。DHAO工作流使用dhao文件记录有哪些类型和函数发生了变化，hybridclr加载dhe程序集后，根据dhao文件记录
的变化信息，决定执行函数时调用原始的aot函数还是解释执行最新的代码。

dhao是根据最新的热更新dhe dll与主包的原始dhe dll比较计算出来的。它的原理直接简单，缺点是如果正式上线后存在多个主包，则需要为每个主包生成对应的dhao文件。
当主包较多时这个流程比较复杂，不好管理。

自`v7.7.0`版本起，新增了`MetaVersion`工作流。它彻底解决了DHAO工作流的以上缺点。

## 原理

MetaVersion工作流为dll中每个类型和函数单独计算出一个唯一版本号，调用`RuntimeApi.LoadDifferentialHybridAssemblyWithMetaVersion`加载DHE程序集时，
通过对比最新热更新程序集的meta version和当前主包的AOT快照的meta version，即可判断类型或者函数是否发生改变。
最终只需要为每个热更新DHE dll计算一个meta version文件，即可用于所有主包的热更新。

## 基础概念

深入MetaVersion工作流前，需要了解几个术语：

- Snapshot
- inject rule文件
- meta version文件
- meta spec文件
- manifest.json
- signature-mapper.json

### Snapshot

Snapshot是一组计算meta version文件所需的文件的集合，它包含以下文件：

- dll文件
- inject rule文件
- manifest.json
- meta version文件
- meta spec文件
- signature-mapper.json文件

Snapshot有两种类型：AOT Snapshot和HotUpdate Snapshot。

### Inject Rule文件

默认情况下会在几乎所有DHE函数的头部注入代码。注入代码可以极大缓解脏函数传染问题，缺点是增加代码大小以及带来少量的额外开销。Inject Rule文件用于
自定义代码注入规则，允许对于一些函数不注入。详细文档见[函数注入策略](./injectrules)。

### manifest.json

记录了DHE程序集列表之类的信息。当对比计算两个AOT Snapshot的meta version文件时，会检查DHE程序集列表的一致性。只有DHE程序集列表完全相同的AOT Snapshot，
才能正确计算meta version。

### meta version文件

meta version文件中保存了所有元数据的版本信息。加载DHE程序集时，通过对比热更新程序集的meta version文件和原始DHE程序集的meta version文件来判定是否发生改变，
进而决定调用原始AOT函数还是解释执行函数。

meta version文件使用`.mv.bytes`后缀。

### meta spec文件

meta spec文件是meta version文件的可阅读版本，运行过程中用不到此文件。建议加入到仓库，但不要加入到热更新资源系统，因为没有任何用处！

有两类型meta spec文件：

- `*.mv.spec`。记录了完整的meta version信息
- `*.mv.diff.spec`。记录了发生版本变化的meta version信息。阅读此文件可以快速知晓哪些类型和函数发生改变了

### signature-mapper.json文件

当C#代码改动（尤其是新增或者删除类型和函数）后，生成的dll中相同类型和函数的token很可能发生改变。如果meta version文件中仅仅记录这些元数据的token，
则运行时加载时需要花费大量时间去找到这些token的新旧映射关系。一个更好的解决办法是记录下每个token的signature信息，通过对比signature来快速建立
新旧token的映射关系。

由于signature字符串非常长，为了节省空间以及方便运行时比较，将signature字符串提前映射为唯一整数。signater-mapper.json文件用于记录这个映射关系。

signature-mapper.json仅在生成meta version时需要，运行过程中并不使用这个文件。建议将此文件加入版本管理，但不要加入热更新资源系统！

## 构建和热更新作流

- 构建主包
  - 导出主包工程或者直接构建主包
  - 创建对应的AOT Snapshot
  - 将AOT Snapshot中的meta version文件加入主包的StreamingAssets目录（可选，但强烈推荐）
- 发布热更新
  - 创建HotUpdate Snapshot
  - 将HotUpdate Snapshot的热更新dll和meta version加入热更新资源系统

## AOT Snapshot

AOT Snapshot记录了主包AOT信息，它有几个核心功能：

- 记录了自身的meta verison信息
- 用于计算后续版本的主包的meta version信息
- 用于计算热更新代码的meta version信息

AOT Snapshot的目录结构如下：

```txt
  AotSnapshotDir
    ├── *.dll
    ├── InjectRules
    ├── MetaVersions
      ├── *.mv.bytes
      ├── *.mv.spec
      ├── *.mv.diff.spec
    ├── signature-mapper.json
    └── manifest.json
```

AOT Snapshot信息在构建主包时已经完全确定，请将它加入项目的版本管理系统。

由于调用`RuntimeApi::LoadDifferentialHybridAssemblyWithMetaVersion`加载DHE程序集时需要AOT Snapshot的meta version文件，建议将AOT Snapshot
的`*.mv.bytes`文件随包携带。

### 创建AOT Snapshot

:::warning
AOT Snapshot中的dll必须精确地与构建出的主包中二进制代码一致，请务必在**导出工程**或者**Build**后再创建！不能使用`HybridCLR/Generate/All`生成的AOT dll！
:::

流程如下：

- 创建AOT基础快照文件
- 为基础AOT快照中的dhe dll生成meta version

#### 创建AOT基础快照文件

调用`MetaVersionWorkflow.CreateAotSnapshot(BuildTarget target, string outputSnapshotDir)`创建快照基础文件。

CreateAotSnapshot做了以下工作：

- 复制所有AOT和DHE dll
- 复制inject rule文件到InjectRules目录
- 创建manifest.json，记录所有DHE程序集列表

基础快照目录结构如下：

```txt
  AotSnapshot
  ├── *.dll
  ├── InjectRules
        ├──rule1.xml
        ├──rule2.xml
  └── manifest.json
```

#### 为基础AOT快照中的dhe dll生成meta version文件

调用`MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)`为快照中dhe dll生成对应的meta version文件。

`MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles`的`prevSnapshotDir`的参数规则：

- 如果是第一个AotSnapshot，由于不存在更旧的AotSnapshot，`prevSnapshotDir`取null。
- 如果项目使用单主包模式，即同时只有一个有效主包，发布新主包后旧主包失效，则`prevSnapshotDir`取null。
- 如果项目使用**多主包**模式，即发布新主包后旧主包仍然有效，则`prevSnapshotDir`参数取最近一个发布的相同buildTarget的主包的AotSnapshot目录。

GenerateAotSnapshotMetaVersionFiles生成了以下文件：

- meta version文件。生成到MetaVersions目录下
- signature-mapper.json文件

生成前目录结构如下：

```txt
  Snapshots
  ├── PrevAotSnapshotDir
      ├── *.dll
      ├── InjectRules
      ├── MetaVersions
        ├── *.mv.bytes
        ├── *.mv.spec
        ├── *.mv.diff.spec
      ├── signature-mapper.json
      └── manifest.json
  ├── CurrentSnapshotDir
      ├── *.dll
      ├── InjectRules
      └── manifest.json
```

生成后新增了MetaVersions目录和signature-mapper.json文件，最终目录结构如下：

```txt
  Snapshots
  ├── PrevAotSnapshotDir
      ├── *.dll
      ├── InjectRules
      ├── MetaVersions
        ├── *.mv.bytes
        ├── *.mv.spec
        ├── *.mv.diff.spec
      ├── signature-mapper.json
      └── manifest.json
  ├── CurrentAotSnapshotDir
      ├── *.dll
      ├── InjectRules
      ├── MetaVersions (New)
        ├── *.mv.bytes
        ├── *.mv.spec
        ├── *.mv.diff.spec
      ├── signature-mapper.json (New)
      └── manifest.json
```

#### 多平台

绝大多数游戏都会发布多个平台，由于不同平台之前的主包AOT dll差异较大，我们**强烈建议**为每个平台单独维护AotSnapshot树。目录结构类似这样：

```txt
  Snapshots
  ├── PreAotSnapshotDir-StandaloneWindows64
  ├── CurrentAotSnapshotDir-StandaloneWindows64
  ├── PreAotSnapshotDir-Android64
  ├── CurrentAotSnapshotDir-Android64
  ├── PreAotSnapshotDir-iOS
  ├── CurrentAotSnapshotDir-iOS

```

例如，计算新发布的Win64主包的meta version时，使用上一个发布的Win64主包的snapshot目录和新主包的snapshot计算该新主包的meta version。

#### 版本管理

上一节`多平台`给出的目录结构实际上并不方便版本管理。一个适合版本管理的目录结构应该是这样的：

```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64
  ├── AotSnapshotDir-Android64
  ├── AotSnapshotDir-iOS
```

Snapshot更新流程如下：

- 创建一个最新主包的`CurrentAotSnapshotDir-{buildTarget}`**临时**目录。
- `CurrentAotSnapshotDir-{buildTarget}`与`AotSnapshotDir-{buildTarget}`对比计算出`CurrentAotSnapshotDir-{buildTarget}`的meta version文件。
- 用`CurrentAotSnapshotDir-{buildTarget}`替换`AotSnapshotDir-{buildTarget}`。
- 提交`AotSnapshotDir-{buildTarget}`到仓库。

## HotUpdate Snapshot

每次发布一次代码热更新时，都会需要创建HotUpdate Snapshot。相比AOT Snapshot，HotUpdate Snapshot仅包含以下文件：

- 最新的热更新程序集文件
- 最新的DHE程序集的meta version信息
- signature-mapper.json

目录结构如下：

```txt
  HotUpdateSnapshotDir
    ├── *.dll
    ├── MetaVersions
      ├── *.mv.bytes
      ├── *.mv.spec
      ├── *.mv.diff.spec
    ├── signature-mapper.json (New)
```

发布热更新时仅需要热更新程序集dll文件和DHE程序集的meta version文件，将这两类文件加入热更新资源系统。

### 创建HotUpdate Snapshot

创建流程：

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 生成热更新dll。
- 生成热更新程序集的meta version文件。

调用`MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(string aotSnapshotDir, string hotUpdateSnapshotDir)`生成热更新程序集的meta version文件。
其中`aotSnapshotDir`为最新的`AotSnapshot-{buildTarget}`目录，`hotUpdateSnapshotDir`为最新的热更新程序集目录。

调用完该函数后，将在`{hotUpdateSnapshotDir}/MetaVersions`目录下生成DHE程序集对应的meta version文件。目录结构类似：

```txt
  HotUpdateSnapshot
  ├── *.dll
  ├── MetaVersions
    ├── *.mv.bytes
    ├── *.mv.spec
    ├── *.mv.diff.spec
```

示例代码如下：

```csharp
        public static void GenerateHotUpdateMetaVersionFiles(BuildTarget target)
        {
            var latestSnapshotSolutionDir = GetAOTAssemblySnapshotDir(target);
            var newHotUpdateSolutionDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
            MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(latestSnapshotSolutionDir, newHotUpdateSolutionDir);
        }

```

建议将`*.mv.spec`和`*.mv.diff.spec`加入到版本管理，但不要加入到热更新资源系统，因为不需要！
