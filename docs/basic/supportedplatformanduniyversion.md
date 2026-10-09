
# 支持的Unity版本和平台

HybridCLR已经稳定支持了2022.3.x 系列LTS版本及2023.2.x、6000.x.y等版本，并且支持所有il2cpp支持的平台。

## 兼容的Unity版本

出于维护成本考虑，HybridCLR只支持LTS系列版本。

- 2022.3.x
- 2023.2.x
- 6000.x.y（不含6000.5.x）

:::warning

自**v9.0.0**版本起，移除了对 Unity 2019、2020、2021 的支持，同时移除了对 6000.5.x 的支持（6000.5.x 不是LTS版本）。

如果你的项目仍在使用这些版本，请使用 **8.15.0** 版本，它是最后一个支持 Unity 2019/2020/2021 的版本。相应文档请切换到文档站右上角的 8.15.0 版本查看。

:::

:::tip

我们会定期合并最新的Unity版本的il2cpp代码到il2cpp_plus仓库。尽管有时候我们还未合并最新的il2cpp代码，但绝大多数情况下也是能正常工作的，如果有问题可以反馈给我们。我们会
提前完成合并，并且在下个版本发布。
:::

尽管我们只支持LTS版本，由于il2cpp小版本之间变化不大，非LTS系列的小版本仍然可能是能工作的，你只需要先切到一个最近能支持的小版本完成HybridCLR安装，再切回当前版本即可。
如果某个小版本非我们标准支持版本，也可以联系我们提供[商业化服务](../business/intro.md)。

## 支持的平台

自v4.0.0版本起，已经消除了所有已知的平台不兼容的代码，彻底支持了所有il2cpp能运行的所有平台。但对于一些不常见平台，有可能残留一些Editor或者Runtime的小bug，
如果有遇到问题，请联系我们商务解决。

以下平台是已经久经测试，非常稳定支持的平台：

- Windows x86、x64
- MacOS x86、x64
- MacOS arm64(silicon)
- Android armv7、armv8(arm64)
- iOS arm64
- tvOS
- visionOS
- WebGL 包括WebGL、MiniGame、微信小游戏、抖音小游戏（只支持WebGL、不支持Android Native构建）
- PS4、PS5
- UWP
- 华为Harmony（鸿蒙）平台（当前只有团结引擎支持鸿蒙）
- Linux x86、x86、armv7、armv8
- 其他平台

## 团结引擎

自v5.2.0版本起，社区版本正式支持团结引擎，使用方式与Unity官方版本完全相同。

团结引擎1.1.x为微信小游戏平台新增的metadta index slim优化会导致hybridclr无法在微信小游戏平台正常运行。
自团结引擎1.2.0版本起 WinxinMiniGame平台的Publishing Settings中新增了`Use Slim Format For global-metadata.dat`选项，禁用这个优化后可以正常使用hybridclr。

## 特殊说明

### 微信小游戏

微信小游戏转换工具，默认会将IL2CPP Code Generation设置为Faster(Smaller) builds模式，如果未补充元数据，会导致无法访问AOT泛型函数。所有商业化版本
支持完全泛型共享，可以不再需要补充元数据，减少了包体，明显降低内存占用，并且大幅提升了未在主工程实例化的AOT泛型函数的执行性能。



