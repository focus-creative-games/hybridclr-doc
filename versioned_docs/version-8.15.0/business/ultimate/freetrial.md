# 免费试用

相比于付费试用版本和正式购买后的版本都包含HybridCLR所有运行时及Editor源码，免费试用版本只提供预编译的
二进制lib及工具，只支持构建iOS平台目标。


## 试用规则

- 只面向企业用户
- 试用免费，没有试用期限，但试用过程中如需技术支持，需要额外付费
- 试用版本会在App启动1小时后**随机崩溃**，请不要用于正式发布的版本

## 硬件及平台限制

:::tip
正式版本如社区版本一样，无论Editor还是Runtime都没有任何平台的限制。
:::

- 要求Unity Editor必须运行在M1或者M2 CPU的Mac电脑上。
- **只支持**发布iOS平台

## 支持的版本

只支持以下特定的Unity版本：

- 2022.3.54 或更高版本，不区分版本后缀（如f1、f2）

## 不支持的特性

:::tip

在正式源码版本中均支持以下特性

:::

- dots
- **增量式GC**
- Profiler、Script Debugging等development Build选项
- **Meta Version** 工作流。

不支持增量式GC及各种编译选项是因为每种编译参数都需要单独的libil2cpp.a，大大提高了维护成本。

## 与标准商业版本的区别

- 加密模块被移除
- DHE相关C#源码改为预编译的二进制工具
- libil2cpp只包含头文件，源码改为预编译的libil2cpp.a文件

## 使用

### 安装

- 将hybridclr_unity.zip解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 打开 `HybridCLR/Installer`，直接点击安装
- 将 `com.code-philosophy.hybridclr\\ModifiedUnityAssemblies\{verions}\Unity.IL2CPP.dll` 文件替换`{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`(Unity 2021+)。如果没有你的版本对应的文件，联系我们制作一个

![installer](/img/hybridclr/ultimate-installer.jpg)

### 配置HybridCLR

- 打开菜单 `HybridCLR/Settings`
- 在`differentialHybridAssemblies`列表中添加`HotUpdate`程序集

相比于社区版本或者正式的商业化版本，需要修改以下设置：

- **关闭增量式GC**
- 关闭development选项

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

## 创建热更新脚本

创建 `Assets/HotUpdate/Hello.cs` 文件，代码内容如下

```csharp
using System.Collections;
using UnityEngine;

public class Hello
{
    public static void Run()
    {
        // 原始代码
        Debug.Log("Hello, World");
        // 热更新后改为
        // Debug.Log("Hello, HybridCLR");
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
            LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyWithDHAO(dllBytes, null, dhaoBytes);
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


至此，完成整个热更新工程的创建工作！！！

## Editor中试运行

运行main场景，屏幕上会显示 'Hello, World'，表示代码工作正常。

## 构建游戏

- 运行菜单 `HybridCLR/Generate/All` 进行必要的生成操作。**这一步不可遗漏**!!!
- 打开 `Build Settings` 对话框，点击`Build`，选择输出目录`{build}`，执行构建
- 运行 `BuildTools/BackupAOTDll` 备份构建时生成的dhe dll。 **这一步必须在`Build`之后**，因为原始AOT dll必须是构建时生成的dll，而不是`HybridCLR/Generate/all`时生成

:::tip

`BuildTools/BackupAOTDll`备份的dll应该加入版本管理，用于将来热更新时生成dhao文件。

:::

## 首包测试

- 运行`{build}/Xxx.exe`，屏幕显示 `Hello, World`，表示执行了原始代码！

## 测试热更新

- 请确保`构建游戏`这一步已经执行了`BuildTools/BackupAOTDll`，运行一次即可，不要多次运行
- 修改`Hello::Run`函数中`Debug.Log("Hello, World")`为`Debug.Log("Hello, HybridCLR")`
- 运行`BuildTools/CompileHotUpdateDllsAndGenerateDHAODatas` 生成热更新dll及对应的dhao文件
- 运行`BuildTools/CopyDllAndDhaoFileToHotUpdateDataDir`复制HotUpdate.dll.bytes和HotUpdate.dhao.bytes到`HotUpdateDatas`目录
- 手动复制`HotUpdateDatas`目录下HotUpdate.dll.bytes和HotUpdate.dhao.bytes到`{build}\StreamingAssets`目录下
- 再次运行，屏幕上会打印`Hello, HybridCLR`
