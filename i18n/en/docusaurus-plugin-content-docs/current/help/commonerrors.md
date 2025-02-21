# Common mistakes

The versions submitted so far have been tested, and it is basically impossible to have compilation errors, crashes or basic running errors. If you have checked common errors and still cannot solve the problem, please update com.code-philosophy.hybridclr, hybridclr, and il2cpp_plus to the latest versions and try again.
If the problem is still not solved, you can join the following groups:

- Novice group 1: 428404198 (full)
- Newbie Group 2: **680274677 (recommended)**

## Error under Unity Editor

### When installing com.code-philosophy.hybridclr in Package Manager, an error occurs that the package name does not match com.focus-creative-games.hybridclr_unity

Starting from version 3.0.0, com.focus-creative-games.hybridclr_unity has been renamed com.code-philosophy.hybridclr, so this error will occur when directly upgrading and installing.

Solution: Remove the old version of com.focus-creative-games.hybridclr_unity first, and then reinstall the latest version.

### Click `HybridCLR/Setting`, unable to find the HybridCLR setting interface

Just delete the `ProjectSettings/HybridCLRSettings.asset` file. If it is still not displayed, restart the Unity Editor.

### `Win32Exception:ApplicationName='git', xxxx, Native erro=The system cannot find the specified file when installing in Installer. ` Error

