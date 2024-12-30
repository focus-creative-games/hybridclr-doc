# 对App内存影响

接入hybridclr后对App运行时内存的影响主要由以下几部分构成：

- 动态堆内存
  - （增加）维护桥接函数映射占用的内存
  - （增加）解释器线程数据栈和帧栈内存
  - （增加）指令优化模块（**只在商业化版本上有**）占用的内存
  - （增加）DHE（**只在旗舰化版本上有**）相关额外占用的元数据内存
  - （**减少**）优化libil2cpp元数据内存管理（**只在商业化版本上有**）。显著减少了的元数据内存开销
- 静态Code段内存
  - （增加）桥接函数MehtodBridge.cpp编译后增加了二进制代码大小
  - （增加）DHE代码注入所引入的额外代码膨胀导致增加了二进制代码大小（**只在旗舰化版本上有**）
  - （**减少**）将AOT程序集转为普通解释执行的程序集后（不含DHE程序集，因为DHE程序集也需要编译到AOT中），减少了二进制代码大小

:::warning
增加的静态Code段内存大小虽然会显示在App的总内存中，但它并不代表代码的真实内存占用。静态Code段代码属于按需加载，实际上占用内存需要查看`实际占用的物理内存(RSS)`数据。
:::

我们构建了测试项目测试hybridclr对包体的实际影响。

## 测试

我们在Unity 2021版本测试了构建的Android Armv8平台apk的内存。

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

编译后的HotUpdate.dll为1216k。

桥接函数MethodBridge.cpp大小为15088K。

我们对比了以下几种情况的内存占用：

- NotHybridCLR-NotHotUpdateCode   未接入HybridCLR，未包含HotUpdate代码
- NotHybridCLR-HotUpdateCode 未接入HybridCLR，包含HotUpdate代码
- HybridCLR社区版-NotHotUpdateCode 接入HybridCLR社区版，不包含HotUpdate代码，正常生成桥接函数文件
- HybridCLR社区版-HotUpdateCode 接入HybridCLR社区版，包含HotUpdate代码，正常生成桥接函数文件
- HybridCLR专业版-NotHotUpdateCode 接入HybridCLR专业版，不包含HotUpdate代码，正常生成桥接函数文件
- HybridCLR专业版-HotUpdateCode 接入HybridCLR专业版，包含HotUpdate代码，正常生成桥接函数文件
- HybridCLR旗舰版-NotHotUpdateCode 接入HybridCLR旗舰版，不包含HotUpdate代码，正常生成桥接函数
- HybridCLR旗舰版-HotUpdateCode-LoadOriginalDifferentialHybridAssembly 接入HybridCLR旗舰版，包含HotUpdate代码，正常生成桥接函数，HotUpdate程序集未改动，使用RuntimeApi::LoadOriginalDifferentialHybridAssembly加载HotUpdate
- HybridCLR旗舰版-HotUpdateCode-LoadDifferentialHybridAssembly 接入HybridCLR旗舰版，包含HotUpdate代码，正常生成桥接函数，HotUpdate程序集未改动，使用RuntimeApi::LoadDifferentialHybridAssembly加载HotUpdate

测试结果如下：

|构建方式|App堆内存(K)|
|-|-|
|NotHybridCLR-NotHotUpdateCode|51343|
|NotHybridCLR-HotUpdateCode|59400|
|HybridCLR社区版-NotHotUpdateCode|53592|
|HybridCLR社区版-HotUpdateCode|65695|
|HybridCLR专业版-NotHotUpdateCode|50380|
|HybridCLR专业版-HotUpdateCode|62235|
|HybridCLR旗舰版-NotHotUpdateCode|52531|
|HybridCLR旗舰版-HotUpdateCode-LoadOriginalDifferentialHybridAssembly|61276|
|HybridCLR旗舰版-HotUpdateCode-LoadDifferentialHybridAssembly|65655|

根据以上测试项目，我们大约可以得出以下结论：

- （增加）桥接函数大约占用 `{桥接函数文件MethodBridge.cpp文件大小} * 0.1` 大小的堆内存
- （增加）每个执行过热更新代码的线程大约会占用1.2M内存
- （增加）指令优化模块（**只有商业化版本有**）占用了约为700K
- （增加）DHE（**只有旗舰版本有**）相关额外占用的元数据内存。大约为 `{AOT程序集总大小+DHE程序集总大小} * 0.12`大小的内存
- （增加）桥接函数MehtodBridge.cpp编译后增加了二进制代码大小。大约为 `{MethodBridge.cpp文件大小} * 0.3`大小
- （增加）DHE（**只有旗舰版本有**）代码注入所引入的额外代码导致增加了二进制代码大小。大约为 `{DHE程序集大小} * 0.86`大小
- （**减少**）优化libil2cpp元数据内存管理（**只有商业化版本有**），减少了`10-25%`的元数据内存开销
- （**减少**）将AOT程序集转为普通解释执行的程序集后（不含DHE程序集，因为DHE程序集也需要编译到AOT中），减少了二进制代码大小。大约为`{热更新程序集大小} * 5.2`大小


## 总结

### 社区版

- 新增堆内存大约为 `{MethodBridge.cpp大小} * 0.1` + `1.2M * {执行过解释代码的线程数}` + `{热更新程序集大小} * 2.2`
- **增加**代码段内存约为 `{MethodBridge.cpp大小} * 0.3` - `{热更新程序集大小} * 5.2`

:::tip
一般来说，接入社区版本后二进制代码会减少，即`增加的代码段内存`一般为**负值**。
:::

### 专业版

- 新增堆内存大约为 `{MethodBridge.cpp大小} * 0.1` + 0.7M(指令优化模块内存) +  `1.2M * {执行过解释代码的线程数}` + `{热更新程序集大小} * 1.6` - `{所有程序集大小} * 0.2`
- **增加**代码段内存约为`{MethodBridge.cpp大小} * 0.3` - `{热更新程序集大小} * 5.2`

:::tip
一般来说，接入专业版本后二进制代码会减少，即`增加的代码段内存`一般为**负值**。
:::

### 旗舰版

- 新增堆内存大约为 `{MethodBridge.cpp大小} * 0.1` + 0.7M(指令优化模块内存) +  `1.2M * {执行过解释代码的线程数}` + `{热更新程序集大小} * 3` + `{AOT程序集总大小+DHE程序集总大小} * 0.12` - `{所有程序集大小} * 0.2`
- **增加**代码段内存约为 `{DHE程序集大小} * 0.86` + `{MethodBridge.cpp大小} * 0.3`
