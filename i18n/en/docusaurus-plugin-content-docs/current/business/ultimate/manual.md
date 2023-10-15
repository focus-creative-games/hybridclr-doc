# manual

## Install

- After decompressing hybridclr_unity.zip, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr
- Decompress the corresponding `libil2cpp-{version}.7z` according to your unity version
- Open `HybridCLR/Installer`, enable the `copy libil2cpp from local` option, select the libil2cpp directory you just decompressed, and install
- Replace `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll` with `ModifiedDlls\{verions}\Unity.IL2CPP.dll` according to your Unity version ( Unity 2020) or `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll` (Unity 2021+). If your version is not available, contact us to make one

![installer](/img/hybridclr/ultimate-installer.jpg)

:::caution

After completing the installation in the Installer, be sure to replace Unity.IL2CPP.dll, otherwise the DHE mechanism will not work properly.

:::

## configuration

### Configure PlayerSettings

- `Scripting Backend` switched to `IL2CPP`
- `Api Compatability Level` switched to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)


### Enable full generic sharing

- The 2020 version does not support fully generic sharing
- The 2021 version needs to set the IL2CPP Code Generation option to `faster(smaller)`
- Full generic sharing is enabled by default in the 2022 version and cannot be turned off. If you set the IL2CPP Code Generation option to `faster(smaller)`, you can further reduce the package body.

### Configure HybridCLR

As with the community version, click the `HybridCLR/Settings` menu to open the configuration dialog.

| Field | Description|
|-|-|-|
|differentialHybridAssemblies|List of DHE assemblies. Add the name of the assembly that needs differential hybrid execution to this list, such as HotUpdate. The same assembly** cannot be added to the **differentialHybridAssemblies and hotUpdateAssemlies lists at the same time. |
|strippedAOTDllSnapshotDir| is used to save the AOT dll generated during packaging. Works with the `HybridCLR/CreateAOTDllSnapshot` menu command. |
|differentialHybridOptionOutputDir|Generation directory of dhao files|

### Reserve all DHE assemblies in link.xml

For the user's own code such as Assembly-CSharp, il2cpp generally does not cut it. But for the third-party assemblies that are directly added to Unity in the form of dll, if you do not reserve all of them, these dlls will be cut when packaging, resulting in huge changes when generating dhao files.
Add similar configuration `<assembly fullname="YourExternDll" preserve="all"/>` for all your dhe assemblies in `Assets/link.xml` (or other custom link.xml).

## dhao file

The dhao file is the core concept of DHE technology. The dhao file contains information about the types and functions changed in the latest hot update dll that has been calculated offline. When running a hot update function directly based on the information in the dhao file, whether to use the latest interpreted version or directly call the original The AOT function.
The dhao file calculated offline is extremely critical for DHE technology. If there is no dhao file, the original AOT dll needs to be carried additionally, and the cost of calculating function changes is extremely high.

By comparing the latest hot update dll with the AOT dll generated during packaging, the changed type and function are calculated offline and saved as a dhao file. Therefore, in order for the DHE mechanism to work normally, it must depend on the correctness of the dhao file, and the correctness of the dhao file
It relies on providing the latest hot update dll and AOT dll generated during packaging.

When the `HybridCLR/generate/DHEAssemblyOptionDatas` command generates a dhao file, the latest hot update dll is read from the `{hotUpdateDllCompileOutputRootDir}/{target}` directory by default,
Read the AOT dll generated during packaging from the `{strippedAOTDllSnapshot}/{target}` directory. AOT dll will be automatically generated and copied to the `{strippedAOTDllOutputRootDir}/{target}` directory when packaging,
However, in order to avoid accidental overwriting of the AOT dll generated during subsequent temporary packaging, it will not be automatically copied to the `{strippedAOTDllSnapshot}/{target}` directory, and `HybridCLR/CreateAOTDllSnapshot` needs to be executed manually.

:::tip
When the App is officially released, you must immediately call the `HybridCLR/CreateAOTDllSnapshot` command to copy the AOT dll to the snapshot directory to ensure the correctness of the generated dhao file.
:::


## Mark the function information of the change

At present, it is possible to automatically calculate the changed function by comparing the latest hot update dll with the aot dll generated during packaging. In most cases, manual operation is not required. But in fact, there is no perfect code that can judge logical equivalence.
The tool simply compares IL one by one to determine equivalence. Occasionally, it is possible that the functions are equivalent but the IL changes (for example, the order of two unrelated lines of code is swapped), which will be judged as a function change and the execution will be switched to interpretation.
If this happens, and there are extremely stringent performance requirements for the function, the developer can manually use the UnchangedAttribute attribute to mark the variability of the function.
`[Unchanged]` and `[Unchanged(true)]` represent unchanged, `[Unchanged(false)]` represents change, and unmarked features are automatically calculated by the tool.

## used in the code

At runtime, after completing the hot update, for each hybrid execution assembly, call `RuntimeApi::LoadDifferentialHybridAssembly` to load the hot update assembly. Generally speaking, the passed parameters are compiled by `HybridCLR/CompileDll/xxx`
Hot update dll and dhao data generated by `HybridCLR/Generate/DHEAssemblyOptionDatas`. However, for new releases and no hot updates, the passed parameters are `AOT dll generated during packaging` and `null dhao data`.

