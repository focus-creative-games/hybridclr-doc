# Get started quickly (unchecked workflow)

This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is the **Windows** or **MacOS** Standalone platform is demonstrated.
Please run the hot update process correctly on the Standalone platform before trying the hot update on the Android and iOS platforms. Their processes are very similar.

The difficulty of using the flagship version is similar to that of the community version, and most of the principles are the same. It is recommended to familiarize yourself with the community version before trying the flagship version.

Since version v5.0.0, both the `RuntimeApi.LoadDifferentialHybridAssembly` workflow with verification and the `RuntimeApi.LoadDifferentialHybridAssemblyUnchecked` workflow without verification are supported.
This document describes the workflow without validation.

:::tip

In practice, the workflow without verification will be much simpler. There is no need to pass the originalDllMd5 and currentDllMd5 parameters, so the process of saving or calculating dll md5 in the workflow is omitted.
However, developers are required to ensure the consistency of aot dll, hot update dll, and dhao files.
It is recommended that beginners use the workflow with verification in demo projects. After becoming familiar with the workflow, they can use the workflow without verification in formal projects.

:::

## Experience goals

- Create hot update assembly
- Load the hot update assembly, execute the hot update code in it, and print `Hello, HybridCLR`
- Modify the hot update code to print `Hello, World`

## Prepare environment

### Install Unity

- Install any version 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x. Some versions have special installation requirements, see [Install hybridclr](../../basic/install.md)
- Depending on the operating system you are using, when selecting modules during the installation process, you must select `Windows Build Support(IL2CPP)` or `Mac Build Support(IL2CPP)`

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

### Install IDE and related compilation environment

- Windows
   - `visual studio 2019` or higher version needs to be installed under Win. The installation must include at least the `Game development using Unity` and `Game development using C++` components.
   - install git
- Mac
   - Requires MacOS version >= 12, xcode version >= 13, for example `xcode 13.4.1, macos 12.4`
   - install git

## Initialize Unity hot update project

The process of constructing a hot update project from scratch is lengthy. The code involved in the following steps can refer to the dhe_demo project, whose warehouse address is [github](https://github.com/focus-creative-games/dhe_demo).

### Create project

Create an empty Unity project.

### Create `ConsoleToScreen.cs` script

This script has no direct effect on demonstrating hot updates. It can print logs to the screen to facilitate locating errors.

Create the `Assets/ConsoleToScreen.cs` script class with the following code:

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConsoleToScreen : MonoBehaviour
{
     const int maxLines = 50;
     const int maxLineLength = 120;
     private string _logStr = "";

     private readonly List<string> _lines = new List<string>();

     public int fontSize = 15;

     void OnEnable() { Application.logMessageReceived += Log; }
     void OnDisable() { Application.logMessageReceived -= Log; }

     public void Log(string logString, string stackTrace, LogType type)
     {
         foreach (var line in logString.Split('\n'))
         {
             if (line.Length <= maxLineLength)
             {
                 _lines.Add(line);
                 continue;
             }
             var lineCount = line.Length / maxLineLength + 1;
             for (int i = 0; i < lineCount; i++)
             {
                 if ((i + 1) * maxLineLength <= line.Length)
                 {
                     _lines.Add(line.Substring(i * maxLineLength, maxLineLength));
                 }
                 else
                 {
                     _lines.Add(line.Substring(i * maxLineLength, line.Length - i * maxLineLength));
                 }
             }
         }
         if (_lines.Count > maxLines)
         {
             _lines.RemoveRange(0, _lines.Count - maxLines);
         }
         _logStr = string.Join("\n", _lines);
     }

     voidOnGUI()
     {
         GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity,
            new Vector3(Screen.width / 1200.0f, Screen.height / 800.0f, 1.0f));
         GUI.Label(new Rect(10, 10, 800, 370), _logStr, new GUIStyle() { fontSize = Math.Max(10, fontSize) });
     }
}


