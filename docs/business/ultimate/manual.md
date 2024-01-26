# 使用手册

## 安装

- 将hybridclr_unity.zip解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下
- 打开 `HybridCLR/Installer`，启用`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装
- 根据你的Unity版本：
    - 如果版本 >= 2020，将 `ModifiedDlls\{verions}\Unity.IL2CPP.dll` 文件替换 `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll`(Unity 2020)或`{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`(Unity 2021+)。如果没有你的版本对应的文件，联系我们制作一个
    - 如果版本 为 2019，不需要任何操作，因为Install过程中已经自动复制

![installer](/img/hybridclr/ultimate-installer.jpg)


## 配置

### 配置PlayerSettings

- `Scripting Backend` 切换为 `IL2CPP`
- `Api Compatability Level` 切换为 `.Net 4.x`(Unity 2019-2020) 或 `.Net Framework`（Unity 2021+）

![player settings](/img/hybridclr/ultimate-project-settings.jpg)


### 开启增量式GC

`Player Settings`中启用 `use incremental GC` 选项即可， 不需要对HybridCLR进行任何设置。

### 开启完全泛型共享

- 2020版本不支持完全泛型共享
- 2021版本需要设置 IL2CPP Code Generation选项为`faster(smaller)`
- 2022版本默认开启完全泛型共享，无法关闭。如果设置 IL2CPP Code Generation选项为`faster(smaller)`则能进一步减少包体。


## 开启和关闭标准指令优化

默认已经开启标准优化。可以通过 `RuntimeApi.EnableTransformOptimization`函数主动控制开启或者关闭这个特性。

标准指令优化与高级指令优化是完全独立并且互斥的两个特性，对于每个解释函数，只能选择使用两者之一或者完全不使用它们。

### 配置HybridCLR

与社区版本一样，点击`HybridCLR/Settings`菜单打开配置对话框。

| 字段 | 说明|
|-|-|-|
|differentialHybridAssemblies|DHE程序集列表。将需要差分混合执行的assembly名加入此列表，如HotUpdate。同一个assembly**不能同时加入**differentialHybridAssemblies和hotUpdateAssemlies列表。|


### 在link.xml中预留所有DHE程序集

对于Assembly-CSharp这种用户自己的代码，il2cpp一般不会裁剪。但对于以dll形式直接加到Unity中的第三方程序集，如果不预留所有会导致打包时这些dll被裁剪，
进而在生成dhao文件时有巨量的变化，这显然不是我们期望的。

在`Assets/link.xml`（或者其他自定义的link.xml）中为你的所有dhe程序集添加类似配置`<assembly fullname="YourExternDll" preserve="all"/>`。

## dhao文件

dhao文件是DHE技术的核心概念。dhao文件中包含了离线计算好的最新的热更新dll中变化的类型和函数的信息，运行时直接根据dhao文件中信息决定执行某个热更新函数时，应该使用最新的解释版本还是直接调用原始的AOT函数。
离线计算好的dhao文件对于DHE技术极为关键，如果没有dhao文件，需要额外携带原始AOT dll，并且计算函数变化的代价极其高昂。

通过对比最新的热更新dll与打包时生成的AOT dll，离线计算出变化的类型与函数，保存成dhao文件。因此DHE机制要正常工作，必须依赖于dhao文件的正确性，而dhao文件的正确性
则依赖精确提供最新的热更新dll和打包时生成的AOT dll。


`HybridCLR.Editor.DHE.BuildUtils`提供了多个生成dhao文件相关的函数。

|函数名|描述|
|-|-|
|GenerateUnchangedDHAODatas|生成首包（即没有发生任何改变时）的dhao文件|
|GenerateDHAODatas|生成热更新包（即有代码发生改变时）的dhao文件|
|EncryptDllAndGenerateUnchangedDHAODatas|当开启初级代码加固时，生成首包（即没有发生任何改变时）加密后的dll和dhao文件|
|EncryptDllAndGenerateDHAODatas|当开启初级代码加固时，生成热更新包（即有代码发生改变时）加密后的dll和dhao文件|


## 标记变化的函数信息

目前已经可以自动通过对比最新的热更新dll和打包时生成的aot dll，计算出变化的函数，绝大多数情况下不需要手动操作。但事实上并不存在完美的能够判断逻辑等价性的代码，
工具只是简单地一一对比IL来判断等价性。有时候可能发生函数是等价的但IL发生变化的情况（如调换了两行不相关代码的顺序），则会被判定为函数发生变换而切到解释执行。
如果发生了这种情况，**并且对该函数有极其严苛的性能要求**，开发者可以手动使用UnchangedAttribute特性标注函数的变化性。
`[Unchanged]`和`[Unchanged(true)]`表示未变化，`[Unchanged(false)]`表示变化，未标记特性则由工具自动计算。

错误地将未变化函数标记为已变化，不会影响运行的正确性，只会影响性能。就算将所有热更新函数都标记为变化，也能正常运行。但错误地将变化函数标记为未变化，不仅会导致运行逻辑出错，
严重情况下还会导致崩溃！

:::caution
除非特殊情况以及你是有经验的专家，不要手动标记。因为编译器经常生成一些隐藏类或字段，这些类名并不是稳定的。表面看起来一样的C#代码，实际生成的代码未必一样，强行标注为`[Unchanged]`会导致不正确的运行逻辑，甚至崩溃。
:::

## 代码中使用

运行时，完成热更新后，对于每个dhe程序集，调用 `RuntimeApi::LoadDifferentialHybridAssembly` 加载热更新assembly。

注意事项：

- 要按照assembly的依赖顺序加载 差分混合执行 assembly。
- 如果某个程序集未发生改变，dhao字段可以传null，但此时一定要使用打包时生成的AOT dll，而不能使用通过`HybridCLR/CompileDll/xxx`命令生成的热更新dll。
- DHE程序集本身已经包含了元数据，即使未开启完全泛型共享时也**不要对DHE程序集进行补充元数据**，补充了也会失败，其他非DHE的AOT程序集可以照常补充元数据。

```csharp title="加载DHE程序集"

public static string CreateMD5Hash(byte[] bytes)
{
    return BitConverter.ToString(new MD5CryptoServiceProvider().ComputeHash(bytes)).Replace("-", "").ToUpperInvariant();
}

///
/// originalDllMd5 从构建时生成的`{manifest}`清单文件中获得，此清单文件由开发者自己生成
///
void LoadDifferentialHybridAssembly(string assemblyName, string originalDllMd5)
{
    // currentDllMd5 既可以运行时生成，也可以发布热更新包时离线提前生成
    string currentDllMd5 = CreateMD5Hash(dllBytes);
    LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes, originalDllMd5, currentDllMd5);
    if (err == LoadImageErrorCode.OK)
    {
        Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");
    }
    else
    {
        Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
    }
}
```

:::warning

`RuntimeApi::LoadDifferentialHybridAssemblyUnchecked` 函数不需要提供originalDllMd5和currentDllMd5参数，使用较为便利，但强烈不建议使用。
实践中经常由于操作失误，使用了错误的原始dll或者热更新dll，导致生成了错误的dhao文件。使用了错误的dhao文件，轻则运行出错，重则进程崩溃。

:::

## 配置函数注入策略

:::tip

在绝大多数项目中，默认的全注入策略对性能影响微乎其微，只要没有性能问题，不需要也不应该关心此项配置。

:::

 为了避免间接脏函数传染（即A函数调用了B函数，如果B改变了，A也会被标记为改变），默认会在所有函数头部注入一小段检查跳转代码。虽然是
 非常简单的`if (method->isInterpterImpl)`语句，但对于`int Age {get; set;}`这样的短函数，这种插入可能会产生可观察的性能下降（甚至能达到10%）。

函数注入策略用于优化这种情况.对于不会变化的短函数，配置为不注入可以提升性能。详细请见[InjectRules](./injectrules)文档。

在 `HybridCLR Settings`中`InjectRuleFiles`字段中填写注入策略文件路径，文件的相对路径为项目根目录（如`Assets/InjectRules/DefaultInjectRules.xml`）。


## 打包

DHE技术中与构建相关的文件为dhe dll文件和对应的dhao文件。

### 非加密工作流

#### 构建主包

- 将构建后生成的裁剪AOT dll作为 首包（没有任何改动）的dhe dll
- 使用`HybridCLR.Editor.DHE.BuildUtils.GenerateUnchangedDHAODatas`生成首包的dhao文件
- 为dhe文件生成一个至少包含 assemblyName,md5的`{manifest}`清单文件（由开发者自由决定怎么实现），因为`RuntimeApi.LoadDifferentialHybridAssembly`需要提供dhe dll的原始md5
- 将 dhe dll、dhao文件及`{manifest}`文件加入热更新资源管理系统

如果想随包携带首包的dhe dll和dhao文件，请先导出工程，再按照上面的步骤生成dhe dll和dhao文件，再将它们加入到导出工程中。


#### 热更新

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 生成热更新dll。
- 使用`HybridCLR.Editor.DHE.BuildUtils.GenerateDHAODatas`生成最新的热更新dll的dhao文件
- 将最新的热更新dll和dhao文件加入热更新资源管理系统

:::caution

如果打包使用 **development build 选项**，请一定要对应使用`HybridCLR/CompileDll/ActivedBuildTarget_Development`编译Development模式的热更新dll，否则对比结果为几乎所有函数都被判定为发生变化。

:::

### 加密工作流

#### 构建主包

- 将构建后生成的裁剪AOT dll作为 首包（没有任何改动）的dhe dll
- 使用`HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateUnchangedDHAODatas`生成首包的dhao文件及加密后的dhe dll文件
- 将 dhe dll和dhao文件加入热更新资源管理系统

如果想随包携带首包的dhe dll和dhao文件，请先导出工程，再按照上面的步骤生成dhe dll和dhao文件，再将它们加入到导出工程中。


#### 热更新

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 生成热更新dll。
- 使用`HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateDHAODatas`生成最新的dhe dll的加密后的文件及对应的dhao文件
- 将加密后的dhe dll和dhao文件加入热更新资源管理系统

## 不支持特性

- 不支持开启 `script debugging` 构建选项

## 注意事项

### 外部dll引发的计算dhao的结果有巨量差异

如果有外部dll被标记为DHE程序集，由于外部dll打包时会被裁剪，而计算dhao文件时，取的是原始的外部dll，导致产生巨量的差异，这不是所期望的。解决办法有几个：

1. 在link.xml里`<assembly fullname="YourExternDll" preserve="all"/>` 完全保留外部dll
2. 不用最新的热更新dll去计算差异，而是使用最新代码重新打包时生成的aot dll去计算差异
