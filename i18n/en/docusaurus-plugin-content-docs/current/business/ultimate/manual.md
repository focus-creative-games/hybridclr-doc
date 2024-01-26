# manual

## Install

- Unzip hybridclr_unity.zip, place it in the project Packages directory, and rename it com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Place the hybridclr directory after decompression of `hybridclr.zip` into the libil2cpp directory after decompression of `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory you just decompressed, and install it.
- Depending on your Unity version:
     - If version >= 2020, replace the `ModifiedDlls\{verions}\Unity.IL2CPP.dll` file with `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll` (Unity 2020) or `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll` (Unity 2021+). If there is no file corresponding to your version, contact us to make one.
     - If the version is 2019, no operation is required because it has been automatically copied during the Install process

![installer](/img/hybridclr/ultimate-installer.jpg)


## Configuration

### Configure PlayerSettings

- `Scripting Backend` switched to `IL2CPP`
- `Api Compatability Level` switched to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)


### Enable incremental GC

Just enable the `use incremental GC` option in `Player Settings`, and there is no need to make any settings for HybridCLR.

### Enable full generic sharing

- The 2020 version does not support full generic sharing
- The 2021 version requires setting the IL2CPP Code Generation option to `faster(smaller)`
- The 2022 version enables full generic sharing by default and cannot be turned off. If you set the IL2CPP Code Generation option to `faster(smaller)`, you can further reduce the package body.


## Turn on and off standard command optimization

Standard optimization is enabled by default. This feature can be actively controlled to be turned on or off through the `RuntimeApi.EnableTransformOptimization` function.

Standard instruction optimization and advanced instruction optimization are two completely independent and mutually exclusive features. For each interpreted function, you can only choose to use one of the two or not use them at all.

### Configure HybridCLR

As with the community version, click the `HybridCLR/Settings` menu to open the configuration dialog.

| Field | Description |
|-|-|-|
|differentialHybridAssemblies|DHE assembly list. Add the assembly name that requires differential hybrid execution to this list, such as HotUpdate. The same assembly cannot be added to the differentialHybridAssemblies and hotUpdateAssemlies lists at the same time. |


### Reserve all DHE assemblies in link.xml

For user-owned code such as Assembly-CSharp, il2cpp generally does not cut it. However, for third-party assemblies that are directly added to Unity in the form of dlls, if all are not reserved, these dlls will be cut during packaging.
Then there are huge changes when generating dhao files, which is obviously not what we expect.

Add similar configuration `<assembly fullname="YourExternDll" preserve="all"/>` in `Assets/link.xml` (or other custom link.xml) for all your dhe assemblies.

## dhao file

The dhao file is the core concept of DHE technology. The dhao file contains information about the changed types and functions in the latest hot update dll calculated offline. The runtime determines whether to use the latest interpreted version or directly call the original function when executing a hot update function based on the information in the dhao file. AOT function.
Offline calculated dhao files are extremely critical for DHE technology. If there is no dhao file, the original AOT dll needs to be carried additionally, and the cost of calculating function changes is extremely high.

By comparing the latest hot update dll with the AOT dll generated during packaging, the changed types and functions are calculated offline and saved as a dhao file. Therefore, for the DHE mechanism to work properly, it must rely on the correctness of the dhao file, and the correctness of the dhao file
It relies on accurately providing the latest hot update dll and the AOT dll generated during packaging.


`HybridCLR.Editor.DHE.BuildUtils` provides multiple functions related to generating dhao files.

|function name|description|
|-|-|
|GenerateUnchangedDHAODatas|Generate the dhao file of the first package (that is, when no changes have occurred)|
|GenerateDHAODatas|Generate dhao files for hot update packages (that is, when code changes)|
|EncryptDllAndGenerateUnchangedDHAODatas|When the primary code reinforcement is turned on, the encrypted dll and dhao files are generated in the first package (that is, when no changes have occurred)|
|EncryptDllAndGenerateDHAODatas|When the primary code reinforcement is turned on, the encrypted dll and dhao files are generated in the hot update package (that is, when the code changes)|


## Mark changed function information

At present, it is possible to automatically calculate the changed function by comparing the latest hot update dll with the aot dll generated during packaging. In most cases, manual operation is not required. But in fact, there is no perfect code that can judge logical equivalence.
The tool simply compares IL one by one to determine equivalence. Sometimes it may happen that the functions are equivalent but the IL changes (such as changing the order of two lines of unrelated code), it will be judged as a function change and the execution will be switched to interpretation.
If this happens, and there are extremely stringent performance requirements for the function, the developer can manually use the UnchangedAttribute attribute to mark the change of the function.
`[Unchanged]` and `[Unchanged(true)]` represent unchanged, `[Unchanged(false)]` represents change, and unmarked features are automatically calculated by the tool.

Incorrectly marking an unchanged function as changed will not affect the correctness of the run, only performance. Even if all hot update functions are marked as changes, they can still run normally. However, incorrectly marking the changed function as unchanged will not only cause errors in the running logic, but
In severe cases, it can even cause a crash!

:::caution
Unless there are special circumstances and you are an experienced expert, do not mark manually. Because the compiler often generates some hidden classes or fields, these class names are not stable. C# code that looks the same on the surface may not actually generate the same code. Forcibly marking it as `[Unchanged]` will lead to incorrect running logic or even crash.
:::

## Used in code

At runtime, after hot update is completed, for each dhe assembly, call `RuntimeApi::LoadDifferentialHybridAssembly` or `RuntimeApi::LoadDifferentialHybridAssemblyUnchecked` to load the hot update assembly.

Precautions:

- Differential hybrid execution assembly should be loaded according to assembly dependency order.
- If an assembly has not changed, the dhao field can be passed as null, but in this case the AOT dll generated during packaging must be used, and the hot update dll generated through the `HybridCLR/CompileDll/xxx` command cannot be used.
- The DHE assembly itself already contains metadata. Even if full generic sharing is not enabled, **Do not add metadata** to the DHE assembly. If you add it, it will fail. Other non-DHE AOT assemblies can be added as usual. metadata.


`RuntimeApi::LoadDifferentialHybridAssembly` is a checked workflow. It needs to pass in the md5 of the original dhe dll and the md5 of the current dhe dll, and compare them with the md5 saved in the dhao file.
For the originalDllMd5 and currentDllMd5 parameters, the complexity of the workflow is greatly increased.

:::tip

It is recommended that beginners use the checked workflow in demo projects. After becoming familiar with the workflow, they can use the unchecked workflow in formal projects.
:::

### use unchecked `RuntimeApi::LoadDifferentialHybridAssembly`

```csharp title="Loading DHE assembly"

