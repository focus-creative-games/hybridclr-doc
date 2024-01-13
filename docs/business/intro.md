# 介绍

我们提供多种高端商业版本及可灵活定制的技术服务，满足游戏项目在各种应用场景下的需求。

## 商业化版本

:::tip

所有商业化版本都会长期支持**Unity 2019-2022 LTS**版本，确保项目有长久稳定的技术支持。

:::

目前有三个商业化版本，具体特性对比如下：

- [专业版](./pro/intro.md)。优化了性能、内存，提供更高的代码安全
- [**旗舰版**](./ultimate/intro.md)。包含专业版的所有功能，另外包含了我们最核心的[DHE技术](./differentialhybridexecution)，极大提升了性能，几乎（**未改动时为100%**）达到同等的原生AOT水平
- [热重载版](./reload/intro.md)。包含专业版的所有功能，同时支持卸载和重新加载单独的assembly，当前可以卸载掉程序集**100%**的元数据内存


|特性|社区版|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|解释执行|✔|✔|✔|✔|
|MonoBehaviour|✔|✔|✔|✔|
|补充元数据|✔|✔|✔|✔|
|增量式GC|✔|✔|✔|✔|
|Unity 2020-2022 LTS|✔|✔|✔|✔|
|Unity 2019 LTS|从3.x版本起不再支持|✔|✔|✔|
|[完全泛型共享](./fullgenericsharing)||✔|✔|✔|
|团结引擎和鸿蒙平台|仅支持2022.3.2t3|✔|✔|✔|
|[元数据优化](./metadataoptimization.md)||✔|✔|✔|
|[离线指令优化](./basiccodeoptimization)||✔|✔|✔|
|[代码加固](./basicencryption)||✔|✔|✔|
|[热重载](./reload/hotreloadassembly)||||✔|
|[访问控制机制](./accesspolicy)||||✔|
|[**DHE技术**](./differentialhybridexecution)|||✔||
|技术支持||1年|2年|2年|

### 价格标准


|版本|价格（人民币）|体验项目|描述|
|-|-|-|-|
|社区版|0|[hybridclr_trial](https://github.com/focus-creative-games/hybridclr_trial)|无限期使用|
|专业版|邮件咨询商务|[pro-free-trial-version](https://github.com/focus-creative-games/hybridclr_trial/releases/tag/v4.3.6)|买断一个项目的使用权，同时包含1年技术支持，提供1年代码更新|
|热重载版|邮件咨询商务|[hotreload-free-trial-version](https://github.com/focus-creative-games/hybridclr_trial/releases/tag/v4.4.11)|买断一个项目的使用权，同时包含2年技术支持，提供2年代码更新|
|旗舰版|邮件咨询商务|[ultimate-free-trial-version](https://github.com/focus-creative-games/dhe_demo/releases/tag/v4.5.8)|买断一个项目的使用权，同时包含2年技术支持，提供2年代码更新|


所有商业化版本都支持两种试用方式：

- 免费的体验项目。体验项目是基于[hybridclr_trial](https://github.com/focus-creative-games/hybridclr_trial)项目构建的Windows Standalone 64平台可执行程序
- 付费的基于客户提供的项目工程构建的iOS app。需要支持3%商业版本总价的服务费用，如果最终购买则可以退还服务费用，否则不退还服务费。只需要提供`Generate/All`后生成的`libil2cpp/hybridclr/generated`目录，没有泄露项目代码风险


## 企业技术支持

可以灵活选择企业所需要的技术服务项目，如果按年订阅则根据服务项计费，否则根据服务时长计费。

### 技术支持内容

- Bug标准响应及解决，包含一对一远程协助指导，大多数可复现bug会在2-7天内修复或者提供规避方案
- 解决一些特殊的平台兼容性问题
- 支持一些当前未支持的版本（不含2018及更早的版本）
- 优化指导
- 其他服务

### 价格标准

由于hybridclr使用简单、运行稳定，大多数公司并不需要长时间的技术支持，因此只提供计时技术支持服务。
单次服务中未使用完的时间可以保留下次使用。为了节约商务成本，总价2000以内的按时计费**不提供**合同与发票，敬请谅解。

|服务级别|解决问题范围|价格|
|-|-|-|
|标准|提供基础使用问题的技术答疑，不含bug及未实现特性的解决|400人民币/小时|
|专家|解决`技术支持内容里`各种复杂问题，包含解决bug及未实现特性|2000人民币/小时|


## 联系我们

请使用贵公司的**公司邮箱**向邮箱business@code-philosophy.com发起咨询，以QQ或者126邮箱之类个人发起的邮件会被忽略，敬请谅解。