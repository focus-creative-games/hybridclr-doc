# com.code-philosophy.hybridclr

`com.code-philosophy.hybridclr` is a Unity package that provides the Editor workflow tool script and Runtime script required by HybridCLR. with the help of
The workflow tool provided by com.code-philosophy.hybridclr makes it very easy to package an App that supports HybridCLR hot update function. The hybridclr_unity package mainly includes the following contents:

- Editor related scripts
- Runtime related scripts
-iOSBuild script

!> Before v3.0.0 the package name was `com.focus-creative-games.hybridclr_unity`.


## HybridCLR menu introduction

The following submenus are all under the `HybridCLR` menu in the menu bar. For the sake of simplification, we no longer include HybridCLR when we mention submenus below.

### Installer...

A handy installer is provided to help correctly set up the local il2cpp directory, which contains a modified version replacing the `HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` directory with HybridCLR.

The installer needs to copy il2cpp (similar to `C:\Program Files\Unity\Hub\Editor\2020.3.33f1\Editor\Data\il2cpp`) related files from the Unity installation directory of the matching version.

- For 2019.4.40+, 2021.3.26+, 2021.3.0+, 2022.3.0+ versions, copy the il2cpp file directly from the installation directory of that version.
- For versions 2020.3.16-2020.3.25, an additional version 2020.3.26 or later needs to be installed. After completing the installation in the Installer, switch back to the current version.
- For the 2019.4.0-2019.4.39 version, you need to install the 2019.4.40 version additionally, and switch back to the current version after completing the installation in the Installer.

`Installation Status: Installed | Not Installed` in the installation interface indicates whether HybridCLR initialization is complete. Click Install, if successful, the `Installation Successful` log will be displayed at the end, and the installation status will switch to `Installed`, otherwise please check the error log.

?> If HybridCLR is already installed, clicking the Install button will install the latest HybridCLR version of libil2cpp.

The branch or tag compatible with hybridclr and il2cpp_plus corresponding to the current package version has been configured in the `Data~/hybridclr_version.json` file in com.code-philosophy.hybridclr.
The Installer will install the version specified in the configuration, and no longer supports customizing the version to be installed.

The configuration looks like this:

```json
{
     "versions": [
     {
         "unity_version": "2019",
         "hybridclr" : { "branch": "v2.0.1"},
         "il2cpp_plus": { "branch": "v2019-2.0.1"}
     },
     {
         "unity_version": "2020",
         "hybridclr" : { "branch": "v2.0.1"},
         "il2cpp_plus": { "branch": "v2020-2.0.1"}
     },
     {
         "unity_version": "2021",
         "hybridclr" : { "branch": "v2.0.1"},
         "il2cpp_plus": { "branch": "v2021-2.0.1"}
     }
     ]
}
```

If you must install other versions of hybridclr or il2cpp_plus, modify the branch in the configuration file to be the target branch or tag.

![install_default](../../img/hybridclr/install_default.jpg)

