# hybridclr Package Manual

`com.code-philosophy.hybridclr` is a Unity package that provides Editor workflow tools and Runtime scripts required by HybridCLR. With the workflow tools provided by com.code-philosophy.hybridclr, packaging an App that supports HybridCLR hot update functionality becomes very simple. The hybridclr_unity package mainly contains the following content:

- Editor-related scripts
- Runtime-related scripts
- iOSBuild scripts

:::caution
The package name before v3.0.0 was `com.focus-creative-games.hybridclr_unity`.
:::

## HybridCLR Menu Introduction

The following submenus are all under the `HybridCLR` menu in the menu bar. For simplification, we will not include HybridCLR when mentioning submenus below.

### Installer...

For detailed documentation, see [Installing HybridCLR](./install.md).

Installer is a convenient installer that helps correctly set up the local il2cpp directory, including replacing the `HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` directory with the HybridCLR modified version.


The installation interface shows `Installation Status: Installed|Not Installed` indicating whether HybridCLR initialization is complete. Click install, and if successful, it will display `Installation Successful` log and the installation status will switch to `Installed`, otherwise please check error logs.

:::tip
If HybridCLR is already installed, clicking the install button will install the latest HybridCLR version of libil2cpp.
:::

The `Data~/hybridclr_version.json` file in com.code-philosophy.hybridclr has already configured the compatible hybridclr and il2cpp_plus branches or tags corresponding to the current package version. The Installer will install the version specified in the configuration and no longer supports custom installation versions.

The configuration looks like this:

```json
{
    "versions": [
    {
        "unity_version":"2019",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2019-2.0.1"}
    },
    {
        "unity_version":"2020",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2020-2.0.1"}
    },
    {
        "unity_version":"2021",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2021-2.0.1"}
    },
    {
        "unity_version":"2022",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2020-2.0.1"}
    }
    ]
}
```

If you must install other versions of hybridclr or il2cpp_plus, modify the branch in this configuration file to the target branch or tag.

![install_default](/img/hybridclr/install_default.jpg)

