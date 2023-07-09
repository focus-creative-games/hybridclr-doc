# 使用手册

## 安装

- 将hyridclr_unity.zip解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`libil2cpp-{version}.7z`
- 打开 `HybridCLR/Installer`，启用`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装
- 根据你的Unity版本将 `ModifiedDlls\{verions}\Unity.IL2CPP.dll` 文件替换 `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll`(Unity 2020)或`{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`(Unity 2021+)。如果没有你的版本，联系我们制作一个

![installer](/img/hybridclr/ultimate-installer.jpg)

:::caution

Installer中完成安装后，一定要替换Unity.IL2CPP.dll，否则DHE机制无法正常工作。

:::

## 配置

### 配置PlayerSettings

- `Scripting Backend` 切换为 `IL2CPP`
- `Api Compatability Level` 切换为 `.Net 4.x`(Unity 2019-2020) 或 `.Net Framework`（Unity 2021+）

![player settings](/img/hybridclr/ultimate-project-settings.jpg)


### 开启增量式GC

`Player Settings`中启用 `use incremental GC` 选项即可， 不需要对HybridCLR进行任何设置。

:::caution

目前增量式GC处理alpha阶段，建议已经上线或者快上线的项目不要开启这个选项。
:::

### 开启完全泛型共享

- 2020版本不支持完全泛型共享
- 2021版本需要设置 IL2CPP Code Generation选项为`faster(smaller)`
- 2022版本默认开启完全泛型共享，无法关闭。如果设置 IL2CPP Code Generation选项为`faster(smaller)`则能进一步减少包体。

### 配置HybridCLR

与社区版本一样，点击`HybridCLR/Settings`菜单打开配置对话框。

| 字段 | 说明|
|-|-|-|
|differentialHybridAssemblies|DHE程序集列表。将需要差分混合执行的assembly名加入此列表，如HotUpdate。同一个assembly**不能同时加入**differentialHybridAssemblies和hotUpdateAssemlies列表。|
|strippedAOTDllSnapshotDir| 用于保存打包时生成的AOT dll。与`HybridCLR/CreateAOTDllSnapshot`菜单命令配合使用。|
|differentialHybridOptionOutputDir|dhao文件的生成目录|

## dhao文件

dhao文件是DHE技术的核心概念。dhao文件中包含了离线计算好的最新的热更新dll中变化的类型和函数的信息，运行时直接根据dhao文件中信息决定执行某个热更新函数时，应该使用最新的解释版本还是直接调用原始的AOT函数。
离线计算好的dhao文件对于DHE技术极为关键，如果没有dhao文件，需要额外携带原始AOT dll，并且计算函数变化的代价极其高昂。

通过对比最新的热更新dll与打包时生成的AOT dll，离线计算出变化的类型与函数，保存成dhao文件。因此DHE机制要正常工作，必须依赖于dhao文件的正确性，而dhao文件的正确性
则依赖精确提供最新的热更新dll和打包时生成的AOT dll。

`HybridCLR/generate/DHEAssemblyOptionDatas`命令生成dhao文件时，默认从`{hotUpdateDllCompileOutputRootDir}/{target}`目录读取最新的热更新dll，
从`{strippedAOTDllSnapshot}/{target}`目录读取打包时生成的AOT dll。打包时AOT dll会被自动生成并且复制到`{strippedAOTDllOutputRootDir}/{target}`目录，
但为了避免后续临时打包意外覆盖打包时生成的AOT dll，不会自动复制到`{strippedAOTDllSnapshot}/{target}`目录，需要手动执行`HybridCLR/CreateAOTDllSnapshot`。

:::tip
正式发布App时，一定要立即调用`HybridCLR/CreateAOTDllSnapshot`命令将AOT dll复制到快照目录，才能保证生成dhao文件的正确性。
:::


## 标记变化的函数信息

目前已经可以自动通过对比最新的热更新dll和打包时生成的aot dll，计算出变化的函数，绝大多数情况下不需要手动操作。但事实上并不存在完美的能够判断逻辑等价性的代码，
工具只是简单地一一对比IL来判断等价性。因此偶尔有可能尽量IL发生变化，函数却是等价的。在这种情况下，可以使用UnchangedAttribute特性标注函数的变化性，`[Unchanged]`表示未变化，
`[Unchanged(false)]`表示未变化，未包含该特性则由工具自动计算。

错误地将未变化函数标记为已变化，不会影响运行的正确性，只会影响性能。就算将所有热更新函数都标记为变化，也能正常运行。但错误地将变化函数标记为未变化，不仅会导致运行逻辑出错，
严重情况下还会导致崩溃！

:::caution
除非特殊情况以及你是有经验的专家，不要手动标记。因为编译器经常生成一些隐藏类或字段，这些类名并不是稳定的。表面看起来一样的C#代码，实际生成的代码未必一样，强行标注为`[Unchanged]`会导致不正确的运行逻辑，甚至崩溃。
:::

## 代码中使用

运行时，完成热更新后，对于每个混合执行 assembly，调用 `RuntimeApi::LoadDifferentialHybridAssembly` 加载热更新assembly。一般来说，传递的参数为通过`HybridCLR/CompileDll/xxx`编译的
热更新dll及通过`HybridCLR/Generate/DHEAssemblyOptionDatas`生成的dhao数据。但对于新发布、还未发生任何热更新的情形，传递的参数为`打包时生成的AOT dll`及`null dhao数据`。

:::caution
发布新包时，也可以使用通过`HybridCLR/CompileDll/xxx`编译的热更新dll及通过`HybridCLR/Generate/DHEAssemblyOptionDatas`生成的dhao数据。但初始包显然未发生变化，计算并且携带dhao文件是没必要的。
注意此时不能用 `HybridCLR/CompileDll/xxx`编译的热更新dll替代`打包时生成的AOT dll`，因为编译是不稳定的，它们未必一样，很可能会导致严重崩溃问题。
:::

注意事项：

- 要按照assembly的依赖顺序加载 差分混合执行 assembly。
- 如果某个程序集未发生改变，dhao字段可以传null，但此时一定要使用打包时生成的AOT dll，而不能使用通过`HybridCLR/CompileDll/xxx`命令生成的热更新dll。
- DHE程序集本身已经包含了元数据，即使未开启完全泛型共享时也**不要对DHE程序集进行补充元数据**，补充了也会失败，其他非DHE的AOT程序集可以照常补充元数据。

```csharp title="加载DHE程序集"
void InitDifferentialHybridAssembly(string assemblyName)
{
    // 没有任何热更新时，传递的参数为null。
    byte[] dhaoBytes = needHotUpdate ? GetAssemblyOptionData(assemblyName) : null;
    LoadImageErrCode err = RuntimeApi.LoadDifferentialHybridAssembly(GetAssemblyData(assemblyName), dhaoBytes);
}
```

## 打包

在打包管线中生成AOT dll后运行`HybridCLR/CreateAOTDllSnapshot`备份AOT文件，并且加入版本管理系统，因为将来热更新生成dhao文件时需要它们。注意！由于裁剪AOT dll生成的不稳定性，千万不要用`HybridCLR/Generate/All`命令生成的AOT dll。

由于DHE机制正常工作需要提供dhe程序集，在未发生任何热更新时，DHE程序集等价于打包时生成的AOT 程序集，**此时不需要提供dhao文件**。尽管这些程序集可以通过热更新下载，强烈推荐随包携带。

### 随包携带DHE程序集

如果想随包携带DHE程序集对应的AOT dll，根据你的BuildTarget：

- iOS。新增`IPostprocessBuildWithReport`处理类，在OnPostprocessBuild函数中复制 `{proj}/HybridCLRData/AssembliesPostIl2CppStrip/{buildTarget}`下的DHE dll到StreamingAssets目录（或子目录）。也可以手动在导出工程后复制
- Android。**如果你是先导出gradle工程再打包，则跟iOS相同**。如果是直接出APK包，则新增 `IPostGenerateGradleAndroidProject`处理类，在OnPostGenerateGradleAndroidProject事件中复制生成的DHE AOT程序集到gradle工程

```csharp title="打包流程中复制DHE程序集"

// iOS或者Android导出工程后，复制文件到工程
public class CopyDHEAOTDllsToProject : IPostprocessBuildWithReport
{
    public int callbackOrder => 0;

    public void OnPostprocessBuild(BuildReport report)
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        YourCopyDHEAssembliesToStreamingAssetsOrAssetBundle();
    }
}

/// 生成Gradle工程后，复制需要的文件
public class CopyDHEAOTDllsToAndroidProject : IPostGenerateGradleAndroidProject
{
    public int callbackOrder => 0;

    public void OnPostGenerateGradleAndroidProject(string path)
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        YourCopyDHEAssembliesToStreamingAssetsOrAssetBundle();
    }
}

```

:::caution

如果打包使用 **development build 选项**，请一定要对应使用`HybridCLR/CompileDll/ActivedBuildTarget_Development`编译Development模式的热更新dll，否则对比结果为几乎所有函数都被判定为发生变化。

:::

## 热更新

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 生成热更新dll。
- 确保之前已经运行运行`HybridCLR/CreateAOTDllSnapshot`备份AOT文件，确保备份目录下的AOT dll为打包时生成的AOT dll。
- 使用 `HybridCLR/generate/DHEAssemblyOptionDatas` 生成dhao文件。

:::caution
由于 DHEAssemblyOptionDatas 的工作原理是对比最新热更新`DHE dll`与原始AOT dll的备份目录的AOT dll，生成变化的函数及类型信息。请一定一定要确保热更新dll和备份
的AOT dll的正确性！
:::



