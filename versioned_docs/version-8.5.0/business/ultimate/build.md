# 构建和热更新

## 构建游戏

- 运行`HybridCLR/Generate/All`
- `Build Settings`中导出工程或者直接Build
- 创建AOT快照，同时将AOT快照目录加入版本管理
- 将AOT快照中的MetaVersions目录加入StreamingAssets目录，随包携带（可选，但强烈推荐）

## 创建AOT快照

:::warning
AOT快照中的dll必须精确地与构建出的主包中二进制代码一致，请务必在**导出工程**或者**Build**后再创建！
:::

流程如下：

- 创建AOT基础快照文件
- 为基础AOT快照中的dhe dll生成meta version
- 将最终的AOT快照目录加入版本管理

### 创建AOT基础快照文件

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

### 为基础AOT快照中的dhe dll生成meta version文件

调用`MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)`为快照中dhe dll生成对应的meta version文件。

`MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles`的`prevSnapshotDir`的参数规则：

- 如果是第一个AotSnapshot，由于不存在更旧的AotSnapshot，`prevSnapshotDir`取null。
- 如果项目使用单主包的模式，即同时只有一个有效主包，发布新主包后旧主包失效，则`prevSnapshotDir`取null。
- 如果项目使用多主包模式，即发布新主包后旧主包仍然有效，则`prevSnapshotDir`参数取上一个发布的主包的AotSnapshot目录。

GenerateAotSnapshotMetaVersionFiles生成了以下文件：

- meta version和spec文件。生成到MetaVersions目录下
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

### 随包携带AOT快照的meta version文件（可选，但强烈建议）

`RuntimeApi::LoadDifferentialHybridAssemblyWithMetaVersion`的参数`originalMetaVersionFileBytes`为DHE程序集的AOT快照中相应的meta version文件内容。
这个meta version文件每个主包都不一样，并且在构建主包时已经完全确定。此文件比较小，强烈建议随主包携带。

### 多平台

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

### Snapshot的版本管理

上一节`多平台`给出的目录结构实际上并不方便版本管理。一个适合版本管理的目录结构应该是这样的：

```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64
  ├── AotSnapshotDir-Android64
  ├── AotSnapshotDir-iOS
```

Snapshot更新流程如下：

- 创建一个最新主包的`CurrentAotSnapshotDir-{buildTarget}`目录。
- `CurrentAotSnapshotDir-{buildTarget}`与`AotSnapshotDir-{buildTarget}`对比计算出`CurrentAotSnapshotDir-{buildTarget}`的meta version文件。
- 用`CurrentAotSnapshotDir-{buildTarget}`替换`AotSnapshotDir-{buildTarget}`。
- 提交`AotSnapshotDir-{buildTarget}`到仓库。

## 发布热更新

旗舰版本是专业版本和社区版本的超集，即支持社区版本的纯解释程序集，也支持DHE程序集，两者可以并存。

由于DHE程序集会编译到AOT中，因此DHE程序集不能依赖普通的纯解释热更新程序集，否则会构建主包时就会因编译错误而失败，但普通的热更新程序集可以依赖DHE程序集。
DHE程序集也可以依赖DHE程序集。

普通的热更新程序集的配置和发布流程与社区版本完全相同，这儿不再赘述，只介绍DHE程序集的热更流程。

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 生成热更新dll。
- 生成热更新程序集的meta version文件。
- 将最新的热更新dll和meta version文件加入热更新资源管理系统。

### 生成热更新程序集的meta version文件

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

`*.mv.spec`是`*.mv.bytes`的可阅读版本，而`*.mv.diff.spec`记录了`*.mv.spec`中发生版本变化的元数据。这两类文件只用于方便追踪问题，运行过程中用不到它们。
建议将它们加入到仓库，但不要加入到热更新资源，因为没有任何用途！

## 其他

### UserEditorSettings.development选项

发布主包时的development选项和发布热更新的development选项必须一致，即创建AotSnapshot和编译热更新dll时的UserEditorSettings.development选项必须一致。因为development会对最终编译出的dll有巨大影响，
如果development参数不一致会导致计算出meta version有巨大变化！

### HybridCLRSettings.differentialHybridAssemblies 列表变化

`MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(string prevSnapshotDir, string curSnapshotDir)`要求prevSnapshotDir和curSnapshotDir快照的DHE程序集列表相同。

如果从某个主包起，新增或者删除了DHE程序集，都会导致生成meta version失败。解决办法为自这个主包起，创建一个全新的`AotSnapshot-{buildTarget}-v2`版本树。目录类似如下：

```txt
```txt
  Snapshots
  ├── AotSnapshotDir-StandaloneWindows64-v1
  ├── AotSnapshotDir-StandaloneWindows64-v2
```

- 使用v1版本的DHE列表配置，生成v1版本的AotSnapshot和HotUpdateSnapshot的meta version文件。
- 使用v2版本的DHE列表配置，生成v2版本的AotSnapshot和HotUpdateSnapshot的meta version文件。

发布热更新时，v1的主包只能加载v1版本的HotUpdateSnapshot的dll和meta version文件。v2版本的主包只能加载v2版本的HotUpdateSnapshot的dll和meta version文件。
