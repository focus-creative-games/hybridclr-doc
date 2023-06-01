# HybridCLR打包工作流

由于热更新本身的要求以及Unity资源管理的一些限制，对打包工作流需要一些特殊处理，主要分为几部分：

- 设置UNITY_IL2CPP_PATH环境变量
- 打包时自动排除热更新assembly
- 打包时将热更新dll名添加到assembly列表
- 将打包过程中生成的裁剪后的aot dll拷贝出来，供补充元数据使用
- 编译热更新dll
- 生成一些打包需要的文件和代码
- iOS平台的特殊处理

手动操作这些是烦琐易错的，`com.focus-creative-games.hybridclr_unity` package包含了打包工作流相关的标准工具脚本，将这些复杂流程简化为一键操作。
详细实现请看源码或者[hybridclr_unity介绍](/basic/com.code-philosophy.hybridclr.md)

## 打包流程

1. 运行菜单 `HybridCLR/Generate/All` 一键执行必要的生成操作
1. 将`HybridCLRData/HotUpdateDlls`下的热更新dll添加到项目的热更新资源管理系统
1. 将`HybridCLRData/AssembliesPostIl2CppStrip`下的补充元数据 dll添加到项目的热更新资源管理系统
1. 根据你项目原来的打包流程打包


## iOS平台的特殊处理

除了iOS以外平台都是根据libil2cpp源码编译出目标程序,iOS平台使用提前编译好libil2cpp.a文件。Unity导出的xcode工程引用了提前生成好的libil2cpp.a，而不包含libil2cpp源码，
直接打包无法支持热更新。因此编译iOS程序时需要自己单独编译libil2cpp.a，再**替换xcode工程的libil2cpp.a文件**，接着再打包。

**替换xcode工程中的libil2cpp.a文件请自行完成**。

`com.focus-creative-games.hybridclr_unity/Data~/iOSBuild` 目录包含了编译 `libil2cpp.a` 所需的脚本。使用`HybridCLR/Installer...`完成安装后，该iOSBuild目录会被复制到`{project}/HybridCLRData/iOSBuild` 目录。

## 编译 libil2cpp.a 

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