```

### Create the main scene

- Create default initial scene main.scene
- Create an empty GameObject in the scene and hang ConsoleToScreen on it
- Add the main scene to the packaged scene list in `Build Settings`

### Create HotUpdate hot update module

- Create `Assets/HotUpdate` directory
- Right-click `Create/Assembly Definition` in the directory and create an assembly module named `HotUpdate`

## Install and configure HybridCLR

### Install

- Unzip hybridclr_unity.zip, place it in the project Packages directory, and rename it com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Place the hybridclr directory after decompression of `hybridclr.zip` into the libil2cpp directory after decompression of `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory you just decompressed, and install it.
- Depending on your Unity version:
     - If version >= 2020, replace the `ModifiedDlls\{verions}\Unity.IL2CPP.dll` file with `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll` (Unity 2020) or `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll` (Unity 2021+). If there is no file corresponding to your version, contact us to make one.
     - If the version is 2019, no operation is required because it has been automatically copied during the Install process

![installer](/img/hybridclr/ultimate-installer.jpg)

### Configure HybridCLR

- Open menu `HybridCLR/Settings`
- Add `HotUpdate` assembly to `differentialHybridAssemblies` list

![settings](/img/hybridclr/ultimate-hybridclr-settings.jpg)

### Configure PlayerSettings

- `Scripting Backend` switched to `IL2CPP`
- `Api Compatability Level` switched to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

## Create Editor script

Create the BuildTools.cs file in the `Assets/Editor` directory with the following content:

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
     public const string BackupAOTDllDir = "HybridCLRData/BackupAOT";

     public const string DhaoDir = "HybridCLRData/Dhao";


     /// <summary>
     /// Back up the cropped AOT dll generated when building the main package
     /// </summary>
     [MenuItem("BuildTools/BackupAOTDll")]
     public static void BackupAOTDllFromAssemblyPostStrippedDir()
     {
         BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
         var backupDir = $"{BackupAOTDllDir}/{target}";
         System.IO.Directory.CreateDirectory(backupDir);
         var dlls = System.IO.Directory.GetFiles(SettingsUtil.GetAssembliesPostIl2CppStripDir(target));
         foreach (var dll in dlls)
         {
             var fileName = System.IO.Path.GetFileName(dll);
             string dstFile = $"{BackupAOTDllDir}/{target}/{fileName}";
             System.IO.File.Copy(dll, dstFile, true);
             Debug.Log($"BackupAOTDllFromAssemblyPostStrippedDir: {dll} -> {dstFile}");
         }
     }

     /// <summary>
     /// Generate the dhao data corresponding to the first package without any code changes
     /// </summary>
     [MenuItem("BuildTools/GenerateUnchangedDHAODatas")]
     public static void GenerateUnchangedDHAODatas()
     {
         BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
         string backupDir = $"{BackupAOTDllDir}/{target}";
         string dhaoDir = $"{DhaoDir}/{target}";
         BuildUtils.GenerateUnchangedDHAODatas(SettingsUtil.DifferentialHybridAssemblyNames, backupDir, dhaoDir);
     }

     /// <summary>
     /// Generate dhao data of hot update package
     /// </summary>
     [MenuItem("BuildTools/GenerateDHAODatas")]
     public static void GenerateDHAODatas()
     {
         BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
         string backupDir = $"{BackupAOTDllDir}/{target}";
         string dhaoDir = $"{DhaoDir}/{target}";
         string currentDllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
         BuildUtils.GenerateDHAODatas(SettingsUtil.DifferentialHybridAssemblyNames, backupDir, currentDllDir, dhaoDir);
     }

     /// <summary>
     /// Copy the unmodified first package dll and dhao files to StreamingAssets
     /// </summary>
     [MenuItem("BuildTools/CopyUnchangedDllAndDhaoFileToStreamingAssets")]
     public static void CopyUnchangedDllAndDhaoFileToStreamingAssets()
     {
         BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
         string streamingAssetsDir = Application.streamingAssetsPath;
         Directory.CreateDirectory(streamingAssetsDir);

         string dllDir = $"{BackupAOTDllDir}/{target}";
         string dhaoDir = $"{DhaoDir}/{target}";
         foreach (var dll in SettingsUtil.DifferentialHybridAssemblyNames)
         {
             string srcFile = $"{dllDir}/{dll}.dll";
             string dstFile = $"{streamingAssetsDir}/{dll}.dll.bytes";
             System.IO.File.Copy(srcFile, dstFile, true);
             Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {srcFile} -> {dstFile}");
             string dhaoFile = $"{dhaoDir}/{dll}.dhao.bytes";
             dstFile = $"{streamingAssetsDir}/{dll}.dhao.bytes";
             System.IO.File.Copy(dhaoFile, dstFile, true);
             Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {dhaoFile} -> {dstFile}");
         }
     }

     /// <summary>
     /// Copy hot update dll and dhao files to StreamingAssets
     /// </summary>
     [MenuItem("BuildTools/CopyDllAndDhaoFileToStreamingAssets")]
     public static void CopyDllAndDhaoFileToStreamingAssets()
     {
         BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
         string streamingAssetsDir = Application.streamingAssetsPath;
         Directory.CreateDirectory(streamingAssetsDir);

         string dllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
         string dhaoDir = $"{DhaoDir}/{target}";
         foreach (var dll in SettingsUtil.DifferentialHybridAssemblyNames)
         {
             string srcFile = $"{dllDir}/{dll}.dll";
             string dstFile = $"{streamingAssetsDir}/{dll}.dll.bytes";
             System.IO.File.Copy(srcFile, dstFile, true);
             Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {srcFile} -> {dstFile}");
             string dhaoFile = $"{dhaoDir}/{dll}.dhao.bytes";
             dstFile = $"{streamingAssetsDir}/{dll}.dhao.bytes";
             System.IO.File.Copy(dhaoFile, dstFile, true);
             Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {dhaoFile} -> {dstFile}");
         }
     }
}


