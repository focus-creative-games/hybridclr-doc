# 发布WebGL平台

由于WebGL平台有较多特殊性，故特地单独文档介绍如何发布WebGL平台。本文档在 hybridclr_trial项目（[github](https://github.com/focus-creative-games/hybridclr_trial) [gitee](https://gitee.com/focus-creative-games/hybridclr_trial) ）上演示发布过程。

:::tip
从Unity 2021.3.5+、2022.3.0+版本起，不再需要全局安装，也就是webgl平台的构建过程与其他平台完全相同。
:::

## 使用的版本

不同Unity版本及hybridclr package的发布流程都是相似的，不再赘述。

- Unity 2021.3.1f1
- com.code-philosophy.hybridclr v3.4.0

## 准备工作

:::tip
新手请至少阅读过[快速上手](../beginner/quickstart.md)文档，已经掌握Win或Android之类平台的发布流程。
:::


- 确保Unity Editor 安装了WebGL模块，如下图
- 根据 [install](install.md) 文档完成HybridCLR安装及设置
- 在HybridCLRSettings中，开启`Use Global Il2cpp` 选项，因为webgl平台只支持全局安装。从2021.3.5+、2022.3.0+起，**不再需要**开启此选项


![select_il2cpp_module_webgl](/img/hybridclr/select_il2cpp_modules_webgl.jpg)

## 建立 Editor目录的libil2cpp到本地libil2cpp目录的软（硬）引用

:::warning
注意：从Unity 2021.3.5+、2022.3.0+版本起，由于支持本地安装，不再需要建立此引用。
:::

:::tip
升级hybridclr等情形需要重新install时，先恢复Editor安装目录的原始libil2cpp目录，再重新按照如下说明建立链接。
:::

### Win平台

不熟悉命令行的开发者请先掌握命令行的基础用法。

- 以管理员权限打开命令行窗口，这个操作不同操作系统版本不一样，请酌情处理。在Win11下为`在开始菜单上右键，选中终端管理员菜单项`。
- 运行 `cd /d {editor_install_dir}/Editor/Data/il2cpp`， 切换目录到安装目录的il2cpp目录
- 运行`ren libil2cpp libil2cpp-origin` 将原始libil2cpp改名为libil2cpp-origin
- 运行 `mklink /D  libil2cpp "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp"` 建立Editor目录的libil2cpp到本地libil2cpp目录的符号引用

### MacOS或者Linux平台

- 打开命令行窗口
- 运行 `cd /d {editor_install_dir}/Editor/Data/il2cpp` 切换目录到安装目录的il2cpp目录。具体目录可能因为操作系统而有所不同，请酌情处理
- 运行`mv libil2cpp libil2cpp-origin` 将原始libil2cpp改名为libil2cpp-origin
- 运行 `ln -s "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" libil2cpp` 建立Editor目录的libil2cpp到本地libil2cpp目录的符号引用


## 打包

- 运行 `HybridCLR/Generate/All`
- 运行 `HybridCLR/Build/BuildAssetsAndCopyToStreamingAssets`。注意！这个菜单是`hybridclr_trial`项目添加的，并不是hybridclr package自带的命令。
- 在`Build Player`中运行`Build And Run`即可


