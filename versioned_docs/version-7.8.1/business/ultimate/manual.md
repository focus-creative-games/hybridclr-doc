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


## 配置函数注入策略

:::tip

在绝大多数项目中，默认的全注入策略对性能影响微乎其微，只要没有性能问题，不需要也不应该关心此项配置。

:::

 为了避免间接脏函数传染（即A函数调用了B函数，如果B改变了，A也会被标记为改变），默认会在所有函数头部注入一小段检查跳转代码。虽然是
 非常简单的`if (method->isInterpterImpl)`语句，但对于`int Age {get; set;}`这样的短函数，这种插入可能会产生可观察的性能下降（甚至能达到10%）。

函数注入策略用于优化这种情况.对于不会变化的短函数，配置为不注入可以提升性能。详细请见[InjectRules](./injectrules)文档。

在 `HybridCLR Settings`中`InjectRuleFiles`字段中填写注入策略文件路径，文件的相对路径为项目根目录（如`Assets/InjectRules/DefaultInjectRules.xml`）。



## 不支持特性

- 不支持开启 `script debugging` 构建选项


