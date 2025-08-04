# Quick Start

Please successfully run the hot update process on Win64 or MacOS Standalone platforms before attempting hot updates on Android and iOS platforms.

The Ultimate edition has similar difficulty to the Community edition, with most principles being the same. It is recommended to familiarize yourself with the Community edition before trying the Ultimate edition.

## Install Unity, IDE and Related SDKs

This step is exactly the same as the Community edition, see [Install HybridCLR](../../basic/install.md) for details.

## Create Unity Hot Update Project from Scratch

The process of constructing a hot update project from scratch is quite lengthy. The code involved in the following steps can be referenced from the dhe_demo project, whose repository address is [github](https://github.com/focus-creative-games/dhe_demo).

### Create Project

Create an empty Unity project.

### Install HybridCLR

- Extract hybridclr_unity.zip and place it in the project's Packages directory, rename it to com.code-philosophy.hybridclr
- Extract the corresponding `il2cpp_plus-{version}.zip` according to your Unity version
- Extract `hybridclr.zip`
- Place the hybridclr directory from the extracted `hybridclr.zip` into the libil2cpp directory from the extracted `il2cpp-{version}.zip`. Ensure that the file `libil2cpp\hybridclr\RuntimeApi.cpp` exists, otherwise the hybridclr directory is in the wrong location.
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory that was just extracted, and perform the installation
- According to your Unity version:
  - If version >= 2023,
    - First install Unity 2022.3.60f1
    - Copy the `2022.3.60f1\Editor\Data\il2cpp\build\deploy` directory as `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\deploy-2022`
    - Replace the `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\deploy-2022\Unity.IL2CPP.dll` file with `ModifiedDlls\2022.3.60f1\Unity.IL2CPP.dll`
  - If version >= 2021, replace `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll` with `ModifiedDlls\{versions}\Unity.IL2CPP.dll`
  - If version >= 2020, replace `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll` with `ModifiedDlls\{versions}\Unity.IL2CPP.dll`
  - If version is 2019, no action is needed as it's automatically copied during the Install process

If there's no corresponding file for your version, contact us to create one.

![installer](/img/hybridclr/ultimate-installer.jpg)

### Configure PlayerSettings

- Switch `Scripting Backend` to `IL2CPP`
- Switch `Api Compatibility Level` to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

### Create Main Scene

- Create the default initial scene main.scene
- Add the main scene to the build scene list in `Build Settings`

### Create HotUpdate Hot Update Module

- Create the `Assets/HotUpdate` directory
- Right-click in the directory and select `Create/Assembly Definition`, create an assembly module named `HotUpdate`

### Configure HybridCLR

- Open menu `HybridCLR/Settings`
- Add the `HotUpdate` assembly to the `differentialHybridAssemblies` list

![settings](/img/hybridclr/ultimate-hybridclr-settings.jpg)

## Create Editor Script

Create a BuildTools.cs file in the `Assets/Editor` directory with the following content:

```csharp

using HybridCLR.Editor;
using HybridCLR.Editor.DHE;
using HybridCLR.Runtime;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

public static class BuildTools
{
    public static string GetAOTSnapshotDir(BuildTarget target)
    {
        return $"{SettingsUtil.HybridCLRDataDir}/Snapshot/{target}";
    }

    [MenuItem("Build/CreateAotSnapshot")]
    public static void CreateAOTSnapshot()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string snapshotDir = GetAOTSnapshotDir(target);
        MetaVersionWorkflow.CreateAotSnapshot(target, snapshotDir);

        MetaVersionWorkflow.GenerateAotSnapshotMetaVersionFiles(null, snapshotDir);
    }

    //[MenuItem("Build/GenerateHotUpdateMetaVersionFiles")]
    public static void GenerateHotUpdateMetaVersionFiles()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        GenerateHotUpdateMetaVersionFiles(target);
    }

    public static void GenerateHotUpdateMetaVersionFiles(BuildTarget target)
    {
        var latestSnapshotSolutionDir = GetAOTSnapshotDir(target);
        var newHotUpdateSolutionDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        MetaVersionWorkflow.GenerateHotUpdateMetaVersionFiles(latestSnapshotSolutionDir, newHotUpdateSolutionDir);
    }

    [MenuItem("Build/CompileAndGenerateHotUpdateMetaVersionFiles")]
    public static void CompileAndGenerateHotUpdateMetaVersionFiles()
    {
        CompileDllCommand.CompileDllActiveBuildTarget();
        GenerateHotUpdateMetaVersionFiles();
    }

    private static void CopyOriginalMetaVersions(string originalMetaVersionDir, string outputMetaVersionDir)
    {
        Directory.CreateDirectory(outputMetaVersionDir);
        foreach (var dll in SettingsUtil.DifferentialHybridAssemblyNames)
        {
            string srcMetaVersionFile = $"{originalMetaVersionDir}/{dll}.mv.bytes";
            string dstMetaVersionFile = $"{outputMetaVersionDir}/{dll}.mv.bytes";
            System.IO.File.Copy(srcMetaVersionFile, dstMetaVersionFile, true);
            Debug.Log($"Copy: {srcMetaVersionFile} -> {dstMetaVersionFile}");
        }
    }

    [MenuItem("Build/CopyHotUpdateDllAndMetaVersionFilesToHotUpdateDataDir")]
    public static void CopyHotUpdateDllAndMetaVersionFilesToHotUpdateDataDir()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string outputHotUpdateResDir = $"{Application.dataPath}/../HotUpdateSnapshot/{target}";
        BashUtil.RecreateDir(outputHotUpdateResDir);


        // Copy OriginalMetaVersions
        // For convenience in demo projects, this directory is copied only when publishing hot updates.
        // In actual projects, it's recommended to copy this directory to the StreamingAssets directory during CreateAotSnapshot and publish with the package.
        CopyOriginalMetaVersions(Snapshot.GetMetaVersionDir(GetAOTSnapshotDir(target)), $"{outputHotUpdateResDir}/OriginalMetaVersions");

        // Copy HotUpdate dlls and meta version files
        string hotUpdateSnapshotDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        foreach (var dll in SettingsUtil.DifferentialHybridAssemblyNames)
        {
            // copy dll
            string srcFile = $"{hotUpdateSnapshotDir}/{dll}.dll";
            string dstFile = $"{outputHotUpdateResDir}/{dll}.dll.bytes";
            System.IO.File.Copy(srcFile, dstFile, true);
            Debug.Log($"Copy: {srcFile} -> {dstFile}");

            // copy MetaVersion files
            string srcMetaVersionFile = $"{Snapshot.GetMetaVersionDir(hotUpdateSnapshotDir)}/{dll}.mv.bytes";
            string dstMetaVersionFile = $"{outputHotUpdateResDir}/{dll}.mv.bytes";
            System.IO.File.Copy(srcMetaVersionFile, dstMetaVersionFile, true);
            Debug.Log($"Copy: {srcMetaVersionFile} -> {dstMetaVersionFile}");
        }
    }
}


```

## Create Hot Update Script

Create the `Assets/HotUpdate/Hello.cs` file with the following code content:

```csharp
using System.Collections;
using UnityEngine;

public class Hello
{
    public static void Run()
    {
        // Original code
        Debug.Log("Hello, World");
        // After hot update, change to
        // Debug.Log("Hello, HybridCLR");
    }
}
```

## Load Hot Update Assembly

To simplify the demonstration, we won't download HotUpdate.dll through an HTTP server, but directly place HotUpdate.dll in the StreamingAssets directory.

Create the `Assets/LoadDll.cs` script, then **create a GameObject in the main scene and attach the LoadDll script**.


```csharp
using HybridCLR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public class LoadDll : MonoBehaviour
{

    void Start()
    {
        // In Editor environment, HotUpdate.dll.bytes is already automatically loaded, no need to load, repeated loading will cause problems.
#if !UNITY_EDITOR
        LoadDifferentialHybridAssembly("HotUpdate");
#endif
        Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
        Type helloType = hotUpdateAss.GetType("Hello");
        MethodInfo runMethod = helloType.GetMethod("Run");
        runMethod.Invoke(null, null);
    }

    private void LoadDifferentialHybridAssembly(string assName)
    {
        string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
        // If it doesn't exist, use the original AOT assembly
        if (!File.Exists(assFile))
        {
            LoadImageErrorCode err = RuntimeApi.LoadOriginalDifferentialHybridAssembly(assName);
            if (err == LoadImageErrorCode.OK)
            {
                Debug.Log($"LoadOriginalDifferentialHybridAssembly {assName} OK");
            }
            else
            {
                Debug.LogError($"LoadOriginalDifferentialHybridAssembly {assName} failed, err={err}");
            }
        }
        else
        {
            byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");
            byte[] currentMetaVersionBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.mv.bytes");
            byte[] originalMetaVersionBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/OriginalMetaVersions/{assName}.mv.bytes");
            LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyWithMetaVersion(dllBytes,
                null,
                originalMetaVersionBytes,
                currentMetaVersionBytes
                );
            if (err == LoadImageErrorCode.OK)
            {
                Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");
            }
            else
            {
                Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
            }
        }
    }
}


```

At this point, the entire hot update project creation is complete!!!

## Test Run in Editor

Run the main scene, and the Console window will print 'Hello, World', indicating that the code is working properly.

## Build Game

- Run menu `HybridCLR/Generate/All` to perform necessary generation operations. **This step cannot be omitted**!!!
- Open the `Build Settings` dialog, click `Build`, select output directory `{build}`, and execute the build
- Run `Build/CreateAotSnapshot` to create the AOT snapshot generated during build. **This step must be after `Build`**, because the AOT snapshot must copy the dll generated during build, not the dll generated during `HybridCLR/Generate/all`.

The AOT snapshot generated by CreateAotSnapshot contains the following content:

- All AOT dlls
- InjectRules files, which are placed in the InjectRules directory
- Meta version files corresponding to AOT dlls, which are placed in the MetaVersions directory
- manifest.json, mainly recording the DHE assembly list
- signature-mapper.json

:::tip

The AOT snapshot directory created by `Build/CreateAotSnapshot` should be added to version control for generating meta version files for hot update dlls in the future.

:::

## Initial Package Test

- Run `{build}/Xxx.exe`, there should be a `Hello, World` log in the Player Log file, indicating that the original code was executed!

## Test Hot Update

- Please ensure that the `Build Game` step has executed `Build/CreateAotSnapshot`, run it once, don't run it multiple times
- Modify `Debug.Log("Hello, World")` to `Debug.Log("Hello, HybridCLR")` in the `Hello::Run` function
- Run `Build/CompileAndGenerateHotUpdateMetaVersionFiles` to generate hot update dll and corresponding meta version files
- Run `Build/CopyHotUpdateDllAndMetaVersionFilesToHotUpdateDataDir`. It will copy the hot update dll and corresponding meta version files to the `{proj}/HotUpdateSnapshot/{buildTarget}` directory
- Manually copy all files from the `{proj}/HotUpdateSnapshot/{buildTarget}` directory to the `{build}\StreamingAssets` directory
- Run again, there should be a `Hello, HybridCLR` log in the Player Log file

Hot update is now complete!!!