Starting from version 2.3.1, support for directly copying and installing from a local self-made libil2cpp directory containing hybridclr has been added. If you have poor network connectivity or don't have git installed and can't download remotely from repositories, you can first download [il2cpp_plus](https://github.com/focus-creative-games/il2cpp_plus) and [hybridclr](https://github.com/focus-creative-games/hybridclr) locally, then according to the **Installation Principle** section documentation below, merge these two repositories to create a libil2cpp directory containing hybridclr. Then in the `Installer` interface, enable the `Copy libil2cpp from local` option, select your created libil2cpp directory, and click `Install` to execute installation. As shown below.

![install](/img/hybridclr/install.jpg)

### Compile Dll

For each target, you must use hot update dlls compiled under the target platform compilation switches, otherwise there will be mismatches between hot update code and AOT main package or hot update resource code information.

The `HybridCLR.Editor` assembly in com.code-philosophy.hybridclr provides the `HybridCLR.Editor.Commands.CompileDllCommand.CompileDll(BuildTarget target)` interface, making it convenient for developers to flexibly compile hot update dlls themselves. After compilation, hot update dlls are placed in the `{project}/HybridCLRData/HotUpdateDlls/{platform}` directory.

### Generate

Generate contains generation commands needed during packaging.


### Generate/Il2CppDef

hybridclr code needs to be compatible with multiple Unity versions and requires macro definitions related to the current Unity version. The `Generate/Il2CppDef` command generates related version macros and other necessary code. The generated code looks like this:

```cpp
// hybridclr/generated/UnityVersion.h

#define HYBRIDCLR_UNITY_VERSION 2020333
#define HYBRIDCLR_UNITY_2020 1
#define HYBRIDCLR_UNITY_2019_OR_NEW 1
#define HYBRIDCLR_UNITY_2020_OR_NEW 1
```

### Generate/LinkXml

Scans AOT types referenced by hot update dlls and generates link.xml to prevent AOT types or functions used by hot update scripts from being stripped. The output file path is specified in the `OuputLinkXml` field in HybridCLRSettings.asset, defaulting to `LinkGenerator/link.xml`.

For more specific introduction to stripping, see [Code Stripping Principles and Solutions](codestriping.md).

### Generate/AotDlls

Generate trimmed AOT dlls. The script exports projects in a temporary directory to achieve the goal of generating trimmed AOT dlls. Generating AOT dlls depends on `Generate/LinkXml` and `Generate/Il2CppDef`.
If you haven't used one-click generation commands like `HybridCLR/Generate/All`, please run the following commands in order:

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml`
- `HybridCLR/Generate/AotDlls`

### Generate/MethodBridge

Scans the current AOT dll set to generate bridge function files. For related documentation, see [Bridge Functions](methodbridge.md).

Generating bridge functions depends on AOT dlls and hot update dlls. If you haven't used one-click generation commands like `HybridCLR/Generate/All`, please run the following commands in order:

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml` (implicitly calls `HybridCLR/CompileDll/ActiveBuildTarget`)
- `HybridCLR/Generate/AotDlls`
- `HybridCLR/Generate/MethodBridge`

### Generate/AOTGenericReference

Scans all generated AOT generic type and function instantiations based on the current hot update dlls, and generates an **heuristic** generic instantiation file `AOTGenericReferences.cs`.
Since converting the scanned generic types and functions to corresponding code references is quite troublesome, all generated generic instantiation code is **commented code**.

The `AOTGenericReferences.cs` file also contains the assembly list that should supplement metadata, like the following, making it convenient for developers to quickly know which metadata should be supplemented without running the game.

```csharp
	// {{ AOT assemblies
	// Main.dll
	// System.Core.dll
	// UnityEngine.CoreModule.dll
	// mscorlib.dll
	// }}
```


Please add generic type and function instantiation references in other files, as this output file will be overwritten each time it's regenerated.
This generic instantiation documentation only serves as inspiration, telling you which classes and functions can have AOT generic instantiation.
For more specific AOT generic related documentation, see [AOT Generic Introduction](/basic/aotgeneric.md).

:::tip
After using the supplemental metadata mechanism, **no processing** is needed and it won't affect normal operation. However, if you manually instantiate AOT generics, performance can be improved. The recommendation is to manually instantiate generics only for a small number of performance-sensitive classes or functions, such as `Dictionary<int,int>`.
:::

Developers should discretionally convert to correct instantiation references (**this operation is optional, can be completely unprocessed or only partially processed**), i.e., instantiate these commented generic classes or generic functions in AOT code. The method is roughly as follows:

```csharp

    // System.Collections.Generics.List`1<System.Object>.ctor
    new List<object>();

    // System.Byte[] Array.Empty`1<System.Byte>()
    Array.Empty<byte>();

```

### Generate/ReversePInvokeWrapper

Generates ReversePInvokeWrapper functions for hot update C# static functions marked with `[MonoPInvokeCallback]` annotation. For specific MonoPInvokeCallback introduction, see documentation [MonoPInvokeCallback Support](./workwithscriptlanguage.md)


### Generate/All

One-click execution of necessary generation operations before packaging.

## HybridCLR Configuration

Click menu `HybridCLR/Settings` to open the configuration interface. Below are detailed field descriptions.

### enable

Whether to enable HybridCLR hot updates. Default is true. If false, packaging will no longer include HybridCLR functionality.

:::caution
If HybridCLR is disabled, please also remove references to the HybridCLR.Runtime assembly in the main project, otherwise packaging will result in missing symbol errors like `RuntimeApi::LoadMetadataForAOTAssembly`.
:::

### useGlobalIl2cpp

Whether to use the global installation location, i.e., the il2cpp directory under the editor installation location. Default is false. Generally, `useGlobalIl2cpp=true` is only needed when packaging WebGL.

Note that even if `useGlobalIl2Cpp=true`, installation will still copy il2cpp to the HybridCLRData directory. Before copying, you need to first run `HybridCLR/Generate/Il2CppDef` to generate version macros,
then manually replace the `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` directory with the corresponding directory under the editor installation directory.
Additionally, each time you run `HybridCLR/Generate/*` to execute generation operations, the output directory is still the local directory, and you need to manually copy and replace the libil2cpp directory at the global installation location.

### hybridclrRepoURL

The address of the hybridclr repository, default value is `https://gitee.com/focus-creative-games/hybridclr`. The Installer clones hybridclr repository code from this address during installation.

### il2cppPlusRepoURL

The address of the il2cpp_plus repository, default value is `https://gitee.com/focus-creative-games/il2cpp_plus`. The Installer clones il2cpp_plus repository code from this address during installation.

### hotUpdateAssemblyDefinitions

Hot update module list defined in assembly definition (asmdef) form, which is equivalent to the `hotUpdateAssemblies` below, except that dragging asmdef modules in the editor is more convenient and less prone to name errors.

:::caution
`hotUpdateAssemblyDefinitions` and `hotUpdateAssemblies` combined form the final hot update dll list. The same assembly should not appear in both lists simultaneously, as it will cause errors!
:::

### hotUpdateAssemblies

Some assemblies exist in dll form, for example, hot update dlls you created in external projects, or if you directly use Assembly-CSharp as your hot update dll. Since there are no corresponding asmdef files, they can only be manually configured by dll name.
When filling in assembly names, don't include the '.dll' suffix, just like `Main`, `Assembly-CSharp`. For assemblies in asmdef form, you can also choose not to add them to `hotUpdateAssemblyDefinitions`,
but add them to `hotUpdateAssemblies` instead. However, this is not as convenient as directly dragging into the list, you can choose as appropriate.

`hotUpdateAssemblyDefinitions` and `hotUpdateAssemblies` combined form the final hot update dll list. The same assembly should not appear in both lists simultaneously, as it will cause errors!

### preserveHotUpdateAssemblies

Reserved hot update dll name list. Sometimes you want to add new hot update dlls in the future and expect scripts from these new hot update dlls to be mountable to resources. If you directly add hot update dll names to hotUpdateAssemblies, it will report assembly not found errors.
The preserveHotUpdateAssemblies field is used to meet this need. The validity of these dlls is not checked during packaging, and they will be added to assembly list files like scriptingassemblies.json.
When filling in assembly names, don't include the `.dll` suffix, just like `Assembly-CSharp`.

### hotUpdateDllCompileOutputRootDir

The output root directory for compiled hot update dlls. The final output directory is under the platform subdirectory of this directory, i.e., `${hotUpdateDllCompileOutputRootDir}/{platform}`.

### externalHotUpdateAssemblyDirs

Custom search paths for external hot update dlls. Some frameworks or projects have hot update projects placed outside Unity, and the compiled dlls are also external. This parameter provides a search path for hot update dlls,
so you don't need to copy external dlls to the project or to the hotUpdateAssemblies directory every time.

- Search in order of search paths, with earlier ones having higher priority.
- Search paths must be relative positions, relative to the project root directory (i.e., the **parent directory** of Assets). Fill in `mydir` to search `{proj}/mydir`.
- For each path `dir`, it will first try to search `{dir}/{platform}`, then try to search `{dir}`. This is done to balance platform specificity and generality.

Here's a usage example. You have an external dll located at `{proj}/MyDir1/MyDir2/Foo.dll`, then you should:

- Add `Foo` to hotUpdateAssemblies
- Add directory `MyDir1/Mydir2` to externalHotUpdateAssemblyDirs

### strippedAOTDllOutputRootDir

Temporary directory for trimmed AOT dlls. The final directory is under the platform subdirectory of this directory, i.e., `${strippedAOTDllOutputRootDir}/{platform}`.

### patchAOTAssemblies

Supplemental metadata AOT dll list. **The package itself doesn't use this configuration item**. It provides a place to configure the AOT dll list, making it convenient for developers to use in their own packaging workflows, so developers don't need to separately define a supplemental metadata AOT dll configuration script.
When filling in assembly names, don't include the '.dll' suffix, just like `Main`, `Assembly-CSharp`.


### outputLinkFile

The output link.xml file path when running the menu `HybridCLR/Generate/LinkXml` command.

:::caution
Never point to `Assets/link.xml`, that link.xml is generally used to manually reserve AOT types, while this automatically output link.xml will overwrite every time.
:::

### outputAOTGenericReferenceFile

The path of the AOT generic instantiation collection file output when running the menu `HybridCLR/Generate/AOTGenericReference`.

### maxGenericReferenceIteration

When running the menu `HybridCLR/Generate/AOTGenericReference`, the iteration count for the generation tool to recursively analyze AOT generic instantiation.

Because generic functions may indirectly use new generic classes and generic functions, multiple iterations are needed to analyze all generic instantiations. The `maxGenericReferenceIteration` parameter is used to control the iteration count. This parameter is generally sufficient within 10. You can observe through logs
how many iterations it takes before calculation terminates. If there are still many generics uncalculated when iteration terminates, you can appropriately increase this value.

Why not iterate repeatedly until all generic instantiations are calculated? Because there might be cases where calculation can never be completed. In the following code, AOT.Show()
can never finish calculation due to recursive generic instantiation.

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

When running the menu `HybridCLR/Generate/MethodBridge`, the iteration count for the generation tool to recursively analyze AOT generic instantiation. The meaning is similar to `maxGenericReferenceIteration`.

## Build Pipeline Related Scripts

Mainly includes the following functionality:

- Check and fix settings
- Automatically exclude hot update assemblies during packaging
- Add hot update dll names to assembly list during packaging
- Backup trimmed AOT dlls

### Check and Fix Settings

Part of the packaging workflow, related code is in `Editor/BuildProcessors/CheckSettings.cs`. Includes the following operations:

- Set or clear UNITY_IL2CPP_PATH environment variable based on whether HybridCLR is enabled. The UNITY_IL2CPP_PATH environment variable modified in the script is the environment variable of this process, so don't worry about interfering with other projects.
- If version is below (not including) v4.0.0, it will check and automatically disable the Use Incremental GC option
- Switch `Scripting Backend` to `il2cpp`. WebGL platform doesn't need to set this option. **Starting from `v2.4.0`, this option will be set automatically, so manual operation is not needed**.
- Switch `Api Compatability Level` to `.NetFramework 4` (Unity 2019, 2020) or `.Net Framework` (Unity 2021+)
- If no hot update assembly is set in HybridCLRSettings, an error prompt is shown.

### Automatically Exclude Hot Update Assemblies During Packaging

Part of the packaging workflow, related code is in `Editor/BuildProcessors/FilterHotFixAssemblies.cs`.

Obviously, hot update assemblies should not be processed by il2cpp and compiled into the final package. We handle the `IFilterBuildAssemblies` callback,
removing hot update dlls from the build assemblies list. The script will additionally check for incorrect assembly names and mistakenly configured duplicate assemblies.

### Add Hot Update DLL Names to Assembly List During Packaging

Part of the packaging workflow, related code is in `Editor/BuildProcessors/PatchScriptingAssemblyList.cs`.

The tool automatically adds hot update assembly dll names to the assembly list configuration file during packaging. The dll names of assemblies containing hot update MonoBehaviour scripts must be added to the assembly list configuration file,
so Unity's resource management system can correctly identify and restore hot update scripts. For more detailed principle introduction, see [Using Hot Update MonoBehaviour](/basic/monobehaviour.md).

### Backup Trimmed AOT DLLs

Part of the packaging workflow, related code is in `Editor/BuildProcessors/CopyStrippedAOTAssemblies.cs`.

When the supplemental metadata mode is `HomologousImageMode::Consistent`, the trimmed AOT dlls generated during packaging are needed. Therefore, the trimmed AOT dlls generated during the packaging process are automatically copied to the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{platform}` directory for future processing. When the data mode is `HomologousImageMode::SuperSet`,
original aot dlls can be used directly. The advantage is workflow convenience, not needing to update aot dlls after each packaging. The disadvantage is using more memory and significantly increasing the size of trimmed dlls. Users should weigh whether to use original or trimmed aot dlls.


## iOSBuild Scripts

The `Editor/Data~/iOSBuild` in the package contains scripts needed to compile the iOS version libil2cpp.a. After successfully initializing HybridCLR by running the `HybridCLR/Installer...` menu command, it will be automatically copied to the `{project}/HybridCLRData/iOSBuild` directory.
**Subsequent operations must be performed in the `{project}/HybridCLRData/iOSBuild` directory**. For specific operations to compile libil2cpp.a, see documentation [iOS Platform Packaging](/basic/buildpipeline.md).

## Runtime Related Scripts

Contains classes used at runtime.

### LoadImageErrorCode

Error codes for loading hot update dlls.

### Metadata Mode HomologousImageMode


:::tip

Recommend beginners use Super mode. In scenarios where memory conservation is needed, Consistent mode can be used instead.

:::

Currently supports two metadata modes.

#### `HomologousImageMode::Consistent` Mode

The supplemented dll is exactly the same as the trimmed dll during packaging. Therefore, the trimmed dll generated during the build process must be used, and the original dll cannot be copied directly. We added processing code in `HybridCLR.BuildProcessors.CopyStrippedAOTAssemblies` to automatically copy these trimmed dlls to the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}` directory during packaging.

#### `HomologousImageMode::SuperSet` Mode

Consistent requires exact consistency with the trimmed dll, while the trimmed aot dll generated in `generate/all` often has minor differences from the one generated during actual packaging, causing loading errors. SuperSet mode has lower consistency requirements for dlls compared to Consistent mode, only requiring that the types and functions needed for supplemental metadata exist.

Due to SuperSet mode using relaxed consistency, matching calculations become more complex, requiring maintenance of more related metadata and using more memory.

### RuntimeApi

Low-level utility class for operating HybridCLR. Commonly used ones include:

- `LoadImageErrorCode LoadMetadataForAOTAssembly(byte[] dllBytes, HomologousImageMode mode)` used to load supplemental metadata assemblies.

### ReversePInvokeWrapperGenerationAttribute

If your project uses script languages like xlua, C# functions to be registered in lua need to have `[MonoPInvokeCallback]` annotations. This allows returning a corresponding C++ function pointer for these C# functions, which can be registered in script languages. HybridCLR supports registering hot update C# code in lua, but C++ stub functions corresponding to `[MonoPInvokeCallback]` must be generated in advance to return a corresponding C++ function pointer for each C# function.
The script provides automatic stub function generation functionality. For details, see [MonoPInvokeCallback Support](workwithscriptlanguage.md) and [HybridCLR+lua/js/python](workwithscriptlanguage.md) documentation.

Each function with `[MonoPInvokeCallback]` attribute needs a uniquely corresponding wrapper function. These wrapper functions must be pre-generated during packaging and cannot be changed.
Therefore, if hot updates subsequently add functions with `[MonoPInvokeCallback]` attributes, there will be insufficient wrapper functions. ReversePInvokeWrapperGenerationAttribute
is used to reserve a specified number of wrapper functions for functions currently having `[MonoPInvokeCallback]` attributes. In the following example, 10 wrapper functions are reserved for functions with LuaFunction signature.

```csharp
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
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
