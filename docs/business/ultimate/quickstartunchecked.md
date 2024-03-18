# 快速上手（不带校验的工作流）

本教程引导从空项目开始体验HybridCLR热更新。出于简化起见，只演示BuildTarget为**Windows**或**MacOS** Standalone平台的情况。
请在Standalone平台上正确跑通热更新流程后再自行尝试Android、iOS平台的热更新，它们的流程非常相似。

旗舰版本使用难度跟社区版本相似，大多数原理相同，建议先熟悉社区版本后再尝试旗舰版本。

自v5.0.0版本起，同时支持带校验的`RuntimeApi.LoadDifferentialHybridAssembly`工作流和不带校验的`RuntimeApi.LoadDifferentialHybridAssemblyUnchecked`工作流。
本文档介绍不带校验的工作流。

:::tip

实践中不带校验的工作流会简单很多，不必传递originalDllMd5和currentDllMd5参数，所以省去了工作流中保存或者计算dll md5的过程。
但要求开发者确保aot dll、hot update dll、dhao文件的一致性。
推荐初学者在demo项目中使用带校验的工作流，熟悉工作流后在正式项目中使用不带校验的工作流。

:::

## 体验目标

- 创建热更新程序集
- 加载热更新程序集，并执行其中热更新代码，打印 `Hello, HybridCLR`
- 修改热更新代码，打印 `Hello, World`

## 准备环境

### 安装Unity

- 安装 2019.4.x、2020.3.x、2021.3.x、2022.3.x 中任一版本。某些版本有特殊的安装要求，参见[安装hybridclr](../../basic/install.md)
- 根据你所用的操作系统，安装过程中选择模块时，必须选中 `Windows Build Support(IL2CPP)`或`Mac Build Support(IL2CPP)`

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

### 安装IDE及相关编译环境

- Windows
  - Win下需要安装`visual studio 2019`或更高版本。安装时至少要包含 `使用Unity的游戏开发` 和 `使用c++的游戏开发` 组件
  - 安装git
- Mac
  - 要求MacOS版本 >= 12，xcode版本 >= 13，例如`xcode 13.4.1， macos 12.4`
  - 安装 git

## 初始化Unity热更新项目

从零开始构造热更新项目的过程较冗长，以下步骤中涉及的代码可参考dhe_demo项目，其仓库地址为 [github](https://github.com/focus-creative-games/dhe_demo) 。

### 创建项目

创建空的Unity项目。

### 创建`ConsoleToScreen.cs`脚本

这个脚本对于演示热更新没有直接作用。它可以打印日志到屏幕上，方便定位错误。

创建 `Assets/ConsoleToScreen.cs` 脚本类，代码如下：

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


```

### 创建主场景

- 创建默认初始场景 main.scene
- 场景中创建一个空GameObject，将ConsoleToScreen挂到上面
- 在`Build Settings`中添加main场景到打包场景列表

### 创建 HotUpdate 热更新模块

- 创建 `Assets/HotUpdate` 目录
- 在目录下 右键 `Create/Assembly Definition`，创建一个名为`HotUpdate`的程序集模块

## 安装和配置HybridCLR

### 安装

- 将hybridclr_unity.zip解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下
- 打开 `HybridCLR/Installer`，启用`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装
- 根据你的Unity版本：
    - 如果版本 >= 2020，将 `ModifiedDlls\{verions}\Unity.IL2CPP.dll` 文件替换 `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll`(Unity 2020)或`{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`(Unity 2021+)。如果没有你的版本对应的文件，联系我们制作一个
    - 如果版本 为 2019，不需要任何操作，因为Install过程中已经自动复制

![installer](/img/hybridclr/ultimate-installer.jpg)

### 配置HybridCLR

- 打开菜单 `HybridCLR/Settings`
- 在`differentialHybridAssemblies`列表中添加`HotUpdate`程序集

![settings](/img/hybridclr/ultimate-hybridclr-settings.jpg)

### 配置PlayerSettings

- `Scripting Backend` 切换为 `IL2CPP`
- `Api Compatability Level` 切换为 `.Net 4.x`(Unity 2019-2020) 或 `.Net Framework`（Unity 2021+）

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

## 创建Editor脚本

在`Assets/Editor`目录下创建 BuildTools.cs 文件，内容如下：

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
    /// 复制没有改动的首包dll和dhao文件到StreamingAssets
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
        Assembly hotUpdateAss = LoadDifferentialHybridAssembly("HotUpdate");
#else
        // Editor下无需加载，直接查找获得HotUpdate程序集
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


至此，完成整个热更新工程的创建工作！！！

## Editor中试运行

运行main场景，屏幕上会显示 'Hello,HybridCLR'，表示代码工作正常。

## 打包运行

- 运行菜单 `HybridCLR/Generate/All` 进行必要的生成操作。**这一步不可遗漏**!!!
- 打开 `Build Settings` 对话框，点击`Build`，选择输出目录`{build}`，执行构建
- 运行 `BuildTools/BackupAOTDll` 备份裁剪后的dhe dll。 实践中这些dll应该加入版本管理，用于后面生成dhao文件，这些文件不会再被修改
- 运行 `BuildTools/GenerateUnchangedDHAODatas` 生成首包的dhao文件
- 运行 `BuildTools/CopyUnchangedDllAndDhaoFileToStreamingAssets` 复制首包 dhe程序集、dhao文件到 StreamingAssets
- 将 `Assets/StreamingAssets`目录复制到`{build}\dhe_demo2_Data\StreamingAssets`
- 运行`{build}/Xxx.exe`，屏幕显示 `Hello,HybridCLR`，表示热更新代码被顺利执行！

## 测试热更新

- 修改`Assets/HotUpdate/Hello.cs`的Run函数中`Debug.Log("Hello, HybridCLR");`代码，改成`Debug.Log("Hello, World");`。
- 运行`HybridCLR/CompileDll/ActiveBulidTarget`生成热更新dll
- 运行`BuildTools/GenerateDHAODatas` 生成dhao文件
- 运行`BuildTools/CopyDllAndDhaoFileToStreamingAssets`复制热更新dll和dhao文件到StreamingAssets目录
- 将 `Assets/StreamingAssets`目录复制到`{build}\dhe_demo2_Data\StreamingAssets`
- 重新运行程序，会发现屏幕中显示`Hello, World`，表示热更新代码生效了！ 


至此完成热更新体验！！！
