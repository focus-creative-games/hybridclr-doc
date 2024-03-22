# Compile Hot Update Assembly

The hot update code may contain macro switches such as `#if UNITY_EDITOR` and `#if UNITY_STANDALONE_WIN`, so each platform needs to be
Compile hot update assembly.

The assembly in the `Library/ScriptAssemblies` directory is the result of compilation when the BuildTarget is Editor, and will be affected by the `Debugger Enable` option.
It cannot be used as a hot update assembly. We use the `UnityEditor.Build.Player.PlayerBuildInterface.CompilePlayerScripts` interface provided by Unity to compile different BuildTarget
The hot update dll under. The compilation result is output to `{proj}/HybridCLRData/HotUpdateDlls/{target}` directory.

Run the menu `HybridCLR/Compile/xxx` command to directly compile the hot update dll. Running `HybridCLR/Generate/All` will also implicitly compile the latest hotupdate assemblies. After calling this command, you can directly copy the hot update dll without running `HybridCLR/Compile/xxx` again.
Since the interface does not distinguish between AOT and hot update when compiling, the project is compiled as a whole, and developers only need to add the output hot update dll to the resource management system of the project.

The `HybridCLR.Editor` assembly of com.code-philosophy.hybridclr provides the `HybridCLR.Editor.Commands.CompileDllCommand.CompileDll(BuildTarget target)` interface,
It is convenient for developers to compile hot update dll by themselves flexibly.

After releasing the main package, you only need to simply use the `HybridCLR/Compile/xxx` command to recompile the hot update dll, and then release the hot update dll, without running the `HybridCLR/Generate/xxx` command.
