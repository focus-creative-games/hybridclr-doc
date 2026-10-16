---
title: '安装'
description: '支持所有当前受支持的 Unity LTS 版本（2019.4.x/2020.3.x/2021.3.x/2022.3.x/**6000.x.y**）和团结引擎所有版本。'
slug: /basic/install
---

# 安装

## 安装兼容的Unity版本

支持所有当前受支持的 Unity LTS 版本（2019.4.x/2020.3.x/2021.3.x/2022.3.x/**6000.x.y**）和团结引擎所有版本。

:::warning
自 **v9.0.0** 版本起，移除了对 Unity **2019.4.x / 2020.3.x / 2021.3.x** 的支持，同时移除了对 6000.5.x 的支持（6000.5.x 不是LTS版本）。
如果需要使用这些 Unity 版本，请使用 **v8.x.y** 系列版本。
:::

根据你打包的目标平台，安装过程中选择必要模块。如果打包Android或iOS，直接选择相应模块即可。如果你想打包Standalone，必须额外选中 `Windows Build Support(IL2CPP)`或`Mac Build Support(IL2CPP)`。

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

## 安装IDE及相关工具

- Windows
  - Win下需要安装`visual studio 2022`或更高版本。安装时至少要包含 `使用Unity的游戏开发` 和 `使用c++的游戏开发` 组件。
  - 安装git
- Mac
  - 要求MacOS版本 >= 12，xcode版本 >= 13，例如`xcode 13.4.1， macos 12.4`。
  - 安装 git
  - 安装cmake

### 选择 `com.code-philosophy.hybridclr` 版本

:::tip
v3.0.0 之前的包名叫 `com.focus-creative-games.hybridclr_unity`。
:::

`v9.0.0`及更新的版本只支持 Unity 2022.3.x、6000.x.y（不含6000.5.x）。如果需要使用 Unity **2019.4.x / 2020.3.x / 2021.3.x**，请选择 **v8.x.y** 系列版本。

这些版本都有大量线上项目验证，已经很稳定，不必纠结哪个更好，一般来说越新的版本修复了更多bug、优化更多，使用体验更好。

## 安装 `com.code-philosophy.hybridclr` package

仓库地址为 [github](https://github.com/focus-creative-games/hybridclr_unity) ,国内快速的镜像仓库为[gitee](https://gitee.com/focus-creative-games/hybridclr_unity)。

有几种安装方式：

- 使用Package Manager从git url安装
- 本地安装

### 从git url安装

主菜单中点击`Windows/Package Manager`打开包管理器。如下图所示点击`Add package from git URL...`，填入`https://gitee.com/focus-creative-games/hybridclr_unity.git`或`https://github.com/focus-creative-games/hybridclr_unity.git`。

- main分支地址为 `https://gitee.com/focus-creative-games/hybridclr_unity.git`
- 其他tag版本地址为 `https://gitee.com/focus-creative-games/hybridclr_unity.git#{tag}`

想安装某个分支或者tag版本，请在地址后加上`#{tag}`，如 `https://gitee.com/focus-creative-games/hybridclr_unity.git#v3.0.1`。

![add package](/img/hybridclr/install_hybridclrunity_package.jpg)

不熟悉从url安装package的请看[install from giturl](https://docs.unity3d.com/Manual/upm-ui-giturl.html)。

### 从本地文件安装

将仓库clone到本地后，目录改名为`com.code-philosophy.hybridclr`（v3.0.0之前的版本请用 `com.focus-creative-games.hybridclr_unity`），再直接移到项目的Packages目录即可。

## 更新 com.code-philosophy.hybridclr

更新完com.code-philosophy.hybridclr后需要重新运行`HybridCLR/Installer`。

## 初始化HybridCLR

为了减少package自身大小，有一些文件需要从Unity Editor的安装目录复制。因此安装完插件后，还需要一个额外的初始化过程。

点击菜单 `HybridCLR/Installer...`，弹出安装界面。

com.code-philosophy.hybridclr中 `Data~/hybridclr_version.json` 文件中已经配置了当前package版本对应的兼容 hybridclr及il2cpp_plus的分支或者tag，
Installer会安装配置中指定的版本，不再支持自定义待安装的版本。

配置类似如下：

```json
{
    "versions": [
    {
        "unity_version":"2022",
        "hybridclr" : { "branch":"v9.0.0"},
        "il2cpp_plus": { "branch":"v2022-9.0.0"}
    },
    {
        "unity_version":"6000",
        "hybridclr" : { "branch":"v9.0.0"},
        "il2cpp_plus": { "branch":"v6000-9.0.0"}
    }
    ]
}
```

如果你一定要安装其他版本的hybridclr或il2cpp_plus，修改该配置文件中的branch为目标分支或者tag。绝大多数情况下，直接点击`安装`默认从远程仓库下载安装即可。安装成功后，控制台会打印`安装成功`日志。如下图所示。

![install_default](/img/hybridclr/install_default.jpg)

从v2.3.1起新增支持直接从本地自己制作的包含hybridclr的libil2cpp目录复制安装。如果你网络不好，或者没有安装git导致无法从仓库远程下载安装，则可以先将 [il2cpp_plus](https://github.com/focus-creative-games/il2cpp_plus)和[hybridclr](https://github.com/focus-creative-games/hybridclr)下载到本地后，再根据下面**安装原理**小节的文档，由这两个仓库合并出含hybridclr的libil2cpp目录，接着在`Installer`安装界面中启用`从本地复制libil2cpp`选项，选择你制作的libil2cpp目录，再点击`安装`执行安装。如下图所示。

![install](/img/hybridclr/install.jpg)

最常见失败原因为git未安装，或者安装git后未重启UnityEditor和UnityHub。如果你确信安装了git，cmd中也确实能运行git，则尝试重启电脑。

如果因为各种特殊原因未能完成自动化安装，请参照下面的**安装原理**手动模拟整个安装过程。

## 安装后的特殊处理

### WebGL平台

当前支持的所有Unity版本都已支持本地安装，WebGL平台构建过程与其他平台完全相同，不需要额外处理。

## 在非兼容的Unity版本中使用HybridCLR

由于我们没有完全测试所有Unity版本，实际上一些不在支持列表中的Unity版本，也有可能能正常使用HybridCLR。安装方式如下：

- 找一个离你的版本最近的在支持列表中的版本，例如你的版本号为 2023.1.20，则离你最近的版本为2023.2.0。
- 先将你的Unity工程切换到这个最近的受支持的版本，安装HybridCLR。
- 切换回你的Unity版本。
- 尝试打包，如果能顺利运行，则表明HybridCLR支持你这个版本，如果有问题，那还是升级版本吧。

如果你一定要使用该版本，可以联系我们提供[商业技术支持](../../business/intro.md)。

## `HybridCLR/Installer`工作原理

本节只是介绍原理，**安装libil2cpp的操作已由installer完成，并不需要你手动操作**。

HybridCLR安装过程主要包含这几部分：

- 制作支持热更新的libil2cpp
- 本地或者全局安装，使新版本libil2cpp生效
- 对Unity Editor的少量改造

### 替换libil2cpp代码

原始的libil2cpp代码是AOT运行时，需要替换成改造后的libil2cpp才能支持热更新。改造后的libil2cpp由两部分构成

- il2cpp_plus
- hybridclr

il2cpp_plus仓库为对原始libil2cpp作了少量修改以支持动态**register**元数据的版本（改了几百行代码）。这个仓库与原始libil2cpp代码高度
相似。hybridclr为解释器部分的核心代码，包含元数据加载、代码transform(编译)、代码解释执行。

如下图所示，将`il2cpp_plus/libil2cpp`目录和`hybridclr/hybridclr`目录合并，制作出最终的支持热更新的libil2cpp。

![merge_hybridclr_dir](/img/hybridclr/merge_hybridclr_dir.jpg)


### 本地安装

Unity允许使用环境变量`UNITY_IL2CPP_PATH`自定义`il2cpp`的位置，因此可以在项目本地创建il2cpp目录，用改造后的libil2cpp替换il2cpp目录下的libil2cpp目录，
再将`UNITY_IL2CPP_PATH`环境变量指向该目录。大致过程如下：

- 从Editor安装目录复制il2cpp目录到`{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp`
- 从clone il2cpp_plus和hybridclr仓库，制作出最终的libil2cpp目录
- 将最终的libil2cpp目录替换 `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`
- 从Editor安装目录复制 `MonoBleedingEdge` 目录到 `{project}/HybridCLRData/LocalIl2CppData-{platform}/MonoBleedingEdge`
- 其他平台相关的处理

:::tip
com.code-philosophy.hybridclr 包修改了本UnityEditor**进程内**的环境变量`UNITY_IL2CPP_PATH`，并不会影响其他Unity项目。
:::

创建上层`LocalIl2CppData-{platform}`目录，而不是只创建il2cpp是因为实测发现仅仅指定il2cpp目录位置是不够的，打包时Unity隐含假设了il2cpp同级有一个`MonoBleedingEdge`目录，所以创建了上级目录，将il2cpp及MonoBleedingEdge目录都复制过来。

因为不同平台Editor自带的il2cpp目录略有不同，LocalIl2CppData要区分platform。

### 全局安装

全局安装需要替换（或链接）Editor安装目录的libil2cpp目录(Win下为{editor}/Data/il2cpp/libil2cpp，Mac类似)为改造后的libil2cpp。有几个缺陷：

- 因为目录权限原因，可能无法自动完成
- 会影响其他不使用hybridclr的项目
- `HybridCLR/Generate/xxxx`操作需要修改libil2cpp目录下的文件，有可能目录权限的原因而失败。

使用`HybridCLR/Installer`完成安装后，在`HybridCLR/Settings`中开启 `useGlobalIl2Cpp` 选项来启动全局安装，此时会清除环境变量`UNITY_IL2CPP_PATH`。

如果你使用替换目录的方式进行全局安装，则**第一次**覆盖libil2cpp前，请先运行`HybridCLR/Generate/Il2cppDef`（只此一次，后面不再需要，除非你切换了项目Unity版本）以生成正确的版本宏，再覆盖原始的libil2cpp目录。**符号链接安装方式不需要执行此操作，直接覆盖原始的libil2cpp目录即可**。

由于权限原因，即使是全局安装，`Generate/xxx`命令修改的是本地`{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`下的文件。**请每次generate后都将本地libil2cpp目录覆盖全局安装目录**。

每次替换libil2cpp目录非常麻烦，推荐使用链接安装目录的libil2cpp目录到本地libil2cpp目录方式。方法如下：

- Win平台。以管理员权限打开命令行窗口，删除或者重命名原libil2cpp，然后运行 `mklink /D  "<Editor安装目录的libil2cpp目录路径>" "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp"`。
- Linux或者Mac平台。以管理员权限打开命令行窗口，删除或者重命名原libil2cpp，然后运行 `ln -s "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" "<Editor安装目录的libil2cpp目录路径>" `。

## 注意事项

由于 Unity 的缓存机制，更新 HybridCLR 后，一定要清除 Library\Il2cppBuildCache 目录，不然打包时不会使用最新的代码。如果你使用Installer来自动安装或者更新HybridCLR，它会自动清除这些目录，不需要你额外操作。

## 其他

- [CVE-2025-59489漏洞](https://unity.cn/security/sept-2025-01) 跟il2cpp没有关联，因此不需要升级hybridclr版本，只需要升级当前Unity版本到对应的patch版本或者其他已经修复此漏洞的Unity版本。
