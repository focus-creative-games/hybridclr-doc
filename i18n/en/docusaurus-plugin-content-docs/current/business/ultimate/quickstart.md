# Get started quickly

This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is the **Windows** or **MacOS** Standalone platform is demonstrated.
Please run the hot update process correctly on the Standalone platform before trying the hot update on the Android and iOS platforms. Their processes are very similar.

The difficulty of using the flagship version is similar to that of the community version, and most of the principles are the same. It is recommended to familiarize yourself with the community version before trying the flagship version.

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
-Mac
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
- Unzip the corresponding `libil2cpp-{version}.7z` according to your unity version
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

     public const string EncryptedDllDir = "HybridCLRData/EncryptedDll";

     public const string DhaoDir = "HybridCLRData/Dhao";

     public const string ManifestFile = "manifest.txt";


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
    /// 创建dhe manifest文件，格式为每行一个 'dll名，原始dll的md5'
    /// </summary>
    /// <param name="outputDir"></param>
    [MenuItem("BuildTools/CreateManifestAtBackupDir")]
    public static void CreateManifest()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string backupDir = $"{BackupAOTDllDir}/{target}";
        CreateManifest(backupDir);
    }

    public static void CreateManifest(string outputDir)
    {
        Directory.CreateDirectory(outputDir);
        var lines = new List<string>();
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string backupDir = $"{BackupAOTDllDir}/{target}";
        foreach (string dheDll in SettingsUtil.DifferentialHybridAssemblyNames)
        {
            string originalDll = $"{backupDir}/{dheDll}.dll";
            string originalDllMd5 = AssemblyOptionDataGenerator.CreateMD5Hash(File.ReadAllBytes(originalDll));
            lines.Add($"{dheDll},{originalDllMd5}");
        }
        string manifestFile = $"{outputDir}/{ManifestFile}";
        File.WriteAllBytes(manifestFile, System.Text.Encoding.UTF8.GetBytes(string.Join("\n", lines)));
        Debug.Log($"CreateManifest: {manifestFile}");
    }

    /// <summary>
    /// 生成首包的没有任何代码改动对应的dhao数据
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
    /// 生成热更包的dhao数据
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
    /// 生成首包的加密dll和没有任何代码改动对应的dhao数据
    /// </summary>
    [MenuItem("BuildTools/GenerateUnchangedEncryptedDllAndDhaoDatas")]
    public static void GenerateUnchangedEncryptedDllAndDhaoDatas()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string backupDir = $"{BackupAOTDllDir}/{target}";
        string dhaoDir = $"{DhaoDir}/{target}";
        string encryptedDllDir = $"{EncrypedDllDir}/{target}";
        BuildUtils.EncryptDllAndGenerateUnchangedDHAODatas(SettingsUtil.DifferentialHybridAssemblyNames, backupDir, encryptedDllDir, dhaoDir);
    }


    /// <summary>
    /// 生成热更包的加密dll和dhao数据
    /// </summary>
    [MenuItem("BuildTools/GenerateEncryptedDllAndDhaoDatas")]
    public static void GenerateEncryptedDllAndDhaoDatas()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string backupDir = $"{BackupAOTDllDir}/{target}";
        string dhaoDir = $"{DhaoDir}/{target}";
        string currentDllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        string encryptedDllDir = $"{EncrypedDllDir}/{target}";
        BuildUtils.EncryptDllAndGenerateDHAODatas(SettingsUtil.DifferentialHybridAssemblyNames, backupDir, currentDllDir, encryptedDllDir, dhaoDir);
    }

    /// <summary>
    /// 复制没有改动的首包dll和dhao文件到StreamingAssets
    /// </summary>
    [MenuItem("BuildTools/CopyUnchangedDllAndDhaoFileAndManifestToStreamingAssets")]
    public static void CopyUnchangedDllAndDhaoFileToStreamingAssets()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string streamingAssetsDir = Application.streamingAssetsPath;
        Directory.CreateDirectory(streamingAssetsDir);

        string manifestFile = $"{BackupAOTDllDir}/{target}/{ManifestFile}";
        string dstManifestFile = $"{streamingAssetsDir}/{ManifestFile}";
        System.IO.File.Copy(manifestFile, dstManifestFile, true);
        Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {manifestFile} -> {dstManifestFile}");

        string dllDir = $"{BackupAOTDllDir}/{target}";
        string dhaoDir = $"{DhaoDir}/{target}";
        foreach (var dll in SettingsUtil.DifferentialHybridAssemblyNames)
        {
            string srcFile = $"{dllDir}/{dll}.dll";
            string dstFile = $"{streamingAssetsDir}/{dll}.dll.bytes";
            System.IO.File.Copy(srcFile, dstFile, true);Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {srcFile} -> {dstFile}");
            string dhaoFile = $"{dhaoDir}/{dll}.dhao.bytes";
            dstFile = $"{streamingAssetsDir}/{dll}.dhao.bytes";
            System.IO.File.Copy(dhaoFile, dstFile, true);
            Debug.Log($"CopyUnchangedDllAndDhaoFileToStreamingAssets: {dhaoFile} -> {dstFile}");
        }
    }

    /// <summary>
    /// 复制热更新dll和dhao文件到StreamingAssets
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

