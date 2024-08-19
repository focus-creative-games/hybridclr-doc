# 构建和热更新

DHE技术中与构建相关的文件为dhe dll文件和对应的dhao文件。

## 构建游戏

由于首包中所有DHE程序集中代码没有发生改变，因为在构建游戏工作流中并不需要任何DHE相关的dll或者dhao文件。

- 运行`HybridCLR/Generate/All`
- 构建游戏
- 备份`HybridCLRData\AssembliesPostIl2CppStrip\{buildTarget}`目录下的所有程序集，加入版本管理系统。将来热更新生成dhao文件时需要用到这些原始的dll文件


## 热更新

- 使用 `HybridCLR/CompileDll/ActivedBuildTarget` 生成热更新dll。
- 使用`HybridCLR.Editor.DHE.BuildUtils.GenerateDHAODatas`生成最新的热更新dll的dhao文件。如果需要加密dhe程序集，则使用`HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateDHAODatas`生成加密dll及相应的dhao文件
- 将最新的热更新dll（或者加密后的dll）和dhao文件加入热更新资源管理系统。注意，运行时不需要原始dll文件，请不要将备份的原始dll加入热更新资源管理系统。

:::caution

如果构建游戏使用 **development build 选项**，请一定要对应使用`HybridCLR/CompileDll/ActivedBuildTarget_Development`编译Development模式的热更新dll。
否则由于developemnt与非development编译的dll差异较大，会导致几乎所有函数都被计算为变化。

:::

