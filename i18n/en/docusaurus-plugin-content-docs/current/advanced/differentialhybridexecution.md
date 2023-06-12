# Differential Hybrid Execution

HybridCLR pioneered the implementation of Differential Hybrid Execution (DHE) differential hybrid execution technology. That is, you can add, delete, or modify the AOT dll at will, and intelligently make the changed or newly added classes and functions run in interpreter mode, but the unchanged classes and functions run in AOT mode, so that the running performance of the hot-updated game logic basically reaches the original AOT level.

:::tip
DHE is only included in **Enterprise Ultimate Edition**, please refer to [Commercial Services](/en/other/business.md) for details.
:::

## principle

Put the assembly marked as DHE into the main package, and then load the latest hot update dll after running. During the execution process, when calling a function of a DHE assembly, if the function has not changed, the native AOT implementation will be called directly, otherwise the latest code will be executed in an interpreted manner.
Since the two versions often do not modify too much code in practice, DHE can basically approach the native performance level.

## Features and Benefits

- The performance of the unchanged part of the code is exactly the same as that of the native version, which is an astonishing **3-30** times or even higher than the purely interpreted version, and the overall performance almost reaches the native performance level.
- The code can be changed arbitrarily, there is basically no intrusion to the code, there are almost no special precautions, and the usage method is similar to the community version.
- The workflow is simple, you don't need to mark which functions have changed like xxxfix and other solutions, and the tools will automatically handle them
- Retrofits to items cost less than pure hot update versions. For example, extern functions can be defined directly in DHE without moving to the AOT module.
- The advanced version includes **interpretation instruction optimization, and the performance of most numerical calculation instructions in the changed part is improved by 100-300% or more**, further greatly improving the performance level.
- The native code is all in the package body, the risk of being rejected by iOS is greatly reduced

## Unsupported feature

- Any code in the AOT assembly corresponding to DHE cannot be executed before the DHE hot update code is loaded. It means that DHE does not support differential mixing of basic libraries like mscorlib, but supports differential hot update of traditional hot update assembly.
- Due to the first restriction, `[InitializeOnLoadMethod]` and `Script Execution Order settings` are not supported in DHE assemblies.
- DHE scripts are not supported to be mounted in package resources, including Resources. (This restriction will be relaxed or removed in the future)
- Cannot add extern function in DHE assembly through hot update.

## Install

Unzip the libil2cpp-xxx.7zip package we provided, enable the copy libil2cpp from local option in the `Installer`, point the directory to the libil2cpp directory extracted from it, and then execute the installation.

## configuration

### Configure the assembly that requires differential mixed execution

Open the configuration dialog through the `HybridCLR/Settings` menu, and add the assemblies that require differential hybrid execution to differentialHybridAssemblies (differential hybrid execution dlls).
The workflow of the differential mixed execution assembly is different from that of the ordinary pure hot update assembly, because the pure hot update assembly does not need to be packaged into the main project. Therefore, the same assembly** cannot be added at the same time**
list of differentialHybridAssemblies and hotUpdateAssemblies. `RuntimeApi::LoadDifferentialHybridAssembly` must be executed before any code that executes the differential hybrid assembly,
Therefore, not all assemblies can be configured as differential mixed execution assemblies, because system assemblies such as mscorlib run very early. Fortunately, assemblies like mscorlib have no need for differential mixed execution.
Most game logic assemblies are executed after the hot update, which satisfies the conditions for differential mixed execution.

### Configure the backup directory of the original AOT dll

This directory is used to save the AOT dll generated during packaging. Every time a dhao file is generated later, the dll in this directory is used as the original AOT dll.
Due to frequent temporary packaging, AOT dll does not need to be backed up in most cases, so the backup behavior needs to manually call the `HybridCLR/CreateAOTDllSnapshot` menu command.

!> When you officially release the package, you must remember to back up the AOT dll by yourself or use this command after packaging, and submit it to your version management system.

### Configure the export directory of the configuration data of the assembly executed by the differential hybrid

Configure `differentialHybridOptionOutputDir` field in HybridCLRSetting. Using `HybridCLR/generate/DHEAssemblyOptionDatas` will generate a `<assembly>.dhao.bytes` file for each differential hybrid assembly.