public static string CreateMD5Hash(byte[] bytes)
{
     return BitConverter.ToString(new MD5CryptoServiceProvider().ComputeHash(bytes)).Replace("-", "").ToUpperInvariant();
}

///
/// originalDllMd5 is obtained from the `{manifest}` manifest file generated during the build. This manifest file is generated by the developer himself
///
void LoadDifferentialHybridAssembly(string assemblyName, string originalDllMd5)
{
     // currentDllMd5 can be generated at runtime or offline and in advance when a hot update package is released.
     string currentDllMd5 = CreateMD5Hash(dllBytes);
     LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes, originalDllMd5, currentDllMd5);
     if (err == LoadImageErrorCode.OK)
     {
         Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");
     }
     else
     {
         Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
     }
}
```

### use checked  `RuntimeApi::LoadDifferentialHybridAssemblyUnchecked`

:::warning

When using a unchecked workflow, be sure to ensure the consistency of the original dhe dll, current dhe dll, and dhao files. If they are inconsistent, an operation error may occur, or the process may crash.

:::

```csharp title="Loading DHE assembly"

///
/// originalDllMd5 is obtained from the `{manifest}` manifest file generated during the build. This manifest file is generated by the developer himself
///
void LoadDifferentialHybridAssembly(string assemblyName)
{
     LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyUnchecked(dllBytes, dhaoBytes);
     if (err == LoadImageErrorCode.OK)
     {
         Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");
     }
     else
     {
         Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
     }
}
```


## Configure function injection strategy

:::tip

In the vast majority of projects, the default full injection strategy has minimal impact on performance. As long as there are no performance issues, you do not need and should not care about this configuration.

:::

  In order to avoid indirect dirty function contagion (that is, function A calls function B, if B changes, A will also be marked as changed), a small piece of check jump code is injected into the header of all functions by default. Although it is
  Very simple `if (method->isInterpterImpl)` statement, but for short functions like `int Age {get; set;}`, this insertion may produce an observable performance degradation (even up to 10%).

The function injection strategy is used to optimize this situation. For short functions that do not change, configuring not to inject can improve performance. See the [InjectRules](./injectrules) document for details.

Fill in the injection policy file path in the `InjectRuleFiles` field in `HybridCLR Settings`. The relative path of the file is the project root directory (such as `Assets/InjectRules/DefaultInjectRules.xml`).


## Pack

The files related to construction in DHE technology are dhe dll files and corresponding dhao files.

### Non-encrypted workflow

#### Build the main package

- Use the trimmed AOT dll generated after building as the dhe dll of the first package (without any changes)
- Use `HybridCLR.Editor.DHE.BuildUtils.GenerateUnchangedDHAODatas` to generate the dhao file of the first package

If using a checked workflow, do the following:

- Generate a `{manifest}` manifest file for dhe dll that contains at least assemblyName, md5 (it is up to the developer to decide how to implement it), because `RuntimeApi.LoadDifferentialHybridAssembly` needs to provide the original md5 of dhe dll
- Add dhe dll, dhao files and `{manifest}` files to the hot update resource management system

If you use a workflow without validation, do the following:

- Add dhe dll and dhao files to the hot update resource management system

If you want to carry the dhe dll and dhao files of the first package with the package, please export the project first, then follow the above steps to generate the dhe dll and dhao files, and then add them to the exported project.


#### Hot update

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dll.
- Use `HybridCLR.Editor.DHE.BuildUtils.GenerateDHAODatas` to generate the latest hot update dll dhao file
- Add the latest hot update dll and dhao files to the hot update resource management system

:::caution

If you package using the **development build option**, be sure to use `HybridCLR/CompileDll/ActivedBuildTarget_Development` to compile the hot update dll in Development mode. Otherwise, the comparison result is that almost all functions are judged to have changed.

:::

### Encryption workflow

#### Build the main package

- Use the cropped AOT dll generated after the build as the original dhe dll
- Use `HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateUnchangedDHAODatas` to generate the dhao file of the first package and the encrypted dhe dll file

If using a checked workflow, do the following:

- Generate a `{manifest}` manifest file for dhe dll that contains at least assemblyName, md5 (it is up to the developer to decide how to implement it), because `RuntimeApi.LoadDifferentialHybridAssembly` needs to provide the original md5 of dhe dll
- Add the encrypted dhe dll, dhao files and `{manifest}` files to the hot update resource management system

If you use a workflow without validation, do the following:

- Add the encrypted dhe dll and dhao files to the hot update resource management system


#### Hot update

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dll.
- Use `HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateDHAODatas` to generate the latest dhe dll encrypted file and the corresponding dhao file
- Add the encrypted dhe dll and dhao files to the hot update resource management system

## Feature not supported

- Does not support turning on the `script debugging` build option

## Precautions

### There are huge differences in the results of calculating dhao caused by external dll

If there is an external dll marked as a DHE assembly, the external dll will be trimmed when packaged, and when calculating the dhao file, the original external dll will be taken, resulting in a huge difference, which is not expected. There are several solutions:

1. In link.xml `<assembly fullname="YourExternDll" preserve="all"/>` completely retains the external dll
2. Instead of using the latest hot update dll to calculate the difference, use the aot dll generated when the latest code is repackaged to calculate the difference.
