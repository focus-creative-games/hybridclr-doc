# Get started quickly

This tutorial guides you to experience the hot update of HybridCLR from an empty project. For the sake of simplicity, only the case where BuildTarget is **Windows** or **MacOS** Standalone platform is demonstrated.
Please run the hot update process correctly on the Standalone platform before trying the hot update of Android and iOS platforms by yourself. Their processes are very similar.

The difficulty of using the Ultimate version is similar to that of the Community version. Most of the principles are the same. It is recommended to familiarize yourself with the Community version before trying the Ultimate version.

## Experience target

- Create a hot update assembly
- Load the hot update assembly and execute the hot update code in it, print `Hello, HybridCLR`
- Modify the hot update code and print `Hello, World`

## Prepare the environment

### Install Unity

- Install any version of 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x. Some versions have special installation requirements, see [Install hybridclr](../../basic/install.md)
- Depending on your operating system, you must select `Windows Build Support (IL2CPP)` or `Mac Build Support (IL2CPP)` when selecting modules during installation

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

### Install IDE and related compilation environment

- Windows
- Under Win, you need to install `visual studio 2019` or higher. The installation should at least include the `Game Development with Unity` and `Game Development with C++` components
- Install git
- Mac
- Requires MacOS version >= 12, Xcode version >= 13, for example `Xcode 13.4.1, macos 12.4`
- Install git

## Initialize Unity hot update project

The process of constructing a hot update project from scratch is relatively lengthy. The code involved in the following steps can refer to the dhe_demo project, whose repository address is [github](https://github.com/focus-creative-games/dhe_demo).

### Create a project

Create an empty Unity project.

### Create the `ConsoleToScreen.cs` script

This script has no direct effect on demonstrating hot updates. It can print logs to the screen to facilitate error location.

Create the `Assets/ConsoleToScreen.cs` script class, the code is as follows:

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

    void OnGUI()
    {
        GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity,
           new Vector3(Screen.width / 1200.0f, Screen.height / 800.0f, 1.0f));
        GUI.Label(new Rect(10, 10, 800, 370), _logStr, new GUIStyle() { fontSize = Math.Max(10, fontSize) });
    }
}

### Create the main scene

- Create the default initial scene main.scene
- Create an empty GameObject in the scene and attach ConsoleToScreen to it
- Add the main scene to the packaged scene list in `Build Settings`

### Create the HotUpdate hot update module

- Create the `Assets/HotUpdate` directory
- Right-click `Create/Assembly Definition` in the directory and create an assembly module named `HotUpdate`

## Install and configure HybridCLR

### Installation

- Unzip hybridclr_unity.zip and put it in the project Packages directory, renaming it to com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Put the hybridclr directory after decompressing `hybridclr.zip` into the libil2cpp directory after decompressing `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, enable the option `Copy libil2cpp from local`, select the libil2cpp directory just decompressed, and install it
- According to your Unity version:
- If the version is >= 2020, replace the file `ModifiedDlls\{verions}\Unity.IL2CPP.dll` with `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll` (Unity 2020) or `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll` (Unity 2021+). If there is no file corresponding to your version, please contact us to make one
- If the version is 2019, no operation is required, because it has been automatically copied during the installation process

![installer](/img/hybridclr/ultimate-installer.jpg)

### Configure HybridCLR

- Open the menu `HybridCLR/Settings`
- Add the `HotUpdate` assembly to the `differentialHybridAssemblies` list

![settings](/img/hybridclr/ultimate-hybridclr-settings.jpg)

### Configure PlayerSettings

- Switch `Scripting Backend` to `IL2CPP`
- Switch `Api Compatibility Level` to `.Net 4.x`(Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

## Create Editor script

Create BuildTools.cs file in the `Assets/Editor` directory with the following content:

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

    public const string EncrypedDllDir = "HybridCLRData/EncryptedDll";

    public const string DhaoDir = "HybridCLRData/Dhao";


    /// <summary>
    /// 备份构建主包时生成的裁剪AOT dll
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
    /// 生成热更包的dhao数据
    /// </summary>
    [MenuItem("BuildTools/GenerateDHAODatas")]
    public static void GenerateDHAODatas()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string backupDir = $"{BackupAOTDllDir}/{target}";
        string dhaoDir = $"{DhaoDir}/{target}";
        string currentDllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        BuildUtils.GenerateDHAODatas(SettingsUtil.DifferentialHybridAssemblyNames, backupDir, currentDllDir, null, HybridCLRSettings.Instance.injectRuleFiles, dhaoDir);
    }

    [MenuItem("BuildTools/CompileHotUpdateDlls")]
    public static void CompileHotUpdateDlls()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        CompileDllCommand.CompileDll(target);
    }


    [MenuItem("BuildTools/CompileHotUpdateDllsAndGenerateDHAODatas")]
    public static void CompileHotUpdateDllsAndGenerateDHAODatas()
    {
        CompileHotUpdateDlls();
        GenerateDHAODatas();
    }

    /// <summary>
    /// 复制热更新dll和dhao文件到HotUpdateDatas
    /// </summary>
    [MenuItem("BuildTools/CopyDllAndDhaoFileToHotUpdateDataDir")]
    public static void CopyDllAndDhaoFileToHotUpdateDataDir()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string hotUpdateDatasDir = $"{Application.dataPath}/../HotUpdateDatas";
        Directory.CreateDirectory(hotUpdateDatasDir);

        string dllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        string dhaoDir = $"{DhaoDir}/{target}";
        foreach (var dll in SettingsUtil.DifferentialHybridAssemblyNames)
        {
            string srcFile = $"{dllDir}/{dll}.dll";
            string dstFile = $"{hotUpdateDatasDir}/{dll}.dll.bytes";
            System.IO.File.Copy(srcFile, dstFile, true);
            Debug.Log($"Copy: {srcFile} -> {dstFile}");
            string dhaoFile = $"{dhaoDir}/{dll}.dhao.bytes";
            dstFile = $"{hotUpdateDatasDir}/{dll}.dhao.bytes";
            System.IO.File.Copy(dhaoFile, dstFile, true);
            Debug.Log($"Copy: {dhaoFile} -> {dstFile}");
        }
    }
}


```