```

## Create hot update script

Create the `Assets/HotUpdate/Hello.cs` file with the following code content

```csharp
using System.Collections;
using UnityEngine;

public class Hello
{
     public static void Run()
     {
         Debug.Log("Hello, HybridCLR");
     }
}
```

## Load hot update assembly

To simplify the demonstration, we do not download HotUpdate.dll through the http server, but directly place HotUpdate.dll in the StreamingAssets directory.

Create the `Assets/LoadDll.cs` script, then **create a GameObject object in the main scene and mount the LoadDll script**.


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
         // In the Editor environment, HotUpdate.dll.bytes has been automatically loaded and does not need to be loaded. Repeated loading will cause problems.
#if !UNITY_EDITOR
         Assembly hotUpdateAss = LoadDifferentialHybridAssembly("HotUpdate");
#else
         // No need to load under Editor, directly find the HotUpdate assembly
         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
#endif
         Type helloType = hotUpdateAss.GetType("Hello");
         MethodInfo runMethod = helloType.GetMethod("Run");
         runMethod.Invoke(null, null);
     }

     private Assembly LoadDifferentialHybridAssembly(string assName)
     {
         byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");
         byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes");
         LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes);
         if (err == LoadImageErrorCode.OK)
         {
             Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");
             return System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == assName);
         }
         else
         {
             Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
             return null;
         }
     }
}

```


At this point, the creation of the entire hot update project is completed! ! !

## Trial run in Editor

Run the main scene and 'Hello,HybridCLR' will be displayed on the screen, indicating that the code is working properly.

## Package and run

- Run menu `HybridCLR/Generate/All` to perform necessary generation operations. **This step cannot be missed**!!!
- Open the `Build Settings` dialog box, click `Build`, select the output directory `{build}`, and execute the build
- Run `BuildTools/BackupAOTDll` to back up the trimmed dhe dll. In practice, these dlls should be added to version management for later generation of dhao files. These files will not be modified again.
- Run `BuildTools/GenerateUnchangedDHAODatas` to generate the dhao file of the first package
- Run `BuildTools/CopyUnchangedDllAndDhaoFileToStreamingAssets` to copy the first package dhe assembly and dhao files to StreamingAssets
- Copy the `Assets/StreamingAssets` directory to `{build}\dhe_demo2_Data\StreamingAssets`
- Run `{build}/Xxx.exe`, and the screen will display `Hello,HybridCLR`, indicating that the hot update code has been successfully executed!

## Test hot update

- Modify the `Debug.Log("Hello, HybridCLR");` code in the Run function of `Assets/HotUpdate/Hello.cs` to `Debug.Log("Hello, World");`.
- Run `HybridCLR/CompileDll/ActiveBulidTarget` to generate hot update dll
- Run `BuildTools/GenerateDHAODatas` to generate dhao files
- Run `BuildTools/CopyDllAndDhaoFileToStreamingAssets` to copy the hot update dll and dhao files to the StreamingAssets directory
- Copy the `Assets/StreamingAssets` directory to `{build}\dhe_demo2_Data\StreamingAssets`
- Rerun the program and you will find `Hello, World` displayed on the screen, indicating that the hot update code has taken effect!


This completes the hot update experience!
