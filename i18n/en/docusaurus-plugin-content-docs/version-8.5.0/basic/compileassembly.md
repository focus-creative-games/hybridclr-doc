
# Compiling Hot Update Assemblies

Hot update code may contain macro switches like `#if UNITY_EDITOR` and `#if UNITY_STANDALONE_WIN`, so each platform needs to compile hot update assemblies separately.

The assemblies in the `Library/ScriptAssemblies` directory are compilation results when BuildTarget is Editor, and are affected by the `Debugger Enable` option, so they cannot be used as hot update assemblies. We use Unity's `UnityEditor.Build.Player.PlayerBuildInterface.CompilePlayerScripts` interface to compile hot update dlls for different BuildTargets. The compilation results are output to the `{proj}/HybridCLRData/HotUpdateDlls/{target}` directory.

Run the menu `HybridCLR/Compile/xxx` command to directly compile hot update dlls. When running `HybridCLR/Generate/All`, it also implicitly compiles the latest hot update assemblies. After calling this command, you can directly copy the hot update dlls without running `HybridCLR/Compile/xxx` again.
Since this interface doesn't distinguish between AOT and hot update during compilation and compiles the entire project, developers only need to add the output hot update dlls to the project's resource management system.

The `HybridCLR.Editor` assembly in com.code-philosophy.hybridclr provides the `HybridCLR.Editor.Commands.CompileDllCommand.CompileDll(BuildTarget target)` interface,
making it convenient for developers to flexibly compile hot update dlls themselves.

After releasing the main package, each hot update only requires simply using the `HybridCLR/Compile/xxx` command to recompile hot update dlls and then release the hot update dlls. There's no need to run `HybridCLR/Generate/xxx` commands.