Loading a differential hybrid execution assembly requires some configuration data. For example, which functions are changed are calculated offline, so that there is no need to determine whether the function has changed at runtime. The configuration data is passed in as a parameter when calling `RuntimeApi::LoadDifferentialHybridAssembly`.

### Mark function information

At present, the function of change can be automatically calculated without manual operation. But it also supports manually using `[Unchanged]` to mark which functions have not changed.

!> It is strongly recommended not to manually tag your own. Because the compiler often generates some hidden classes or fields, these class names are not stable. The C# code that looks the same on the surface may not actually generate the same code.

## used in the code

At runtime, after completing the hot update, for each hybrid execution assembly, call `RuntimeApi::LoadDifferentialHybridAssembly` to load the hot update assembly. Generally speaking, the passed parameters are compiled by `HybridCLR/CompileDll/xxx`
Hot update dll and dhao data generated by `HybridCLR/Generate/DHEAssemblyOptionDatas`. But when it was just released and there was no hot update version, the passed parameters were `AOT dll generated during packaging` and `null dhao data`.

Precautions:

- To load the differential hybrid execution assembly in the order of its dependencies.
- If a certain assembly has not changed, the dhao field can pass null, but at this time, the AOT dll generated during packaging must be used instead of the hot update dll generated by the `HybridCLR/CompileDll/xxx` command.

The sample code is as follows.

```csharp
void InitDifferentialHybridAssembly(string assemblyName)
{
     // When there is no hot update, the passed parameter is null.
     byte[] dhaoBytes = needHotUpdate ? GetAssemblyOptionData(assemblyName) : null;
     LoadImageErrCode err = RuntimeApi.LoadDifferentialHybridAssembly(GetAssemblyData(assemblyName), dhaoBytes);
}
```

## Pack

- If the **development build option** is used for packaging, please be sure to use `HybridCLR/CompileDll/ActivedBuildTarget_Development` to compile the hot update dll in Development mode, otherwise the comparison result is that almost all functions are judged to have changed.
- Run `HybridCLR/CreateAOTDllSnapshot` to back up the AOT file and add it to the version management system. Notice! Due to the instability generated by clipping AOT dll, do not try to save trouble with the AOT dll generated by the `HybridCLR/Generate/All` command.
- Since the DHE assembly is the latest when packaging, there is no change, so there is no need to carry the dhao file.
- If you want to carry the aot dll corresponding to the DHE assembly with the package, according to your BuildTarget:
   -iOS. After exporting the xcode project, copy the DHE dll under `{proj}/HybridCLRData/AssembliesPostIl2CppStrip/{buildTarget}` to the StreamingAssets directory (or subdirectory)
   -Android. If you export the gradle project first and then package it, it is the same as iOS. Otherwise, you can create a new Editor script, implement the `IPostGenerateGradleAndroidProject` interface, and copy the generated DHE AOT assembly to the gradle project in the OnPostGenerateGradleAndroidProject event.

```csharp

// sample code
public class CopyDHEAOTDllsToAndroidProject : IPostGenerateGradleAndroidProject
{
     public int callbackOrder => 0;

     public void OnPostGenerateGradleAndroidProject(string path)
     {
         BuildTarget target = EditorUserBuildSettings. activeBuildTarget;
         string pathInGradleProjectOfStreamingAssets = "xxx"; // Path of the StreamingAssets directory in the exported gradle project
         HybridCLR.Editor.Installer.BashUtil.CopyDir(SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target), pathInGradleProjectOfStreamingAssets);
     }
}

```

## Hot update

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dll.
- Make sure you have run `HybridCLR/CreateAOTDllSnapshot` to back up the AOT file, and make sure that the AOT dll in the backup directory is the AOT dll generated during packaging.
- Use `HybridCLR/generate/DHEAssemblyOptionDatas` to generate dhao files.

!> Because the working principle of DHEAssemblyOptionDatas is to compare the latest hot update `DHE dll` with the aot dll in the backup directory of the original AOT dll, and generate changed function and type information. Please be sure to ensure hot update dll and backup
The correctness of the AOT dll!