## 创建热更新脚本

创建 `Assets/HotUpdate/Hello.cs` 文件，代码内容如下

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

## 加载热更新程序集

为了简化演示，我们不通过http服务器下载HotUpdate.dll，而是直接将HotUpdate.dll放到StreamingAssets目录下。

HybridCLR是原生运行时实现，因此调用`Assembly Assembly.Load(byte[])`即可加载热更新程序集。

创建`Assets/LoadDll.cs`脚本，然后**在main场景中创建一个GameObject对象，挂载LoadDll脚本**。

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
        var manifests = LoadManifest($"{Application.streamingAssetsPath}/manifest.txt");
        Assembly hotUpdateAss = LoadDifferentialHybridAssembly(manifests["HotUpdate"], "HotUpdate");
#else
        // Editor下无需加载，直接查找获得HotUpdate程序集
        Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
#endif
        Type helloType = hotUpdateAss.GetType("Hello");
        MethodInfo runMethod = helloType.GetMethod("Run");
        runMethod.Invoke(null, null);
    }

    class Manifest
    {
        public string AssemblyName { get; set; }

        public string OriginalDllMd5 { get; set; }
    }

    private Dictionary<string, Manifest> LoadManifest(string manifestFile)
    {
        var manifest = new Dictionary<string, Manifest>();
        var lines = File.ReadAllLines(manifestFile, Encoding.UTF8);
        foreach (var line in lines)
        {
            string[] args = line.Split(",");
            if (args.Length != 2)
            {
                Debug.LogError($"manifest file format error, line={line}");
                return null;
            }
            manifest.Add(args[0], new Manifest()
            {
                AssemblyName = args[0],
                OriginalDllMd5 = args[1],
            });
        }
        return manifest;
    }


    public static string CreateMD5Hash(byte[] bytes)
    {
        return BitConverter.ToString(new MD5CryptoServiceProvider().ComputeHash(bytes)).Replace("-", "").ToUpperInvariant();
    }

    private Assembly LoadDifferentialHybridAssembly(Manifest manifest, string assName)
    {
        byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");
        byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes");
        string currentDllMd5 = CreateMD5Hash(dllBytes);
        LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes, manifest.OriginalDllMd5, currentDllMd5);
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


至此，完成整个热更新工程的创建工作！！！

## Editor中试运行

运行main场景，屏幕上会显示 'Hello,HybridCLR'，表示代码工作正常。

## 打包运行

- 运行菜单 `HybridCLR/Generate/All` performs necessary build operations. **This step cannot be missed**!!!
- Open the `Build Settings` dialog box, click `Build`, select the output directory `{build}`, and execute the build
- Run `BuildTools/BackupAOTDll` to back up the trimmed dhe dll. In practice, these dlls should be added to version management for later generation of dhao files. These files will not be modified again.
- Run `BuildTools/CreateManifestAtBackupDir` to generate the manifest file of the original dhe dll. In practice, this manifest file should be added to version management and will not be modified again.
- Run `BuildTools/GenerateUnchangedDHAODatas` to generate the dhao file of the first package
- Run `BuildTools/CopyUnchangedDllAndDhaoFileAndManifestToStreamingAssets` to copy the first package dhe assembly, dhao file, and manifest file to StreamingAssets
- Copy the `Assets/StreamingAssets` directory to `{build}\dhe_demo2_Data\StreamingAssets`
- Run `{build}/Xxx.exe`, and the screen will display `Hello,HybridCLR`, indicating that the hot update code has been successfully executed!

## Test hot update

- Modify the `Debug.Log("Hello, HybridCLR");` code in the Run function of `Assets/HotUpdate/Hello.cs` to `Debug.Log("Hello, World");`.
- Run `HybridCLR/CompileDll/ActiveBulidTarget` to generate hot update dll
- Run `BuildTools/GenerateDHAODatas` to generate dhao files
- Run `BuildTools/CopyDllAndDhaoFileToStreamingAssets` to copy the hot update dll and dhao files to the StreamingAssets directory
- Copy the `Assets/StreamingAssets` directory to `{build}\dhe_demo2_Data\StreamingAssets`
- Rerun the program and you will find `Hello, World` displayed on the screen, indicating that the hot update code has taken effect!


This completes the hot update experience! ! !
