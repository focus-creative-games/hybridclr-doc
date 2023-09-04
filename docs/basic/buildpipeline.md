# 打包工作流

由于热更新本身的要求以及Unity资源管理的一些限制，对打包工作流需要一些特殊处理，主要分为几部分：

- 设置UNITY_IL2CPP_PATH环境变量
- 打包时自动排除热更新assembly
- 打包时将热更新dll名添加到assembly列表
- 将打包过程中生成的裁剪后的aot dll拷贝出来，供补充元数据使用
- 编译热更新dll
- 生成一些打包需要的文件和代码
- iOS平台的特殊处理

手动操作这些是烦琐易错的，`com.code-philosophy.hybridclr` package包含了打包工作流相关的标准工具脚本，将这些复杂流程简化为一键操作。
详细实现请看源码或者[com.code-philosophy.hybridclr介绍](/basic/com.code-philosophy.hybridclr.md)

## 打包流程

1. 运行菜单 `HybridCLR/Generate/All` 一键执行必要的生成操作
1. 将`HybridCLRData/HotUpdateDlls`下的热更新dll添加到项目的热更新资源管理系统
1. 将`HybridCLRData/AssembliesPostIl2CppStrip`下的补充元数据 dll添加到项目的热更新资源管理系统
1. 根据你项目原来的打包流程打包

## 优化的打包流程

`HybridCLR/Generate/All` 命令运行过程中会执行一次导出工程，以生成裁剪后的AOT dll。这一步对于大型项目来说可能非常耗时，几乎将打包时间增加了一倍。如果需要优化打包时间，可以按照如下流程一次出包。

- 运行 `HybridCLR/Generate/LinkXml`
- 导出工程
- 运行 `HybridCLR/Generate/Il2cppDef`
- 运行 `HybridCLR/Generate/MethodBridge`生成桥接函数
- 运行 `HybridCLR/Generate/PReverseInvokeWrapper`。 不需要与lua之类交互的项目可跳过此步。
- 将 `{proj}\HybridCLRData\LocalIl2CppData-{platform}\il2cpp\libil2cpp\hybridclr\generated`目录 替换导出工程中的此目录。
- 在导出工程上执行build


## iOS平台的特殊处理

### 当 com.code-philosophy.hybridclr 版本 &ge; v3.2.0

不需要任何处理，直接导出xcode工程，再打包即可。由于在build完成后才将libil2cpp源码加入xcode工程，因此只能先导出xcode，再手动或者命令行编译，试图直接`Build And Run`会出错。

:::danger
如果你的 com.code-philosophy.hybridclr 版本 &lt; v3.3.0, 由于xcode工程里写死了libil2cpp相关代码的路径，如果你导出xcode工程，推送到其他电脑上打包，会出现代码文件找不到的错误！
:::


### 当 com.code-philosophy.hybridclr 版本 &lt; v3.2.0

除了iOS以外平台都是根据libil2cpp源码编译出目标程序,iOS平台使用提前编译好libil2cpp.a文件。Unity导出的xcode工程引用了提前生成好的libil2cpp.a，而不包含libil2cpp源码，
直接打包无法支持热更新。因此编译iOS程序时需要自己单独编译libil2cpp.a，再**替换xcode工程的libil2cpp.a文件**，接着再打包。

**替换xcode工程中的libil2cpp.a文件请自行完成**。

`com.code-philosophy.hybridclr/Data~/iOSBuild` 目录包含了编译 `libil2cpp.a` 所需的脚本。使用`HybridCLR/Installer...`完成安装后，该iOSBuild目录会被复制到`{project}/HybridCLRData/iOSBuild` 目录。

### 编译 libil2cpp.a 

- 运行 `HybridCLR/Generate/All` 生成所有必要的文件
- 打开命令控制台，切换到 `{project}/HybridCLRData/iOSBuild` 目录。请确保这个路径的绝对路径不包含空格！否则会出错。
- bash ./build_libil2cpp.sh 编译libil2cpp.a 。运行结束后，如果在`iOSBuild/build`目录下能找到libil2cpp.a文件并且size大于60M，表示编译成功

## 常见错误

- 未在`HybridCLR/Installer...`中完成安装
- 未运行`HybridCLR/Generate/All`
- 未安装使用较新的macOS(12以上)及最新xcode
- 未安装cmake
- 由于git设置的原因，拉下来的build_libil2cpp.sh及build_lump.sh包含不正确的文件结束符，导致脚本运行前几行代码就出错。 错误信息也很明显，如 `/bin/bash^M 文件不存在`。运行命令 `cat -v build_libil2cpp.sh ` 检查确认换行符的正确性。 运行 `git config --global core.autocrlf input`，然后再重新拉取这这两个脚本文件即可。详情可 [参见git换行符设置](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings)。
- `{project}/HybridCLRData/iOSBuild`的绝对路径包含空格，导致gen_lump.sh脚本生成错误的结果