Because git is not installed (install [GitForWindows](https://gitforwindows.org/) under Windows. Please install it at your own discretion for other platforms), or UnityEditor and UnityHub are not restarted after installing git. If you are sure that git is installed and git can indeed be run in cmd, try restarting the computer.

### Installer clicks to install and appears: git is not an internal or external command, nor is it an operable program.

Same as above.

### DirectoryNotFoundException: Counld not find a part of the path 'xxx' occurred when installing using Installer

There are several reasons:

- If the error directory does not exist, git clone hybridclr or il2cpp_plus warehouse failed due to network or various reasons. At this point you can try again several times.
- If the error directory exists, it is caused by the path length exceeding 256 characters. Please avoid directories that are too deep.

### When installing using Installer, it prompts Mono.CompilerServices.SymbolWriter.dll path is too long. copy ignore!

MonoBleedingEdge will be copied to HybridCLrData in the installer, but the lib\mono directory in this directory is not actually used, so it has no impact.

### Exception. region:UNITY_CONFIG start not find

The hybridclr_unity version is too low. Please upgrade to the latest version.

### Exception. region:PLACE_HOLDER start not find

com.code-philosophy.hybridclr is a newer version, but the hybridclr code is too old.

It is required that your hybridclr and il2cpp_plus must be the main branch and updated to the latest.

### Exception. region:XXXXXX start not find

Caused by mismatch between com.code-philosophy.hybridclr and hybridclr and il2cpp_plus versions.

It is required that the same version branch be updated to the latest version at the same time (or a matching version, but it is difficult for most people to know which is the matching version).

### `Exception: resolve assembly: yyyAssembly fail` occurred when running `HybridCLR/generate/xxx`

If yyyAssembly is `netstandard`, because there is an assembly in the project that references .net standard, there are several ways to cause this error:

-Api Compatible Level is .net standard. The solution is to cut it into .Net 4.x or .Net Framework
- You use a precompiled dll in your project, which references the .net standard. The solution is to replace this dll with a version that references .net framework

Otherwise, it is because the dependent AOT or hot update dll was not found. There are several reasons for this:

- If the hot update dll placed in the project in the form of dll is not found, you need to add the directory where it is located in the external dll search path of HybridCLRSettings.
- You have never used the code related to this dll in the main project, so even if it is retained in link.xml, it is still completely cropped. The solution is to write a piece of code in the main project to reference a certain class or function in the dll.

### `NullReferenceException. HybridCLR.Editor.ABI.TypeCreatorBase.CreateTypeInfo ...` occurred when running `HybridCLR/generate/xxx`

If your com.code-philosophy.hybridclr package version is lower than 1.1.6, there are mscorlib.dll, System.Memory.dll, UnityEngine.dll and other conflicting dlls with the same name as the system dll in your project, resulting in resolution dll, these dlls were read incorrectly, and an error occurred.

If the version is >= 1.1.6, since the generated bridge function needs to rely on the reduced AOT dll, and your AOT dll is old, the dependent types in the hot update code will be missing in the AOT dll due to uninstallation. Therefore, you need to `generate/linkxml` first, then build or export the project to generate the trimmed aot dll, and then run your current `generate/xxx` command.

### The AssembliesPostIl2CppStrip directory was not generated when packaging the iOS version

Upgrade the com.code-philosophy.hybridclr version to v2.0.0 or above.

### BuildFailedExceptoin: Build path contains a project previously built without the "Create Visual Studio Solution"

When running `generate/all` or `generate/AOTDlls`, an attempt will be made to export the project to obtain the trimmed aot dll. If the `Create Visual Studio Solution` option was turned off when packaging your project before, this error may occur with a certain probability due to the Unity Editor itself.

The solution is to clear the il2cpp related cache directories under Library and Temp, or simply delete these two directories.

If you still encounter this problem, you can manually build the project to generate aot dll, and then skip the `generate/AOTDlls` step.


## An error occurred while packaging

### Currently selected scripting backend (IL2CPP) is not installed

Please install the il2cpp module in Unity Hub. The operation method is:

- Switch to the Installers tab on the left side of UnityHub
- On the Unity version you are currently using, `right-click -> Add Modules` and select the IL2CPP component of the current platform. For example, on the Win platform, select `Windows Build Support(Il2CPP)`
- Install
- Reopen Unity Editor

### `Exception: C++ code bulider is unable to build C+ code. Inorder to build C++ code for Windows Destop, You must have one of these installed. xxxxx

You have not installed vs and win 10 sdk. Please install vs and install the `Game development using c++` component in the Visual Studio Installer. Just choose the latest win 10 sdk.


### Encountered Undefined symbols for architecture arm64: "_objc_msgSend$initWithName:", referenced from: il2cpp::os::TimeZoneInfo::GetTimeZoneDataForID

The xcode version is too old. Update to newer version.

### Undefined symbols appear in packaging: RuntimeApi_LoadMetadataForAOTAssembly or hybridclrApi_LoadMetadataForAOTAssembly

The fundamental reason is that you are using the original libil2cpp code. There are several situations that can lead to this result:

- Scripting Backend incorrectly selected Mono
- The `global installation` option is turned on, but the libil2cpp in the Editor installation directory is not correctly replaced.
- The version of com.code-philosophy.hybridclr is lower than v3.1.0, and the libil2cpp.a file of the xcode project has not been replaced. Please compile the latest one according to [build iOS libil2cpp.a](/basic/buildpipeline.md) document. Then replace the libil2cpp.a file in the xcode project

### Building Library/Bee/artifacts/xxxx failed with output: Fatalerror in Unitiy CIL Linker Mono.Cecil.AssemblyResolutionException: Failed to resolve assembly:'xxx'

You mistakenly referenced the hot update dll 'xxx' in the main project. If you can't find where it is referenced, you can try to delete the 'xxx' hot update module first and locate it based on the compilation error.

### When packaging the WebGL platform, errors such as undefine symbol: send file are encountered.

This error has nothing to do with HybridCLR. This is because WebGL has restrictions on many functions. For example, the send file symbol is lost because IO related functions cannot be called. If you encounter problems, please eliminate those functions that are not supported by the WebGL platform. Read the Unity documentation yourself for details.

### When packaging under Win, `xxxx\\il2cpp\\libil2cpp\\utils\\Il2CppHashMap.h(71): error C2039: 'hash_compare': is not a member of 'stdext'`

This is caused by the latest version vs changes after the release of .net 7 which breaks some backward compatibility. The com.code-philosophy.hybridclr `v2.4.0` version has completely solved this problem. You can upgrade to this version or roll back to an older version of visual studio 2022 or use a version like 2019.

A solution that does not require rolling back the VS version is to modify `HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external/google/sparsehash/internal/sparseconfig.h` and add `#define _SILENCE_STDEXT_HASH_DEPRECATION_WARNINGS`. Can refer toModified image below.

![stdext_error](/img/hybridclr/stdext_error.jpg)

For other solutions, see [link](https://forum.unity.com/threads/workaround-for-building-with-il2cpp-with-visual-studio-2022-17-4.1355570/)

### fatal error: 'icalls/mscorlib/System/MonoType.h' file not found #include "icalls/mscorlib/System/MonoType.h"

You did not generate the correct version macro, please run `HybridCLR/Generate/All` before packaging.

### Internal build system error. BuildProgram exited with code -2147024894.


```text
Internal build system error. BuildProgram exited with code -2147024894.
System.IO.FileNotFoundException: Could not load file or assembly 'Unity.IL2CPP.Bee.BuildLogic.WindowsDesktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'.
File name: 'Unity.IL2CPP.Bee.BuildLogic.WindowsDesktop, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null'
```

This is because you switched the version of the Unity project after installation in the Installer, resulting in a mismatch in the Build Tool. The solution is to reinstall it in `HybridCLR/Installer...`.

### DirectoryNotFoundException: xxxx\Library\Bee\artifacts\yyyy\ManagedStripted error occurred during packaging

This is caused by you mistakenly setting the Scripting BackEngine to mono. Sometimes, even though you have switched to il2cpp before, the Editor may still be reset to mono when switching platforms. The solution is to switch to il2cpp.

### DirectoryNotFoundException: xxx\HybridCLRData\LocalIl2CppData-{yyy}\il2cpp\il2cpp-deps error occurs when packaging WebGL platform

WebGL must be installed globally, that is, useGlobal is true in HybridCLRSettings. Remember that you must re-generate `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` after each `Generate/xxx`
Copy the directory to the Editor installation directory and then package it. Otherwise, errors such as Scripting Missing or missing bridge functions may occur.

### When packaging, an error occurs that the GC_set_mark_stck_empty function cannot be found or the signature does not match.

This is a problem caused by the modification of this function signature since Unity2021.3.20. Update to com.code-philosophy.hybridclr 2.0.10+ version and reinstall to solve the problem.

### `build.js: undefined symbol: RuntimeApi_LoadMetadataForAOTAssembly (referenced by top-level compiled C/C++ code)` appears when packaging WebGL platform

WebGL uses global installation. You did not replace the local `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` with the original libil2cpp in the Editor installation directory, resulting in missing functions. The solution is:
- Run `HybridCLR/Generate/Il2cppDef` to generate the correct version macro
- Copy `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` to replace the original libil2cpp in the Editor installation directory. Note that the directory must be replaced instead of merging directories. This may cause compilation errors due to more files.
You can also use the method of creating soft links. For details, please see the documentation on global installation in [Install HybridCLR] (/basic/install.md).

### An error occurred when clicking `Generate/All` when packaging the WebGL platform

There are two reasons:
- Did not replace libil2cpp in the global installation location or create its soft link
- You used com.code-philosophy.hybridclr 2.1.0 or higher and did not run `HybridCLR/Generate/Il2cppDef` before replacing the global libil2cpp. As a result, the version macro was not generated correctly, which caused a compilation error.

### `#error: "not support unity version"` appears during packaging

There are several reasons:
- You are using a version lower than 2019 or higher than 2021. These versions are currently not supported.
- You did not run `HybridCLR/Generate/All` or `HybridCLR/Generate/Il2CppDef` before packaging, resulting in the Unity version macro not being generated.

### 'could not find a part of path "xxxx/hybridclr/generated/UnityVersion.h" appears when packaging

You updated the com.code-philosophy.hybridclr package without reinstalling it, causing the local lil2cpp directory code to be out of date.

### Found "Undefined symbols for architecture arm64: "il2cpp::utils::Debugger::xxxxx" in the package

The reason is that libil2cpp.a packaged by build_libil2cpp.sh is in release mode, and compilation errors will occur when compiled together with development mode projects.

The solution is to remove the development build option, or modify build_libil2cpp.sh yourself and package libil2cpp.a in debug mode

### `error: undefined reference to 'SystemNative-ConvertErrorPalToPlatform'` appears when packaging

The Unity version you are using is relatively high, and libil2cpp has added some new functions. The version of hybridclr you are using is too low and does not contain these high-version functions.

Solution: Upgrade the hybridclr version and reinstall it.

### `BuildFailedException: You must run `HybridCLR/Installer` after upgrading package` occurs during packaging

Install was not executed after upgrading the package. Just install it in `HybridCLR/Installer`.

### Compilation errors related to IL2CPP_POP_ACTIVE_EXCEPTION occur

Since versions 2021.3.31 and 2022.3.11, the macro definition has been modified, resulting in compilation errors on older versions of hybridclr. The solution is to upgrade to the latest hybridclr version.

###  `error: no matching function for call to 'il2cpp_codegen_get_marshal_directive_exception'`

Because the com.code-philosophy.hybridclr package version is too old that doesn't support your current unity version. The solution is to upgrade to the latest hybridclr version.

### Compilation errors occur during packaging, general solutions

To a large extent, it is caused by the mismatch between your package and hybridclr c++ code versions or your Unity version is too new and hybridclr is not supported yet. you need to:

- Update com.code-philosophy.hybridclr to the latest version
- Install the latest version in `HybridCLR/installer...`
- `HybridCLR/generate/all` generates all
- Pack

### Building.BuilderFailedException:In file included from xxx\HybridCLRData\LocalIl2CppData-{platform}\il2cpp when packaging

If your version is 2020.3.0-2020.3.25, after completing the installation in the Installer, copy `2020.3.x/Editor/Data/il2cpp/external` from the installation directory of any version 2020.3.26+ and replace `{project} /HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external`


## Runtime errors

### EntryPointNotFoundException. Unable to find entry point named 'RuntimeApi_LoadMetadataForAOTAssembly' in 'GameAssembly`

There are several reasons:

- Your current scripting backend is mono, please switch to il2cpp. Sometimes due to caching reasons, errors may still occur even after switching. Please clear the Libraries directory and try again.
- Global installation is enabled in HybridCLRSettings.

### A scripted object (probably XXX?) has a different serialization layout when loading. Did you #ifdef UNITY_EDITOR a section of your serialized properties in any of your scripts?

This error will occur if the hot update script is referenced in the AOT resource of the main project. For example, the resources under Resources refer to the hot update script.

### A Script Missing error occurs in the script mounted on the resource.

There are several reasons:

- If it is an iOS platform, it may be because you did not `Generate/all` and recompile and replace the libil2cpp.a file after the hot update dll list changed.
- If you use Unity 2021 and above, and the WebGL platform, you need com.code-philosophy.hybridclr version >= 2.0.9
- If it is other versions and platforms, due to the implementation mechanism of Unity's resource management, the resources must be packaged as AssetBundle to restore the hot update script normally. Putting it under Resource will not work. Please see [MonoBehaviour workflow](/basic/monobehaviour.md) for details.
- If you install the latest main branch of hybridclr, the com.code-philosophy.hybridclr package version is required >= 1.1.17
- The corresponding hot update assembly has not been loaded when loading resources.

### Encountered "This icall is not supported by il2cpp at System.AppDomain.Load"

There are two reasons

1. If the ios platform, because the ios platform does not compile libil2cpp from the source code, but uses the pre-compiled libil2cpp.a, you need to replace libil2cpp.a in the xcode project with the compiled version of HybridCLR. For the compilation method, please see [build libil2cpp.a for iOS](/basic/buildpipeline.md)
2. If it is the webgl platform, it is because the libil2cpp in the installation directory is not replaced after global installation or the soft link from the installation directory libil2cpp to the local libil2cpp of the project is not established. For details, see [Release WebGL Platform](../basic/buildwebgl)
3. For other platforms, it is because HybridCLR is not installed. Please refer to the [Install HybridCLR](/basic/install.md) document for operation.

### Physical collision Collision does not take effect in hot update

This is generally caused by the fact that the Collision script and related functions have been cut. Please ensure that related scripts and dlls are not cut.

### unsupported internal call for il2cpp. xxxx

A function that exists in Mono but is not implemented in il2cpp is called. Please modify the code and do not use these classes and functions.

### Async code (built-in with the system or UniTask, etc.) throws NullReferenceException or crashes when running after packaging.

There are several reasons:

- Exceptions are thrown in asynchronous code (such as bridge function exceptions or AOT generic instantiation exceptions), causing the asynchronous code to fail to execute correctly. The solution is to catch exceptions in asynchrony, locate the specific cause, and then solve it
- Supplementary metadata and bridging functions do not match the final release package. This problem occurs when the development option is turned on: `Generate/All` or `Generate/AOTDlls` generates non-development mode
The aot dll under the package does not match the development aot dll generated during packaging, which further leads to errors in supplementary metadata and generated bridging functions, resulting in serious errors or crashes at runtime. The solution is when packaging
Do not turn off the development option, or modify the `Generate/AOTDlls` code to add the `Development` flag to BuildOptions.

### Encountered Unity: TypeLoadException: Could not load type 'XxxType' from assembly 'yyyAssembly'

Several situations:

#### Case 1: yyyAssembly is netstandard

This is because the `api compatible level` in your Player Settings is set to .net standard.

Currently, .net standard 2.0 and .net 4.x are supported, but even if the main project is packaged with .net standard, the hot update dll must be packaged with .net 4.x**. The reason is that when Unity uses .net standard for packaging, it will automatically strip off the dependency on .net standard and directly rely on the final dll. As a result, the dll net standard does not actually exist in the dll list of the main project, which in turn causes the hot update dll to load. Object not found from netstandard.

The solution is to use .net 4.x for both packaging and compilation for hot update, or use .net standard 2.0 for packaging but switch the api compatible level to .net 4.x when compiling the hot update part (renamed .net framework from 2021).

#### Case 2: yyyAssembly is other AOT assembly

This is a function loss caused by unity code clipping. You can use the normal method to avoid unity code clipping.

According to Unity's anti-cropping principle, you can just add a reference to the missing code class in link.xml, but this is time-consuming and labor-intensive.

HybridCLR provides a quick automatic generation tool. Run the menu command `HybridCLR/Genrate/LinkXml` to generate link.xml based on the hot update dll.

:::caution
If you find that this class is indeed preserved in link.xml, but this type of missing error still occurs, this is caused by Unity itself. Unity requires that any class in the dll must be referenced in the code before the dll will be retained and the configurations in the link will take effect. Therefore, you need to manually reference any class in the dll where the missing class is located in the code.
:::

#### Case 3: yyyAssembly is a hot update assembly

This is because you did not load the hot update dll in dependency order. For example, if A depends on B, you should load B first, then A.

### MissingMethodException: HybridCLR.RuntimeApi::LoadMetadataForAOTAssembly(System.Byte[],HybridCLR.HomologousImageMode) error

After upgrading hybridclr, it was not reinstalled. Starting from v4.0.8, the extern function defined in RuntimeApi has been changed from PInvoke to InternalCall. If you upgrade the hybridclr package without reinstalling it, this error will occur.

### MissingMethodException: MethodNotFind xxClass::yyyMethod error

This is a function loss caused by unity code cutting. Run the menu command `HybridCLR/Genrate/LinkXml` to generate link.xml based on the hot update dll. At the same time, make sure that the referenced AOT assembly has been referenced in the main project code, otherwise linkxml will not take effect.


### MissingMethodException: AOT generic method isn't instantiated in aot module xxx

There are several reasons:

1. This is caused by the lack of instantiation of the AOT generic function
2. Unity 2021 is used and the `Il2Cpp Code Generation` option is `faster (smaller build)`, causing the generated code to be fully generic mode, and all generic function signatures have changed. Without supplementary metadata, this error will still occur when calling a generic function that has been instantiated in AOT.
3. The WeChat mini game conversion tool will set IL2CPP Code Generation to Faster (Smaller) builds mode by default. If metadata is not supplemented, AOT generic functions will not be accessible.

The solution to reason 1 is:

- The error log tells you which AOT function instantiation is missing. You can add the call to this function in the main project so that il2cpp can generate the code for this generic function when packaging. You can add this generic AOT function call anywhere in the main project. Currently, it is generally added to the RefTypes.cs file.
- Use supplementary metadata technology

The solution to reason 2 is:

- set `IL2CPP Code Generation` in BuildSettings to `Faster` and Use supplementary metadata technology

Solution to reason 3:

- Use supplementary metadata technology
- Change the WeChat tool source code yourself and set `IL2CPP Code Generation` in BuildSettings to `Faster runtime`.


For specific operations, please see the [Introduction to AOT Generic Principles](/basic/aotgeneric.md) document.


### Encountered ExecutionEngineException: metadata type not match

The supplementary metadata uses a mismatched cropped AOT version and should be generated using this package or loaded using the `HomologousImageMode::SuperSet` mode.

### Encountered ExecutionEngineException: not support extern method: xxxx

There are two reasons:

- The extern function is defined in hot update, which is not supported for the time being. The solution is to move the extern function to the AOT part.
- The SuperSet metadata format is used, but the supplementary metadata aot dll is too old, causing the generics in AOT to not be found in the supplementary metadata dll. The solution is to update the latest AOT dll.

### Encountered ExecutionEngineException: method body is null. xxx::yyyy

Same reason as above.

### Encountered ExecutionEngineException: GetManaged2NativeMethodPointer not support. xxxx function name

The bridge function in the interpreter -> aot direction is missing. Please first confirm that your hybridclr is the latest code, and the com.code-philosophy.hybridclr package is also the latest version.
And the latest bridge function has been generated. Please refer to [Bridge Function](/basic/methodbridge.md) for the principle.

If it works fine on Android but has problems on iOS, it is because you did not recompile libil2cpp.a.

If you still have problems, please give feedback to the administrator technical support in the group.

### Encountered 'ExecutionEngineException: NotSupportNative2Managed'

The bridge function in the aot -> interpreter direction is missing. Please make sure you have generated the latest bridge function first. Please refer to [Bridge Function](/basic/methodbridge.md) for the principle.
If it works fine on Android but has problems on iOS, it is because you did not recompile libil2cpp.a.

If you still have problems, please give feedback to the administrator technical support in the group.

### ExecutionEngineException: Attempting to call method 'xxxx' for which no ahead of time (AOT) code was generated.

Just add metadata to the dll where the error function is located.


### GetReversePInvokeWrapper fail. exceed max wrapper num of method

Wrapper function is insufficient. You need to reserve Wrapper functions for functions that add the MonoPInvokeCallback feature in hot updates. For details, see [MonoPInvokeCallback Support](../basic/workwithscriptlanguage.md)

### When using addressable for hot update, UnityEngine.AddressableAssets.InvlidKeyException: Exception of type 'UnityEngine.AddressableAssets.InvalidKeyException' was thrown. No Asset found with for key 'xxxx' exception occurred when loading resources

The solution comes from [Resource loading error caused by the combined use of addressables and HybridCLR](https://github.com/Bian-Sh/Assemblies-Hotfix-Toolkit-Unity/issues/2). You can also see the video [Practical combat: Import HybridCLR into your own project and implement hot updates] (https://www.bilibili.com/video/BV1aP4y1o7xi/) starting from 1:02:30.

> When using addressables to update hot-updated dlls. Since the LoadAssetAsync function of Addressables is used first, Addressables needs to be initialized first. During initialization at this time, if the resource type is a hot update type, then Addressables will think that the resource type is System.Object. Therefore, you need to load the dll first before you can use Addressables to load resources, otherwise UnityEngine.AddressableAssets.InvalidKeyException will be reported: Exception of type 'UnityEngine.AddressableAssets.InvalidKeyException' was thrown. No Asset found with for Key=xxx. Key exists as Type=System.Object, which is not assignable from the requested Type=YourHotUpdateAssetType.


The solutions are as follows:
- Use the `LoadAsset<System.Object>` interface to load and then force transfer
- Reload the catalog after loaddll ends `Addressables.LoadContentCatalogAsync($"{Addressables.RuntimePath}/catalog.json");`

### GameObject.GetComponent(string name) interface cannot obtain the component

This is a known bug, related to the code implementation of Unity. Only hot update scripts mounted on hot update resources will have this problem. Hot update scripts added through AddComponent in the code can be found using this method. Please use `GameObject.GetComponent<T>()` or `GameObject.GetComponent(typeof(T))` instead

### GameObject.GetComponent&lt;T&gt;() or GameObject.GetComponent(Type type) returns null

This is all because you loaded an assembly twice. The T or Type you passed in has the same name as the script mounted on the GameObject, but they belong to different assembly instances, causing the return to become null after being forced. Generally, it is caused by the following situations:

- The hot update assembly is loaded using Assembly.Load in the Editor. Since all assemblies have been loaded by default under the Editor, repeated loading will occur if you load them again. The solution is to use the #if !UNITY_EDITOR macro to comment out the loading code
- The assembly was not added to the hotUpdateAssemblies list, causing the hot update assembly to be packaged in AOT. Loading again during a hot update will result in repeated loading. The solution is to add the hot update assembly to the hotUpdateAssemblies list and repackage it.

### Using MemoryProfile to grab a memory snapshot will crash

If you use Unity 2021 or higher, just upgrade the hybridclr package to `v3.0.2` or higher. If using Unity 2019 or 2020, records will be committed
[Fix the crash bug when using Momery Profiler to create a snapshot](https://github.com/focus-creative-games/hybridclr/commit/062bfa99c71a53a6cb35fc89a52d67bbff2bb2d0). Just merge the changes into your current version.

### Profiler's BeginSample and EndSample cannot take effect

Because functions such as BeginSample have [Condition] compilation annotations, when compiling the dll in Release mode, these codes will be automatically removed, causing the Profile to become invalid. The solution is to compile the hot update dll in Developemnt mode, the code is as follows.
If you are using `v3.0.2` and higher, the `HybridCLR/CompileDll/ActivedBuildTarget_Development` menu command is already included.

```csharp
     var group = BuildPipeline.GetBuildTargetGroup(target);

     ScriptCompilationSettings scriptCompilationSettings = new ScriptCompilationSettings();
     scriptCompilationSettings.group = group;
     scriptCompilationSettings.target = target;
     if(developmentBuild)
     {
         // The core is this line, which causes the dll to be compiled in Debug mode and retains function calls such as Profiler.BeginSample.
         scriptCompilationSettings.options |= ScriptCompilationOptions.DevelopmentBuild;
     }
     Directory.CreateDirectory(buildDir);
     ScriptCompilationResult scriptCompilationResult = PlayerBuildInterface.CompilePlayerScripts(scriptCompilationSettings, buildDir);
```

### There is no response when using the camera on iOS, but no error is reported.

This is caused by WebCamTexture.devices not being retained in AOT. WebCamTexture.devices needs to be referenced manually in AOT.

### AVProMovieCapture plugin is not working properly

Due to the implementation of AVProMovieCapture itself, you need to initialize the plug-in first, and then perform operations such as loading HybridCLR.

### The EncodeImageAndMetadataIndex function has an IL2CPP_ASSERT assertion failure error.

This is because the hot update dll of your project is too large. There are two solutions:

- Modify the definition of kMetadataIndexBits in the `hybridclr\metadata\MetadataUtil.h` file and gradually increase it by 1 until this problem no longer occurs. It is strongly recommended that the value of kMetadataIndexBits not exceed 29, because the maximum number of hot update dlls that can be loaded at this time is 7, and this limit can easily be exceeded.
- Split the hot update dll into multiple smaller dlls

## Crash when calling ResourceCatalogData::GetGUIDFromPath during the execution of AutomaticWorldBootstrap::Initialize at startup

The entities version you are currently using cannot be directly packaged in Player Building. You must install `com.unity.platforms` and use its separate packaging method, [detailed documentation](https://docs.unity3d.com/Packages/ com.unity.entities@0.51/manual/ecs_building_projects.html).

## Job.ScheduleBatch crashes

Hybridclr is incompatible with dots. The commercial version can solve this problem.

## Function signature mismatch error occurs when WebGL is running

The WebGL platform uses the `faster (smaller) build` option by default when packaging, which will enable full generic sharing, and the community version must add metadata before it can work with the full generic sharing mechanism. Solution:

1. First try to add metadata and add the assembly where the C# code at the top of the function stack is located.
1. If you still have problems after adding metadata, switch `IL2CPP Code Generation` in `Player Settings` to `Faster Runtime`
1. If you still have problems, upgrade to the latest hybridclr version
1. If you still have problems, please contact our technical support

## webgl (or WeChat mini games) has error logs such as "Not implemented" and "Class::FromIl2CppType" on iOS5.4, and is stuck on the startup screen and cannot be started

This is a bug in Unity & iOS 15.4, and there are two solutions:

1. The wasm code subpackage provided by WeChat (recommended)

2. [Temporary fix](https://forum.unity.com/threads/ios-15-webgl-2-issue.1176116/page-2) on the Unity WebGL official forum. Specifically, open the file `HybridCLRData/LocalIl2CppData-xxx/il2cpp/libil2cpp/metadata/GenericMetadata.cpp`
, add a line of code `#pragma clang optimize off` before the line of code `const Il2CppType* GenericMetadata::InflateIfNeeded` function, and add `#pragma clang optimize on` after the function. The final code is as follows:

```cpp
#pragma clang optimize off
const Il2CppType* GenericMetadata::InflateIfNeeded(const Il2CppType* type, const Il2CppGenericContext* context, bool inflateMethodVars)
{
// ...
}
#pragma clang optimize on
```

### NotSupportNative2Managed bridge function missing exception occurs after using Unity.netcode.runtime

The reason is that NetworkManager.RpcReceiveHandler is internal in Unity.netcode.runtime.dll and is defined as follows

```csharp
internal delegate void RpcReceiveHandler(NetworkBehaviour behaviour, FastBufferReader reader, __RpcParams parameters);
```

As a result, the generation tool did not generate a bridge function for it. But Unity is very tricky to generate RpcReceiveHandler for functions marked `[ClientRpc]` and `[ServerRpc]` when packaging.
Handler function, and references the internal RpcReceiveHandler class! No error was reported. This leads to the problem of missing bridge functions.


The solution is for you to also define a delegate with the same signature in the AOT project.

```csharp
     // Since __RpcParams is also internal, we have redefined the same type here.
     public struct __RpcParams
#pragma warning restore IDE1006 // restore naming rule violation check
     {
         public ServerRpcParams Server;
         public ClientRpcParams Client;
     }

     public delegate void MyRpcReceiveHandler(NetworkBehaviour behaviour, FastBufferReader reader, __RpcParams parameters);

```