## Create a hot update script

Create the `Assets/HotUpdate/Hello.cs` file, the code content is as follows

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
        //Debug.Log("Hello, HybridCLR");
    }
}
```

## Load the hot update assembly

To simplify the demonstration, we do not download HotUpdate.dll through the http server, but directly put HotUpdate.dll in the StreamingAssets directory.

Create the `Assets/LoadDll.cs` script, and then **create a GameObject object in the main scene and mount the LoadDll script**.

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
        // Editor环境下，HotUpdate.dll.bytes已经被自动加载，不需要加载，重复加载反而会出问题。
#if !UNITY_EDITOR
        LoadDifferentialHybridAssembly("HotUpdate");
#endif
        Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
        Type helloType = hotUpdateAss.GetType("Hello");
        MethodInfo runMethod = helloType.GetMethod("Run");
        runMethod.Invoke(null, null);
    }


    /// <summary>
    /// 
    /// </summary>
    /// <param name="assName">不含文件名后缀的程序集名，如HotUpdate</param>
    /// <returns></returns>
    private void LoadDifferentialHybridAssembly(string assName)
    {
        string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
        // 如果不存在，则使用原始AOT程序集
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
            byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes");
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
    }
}


```

At this point, the creation of the entire hot update project is completed! ! !

## Trial run in Editor

Run the main scene, and 'Hello, World' will be displayed on the screen, indicating that the code is working properly.

## Build the game

- Run the menu `HybridCLR/Generate/All` to perform necessary generation operations. **This step cannot be omitted**!!!
- Open the `Build Settings` dialog box, click `Build`, select the output directory `{build}`, and execute the build
- Run `BuildTools/BackupAOTDll` to back up the dhe dll generated during the build. **This step must be after `Build`**, because the original AOT dll must be the dll generated during the build, not generated during `HybridCLR/Generate/all`

:::tip

The dll backed up by `BuildTools/BackupAOTDll` should be added to the version management for generating dhao files during future hot updates.

:::

## First package test

- Run `{build}/Xxx.exe`, and the screen displays `Hello, World`, indicating that the original code has been executed!

## Test hot update

- Please make sure that `BuildTools/BackupAOTDll` has been executed in the `Build Game` step. Run it once, do not run it multiple times
- Modify `Debug.Log("Hello, World")` in the `Hello::Run` function to `Debug.Log("Hello, HybridCLR")`
- Run `BuildTools/CompileHotUpdateDllsAndGenerateDHAODatas` to generate hot update dll and corresponding dhao files
- Run `BuildTools/CopyDllAndDhaoFileToHotUpdateDataDir` to copy HotUpdate.dll.bytes and HotUpdate.dhao.bytes to the `HotUpdateDatas` directory
- Manually copy HotUpdate.dll.bytes and HotUpdate.dhao.bytes in the `HotUpdateDatas` directory to the `{build}\StreamingAssets` directory
- Run again, and `Hello, HybridCLR` will be printed on the screen

This completes the hot update experience! ! !
