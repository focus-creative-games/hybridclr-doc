# 常见错误

目前提交的版本都经过测试，基本不可能出现编译错误及崩溃或者基础的运行错误。如果查看了常见错误，还未能解决问题，请将com.code-philosophy.hybridclr、hybridclr、il2cpp_plus更新到最新版本，再试一次。
如果仍然没有解决问题，可以加入以下群：

- 新手1群：428404198（满）
- 新手2群：**680274677（推荐）**

## Unity Editor下的错误

### Package Manager中安装 com.code-philosophy.hybridclr时出现 package名与com.focus-creative-games.hybridclr_unity不匹配的错误

从3.0.0版本起，com.focus-creative-games.hybridclr_unity改名com.code-philosophy.hybridclr，因此直接升级安装会出现这个错误。

解决办法：先移除旧版本的com.focus-creative-games.hybridclr_unity，再重新安装最新版本即可。

### 点击 `HybridCLR/Setting`，未能找到HybridCLR设置界面

删除 `ProjectSettings/HybridCLRSettings.asset`文件即可。如果仍未显示，则重启Unity Editor。

### Installer中安装时出现 `Win32Exception:ApplicationName='git', xxxx, Native erro=系统找不到指定的文件。` 错误

因为git未安装（Windows 下安装 [GitForWindows](https://gitforwindows.org/)。其他平台请自己酌情安装），或者安装git后未重启UnityEditor和UnityHub。如果你确信安装了git，cmd中也确实能运行git，则尝试重启电脑。

### Installer点击安装出现：git不是内部或外部命令，也不是可运行的程序

同上。

### 使用Installer安装时发生 DirectoryNotFoundException: Counld not find a part of the path 'xxx'

有几种原因：

- 如果出错目录不存在，则因为网络或者各种原因，git clone hybridclr或il2cpp_plus仓库失败了。 此时你可以重试几次。
- 如果出错目录存在，则因为路径长度超过256字符导致。请避免过深的目录。

### 使用Installer安装时提示Mono.CompilerServices.SymbolWriter.dll path is too long. copy ignore!

MonoBleedingEdge在installer中会被复制到 HybridCLrData， 但这个目录中的 lib\mono目录其实是没有用到的，所以是没有影响的。

### Exception. region:UNITY_CONFIG start not find

hybridclr_unity版本过低。请升级最新版本。

### Exception. region:PLACE_HOLDER start not find

com.code-philosophy.hybridclr为较新版本，但hybridclr代码太旧导致。

要求你的 hybridclr及il2cpp_plus必须是main分支，并且更新到最新。

### Exception. region:XXXXXX start not find

com.code-philosophy.hybridclr 与 hybridclr及il2cpp_plus版本不匹配导致。

要求相同版本分支，并且同时更到最新（或者相匹配的版本，但大多数人很难知道哪个是相匹配的版本）。

### 运行 `HybridCLR/generate/xxx` 时发生 `Exception: resolve assembly: yyyAssembly fail`

如果 yyyAssembly为`netstandard`，则因为项目中有程序集引用了.net standard，有几种方式会引起这种错误：

- Api Compatible Level为.net standard。 解决办法为将它切为 .Net 4.x或.Net Framework
- 你项目中使用了某个预编译好的dll，它引用了.net standard。解决办法为将这个dll换成引用.net framework的版本

否则是因为没有找到依赖的AOT或者热更新dll。有几种原因导致这个结果：

- 如果是以dll形式放到工程内的热更新dll未找到，则你需要在HybridCLRSettings的外部dll搜索路径中添加它所在的目录
- 你从未在主工程中使用过跟该dll相关代码，导致就算link.xml中保留了，仍然整个被裁剪。解决办法是在主工程中随便写段代码引用该dll中的某个类或函数。

### 运行 `HybridCLR/generate/xxx` 时发生 `NullReferenceException. HybridCLR.Editor.ABI.TypeCreatorBase.CreateTypeInfo ...`

如果你的com.code-philosophy.hybridclr package版本低于 1.1.6,则因为你的项目中存在 mscorlib.dll、System.Memory.dll、UnityEngine.dll等跟系统dll重名的冲突dll，导致解析dll时错误地读取了这些dll，进而发生错误。

如果版本 >= 1.1.6, 由于生成桥接函数需要依赖裁减后的AOT dll，而你的AOT dll是旧的，导致热更新代码中依赖的类型在AOT dll中因为卸载而缺失了。因此你需要先 `generate/linkxml`，再build或者导出工程以生成裁剪后的aot dll，再运行你当前的 `generate/xxx` 命令。

### 打包iOS版本时未生成 AssembliesPostIl2CppStrip 目录

升级com.code-philosophy.hybridclr版本到v2.0.0以上。

### BuildFailedExceptoin: Build path contains a project prevously built without the "Create Visual Studio Solution"

运行 `generate/all`或者`generate/AOTDlls`时，会尝试进行导出工程以获得裁剪后的aot dll。如果你的项目之前打包时关闭了 `Create Visual Studio Solution` 选项，则Unity Editor自身原因，一定概率下会出现这个错误。

解决办法是清空 Library和Temp下的 il2cpp 相关缓存目录，或者简单粗暴删除这两个目录。

如果还是遇到这个问题，你完全可以自己手动build一次工程来生成aot dll，然后跳过 `generate/AOTDlls`这一步。


## 打包时发生错误

### Currently selected scripting backend (IL2CPP) is not installed

请在Unity Hub安装il2cpp模块。操作方式为：

- 切到UnityHub左侧的 Installers 标签页
- 你在当前使用的Unity版本上 `右键 -> Add Modules`，选中当前平台的IL2CPP组件，例如Win平台选 `Windows Build Support(Il2CPP)`
- 安装
- 重新打开Unity Editor

### `Exception: C++ code bulider is unable to build C+ code. Inorder to build C++ code for Windows Destop, You must have one of these installed. xxxxx

你没有安装 vs 及 win 10 sdk。请安装vs，并且在 Visutal Studio Installer中安装 `使用c++的游戏开发` 这个组件。 win 10 sdk选最新的即可。


### 遇到 Undefined symbols for architecture arm64:  "_objc_msgSend$initWithName:", referenced from:      il2cpp::os::TimeZoneInfo::GetTimeZoneDataForID

xcode版本太旧导致。更新到较新版本。

### 打包出现 Undefined symbols： RuntimeApi_LoadMetadataForAOTAssembly 或 hybridclrApi_LoadMetadataForAOTAssembly

根本原因是因为你使用的是原始libil2cpp代码，有几个情形会导致这个结果：

- Scripting Backend 错误选择了 Mono
- 开启了`全局安装`选项，但没有正确替换Editor安装目录的libil2cpp
- com.code-philosophy.hybridclr的版本低于v3.1.0，同时没有替换xcode工程的libil2cpp.a文件。请根据 [build iOS libil2cpp.a](/basic/buildpipeline.md) 文档编译最新的。然后替换xcode项目中的libil2cpp.a文件

### Building Library/Bee/artifacts/xxxx failed with output: Fatalerror in Unitiy CIL Linker Mono.Cecil.AssemblyResolutionException: Failed to resolve assembly:'xxx'

你失误地在主工程里引用 'xxx' 这个热更新dll。 如果你找不到到底哪儿引用的，可以尝试先删掉 'xxx' 这个热更新模块，根据编译错误来定位。

### WebGL平台打包时遇到 undefine symbol: send file 之类的错误

这个错误跟HybridCLR无关。 这是因为WebGL对很多函数有限制，比如说send file符号丢失是因为不能调用IO相关函数。遇到问题请自己剔除那些WebGL平台不支持函数。具体自己阅读Unity文档。

### Win 下 打包时遇到 `xxxx\\il2cpp\\libil2cpp\\utils\\Il2CppHashMap.h(71): error C2039: 'hash_compare': is not a member of 'stdext'`

这是.net 7发布后最新版本vs改动打破了一些向后兼容性引起。com.code-philosophy.hybridclr `v2.4.0`版本已经完全解决了此问题。你可以升级到此版本或者回退到visual studio 2022的旧版本或者使用2019之类的版本。

一种不需要回退vs版本的解决办法是修改 `HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external/google/sparsehash/internal/sparseconfig.h`，新增 `#define _SILENCE_STDEXT_HASH_DEPRECATION_WARNINGS` 即可。可参照下图修改。

![stdext_error](/img/hybridclr/stdext_error.jpg)

其他解决办法参见[链接](https://forum.unity.com/threads/workaround-for-building-with-il2cpp-with-visual-studio-2022-17-4.1355570/)

### fatal error: 'icalls/mscorlib/System/MonoType.h' file not found #include "icalls/mscorlib/System/MonoType.h"

你没有生成正确的版本宏，请运行 `HybridCLR/Generate/All` 后再打包。

### Internal build system error. BuildProgram exited with code -2147024894.


```text
Internal build system error. BuildProgram exited with code -2147024894.
System.IO.FileNotFoundException: Could not load file or assembly 'Unity.IL2CPP.Bee.BuildLogic.WindowsDesktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'. 
File name: 'Unity.IL2CPP.Bee.BuildLogic.WindowsDesktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'
```

这是因为你Installer中安装后切换了Unity项目的版本，导致Build Tool不匹配导致。解决办法为在`HybridCLR/Installer...`中重新安装一次即可。

### 打包时出现 DirectoryNotFoundException: xxxx\Library\Bee\artifacts\yyyy\ManagedStripted 错误

你错误地设置 Scripting BackEngine 为 mono导致的。有时候你尽管之前已经切到il2cpp了，但切换平台时仍然可能被Editor重置为mono。解决办法为切换到il2cpp即可。

### 打包WebGL平台时出现 DirectoryNotFoundException: xxx\HybridCLRData\LocalIl2CppData-{yyy}\il2cpp\il2cpp-deps  错误

WebGL必须使用全局安装，即 HybridCLRSettings中useGlobal为true。 切记每次`Generate/xxx`之后必须重新将`{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`
目录复制到Editor安装目录，再打包。否则有可能会出现 Scripting Missing或者桥接函数缺失之类的错误。

### 打包时出现 GC_set_mark_stck_empty 函数找不到或者签名不匹配的错误

这是自Unity2021.3.20起修改了这个函数签名引发的问题。更新到com.code-philosophy.hybridclr 2.0.10+ 版本，重新install即可解决。

### 打包WebGL平台出现 `build.js: undefined symbol: RuntimeApi_LoadMetadataForAOTAssembly (referenced by top-level compiled C/C++ code)`

WebGL使用全局安装，你没有将本地`{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`替换Editor安装目录的原始libil2cpp，导致缺失了函数。解决办法是：
- 运行`HybridCLR/Generate/Il2cppDef`生成正确的版本宏
- 复制 `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` 替换Editor安装目录的原始libil2cpp。注意必须是替换目录，而不是合并目录，这个可能会导致多了一些文件而编译出错。
你也可以使用创建软链接的方式，详细请看[安装HybridCLR](/basic/install.md)中关于全局安装的文档。

### 打包WebGL平台点击`Generate/All`发生错误

有两个原因：
- 没有替换全局安装位置的libil2cpp或者创建其软链接
- 你使用了com.code-philosophy.hybridclr 2.1.0或更高版本，在替换全局libil2cpp前没有先运行一次`HybridCLR/Generate/Il2cppDef`，导致没有正确生成版本宏，进而引发编译错误。

### 打包出现 `#error: "not support unity version"`

有几种原因：
- 你使用了 低于2019或者高于2021的版本，这些版本目前未被支持
- 你打包前未运行`HybridCLR/Generate/All`或者`HybridCLR/Generate/Il2CppDef`，导致未生成Unity版本宏

### 打包时出现 'could not find a part of path "xxxx/hybridclr/generated/UnityVersion.h"

你更新 com.code-philosophy.hybridclr包后未重新install，导致本地lil2cpp目录代码过旧。

### 打包里发现 "Undefined symbols for architecture arm64: "il2cpp::utils::Debugger::xxxxx"

原因是 build_libil2cpp.sh打包出的 libil2cpp.a是release模式的，与development模式的工程一起编译时会出现编译错误。

解决办法是去掉development build选项，或者说自己修改 build_libil2cpp.sh，打包出 debug模式的libil2cpp.a

### 打包时出现 `error: undefined reference to 'SystemNative-ConvertErrorPalToPlatform'`

你用的Unity版本比较高，libil2cpp新增了一些函数。而你使用的hybridclr版本太低，没有包含这些高版本的函数。

解决办法：升级hybridclr版本，重新install即可。

### 打包时出现 `BuildFailedException: You must run `HybridCLR/Installer` after upgrading package`

升级package后未执行Install。在`HybridCLR/Installer`中安装即可。

### 出现 IL2CPP_POP_ACTIVE_EXCEPTION 相关编译错误

因为2021.3.31和2022.3.11版本起，修改了该宏定义，导致在旧版本hybridclr上出现编译错误。解决办法为升级到最新hybridclr版本即可。

### 打包时出现编译错误，通用处理办法

很大程度是你的package 和 hybridclr c++代码版本不匹配导致的或者你的Unity版本太新，hybridclr暂未支持。 你需要：

- 更新com.code-philosophy.hybridclr到最新版本
- `HybridCLR/installer...` 里安装最新版本
- `HybridCLR/generate/all` 生成所有
- 打包

### 打包时出现Building.BuilderFailedException:In file included from xxx\HybridCLRData\LocalIl2CppData-{platform}\il2cpp

如果你的版本为 2020.3.0-2020.3.25， 在Installer中完成安装后，从2020.3.26+任一版本的安装目录复制`2020.3.x/Editor/Data/il2cpp/external`替换 `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external`

### 打包时出现 "HybridCLRDatal/Locall2CppData-WindowsEditor/il2cpp/llibil2cpp/hybridclr/generated/ReversePInvokeMethodStub.cpp: error: unknown type name'struct_xxx'"

热更新中'[MonoPInvokeCallback]'函数不支持结构体作为函数参数或者返回值。解决办法为删除这些函数。如果你一定要解决这个问题，请联系付费技术支持。


## 运行时错误

### EntryPointNotFoundException. Unable to find entry point named 'RuntimeApi_LoadMetadataForAOTAssembly' in 'GameAssembly`

有几种原因：

- 你当前的scripting backend为mono，请切换到il2cpp。有时候因为缓存原因，即使切换了仍然会有错误，请清空Libraries目录后再试一次。
- HybridCLRSettings里开启了全局安装。

### A scripted object (probably XXX?) has a different serialization layout when loading. Did you #ifdef UNITY_EDITOR a section of your serialized properties in any of your scripts?

主工程的AOT资源中引用了热更新脚本会导致这个错误。例如Resources下的资源引用了热更新脚本。

### 挂载在资源上的脚本出现 Script Missing 错误

有几种原因：

- 如果是iOS平台，有可能因为你在热更新dll列表变化后未`Generate/all`并且重新编译和替换libil2cpp.a文件。
- 如果你使用Unity 2021及以上版本，并且WebGL平台，需要com.code-philosophy.hybridclr版本 >= 2.0.9
- 如果是其他版本及平台，由于Unity的资源管理的实现机制，资源必须打包为AssetBundle才能正常恢复热更新脚本，放到Resource下不行。详情请看 [MonoBehaviour工作流](/basic/monobehaviour.md)。
- 如果你安装了最新的main分支的hybridclr，则要求com.code-philosophy.hybridclr package版本 >= 1.1.17
- 加载资源时还未加载对应的热更新程序集

### 遇到  "This icall is not supported by il2cpp at System.AppDomain.Load"

有两种原因

1. 如果ios平台，因为ios平台并不从源码编译libil2cpp，而是使预先编译好的libil2cpp.a，你需要替换xcode工程中的libil2cpp.a为HybridCLR的编译版本。编译方式请看[build libil2cpp.a for iOS](/basic/buildpipeline.md)
2. 如果是webgl平台，则因为使用全局安装后没有替换安装目录的libil2cpp或者没有建立安装目录libil2cpp到项目本地libil2cpp的软链接。详细见[发布WebGL平台](../basic/buildwebgl)
3. 如果其他平台，则因为未安装HybridCLR。请参照[安装HybridCLR](/basic/install.md)文档操作。

### 热更新中物理碰撞 Collision未生效

一般是因为Collision脚本及相关功能被裁剪导致的。请确保相关脚本及dll不要被裁剪。

### unsupported internal call for il2cpp. xxxx 

调用了一个Mono中存在，但在il2cpp未实现的函数。请修改代码，不要使用这些类和函数。

### async 代码（系统自带或者UniTask之类）打包后运行时抛出NullReferenceException或者崩溃

有几个原因：

- 在异步代码中抛出异常（比如桥接函数异常或者AOT泛型实例化异常），导致异步代码未能正确执行。解决办法为 catch 异步中的异常，定位出具体的原因，再解决
- 补充元数据及桥接函数与最终的发布包不匹配。 当开启development选项时便会产生这个问题：`Generate/All`或`Generate/AOTDlls`生成的是非development模式
下的aot dll，与打包时生成的development aot dll不匹配，进一步导致补充元数据和生成桥接函数都是错误的，于是在运行时发生严重的错误或崩溃。解决办法为打包时
不要关闭development选项，或者修改`Generate/AOTDlls`代码，在BuildOptions中添加`Development`标志。

### 遇到 Unity: TypeLoadException: Could not load type 'XxxType' from assembly 'yyyAssembly'

分几情况：

#### 情况1：yyyAssembly 是 netstandard

这是因为你Player Settings里 `api compatible level` 设置为 .net standard。

目前支持.net standard 2.0和.net 4.x，但即使主工程打包用.net standard，热更新dll打包**必须用.net 4.x**。原因是unity使用.net standard打包时，会自动剥除.net standard的依赖，直接依赖最终的dll，导致主工程的dll列表中实际上不存在net standard这个dll，进而导致热更新dll加载时，找不到来自netstandard的对象。

解决办法为打包和编译热更新都用.net 4.x或者打包用.net standard 2.0但编译热更新部分时api compatible level切换为.net 4.x(2021 起改名为 .net framework)。

#### 情况2：yyyAssembly是 其他AOT assembly

这是unity代码裁剪引起的函数丢失，你使用常规的避免unity代码裁剪的方式处理即可。

按照Unity防裁剪原理，你在link.xml中添加对丢失代码类的引用即可，但这种事情费时费力。

HybridCLR提供了快捷的自动生成工具，运行菜单命令 `HybridCLR/Genrate/LinkXml` 根据热更新dll生成 link.xml。

:::caution
如果你发现在link.xml确实preserve了这个类，但仍然出现这种类型缺失的错误，这是Unity自身引起的。Unity要求必须在代码里引用过dll里的任意类，才会保留这个dll，link中的那些配置才会生效。因此需要你手动在代码里引用缺失的这个类所在的dll里的任意一个类即可。 
:::

#### 情况3：yyyAssembly是热更新assembly

这是因为你没有按照依赖顺序加载热更新dll。例如，如果A依赖于B，那你应该先加载B，再加载A。

### MissingMethodException: HybridCLR.RuntimeApi::LoadMetadataForAOTAssembly(System.Byte[],HybridCLR.HomologousImageMode) 错误

升级hybridclr后未重新install。 从v4.0.8起，RuntimeApi中定义的extern函数由PInvoke改为InternalCall，如果升级hybridclr package后没有重新install就会出现这个错误。

### MissingMethodException: MethodNotFind xxClass::yyyMethod 错误

这是unity代码裁剪引起的函数丢失，运行菜单命令 `HybridCLR/Genrate/LinkXml` 根据热更新dll生成 link.xml。同时要确保被引用的AOT程序集在主工程代码中被引用过，否则linkxml不会生效。


### MissingMethodException: AOT generic method isn't instantiated in aot module xxx 

有几个原因：

1. 这是因为AOT泛型函数实例化缺失引起的
2. 使用了Unity 2021并且 `Il2Cpp Code Generation` 选项为 `faster runtime`，导致生成的代码为完全泛型模式，所有泛型函数签名均发生变化。如果没有补充元数据，调用即使已经在AOT中实例化的泛型函数，仍然会出现这个错误。
3. 微信小游戏转换工具，默认会将IL2CPP Code Generation设置为Faster(Smaller) builds模式，如果未补充元数据，会导致无法访问AOT泛型函数。

原因1的解决办法为：

- 错误日志告诉你缺失哪个AOT函数实例化，你就在主工程里加上对这个函数的调用，使得il2cpp在打包时能生成这个泛型函数的代码。 主工程里任意地方加个这个泛型AOT函数调用都可以，目前一般集中加到 RefTypes.cs 这个文件里。
- 使用补充元数据技术

原因2的解决办法为：

- 使用补充元数据技术

原因3的解决办法：

- 使用补充元数据技术
- 自己改微信工具源码，将BuildSettings中 `IL2CPP Code Generation` 设置为 `Faster`。


具体操作请看[AOT泛型原理介绍](/basic/aotgeneric.md) 文档。


### 遇到 ExecutionEngineException: metadata type not match

补充元数据使用了不匹配的裁剪后的AOT版本，应该使用本次打包生成，或者使用`HomologousImageMode::SuperSet`模式加载。

### 遇到ExecutionEngineException: not support extern method: xxxx

有两种原因：

- 在热更新中定义了extern函数，这暂时不支持。解决办法是将extern函数移到AOT部分。
- 使用了SuperSet元数据格式，但补充元数据aot dll太旧，导致AOT中的泛型在补充元数据dll中找不到。解决办法是更新最新的AOT dll。

### 遇到ExecutionEngineException:method body is null. xxx::yyyy

原因同上。

### 遇到 ExecutionEngineException: GetManaged2NativeMethodPointer not support. xxxx 函数名

缺失 interpreter -> aot 方向的桥接函数。请先确认你的 hybridclr是最新代码， com.code-philosophy.hybridclr package也是最新版本，
并且已经生成最新的桥接函数。原理请参考 [桥接函数](/basic/methodbridge.md) 。

如果Android上正常，而iOS上有问题，则是因为你没有重新编译libil2cpp.a。

如果还有问题，请在群里反馈给管理员 技术支持。

### 遇到'ExecutionEngineException: NotSupportNative2Managed' 

缺失 aot -> interpreter 方向的桥接函数。请先确认你已生成最新的桥接函数。原理请参考 [桥接函数](/basic/methodbridge.md) 。
如果Android上正常，而iOS上有问题，则是因为你没有重新编译libil2cpp.a。

如果还有问题，请在群里反馈给管理员 技术支持。

### ExecutionEngineException: Attempting to call method 'xxxx' for which no ahead of time (AOT) code was generated.

为出错的函数所在的dll补充元数据即可。


### GetReversePInvokeWrapper fail. exceed max wrapper num of method

Wrapper函数不足。你需要为热更新中的添加了MonoPInvokeCallback特性的函数预留Wrapper函数，详见[MonoPInvokeCallback支持](../basic/workwithscriptlanguage.md)

### NotSupportedException: To marshal a managed method, please add an attribute named 'MonoPInvokeCallback' to the method definition. The method we're attempting to marshal is:xxxx

原理同上

### 使用addressable进行热更新时，加载资源出现 UnityEngine.AddressableAssets.InvlidKeyException: Exception of type 'UnityEngine.AddressableAssets.InvalidKeyException' was thrown. No Asset found with for key 'xxxx' 异常

解决方案来自[addressables和HybridCLR结合使用导致的资源加载错误](https://github.com/Bian-Sh/Assemblies-Hotfix-Toolkit-Unity/issues/2)。也可以参见视频[踩坑实战:将HybridCLR导入自己的项目并实现热更新](https://www.bilibili.com/video/BV1aP4y1o7xi/) 1:02:30起的内容。

> 当使用addressables来更新热更新的dll时。由于是先使用了Addressables的LoadAssetAsync函数，导致Addressables需要先进行初始化，此时的初始化中如果资源的类型是在热更新的类型，那么Addressables会认为该资源的类型为System.Object。所以需要先进行dll的加载才能够使用Addressables来加载资源，否则就会报UnityEngine.AddressableAssets.InvalidKeyException: Exception of type 'UnityEngine.AddressableAssets.InvalidKeyException' was thrown. No Asset found with for Key=xxx. Key exists as Type=System.Object, which is not assignable from the requested Type=YourHotUpdateAssetType。


解决办法有如下几种：
- 使用`LoadAsset<System.Object>`接口加载后再强转
- 在loaddll结束后重新加载catalog `Addressables.LoadContentCatalogAsync($"{Addressables.RuntimePath}/catalog.json");`

### GameObject.GetComponent(string name) 接口无法获得组件

这是已知bug，跟unity的代码实现有关，只有挂载在热更新资源上热更新脚本才会有这个问题，通过代码中AddComponent添加的热更新脚本是可以用这个方法查找到。请改用 `GameObject.GetComponent<T>()` 或 `GameObject.GetComponent(typeof(T))`

### GameObject.GetComponent&lt;T&gt;()或者GameObject.GetComponent(Type type)返回null

都是因为你把某个程序集加载了两次导致，你传入的T或者Type与GameObject上挂载的脚本只是同名，却属于不同程序集实例，导致返回时强转后变成null。一般有如下几种情形导致：

- Editor中使用Assembly.Load加载了热更新程序集。由于Editor下已经默认加载了所有程序集，你再次加载就会出现重复加载。解决办法为使用#if !UNITY_EDITOR 宏注释掉加载代码
- 程序集未加到hotUpdateAssemblies列表，导致热更新程序集也被打包到了AOT中。在热更新中再次加载则会出现重复加载。解决办法为将热更新程序集加入到hotUpdateAssemblies列表，重新打包

### 使用MemoryProfile抓取内存快照会崩溃

如果你使用Unity 2021或更高的版本，升级 hybridclr package到`v3.0.2`或更高版本即可。如果使用Unity 2019或2020，将提交记录
[修复使用Momery Profiler创建快照时发生崩溃的bug](https://github.com/focus-creative-games/hybridclr/commit/062bfa99c71a53a6cb35fc89a52d67bbff2bb2d0) 的改动合并到你当前版本即可。

### profiler的 BeginSample和EndSample 无法生效

因为 BeginSample之类的函数有[Condition]编译注解，以Release方式编译dll时，会自动剔除这些代码，导致Profile失效。解决办法是以Developemnt方式编译热更新dll即可，代码如下。
如果你使用`v3.0.2`及更高版本，已经附带了`HybridCLR/CompileDll/ActivedBuildTarget_Development`菜单命令。

```csharp
    var group = BuildPipeline.GetBuildTargetGroup(target);

    ScriptCompilationSettings scriptCompilationSettings = new ScriptCompilationSettings();
    scriptCompilationSettings.group = group;
    scriptCompilationSettings.target = target;
    if (developmentBuild)
    {
        // 核心是这行，使得以Debug模式编译dll，保留Profiler.BeginSample之类的函数调用。
        scriptCompilationSettings.options |= ScriptCompilationOptions.DevelopmentBuild;
    }
    Directory.CreateDirectory(buildDir);
    ScriptCompilationResult scriptCompilationResult = PlayerBuildInterface.CompilePlayerScripts(scriptCompilationSettings, buildDir);
```

### iOS使用相机没有任何响应，但也不报错

这是WebCamTexture.devices未在AOT中保留导致。需要手动在AOT中引用 WebCamTexture.devices。

### AVProMovieCapture插件工作不正常

由于AVProMovieCapture自身实现的原因，你需要先初始化插件，再进行HybridCLR的加载之类的操作。

### EncodeImageAndMetadataIndex函数出现IL2CPP_ASSERT断言失败的错误

由于你们项目的热更新dll过大导致。解决办法：

- 升级到v5.2.0+版本，支持最大64M的dll
- 将热更新dll拆分成多个更小的dll

## 启动时执行AutomaticWorldBootstrap::Initialize过程中调用ResourceCatalogData::GetGUIDFromPath崩溃

你当前使用的entities版本不能直接使用Player Building中打包，必须安装`com.unity.platforms`，使用它单独的提供的打包方式，[详细文档](https://docs.unity3d.com/Packages/com.unity.entities@0.51/manual/ecs_building_projects.html)。

## Job.ScheduleBatch 崩溃

hybridclr与dots不兼容导致，商业化版本可以解决这个问题。

## WebGL 运行时出现 function signature mismatch错误

WebGL平台打包时默认使用 `faster (smaller) build`选项，该选项会开启完全泛型共享，而社区版本必须补充元数据后才能与完全泛型共享机制配合工作。请依次尝试以下办法：

1. 确保hybridclr为v4.0.0+版本，如果低于此版本请升级
1. 尝试补充元数据，补充`函数栈最顶部的c#代码所在的`程序集
1. 如果仍有问题，则可能是桥接函数与最终构建的包不匹配导致，比如说'Generate/all'时开启了'development'但构建时却未开启'development'。解决办法为使用构建时的参数，运行`generate/all`，清除build缓存后重新构造
1. 如果仍有问题，将 `Player Settings`中 `IL2CPP Code Generation` 切换到 `Faster Runtime`
1. 如果仍有问题，升级到最新的hybridclr版本
1. 如果极有问题，请联系我们技术支持

### 使用 Unity.netcode.runtime 后出现 NotSupportNative2Managed 桥接函数缺失异常

原因是 在Unity.netcode.runtime.dll中 NetworkManager.RpcReceiveHandler 是internal， 定义如下

```csharp
internal delegate void RpcReceiveHandler(NetworkBehaviour behaviour, FastBufferReader reader, __RpcParams parameters);
```

导致生成工具没有为它生成桥接函数。但Unity又非常trick地在打包时为 标记了 `[ClientRpc]` 和 `[ServerRpc]` 的函数生成 RpcReceiveHandler 
处理函数，并且引用了 internal 的RpcReceiveHandler类！居然没报错。 导致出现桥接函数缺失的问题。


解决办法为你在AOT工程里也定义一个相同签名的delegate。

```csharp
    // 由于 __RpcParams也是internal的，我们这儿自己重新定义了一个一样的类型
    public struct __RpcParams
#pragma warning restore IDE1006 // restore naming rule violation check
    {
        public ServerRpcParams Server;
        public ClientRpcParams Client;
    }

    public delegate void MyRpcReceiveHandler(NetworkBehaviour behaviour, FastBufferReader reader, __RpcParams parameters);

```
