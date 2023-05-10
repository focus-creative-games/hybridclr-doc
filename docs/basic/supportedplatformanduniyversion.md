
# 支持的Unity版本和平台

HybridCLR已经稳定支持了2019.4.x、2020.3.x、2021.3.x系列LTS版本，并且支持主流的 Win、MacOS、Android、iOS、WebGL平台。

## 兼容的Unity版本

出于维护成本考虑，HybridCLR只支持LTS系列版本。而且不再支持2019之前的版本。

- 2019.4.x
- 2020.3.16 - 最新
- 2021.3.0 - 最新
- 2022.2.x （我们已经支持2022.2.x，但尚未对外开放，等2022第一个LTS版本发布后再跟进）


尽管我们只支持LTS版本，由于il2cpp小版本之间变化不大，非LTS系列的小版本仍然可能是能工作的，你只需要先切到一个最近能支持的小版本完成HybridCLR安装，再切回当前版本即可。

如果某个小版本非我们标准支持版本，也可以联系我们提供[商业化服务](/other/business.md)。


## 支持的平台

- Windows x86、x64
- MacOS x86、x64、arm64(silicon)
- Android armv7、armv8(arm64)
- iOS arm64
- WebGL 标准WebGL、MiniGame、微信小游戏

## 特殊说明

### 微信小游戏

微信小游戏转换工具，默认会将IL2CPP Code Generation设置为Faster(Smaller) builds模式，如果未补充元数据，会导致无法访问AOT泛型函数。由于 Faster(smaller) 模式会严重伤害泛型函数的执行性能，即使使用补充元数据，也强烈推荐自己改微信工具源码，将BuildSettings中 `IL2CPP Code Generation` 设置为 `Faster`。

### MiniGame

有关版本兼容性的补充说明：

- MiniGame2019和2020版本的推荐版本与HybridCLR的兼容版本有交叉，尽量直接选择那些交叉版本（如2019.4.35、2020.3.33），因为已经被项目验证过，基本不会遇到问题。
- MiniGame2021系列推荐版本为2021.2.5-2021.2.18，非HybridCLR支持的LTS版本，但这些版本已经被其他开发者验证过，也是可以正常使用HybridCLR的（可能需要少量代码调整）。如果有遇到问题，可以联系我们提供[商业技术支持](/other/business.md)。
