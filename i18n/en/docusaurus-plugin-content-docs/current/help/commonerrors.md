# Common Errors

The currently submitted version has been tested, and it is basically impossible to have compilation errors, crashes or basic running errors. If you haven't solved the problem after viewing the common errors, please update com.code-philosophy.hybridclr, hybridclr, il2cpp_plus to the latest version and try again.
If you still can't solve the problem, you can join the following groups:

- Novice group 1: 428404198 (full)
- Novice group 2: **680274677 (recommended)**

## Errors under Unity Editor

### Click `HybridCLR/Setting`, failed to find the HybridCLR setting interface

Just delete the `ProjectSettings/HybridCLRSettings.asset` file. If it still doesn't show up, restart the Unity Editor.

### Installer clicks to install and appears: git is not recognized as an internal or external command, nor is it a runnable program

The most common reason is that git is not installed ([GitForWindows](https://gitforwindows.org/) is installed under Windows. For other platforms, please install it yourself), or UnityEditor and UnityHub have not been restarted after installing git. If you are sure that git is installed and git can indeed be run in cmd, try restarting the computer.

### DirectoryNotFoundException: Counld not find a part of the path 'xxx' when installing using Installer

There are several reasons:

- If the error directory does not exist, the git clone hybridclr or il2cpp_plus warehouse failed due to network or various reasons. At this point you can retry several times.
- If the error directory exists, it is caused by the path length exceeding 256 characters. Please avoid very deep directories.

### Exception. region:UNITY_CONFIG start not found

hybridclr_unity version is too low. Please upgrade to the latest version.


### Exception. region: PLACE_HOLDER start not found

com.code-philosophy.hybridclr is a newer version, but the hybridclr code is too old.

It is required that your hybridclr and il2cpp_plus must be the main branch and be updated to the latest.

### Exception. region: XXXXXX start not find

Com.code-philosophy.hybridclr and hybridclr and il2cpp_plus versions do not match.

Requires the same version branch, and updated to the latest version at the same time (or matching version, but most people have a hard time knowing which is the matching version).

### `Exception: resolve assembly: yyyAssembly fail` when running `HybridCLR/generate/xxx`

If yyyAssembly is `netstandard`, you need to switch the Api Compatible Level in Build Settings to .Net 4.x or .Net Framework.

Otherwise, it is because this generation depends on the trimmed aot dll, and the aot dll has not been generated at this time. There are several reasons for this result:

- You have never used the code related to the dll in the main project, so even if it is retained in the link.xml, it is still completely clipped. The solution is to randomly write a piece of code in the main project to reference a certain class or function in the dll.
- other reasons. The universal solution is to manually build a project to generate aot dll.

### A `NullReferenceException.HybridCLR.Editor.ABI.TypeCreatorBase.CreateTypeInfo...` occurred while running `HybridCLR/generate/xxx`

If your com.code-philosophy.hybridclr package version is lower than 1.1.6, it is because there are mscorlib.dll, System.Memory.dll, UnityEngine.dll and other conflicting dlls with the same name as the system dll in your project, resulting in parsing dlls were read incorrectly and errors occurred.

If the version >= 1.1.6, because the generated bridge function needs to rely on the cut AOT dll, and your AOT dll is old, the types that the hot update code depends on are missing in the AOT dll due to unloading. So you need to `generate/linkxml` first, then build or export the project to generate the trimmed aot dll, and then run your current `generate/xxx` command.

### `DHE start not found` occurs when running `HybridCLR/generate/xxx`

The main branch has removed the DHE-related code, and the corresponding package version 1.1.6 has also removed the DHE-related generation. This error is caused by the fact that your package version is lower than 1.1.6, but you have installed the latest `hybridclr+il2cpp_plus` code.

The solution is to upgrade the package to version 1.1.6 and above. Or roll back the package to the version of the 1.0 branch, and install the `hybridclr+il2cpp_plus` code related to the 1.0 branch.

### The AssembliesPostIl2CppStrip directory was not generated when packaging the iOS version

Upgrade com.code-philosophy.hybridclr version to v2.0.0 or above.

### BuildFailedException: Build path contains a project previously built without the "Create Visual Studio Solution"

When running `generate/all` or `generate/AOTDlls`, it will try to export the project to get the trimmed aot dll. If the `Create Visual Studio Solution` option was turned off when your project was packaged before, this error will occur with a certain probability due to the Unity Editor itself.

The solution is to clear the il2cpp related cache directories under Library and Temp, or simply delete these two directories.

If you still encounter this problem, you can manually build a project to generate aot dll, and then skip the `generate/AOTDlls` step.


## An error occurred while packaging

### Currently selected scripting backend (IL2CPP) is not installed

Please install the il2cpp module in Unity Hub. The mode of operation is:

- Switch to the Installers tab on the left side of UnityHub
- On the version of Unity you are currently using `Right-click -> Add Modules`, select the IL2CPP component of the current platform, for example, select `Windows Build Support(Il2CPP)` for the Win platform
- Install
- Reopen the Unity Editor

### `Exception: C++ code builder is unable to build C+ code. In order to build C++ code for Windows Destop, You must have one of these installed. xxxxx

You don't have vs and win 10 sdk installed. Please install vs, and install the `game development using c++` component in the Visual Studio Installer. Just choose the latest win 10 sdk.


### encountered Undefined symbols for architecture arm64: "_objc_msgSend$initWithName:", referenced from: il2cpp::os::TimeZoneInfo::GetTimeZoneDataForID

The xcode version is too old. Update to a newer version.

### Undefined symbols appear when packaging iOS: RuntimeApi_LoadMetadataForAOTAssembly or hybridclrApi_LoadMetadataForAOTAssembly

Because you are using original libil2cpp.a. Please compile the latest one according to [build iOS libil2cpp.a](../basic/buildpipeline.md) document. Then replace the libil2cpp.a file in the xcode project

### Building Library/Bee/artifacts/xxxx failed with output: Fatalerror in Unitiy CIL Linker Mono.Cecil.AssemblyResolutionException: Failed to resolve assembly:'xxx'

You mistakenly referenced the 'xxx' hot update dll in the main project. If you can't find where it is referenced, you can try to delete the hot update module 'xxx' first, and locate it according to the compilation error.

### Errors such as undefine symbol: send file encountered when packaging the WebGL platform

This error has nothing to do with HybridCLR. This is because WebGL has restrictions on many functions. For example, the send file symbol is lost because IO-related functions cannot be called. If you encounter problems, please eliminate those functions that the WebGL platform does not support. Specifically read the Unity documentation yourself.

### Encountered `xxxx\\il2cpp\\libil2cpp\\utils\\Il2CppHashMap.h(71): error C2039: 'hash_compare': is not a member of 'stdext' when packaging under Win`

This is caused by the latest version vs changes breaking some backward compatibility after the release of .net 7. The com.code-philosophy.hybridclr `v2.4.0` version has completely solved this problem. You can upgrade to this version or fall back to an older version of visual studio 2022 or use something like 2019.

A solution that does not need to roll back the vs version is to modify `HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external/google/sparsehash/internal/sparseconfig.h` and add `#define _SILENCE_STDEXT_HASH_DEPRECATION_WARNINGS`. Refer to the figure below for modification.

![stdext_error](/img/hybridclr/stdext_error.jpg)

For other solutions, see [Link](https://forum.unity.com/threads/workaround-for-building-with-il2cpp-with-visual-studio-2022-17-4.1355570/)

### fatal error: 'icalls/mscorlib/System/MonoType.h' file not found #include "icalls/mscorlib/System/MonoType.h"

You did not generate the correct version macro, please run `HybridCLR/Generate/All` before packaging.

### Internal build system error. BuildProgram exited with code -2147024894.


```text
Internal build system error. BuildProgram exited with code -2147024894.
System.IO.FileNotFoundException: Could not load file or assembly 'Unity.IL2CPP.Bee.BuildLogic.WindowsDesktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'.
File name: 'Unity.IL2CPP.Bee.BuildLogic.WindowsDesktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'
```

This is because you switched the version of the Unity project after installation in the Installer, resulting in a mismatch in the Build Tool. The solution is to reinstall once in `HybridCLR/Installer...`.

### A DirectoryNotFoundException: xxxx\Library\Bee\artifacts\yyyy\ManagedStripted error occurred when packaging

You incorrectly set Scripting BackEngine to mono. Sometimes even though you have switched to il2cpp before, you may still be reset to mono by the Editor when you switch platforms. The solution is to switch to il2cpp.

### A DirectoryNotFoundException: xxx\HybridCLRData\LocalIl2CppData-{yyy}\il2cpp\il2cpp-deps error occurred when packaging the WebGL platform

WebGL must be installed globally, that is, useGlobal in HybridCLRSettings is true. Remember to re-install `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` after each `Generate/xxx`
The directory is copied to the Editor installation directory, and then packaged. Otherwise, errors such as Scripting Missing or missing bridge functions may occur.

### The GC_set_mark_stck_empty function cannot be found or the signature does not match the error when packaging

This is a problem caused by modifying the signature of this function since Unity2021.3.20. Update to com.code-philosophy.hybridclr version 2.0.10+, and reinstall to solve the problem.

### Packaging WebGL platform appears `build.js: undefined symbol: RuntimeApi_LoadMetadataForAOTAssembly (referenced by top-level compiled C/C++ code)`

WebGL uses global installation, you did not replace the original libil2cpp in the Editor installation directory with the local `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`, resulting in missing functions. The solution is:
- Run `HybridCLR/Generate/Il2cppDef` to generate the correct version macro
- Copy `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` to replace the original libil2cpp in the Editor installation directory. Note that it must be a replacement directory, not a merged directory, which may cause compilation errors due to some more files.
You can also use the method of creating soft links. For details, please refer to the documentation on global installation in [Install HybridCLR](../basic/install.md).

### An error occurred when clicking `Generate/All` on the packaging WebGL platform

There are two reasons:
- did not replace libil2cpp in the global installation location or create its soft link
- You have used com.code-philosophy.hybridclr 2.1.0 or higher, and did not run `HybridCLR/Generate/Il2cppDef` before replacing the global libil2cpp, resulting in incorrectly generated version macros, which in turn caused compilation errors.

### Packaging appears `#error: "not support unity version"`

There are several reasons:
- You are using a version lower than 2019 or higher than 2021, which are currently not supported
- You did not run `HybridCLR/Generate/All` or `HybridCLR/Generate/Il2CppDef` before packaging, resulting in Unity version macros not being generated

### When packaging, 'could not find a part of path "xxxx/hybridclr/generated/UnityVersion.h"

You did not re-install after updating the com.code-philosophy.hybridclr package, resulting in the local lil2cpp directory code being too old.

### "Undefined symbols for architecture arm64: "il2cpp::utils::Debugger::xxxxx" found in the package

The reason is that the libil2cpp.a packaged by build_libil2cpp.sh is in release mode, and compilation errors will occur when compiling with projects in development mode.

The solution is to remove the development build option, or modify build_libil2cpp.sh by yourself, and package libil2cpp.a in debug mode

### A compilation error occurs during packaging, and the general solution

To a large extent, it is caused by the mismatch between your package and hybridclr c++ code version or your Unity version is too new, and hybridclr does not support it yet. you need to:

- Update com.code-philosophy.hybridclr to the latest version
- Install the latest version in `HybridCLR/installer...`
- `HybridCLR/generate/all` generates all
- Pack


## Runtime errors

### EntryPointNotFoundException. Unable to find entry point named 'RuntimeApi_LoadMetadataForAOTAAssembly' in 'GameAssembly`

Your current scripting backend is mono, please switch to il2cpp.

### A scripted object (probably XXX?) has a different serialization layout when loading. Did you #ifdef UNITY_EDITOR a section of your serialized properties in any of your scripts?

The hot update script is referenced in the AOT resource of the main project, which will cause this error. For example, resources under Resources refer to hot update scripts.

### The script mounted on the resource has a Script Missing error

There are several reasons:

- If it is an iOS platform, it may be because you did not `Generate/all` and recompile and replace the libil2cpp.a file after the hot update dll list changes.
- If you use Unity 2021 and above, and WebGL platform, com.code-philosophy.hybridclr version >= 2.0.9 is required
- For other versions and platforms, due to the implementation mechanism of Unity's resource management, resources must be packaged as AssetBundles to restore the hot update script normally, and it is not possible to put them under Resource. See [MonoBehaviour workflow](../basic/monobehaviour.md) for details.
- If you installed the latest main branch of hybridclr, it requires com.code-philosophy.hybridclr package version >= 1.1.17
- The corresponding hot update assembly has not been loaded when loading resources

### Encountered "This icall is not supported by il2cpp at System.AppDomain.Load"

there are two reasons

1. If the platform is not ios, it is because HybridCLR is not installed. Please refer to [Install HybridCLR](../basic/install.md) document.
2. If the ios platform, because the ios platform does not compile libil2cpp from the source code, but uses the pre-compiled libil2cpp.a, you need to replace the libil2cpp.a in the xcode project with the compiled version of HybridCLR. See [build libil2cpp.a for iOS](../basic/buildpipeline.md) for compilation method


### unsupported internal call for il2cpp.xxxx

A function that exists in Mono but is not implemented in il2cpp is called. Please modify the code and do not use these classes and functions.

### Encountered the problem of inconsistency between Async calling Editor and packaging

If the code throws an exception in async and does not catch the exception, it will cause a silent failure. At present, in case of an error in async due to clipping or aot generics, there will be no error prompt. This results in inconsistent behavior.

Solution: catch async exceptions, and then resolve the corresponding exceptions.

### Encountered Unity: TypeLoadException: Could not load type 'XxxType' from assembly 'yyyAssembly'

How many cases:

#### Case 1: yyyAssembly is netstandard

This is because `api compatible level` in your Player Settings is set to .net standard.

Currently supports .net standard 2.0 and .net 4.x, but even if the main project is packaged with .net standard, hot update dll must be packaged with .net 4.x**. The reason is that when Unity uses .net standard to package, it will automatically strip the dependencies of .net standard and directly depend on the final dll, resulting in the fact that the dll of net standard does not exist in the dll list of the main project, which in turn causes the hot update dll to load. Object from netstandard could not be found.

The solution is to use .net 4.x for packaging and compiling hot updates, or use .net standard 2.0 for packaging, but switch the api compatible level to .net 4.x when compiling the hot update part (renamed to .net framework from 2021).

#### Case 2: yyyAssembly is other AOT assembly

This is the function loss caused by unity code clipping, you can use the conventional way to avoid unity code clipping.

According to the Unity anti-clipping principle, you can add a reference to the missing code class in link.xml, but this kind of thing is time-consuming and laborious.

HybridCLR provides a quick automatic generation tool, run the menu command `HybridCLR/Genrate/LinkXml` to generate link.xml according to the hot update dll.

:::tip
If you find that this class is indeed preserved in the link.xml, but this type of missing error still occurs, it is caused by Unity itself. Unity requires that any class in the dll must be referenced in the code before the dll will be retained, and the configurations in the link will take effect. Therefore, you need to manually reference any class in the dll where the missing class is located in the code.
:::

#### Case 3: yyyAssembly is hot update assembly

This is becauseYou are not loading hot update dlls in dependency order. For example, if A depends on B, then you should load B first, then A.

### Encountered MissingMethodException xxx error

Two cases are distinguished:

#### Case 1: MissingMethodException: AOT generic method isn't instantiated in aot module xxx

There are several reasons:

- This is caused by the lack of instantiation of AOT generic functions
- Using Unity 2021 and the `Il2Cpp Code Generation` option is `faster runtime`, resulting in the generated code being fully generic mode, and all generic function signatures are changed. If there is no supplementary metadata, this error will still occur when calling a generic function that has been instantiated in AOT.
- WeChat mini game conversion tool, by default, IL2CPP Code Generation will be set to Faster(Smaller) builds mode, if metadata is not supplemented, AOT generic functions will not be accessible.

The solution to cause 1 is:

- The error log tells you which AOT function instantiation is missing, and you add a call to this function in the main project, so that il2cpp can generate the code of this generic function when packaging. You can add this generic AOT function call anywhere in the main project. Currently, it is generally added to the RefTypes.cs file.
- Use of complementary metadata techniques

The solution to reason 2 is:

- Use of complementary metadata techniques

Solution for reason 3:

- Use of complementary metadata techniques
- Modify the source code of WeChat tools by yourself, and set `IL2CPP Code Generation` in BuildSettings to `Faster`.


For specific operations, please refer to [AOT Generic Principles Introduction](../basic/aotgeneric.md) document.


#### Situation 2: The word AOT generic method does not appear in the error log

This is the function loss caused by unity code clipping. Run the menu command `HybridCLR/Genrate/LinkXml` to generate link.xml according to the hot update dll. At the same time, make sure that the referenced AOT assembly is referenced in the main project code, otherwise linkxml will not take effect.

### encountered 'ExecutionEngineException: Image::ReadTypeFromResolutionScope ReadTypeFromResolutionScope.TYPEREF fail'

Caused by clipping, which clips the inner class of the class. The processing method is the same as above.

### Encountered ExecutionEngineException: metadata type not match

Supplementary metadata uses a mismatched cropped AOT version, which should be generated using this package, or loaded using the `HomologousImageMode::SuperSet` mode.

### encountered ExecutionEngineException: not support extern method: xxxx

There are two reasons:

- The extern function is defined in the hot update, which is not supported for now. The solution is to move the extern function to the AOT section.
- The SuperSet metadata format is used, but the supplementary metadata aot dll is too old, so the generics in AOT cannot be found in the supplementary metadata dll. The solution is to update the latest AOT dll.

### encountered ExecutionEngineException: method body is null. xxx::yyyy

The reason is the same as above.

### Encountered ExecutionEngineException: GetManaged2NativeMethodPointer not support. xxxx function name

Missing bridge function for interpreter -> aot direction. Please make sure your hybridclr is the latest code, com.code-philosophy.hybridclr package is also the latest version,
And the latest bridge function has been generated. Please refer to [bridge function](../basic/methodbridge.md) for the principle.

If it is an iOS platform, it is likely that you have not generated the latest libil2cpp.a.

If there are still problems, please feedback to the administrator technical support in the group.

### encountered 'ExecutionEngineException: NotSupportNative2Managed'

Missing bridge function for aot -> interpreter direction. Please make sure your hybridclr is the latest code, com.code-philosophy.hybridclr package is also the latest version,
And the latest bridge function has been generated. Please refer to [bridge function](../basic/methodbridge.md) for the principle.

If there are still problems, please feedback to the administrator technical support in the group.

### ExecutionEngineException: Attempting to call method 'xxxx' for which no ahead of time (AOT) code was generated.

Just add metadata to the dll where the error function is located.


### GetReversePInvokeWrapper fail. exceed max wrapper num of method

Wrapper functions are insufficient. You need to reserve a Wrapper function for the function that adds the MonoPInvokeCallback feature in the hot update. For details, see [MonoPInvokeCallback Support](../basic/workwithscriptlanguage.md)

### When using addressable for hot update, UnityEngine.AddressableAssets.InvlidKeyException: Exception of type 'UnityEngine.AddressableAssets.InvalidKeyException' was thrown. No Asset found with for key 'xxxx' exception occurred when loading resources

The reason is that when addressable is loaded by default, all types in the resource will be initialized, but at this time the hot update dll has not been loaded, and the corresponding hot update type cannot be found.

There are several solutions:
- Use the `LoadAsset<System.Object>` interface to load and then force forward
- It is to turn off automatic loading, then manually load the hot update dll, and then automatically load resources. See the content from 1:02:30 onwards in the video [Treading the Pit: Importing HybridCLR into your own project and implementing hot updates] (https://www.bilibili.com/video/BV1aP4y1o7xi/).

### GameObject.GetComponent(string name) interface cannot get component

This is a known bug, which is related to the code implementation of unity. This problem occurs only when the hot update script is mounted on the hot update resource. The hot update script added through AddComponent in the code can be found by this method. Please use `GameObject.GetComponent<T>()` or `GameObject.GetComponent(typeof(T))` instead

### Using MemoryProfile to grab memory snapshots will crash

If you use Unity 2021 or higher, just upgrade the hybridclr package to `v3.0.2` or higher. If using Unity 2019 or 2020, the record will be submitted
[Fix the crash bug when using Momery Profiler to create a snapshot](https://github.com/focus-creative-games/hybridclr/commit/062bfa99c71a53a6cb35fc89a52d67bbff2bb2d0) The changes can be merged into your current version.

### Profiler's BeginSample and EndSample cannot take effect

Because functions such as BeginSample have [Condition] compilation annotations, when compiling the dll in Release mode, these codes will be automatically removed, causing the Profile to become invalid. The solution is to compile the hot update dll in the Developemnt mode, the code is as follows.
If you use `v3.0.2` and above, the `HybridCLR/CompileDll/ActivedBuildTarget_Development` menu command has been shipped with it.

```csharp
     var group = BuildPipeline. GetBuildTargetGroup(target);

     ScriptCompilationSettings scriptCompilationSettings = new ScriptCompilationSettings();
     scriptCompilationSettings.group = group;
     scriptCompilationSettings. target = target;
     if (developmentBuild)
     {
         // The core is this line, so that the dll is compiled in Debug mode, and function calls such as Profiler.BeginSample are reserved.
         scriptCompilationSettings.options |= ScriptCompilationOptions.DevelopmentBuild;
     }
     Directory.CreateDirectory(buildDir);
     ScriptCompilationResult scriptCompilationResult = PlayerBuildInterface. CompilePlayerScripts(scriptCompilationSettings, buildDir);
```

### The NotSupportNative2Managed bridge function is missing exception after using Unity.netcode.runtime

The reason is that NetworkManager.RpcReceiveHandler is internal in Unity.netcode.runtime.dll, defined as follows

```csharp
internal delegate void RpcReceiveHandler(NetworkBehaviour behavior, FastBufferReader reader, __RpcParams parameters);
```

Causes the build tool to not generate a bridge function for it. But Unity is very tricky to generate RpcReceiveHandler for functions marked `[ClientRpc]` and `[ServerRpc]` when packaging
Handling function, and referenced the internal RpcReceiveHandler class! No error was reported. This leads to the problem that the bridge function is missing.


The original code is as follows.

```csharp

public class NetworkPlayer : NetworkBehaviour
{

     public static string msgFromHost;
     public static string msgFromClient;


     [ClientRpc]
     public void SendMsgClientRpc(string msgFromHost)
     {
         NetworkPlayer.msgFromHost = msgFromHost;
     }


     [ServerRpc]
     public void SendMsgServerRpc(string msgFromClient)
     {
         NetworkPlayer.msgFromClient = msgFromClient;
     }
}

```


Several functions are added to the code generated during packaging, as follows.

```csharp
public class NetworkPlayer : NetworkBehaviour
{
     public static string msgFromHost;

     public static string msgFromClient;

     [ClientRpc]
     public void SendMsgClientRpc(string msgFromHost)
     {
         //...
     }

     [ServerRpc]
     public void SendMsgServerRpc(string msgFromClient)
     {
         //...
     }

     static NetworkPlayer()
     {
       // NetworkManager.__rpc_func_table is not accessible in your own code! because it is internal
       NetworkManager.__rpc_func_table.Add(3066788814u, __rpc_handler_3066788814);
       NetworkManager.__rpc_func_table.Add(901396020u, __rpc_handler_901396020);
     }

     private static void __rpc_handler_3066788814(NetworkBehaviour target, FastBufferReader reader, __RpcParams rpcParams)
     {
         //...
     }

     private static void __rpc_handler_901396020(NetworkBehaviour target, FastBufferReader reader, __RpcParams rpcParams)
     {
         //...
     }

     internal override string __getTypeName()
     {
         return "NetworkPlayer";
     }
}

```

The solution is that you also define a delegate with the same signature in the AOT project.

```csharp
     // Since __RpcParams is also internal, we redefine the same type here
     public struct __RpcParams
#pragma warning restore IDE1006 // restore naming rule violation check
     {
         public ServerRpcParams Server;
         public ClientRpcParams Client;
     }

     public delegate void MyRpcReceiveHandler(NetworkBehaviour behavior, FastBufferReader reader, __RpcParams parameters);

```