:::caution
When releasing a new package, you can also use the hot update dll compiled by `HybridCLR/CompileDll/xxx` and the dhao data generated by `HybridCLR/Generate/DHEAssemblyOptionDatas`. But the initial package obviously has not changed, and it is unnecessary to calculate and carry the dhao file.
Note that at this time you cannot use the hot update dll compiled by `HybridCLR/CompileDll/xxx` to replace the `AOT dll generated during packaging`, because the compilation is unstable, they may not be the same, and it may cause serious crashes.
:::

Precautions:

- To load the differential hybrid execution assembly in the order of its dependencies.
- If a certain assembly has not changed, the dhao field can pass null, but at this time, the AOT dll generated during packaging must be used instead of the hot update dll generated by the `HybridCLR/CompileDll/xxx` command.
- The DHE assembly itself already contains metadata. Even if the full generic sharing is not enabled, **Do not add metadata to the DHE assembly**. If it is supplemented, it will fail. Other non-DHE AOT assemblies can be supplemented as usual metadata.

```csharp title="Load DHE assembly"
void InitDifferentialHybridAssembly(string assemblyName)
{
     // When there is no hot update, the passed parameter is null.
     byte[] dhaoBytes = needHotUpdate ? GetAssemblyOptionData(assemblyName) : null;
     LoadImageErrCode err = RuntimeApi.LoadDifferentialHybridAssembly(GetAssemblyData(assemblyName), dhaoBytes);
}
```

## Pack

After generating the AOT dll in the packaging pipeline, run `HybridCLR/CreateAOTDllSnapshot` to back up the AOT files and add them to the version management system, because they will be needed for future hot updates to generate dhao files. Notice! Do not use AOT dll generated by `HybridCLR/Generate/All` command due to the instability generated by clipping AOT dll.

Since the DHE mechanism needs to provide the dhe assembly to work normally, when no hot update occurs, the DHE assembly is equivalent to the AOT assembly generated during packaging, **at this time, there is no need to provide the dhao file**. Although these assemblies can be downloaded via HotUpdate, it is highly recommended to carry them with the package.

### Carry the DHE assembly with the package

If you want to carry the AOT dll corresponding to the DHE assembly with the package, according to your BuildTarget:

-iOS. Add `IPostprocessBuildWithReport` processing class, copy the DHE dll under `{proj}/HybridCLRData/AssembliesPostIl2CppStrip/{buildTarget}` to the StreamingAssets directory (or subdirectory) in the OnPostprocessBuild function. You can also manually copy after exporting the project
-Android. **If you export the gradle project first and then package it, it is the same as iOS**. If the APK package is exported directly, add the `IPostGenerateGradleAndroidProject` processing class, and copy the generated DHE AOT assembly to the gradle project in the OnPostGenerateGradleAndroidProject event

```csharp title="Copy DHE assembly during building pipeline"

// After iOS or Android exports the project, copy the file to the project
public class CopyDHEAOTDllsToProject : IPostprocessBuildWithReport
{
     public int callbackOrder => 0;

     public void OnPostprocessBuild(BuildReport report)
     {
         BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
         YourCopyDHEAssembliesToStreamingAssetsOrAssetBundle();
     }
}

/// After generating the Gradle project, copy the required files
public class CopyDHEAOTDllsToAndroidProject : IPostGenerateGradleAndroidProject
{
     public int callbackOrder => 0;

     public void OnPostGenerateGradleAndroidProject(string path)
     {
         BuildTarget target = EditorUserBuildSettings. activeBuildTarget;
         YourCopyDHEAssembliesToStreamingAssetsOrAssetBundle();
     }
}

```

:::caution

If the **development build option** is used for packaging, please be sure to use `HybridCLR/CompileDll/ActivedBuildTarget_Development` to compile the hot update dll in Development mode, otherwise the comparison result is that almost all functions are judged to have changed.

:::

## Hot update

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dll.
- Make sure you have run `HybridCLR/CreateAOTDllSnapshot` to back up the AOT file, and make sure that the AOT dll in the backup directory is the AOT dll generated during packaging.
- Use `HybridCLR/generate/DHEAssemblyOptionDatas` to generate dhao files.

:::caution
Because the working principle of DHEAssemblyOptionDatas is to compare the latest hot update `DHE dll` with the AOT dll in the backup directory of the original AOT dll, and generate changed function and type information. Please be sure to ensure hot update dll and backup
The correctness of the AOT dll!
:::

## Precautions

### There are huge differences in the results of calculating dhao caused by external dlls

If an external dll is marked as a DHE assembly, since the external dll will be trimmed when it is packaged, and the original external dll is taken when calculating the dhao file, resulting in a huge difference, which is not expected. There are several solutions:

1. `<assembly fullname="YourExternDll" preserve="all"/>` in link.xml to completely preserve the external dll
2. Do not use the latest hot update dll to calculate the difference, but use the aot dll generated when the latest code is repackaged to calculate the difference. This requires you to modify the code related to calculating dhao yourself, and use the `AssembliesPostIl2CppStrip` directory to compare with the `AOTDllSnapshot` directory.