From version 2.3.1 onwards, it supports copying and installing directly from the libil2cpp directory that contains hybridclr made locally. If your network is not good, or git is not installed and you cannot download and install remotely from the warehouse, you can first [il2cpp_plus](https://github.com/focus-creative-games/il2cpp_plus) and [hybridclr](https:/ /github.com/focus-creative-games/hybridclr) is downloaded to the local, and then according to the document in the **Installation Principle** section below, the libil2cpp directory containing hybridclr is merged from these two warehouses, and then installed in `Installer` Enable `Copy libil2cpp from local` option in the interface, select the libil2cpp directory you made, and click `Install` to execute the installation. As shown below.

![install](../../img/hybridclr/install.jpg)

### Compile Dll

For each target, you must use the hot update dll compiled under the compile switch of the target platform, otherwise the hot update code will not match the code information of the AOT main package or hot update resources.

The `HybridCLR.Editor` assembly of com.code-philosophy.hybridclr provides the `HybridCLR.Editor.Commands.CompileDllCommand.CompileDll(BuildTarget target)` interface,
It is convenient for developers to compile hot update dll by themselves flexibly. After the compilation is completed, the hot update dll is placed in the `{project}/HybridCLRData/HotUpdateDlls/{platform}` directory.

### Generate

Generate contains the generation commands needed for packaging.


### Generate/Il2CppDef

The hybridclr code needs to be compatible with multiple Unity versions, and macro definitions related to the current Unity version are required. The `Generate/Il2CppDef` command generates relevant version macros and other necessary codes, and the generated codes are similar to the following.

```cpp
// hybridclr/generated/UnityVersion.h

#define HYBRIDCLR_UNITY_VERSION 2020333
#define HYBRIDCLR_UNITY_2020 1
#define HYBRIDCLR_UNITY_2019_OR_NEW 1
#define HYBRIDCLR_UNITY_2020_OR_NEW 1
```

### Generate/LinkXml

Scan the AOT type referenced by the hot update dll, generate link.xml, and prevent the AOT type or function used by the hot update script from being clipped. The output file path is specified in the `OuputLinkXml` field in HybridCLRSettings.asset, and the default is `LinkGenerator/link.xml`.

For a more specific introduction to clipping, please see [Code Clipping Principles and Solutions](/hybridclr/code_striping/).

### Generate/AotDlls

Generate trimmed AOT dlls. The script achieves the goal of generating trimmed AOT dlls by exporting the project in a temporary directory. Generating AOT dlls depends on `Generate/LinkXml` and `Generate/Il2CppDef`.
If you did not use `HybridCLR/Generate/All` such a one-click generation command, please run the following commands in sequence:

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml`
- `HybridCLR/Generate/AotDlls`

### Generate/MethodBridge

Scan and generate bridge function files according to the current AOT dll set. For related documents, please see [bridge function](/en/basic/methodbridge.md).

Generate bridge function depends on AOT dlls and hot update dlls. If you did not use `HybridCLR/Generate/All` such a one-click generation command, please run the following commands in sequence:

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml` (implicitly calls `HybridCLR/CompileDll/ActiveBuildTarget`)
- `HybridCLR/Generate/AotDlls`
- `HybridCLR/Generate/MethodBridge`

### Generate/AOTGenericReference

Scan all generated AOT generic types and function instantiations according to the current hot update dll, and generate a **inspired** generic instantiation file `AOTGenericReferences.cs`.
Since it is troublesome to convert the scanned generic types and functions into corresponding code references, all generated generic instantiation codes are **comment code**.

The `AOTGenericReferences.cs` file also contains a list of assemblies that should be supplemented with metadata, similar to the following, so that developers can quickly know which metadata should be supplemented without running the game.

```csharp
// {{ AOT assemblies
// Main.dll
// System. Core. dll
// UnityEngine.CoreModule.dll
// mscorlib.dll
// }}
```


Please add instantiation references to generic types and functions in other files, as this output file will be overwritten every time it is regenerated.
This generic instantiation documentation is only for inspiration, telling you which classes and functions can be instantiated with aot generics.
For more specific AOT generic related documents, please see [AOT Generic Introduction](/en/basic/aotgeneric.md).

?> After using the supplementary metadata mechanism, **does not process** and does not affect normal operation. But if you manually instantiate aot generics, you can improve performance. The suggestion is to manually instantiate a small number of performance-sensitive classes or functions, such as `Dictionary<int,int>`.


It is at the discretion of the developer to convert to the correct instantiation reference (**this operation is optional, it can be completely ignored or only partially processed**), that is, instantiate the generic class or generic in this annotation in the AOT code type function. The method is roughly as follows:

```csharp

     // System.Collections.Generics.List`1<System.Object>.ctor
     new List<object>();

     // System.Byte[] Array.Empty`1<System.Byte>()
     Array. Empty<byte>();

```

### Generate/ReversePInvokeWrapper

Generate a ReversePInvokeWrapper function for hot-updated C# static functions marked with `[MonoPInvokeCallback]` annotation. Please refer to the document [MonoPInvokeCallback Support](/en/advanced/workwithscriptlanguage.md) for the specific introduction of MonoPInvokeCallback


### Generate/All

One-click execution of necessary generation operations before packaging.

## HybridCLR configuration

Click the menu `HybridCLR/Settings` to open the configuration interface. The fields are detailed below.

### enable

Whether to enable HyridCLR hot update. The default is true. If false, the packaging no longer includes HybridCLR functionality.

!> If HybridCLR is disabled, please also remove the reference to the HybridCLR.Runtime assembly in the main project, otherwise there will be errors such as missing symbols such as `RuntimeApi::LoadMetadataForAOTAssembly` when packaging.

### useGlobalIl2cpp

Whether to use the global installation location, that is, the il2cpp directory under the editor installation location. The default is false. Generally, `useGlobalIl2cpp=true` is only required when packaging WebGL.

Note that even if `useGlobalIl2Cpp=true`, il2cpp will still be copied to the HybridCLRData directory during installation. Before copying, you need to run `HybridCLR/Generate/Il2CppDef` to generate the version macro,
Then manually replace the `{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` directory with the corresponding directory under the editor installation directory.
In addition, every time you run `HybridCLR/Generate/*` to execute the generation operation, the output directory is still the local directory, and you need to manually copy and replace the libil2cpp directory in the global installation location.

### hybridclrRepoURL

The address of the hybridclr warehouse, the default value is `https://gitee.com/focus-creative-games/hybridclr`. When installing the Installer, clone the hybridclr warehouse code from this address.

### il2cppPlusRepoURL

The address of the il2cpp_plus warehouse, the default value is `https://gitee.com/focus-creative-games/il2cpp_plus`. When the Installer is installed, clone the il2cpp_plus warehouse code from this address.

### hotUpdateAssemblyDefinitions

The list of hot update modules defined in the form of assembly definition (asmdef) is equivalent to `hotUpdateAssemblies` below, but it is more convenient to drag and drop asmdef modules in the editor, and it is not easy to make mistakes and write wrong names.

!> `hotUpdateAssemblyDefinitions` and `hotUpdateAssemblies` are combined to form the final hot update dll list. The same assembly should not appear in two lists at the same time, an error will be reported!

###hotUpdateAssemblies

Some assemblies exist in the form of dll, such as the hot update dll you created in an external project, or you directly use Assembly-CSharp as your hot update dll. Since there is no corresponding asmdef file, it can only be manually configured in the form of dll name.
Do not include the '.dll' suffix when filling in the assembly name, just like `Main`, `Assembly-CSharp`. Assembly in asmdef form, you can also choose not to add it to `hotUpdateAssemblyDefinitions`,
Instead, add to `hotUpdateAssemblies`. But this is not as convenient as directly dragging into the list, you can choose at your own discretion.

!> `hotUpdateAssemblyDefinitions` and `hotUpdateAssemblies` are combined to form the final hot update dll list. The same assembly should not appear in two lists at the same time, an error will be reported!

### preserveHotUpdateAssemblies

A list of reserved hot update dll names. Sometimes I want to add some hot update dlls in the future, and expect the scripts of these new hot update dlls to be mounted on resources. If you directly add the hot update dll name to hotUpdateAssemblies, an error will be reported that the assembly does not exist.
The preserveHotUpdateAssemblies field is used to meet this requirement. These dlls are not checked for validity when packaging and will be added to an assembly list file like scriptingassemblies.json.
Do not include the `.dll` suffix when filling in the assembly name, just like `Assembly-CSharp`.

### hotUpdateDllCompileOutputRootDir

The output root directory of the compiled hot update dll. The final output directory is under the platform subdirectory of this directory, namely `${hotUpdateDllCompileOutputRootDir}/{platform}`.

### externalHotUpdateAssemblyDirs

Customize the search path for external hot update dlls. Some hot update projects of frameworks or projects are placed outside Unity, and the compiled dll is also outside. This parameter provides a hot update dll
The search path, so that there is no need to copy the external dll to the project or to the hotUpdateAssemblies directory every time.

- Search in the order of the search path, the higher the priority, the higher the priority.
- The search path must be a relative location, relative to the project root directory (that is, the **parent directory** of Assets). That is, fill in `mydir` and search for `{proj}/mydir`.
- For each path `dir`, it will first try to search `{dir}/{platform}`, and then try to search `{dir}`. This is done in order to take into account the specificity and versatility of the platform.

An example of usage is shown below. You have an external dll at `{proj}/MyDir1/MyDir2/Foo.dll`, then you should:
- Add `Foo` to hotUpdateAssemblies
- Add directory `MyDir1/Mydir2` in externalHotUpdateAssemblyDirs

### strippedAOTDllOutputRootDir

Staging directory for trimmed AOT dlls. The final directory is under the platform subdirectory of this directory, namely `${strippedAOTDllOutputRootDir}/{platform}`.

### patchAOTA Assemblies

Supplementary metadata AOT dll list. **package itself does not use this configuration item**. It provides a place to configure the AOT dll list, which is convenient for developers to use in their own packaging process, so that developers do not need to define a supplementary metadata AOT dll configuration script separately.
Do not include the '.dll' suffix when filling in the assembly name, just like `Main`, `Assembly-CSharp`.

### outputLinkFile

When running the menu `HybridCLR/Generate/LinkXml` command, the output link.xml file path.

!> Do not point to `Assets/link.xml`, that link.xml is generally used to manually reserve the AOT type, and this automatically output link.xml will be overwritten every time.

### outputAOTGenericReferenceFile

The path of the AOT generic instantiation assembly file output when running the menu `HybridCLR/Generate/AOTGenericReference`.

### maxGenericReferenceIteration

When running the menu `HybridCLR/Generate/AOTGenericReference`, the generation tool recursively analyzes the number of iterations of AOT generic instantiation.

Because new generic classes and generic functions may be used indirectly in generic functions, multiple rounds of iterations are required to analyze all generic instantiations. The `maxGenericReferenceIteration` parameter is used to control the number of iterations. This parameter is generally within 10 enough, you can observe the log
It can be seen that the calculation terminates after several rounds of iterations. If there are still a large number of uncalculated iterations of generics when the iteration terminates, this value can be increased appropriately.

Why not iterate until all generic instantiations are computed? Because there may be situations that can never be calculated. The following code, AOT.Show()
Due to recursive generic instantiation, it can never be calculated.

```csharp

     struct AOT<A>
     {

         public void Show()
         {
             var a = new AOT<AOT<A>>();
             a.Show();
         }
     }

```

### maxMethodBridgeGenericIteration

When running the menu `HybridCLR/Generate/MethodBridge`, the generation tool recursively analyzes the number of iterations of AOT generic instantiation. The meaning is similar to `maxGenericReferenceIteration`.

## Build Pipeline related scripts

It mainly includes the following functions:

- Check and fix settings
- Automatically exclude hot update assembly when packaging
- Add the hot update dll name to the assembly list when packaging
- backup trimmed AOT dll

### Check and fix settings

It is part of the packaging workflow, and the relevant code is in `Editor/BuildProcessors/CheckSettings.cs`. Contains the following actions:

- Set or clear the UNITY_IL2CPP_PATH environment variable according to whether HybridCLR is enabled. The UNITY_IL2CPP_PATH environment variable modified in the script is the environment variable of this process, so don't worry about interfering with other projects.
- Turn off the incremental GC (Use Incremental GC) option. Because incremental GC is not currently supported. WebGL platforms ignore this option. **com.code-philosophy.hybridclr will automatically turn off this option, you don't have to do it manually**.
- `Scripting Backend` is switched to `il2cpp`, WebGL platform does not need to set this option. **Since `v2.4.0`, this option is set automatically, you can do it without manually**.
- `Api Compatability Level` switched to `.NetFramework 4` (Unity 2019, 2020) or `.Net Framework` (Unity 2021+). **Since `v2.4.0`, this option is set automatically, you can do it without manually**.
- If no hot update assembly is set in HybridCLRSettings, an error will be displayed.

### Automatically exclude hot update assembly when packaging

It is part of the packaging workflow, and the relevant code is in `Editor/BuildProcessors/FilterHotFixAssemblies.cs`.

Obviously, the hot update assembly should not be processed by il2cpp and compiled into the final package body. We handle the `IFilterBuildAssemblies` callback,
Remove the hot update dll from the list of build assemblies. The script will additionally check whether the name of the assembly is wrongly written, and whether there is a duplicate assembly configured by mistake.

### Add the hot update dll name to the assembly list when packaging

It is part of the packaging workflow, and the relevant code is in `Editor/BuildProcessors/PatchScriptingAssemblyList.cs`.

When the tool is packaged, it will automatically add the dll name of the hot update assembly to the assembly list configuration file. The dll name of the assembly where the hot update MonoBehaviour script is located must be added to the assembly list configuration file,
Unity's resource management system can correctly identify and restore hot update scripts. For a more detailed introduction to the principle, please see [Using Hot Update MonoBehaviour](/en/basic/monobehaviour.md) .

### Backup trimmed AOT dll

It is part of the packaging workflow, and the relevant code is in `Editor/BuildProcessors/CopyStrippedAOTAssemblies.cs`.

When the supplementary metadata mode is `HomologousImageMode::Consistent`, the cropped AOT dll generated during packaging needs to be used. Therefore, the cropped AOT dll generated during the packaging process will be automatically
Copy it to the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{platform}` directory for future processing. When the data mode is `HomologousImageMode::SuperSet`,
The original aot dll can be used directly. The advantage of this is that the workflow is more convenient, and there is no need to update the aot dll after each package. The disadvantage is that it takes up more memory, and at the same time greatly increases the size of the trimmed dll. Please use the original or trimmed aot dll.


##iOSBuild-script

`Editor/Data~/iOSBuild` in the package contains the scripts needed to compile the iOS version libil2cpp.a. After running the `HybridCLR/Installer...` menu command to successfully initialize HybridCLR, it will be automatically copied to the `{project}/HybridCLRData/iOSBuild` directory.
** Subsequent operations must be performed in the `{project}/HybridCLRData/iOSBuild` directory**. For the specific operation of compiling libil2cpp.a, please refer to the document [iOS Platform Packaging](/en/basic/buildpipeline.md).

## Runtime related scripts

Contains classes used at runtime.

### LoadImageErrorCode

Error code of loading hot update dll.

### Metadata Mode HomologousImageMode

Two metadata schemas are currently supported:

#### `HomologousImageMode::Consistent` mode

That is, the supplementary dll is exactly the same as the trimmed dll when packaging. Therefore, the clipped dll generated during the build process must be used, and the original dll cannot be copied directly. We added processing code in `HybridCLR.BuildProcessors.CopyStrippedAOTAssemblies`, automatically copy these clipped dlls to the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}` directory when packaging.

#### `HomologousImageMode::SuperSet` mode

That is, the supplementary dll is a superset of the trimmed dll when packaging, and contains all the metadata of the trimmed dll. One of the easiest superset dlls to get is the original aot dll, which is also the recommended superset dll.

- The original UnityEngine-related AOT dll is in the PlayBackEngines subdirectory of the Unity installation directory
- The original .net core AOT dll such as mscorlib.dll is in the `unityaot{xxx}` directory of the Unity installation directory. 2019-2020 will be unified into the unityaot directory, and will be split into multiple directories starting from 2021. If you package android, take unityaot-linux, and if you package iOS, take unityaot-macos.
- The AOT dll of the plug-in is the original dll of the corresponding platform in the project directory. If it is in the form of source code, it is a compiled dll, just take the corresponding dll in the `HybridCLR/HotUpdateDlls/{platform}` directory

Take the Win64 target under Win of Unity 2020.3.33 version as an example:

- mscorlib.dll in `{editor}/Editor/Data/MonoBleedingEdge/lib/mono/unityaot`
- UnityEngine.CoreModule.dll in `{editor}/Editor/Data/Playbackengines/windowsstandalonesupport/Variations/il2cpp/Managed`
- protobuf-net.dll is the original `protobuf-net.dll` in your project
- The AOT dll corresponding to your AOT module Main is `HybridCLR/HotUpdateDlls/{platform}/Main.dll`

The `SuerSet` mode can also use the trimmed dll of the `Consistent` mode, since it obviously contains all the metadata for itself.

### RuntimeApi

The underlying tool class for operating HybridCLR. The more commonly used ones are:

- `LoadImageErrorCode LoadMetadataForAOTAssembly(byte[] dllBytes, HomologousImageMode mode)` is used to load supplementary metadata assembly.

### ReversePInvokeWrapperGenerationAttribute

If a scripting language such as xlua is used in the project, the `[MonoPInvokeCallback]` annotation needs to be added to the C# function to be registered in lua. This returns a corresponding C++ for these C# functions
Function pointer, used to register in the scripting language. HybridCLR supports registering hot-updated C# code in lua, but the C++ stub function corresponding to `[MonoPInvokeCallback]` must be generated in advance to return a corresponding C++ function pointer for each C# function.
The script provides the function of automatically generating stub functions. For details, see [MonoPInvokeCallback support](/en/advanced/workwithscriptlanguage.md) and [HybridCLR+lua/js/python](/hybridclr/work_with_script_language/) documents

Each function with the `[MonoPInvokeCallback]` attribute requires a unique corresponding wrapper function. These wrapper functions must be pre-generated during packaging and cannot be changed.
Therefore, if a function with the `[MonoPInvokeCallback]` feature is added in subsequent hot updates, there will be insufficient wrapper functions. ReversePInvokeWrapperGenerationAttribute
It is used to reserve the specified number of wrapper functions for the functions currently added with the `[MonoPInvokeCallback]` feature. In the following example, 10 wrapper functions are reserved for functions signed by LuaFunction.

```csharp
     delegate int LuaFunction(IntPtr luaState);

     public class MonoPInvokeWrapperPreserves
     {
         [ReversePInvokeWrapperGeneration(10)]
         [MonoPInvokeCallback(typeof(LuaFunction))]
         public static int LuaCallback(IntPtr luaState)
         {
             return 0;
         }

         [MonoPInvokeCallback(typeof(Func<int, int, int>))]
         public static int Sum(int a, int b)
         {
             return a + b;
         }

         [MonoPInvokeCallback(typeof(Func<int, int, int>))]
         public static int Sum2(int a, int b)
         {
             return a + b;
         }

         [MonoPInvokeCallback(typeof(Func<int>))]
         public static int Sum3()
         {
             return 0;
         }
     }
```
