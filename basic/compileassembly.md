
# 编译 热更新assembly

热更新代码中有可能会包含 `#if UNITY_EDITOR` 、`#if UNITY_STANDALONE_WIN` 这样的宏开关，因此每个平台需要单独
编译热更新assembly。

`Library/ScriptAssemblies`目录下的assembly是BuildTarget为Editor时编译的结果，而且会受`Debugger Enable`选项的影响，
并不能作为热更新程序集使用。我们使用Unity提供的 `UnityEditor.Build.Player.PlayerBuildInterface.CompilePlayerScripts` 接口来编译不同BuildTarget
下的热更新dll。编译结果输出到`{proj}/HybridCLRData/HotUpdateDlls/{target}`目录下。

运行菜单`HybridCLR/Compile/xxx`命令直接编译出热更新dll。运行`HybridCLR/Generate/All`时会也隐含编译最新的热更新程序集。在调用该命令后可以直接复制热更新dll，不用再次运行`HybridCLR/Compile/xxx`。
由于该接口编译时并不区分AOT与热更新，将项目整体编译了，开发者只需要将输出的热更新dll加入项目的资源管理系统即可。

hybridclr_unity的`HybridCLR.Editor`程序集提供了`HybridCLR.Editor.Commands.CompileDllCommand.CompileDll(BuildTarget target)`接口，
方便开发者灵活地自行编译热更新dll。

发布主包后，每次热更新时只需要简单使用`HybridCLR/Compile/xxx`命令重新编译热更新dll，再发布热更新dll即可，不用运行`HybridCLR/Generate/xxx`命令。

