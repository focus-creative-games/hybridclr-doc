# 对App包体影响

接入hybridclr后，会轻微地增加包体，主要由以下几部分构成：

1. hybridclr除了MethodBridge.cpp以外的主体代码
2. 桥接函数文件MethodBridge.cpp代码
3. il2cpp将HybridCLR.Runtime.dll代码翻译后的cpp代码

其中第1部分代码不到3万行，第3部分代码不到2000行，它们对最终包体的影响很小，而MethodBridge.cpp是根据AOT程序集计算生成的，一般来说，如果AOT程序集代码越多，MethodBridge.cpp
文件大小会越大。一般来说，根据项目AOT模块的复杂度，MethodBridge.cpp文件大小在2M-40M之间。

我们构建了测试项目测试hybridclr对包体的实际影响。

## 测试

我们在Unity 2021版本测试了构建的Android Armv8平台apk的大小。

测试工程的AOT部分完整包含了以下框架和库：

- mscorlib、System、System.Core
- UnityEngine.dll、UnityEngine.CoreModule.dll、UnityEngine.UI.dll、UnityEngine.PhysicsModule.dll
- [GameFramework框架](https://github.com/EllanJiang/GameFramework)
- HybridCLR.Runtime.dll
- [Luban](https://github.com/focus-creative-games/luban)
- [UniTask](https://github.com/Cysharp/UniTask)
- [YooAsset](https://github.com/tuyoogame/YooAsset)

我们统计了构建完apk后AOT模块dll的总大小：共12.0M。

测试工程的热更新部分代码以下部分构成：

- 单元测试工程代码
- Luban生成的配置代码

编译后的HotUpdate.dll为1216k。为了公平起见，接入HybridCLR的项目会将热更新dll压缩后放入StreamingAssets承包携带。

我们对比了以下8种情况的包体：

- NotHybridCLR-NotHotUpdateCode   未接入HybridCLR，未包含HotUpdate代码（即未将HotUpdate包含到AOT中）
- HybridCLR-NotHotUpdateCode-NotMethodBridge  接入HybridCLR，不包含HotUpdate代码，桥接函数文件为空
- HybridCLR-NotHotUpdateCode-MethodBridge 接入HybridCLR，不包含HotUpdate代码，正常生成桥接函数文件
- NotHybridCLR-HotUpdateCode 未接入HybridCLR，包含HotUpdate代码（即将HotUpdate包含到AOT中）
- HybridCLR-HotUpdateCode-NotMethodBridge 接入HybridCLR，包含HotUpdate代码（将HotUpdate.dll压缩后放到StreamingAssets随包携带），桥接函数文件为空
- HybridCLR-HotUpdateCode-MethodBridge 接入HybridCLR，包含HotUpdate代码，正常生成桥接函数文件
- **HybridCLR旗舰版**-NotHotUpdateCode-MethodBridge 接入旗舰版HybridCLR，不包含HotUpdate代码，正常生成桥接函数
- **HybridCLR旗舰版**-HotUpdateCode-MethodBridge 接入旗舰版HybridCLR，包含HotUpdate代码，正常生成桥接函数

测试数据如下：

|构建方式|Apk大小（K）|global-metadata.dat（未压缩）|global-metadata.dat（压缩）|libil2cpp.so（未压缩）|libil2cpp.so（压缩）|HotUpdate.dll大小（未压缩）（K）|MethodBridge.cpp大小（K）|
|-|-|-|-|-|-|-|-|-|
|NotHybridCLR-NotHotUpdateCode|30066|10087740|2980934|73383680|18954786|0|0|
|HybridCLR-NotHotUpdateCode-NotMethodBridge|30262|10075360|2904652|74026488|19158769|0|0|
|HybridCLR-NotHotUpdateCode-MethodBridge|30900|10075360|2904652|78450168|19905020|0|15082|
|NotHybridCLR-HotUpdateCode|31718|10893056|3103289|79670208|20387018|1206|0|
|HybridCLR-HotUpdateCode-NotMethodBridge|30531|10081232|2906522|74158928|19177165|1206|0|
|HybridCLR-HotUpdateCode-MethodBridge|31259|10081232|2906522|78492496|19920506|1206|14861|
|**HybridCLR旗舰版**-NotUserCode-MethodBridge|31022|10078796|2905605|78643792|19935716|0|14837|
|**HybridCLR旗舰版**-UserCode-MethodBridge|32910|10893080|3103310|85964616|21622297|1206|15179|

> `未压缩` 指在apk内该文件的原始大小，`压缩` 指在apk内该文件压缩后的大小

热更新代码HotUpdate.dll原始大小的1216k，压缩后为200k。

根据以上测试项目，我们大约可以得出以下结论：

- HybridCLR不含MethodBridge.cpp的主体部分最终增加了196k包体
- 桥接函数文件增加了大约 `{MethodBridge.cpp大小} * 0.049` 包体大小
- 每新增大小为S的游戏代码，对于没接入HybridCLR的App，增加了`S * 1.37`包体大小
- 每增加大小为S的游戏代码，对于接入HybridCLR的App，增加了`S * 0.2`包体大小
- 每新增大小为S的游戏代码，旗舰版新增了`S * 1.56`包体大小
- 未包含任何更新程序集时，旗舰版相比社区版增加了32K包体

## 总结

### 社区版、专业版、热重载版本

接入HybridCLR增加了`196k + {MethodBridge.cpp 大小}*0.049` 大小的包体，但将游戏代码从AOT中移到热更新后能减少`{热更新dll大小}*1.17`倍包体。

这意味着，如果一个项目热更新代码超过800K-1500K，接入HybridCLR后最终包体会比未接入HybridCLR小。最终减少的包体可以简略地使用 `热更新dll大小*1.05`近似计算。

### 旗舰版本

接入HybridCLR增加了`228k + {MethodBridge.cpp 大小}*0.049` 大小的包体。DHE程序集中新增代码会导致新增`{新增DHE程序集大小}*1.56`大小的包体。
将游戏代码从AOT移到DHE程序集后，将会增加`{新增DHE程序集大小}*0.19`大小的包体。


