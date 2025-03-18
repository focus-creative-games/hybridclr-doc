# 快速上手

请在Win64或MacOS Standalone平台上正确跑通热更新流程后再尝试Android、iOS平台的热更新。

旗舰版本使用难度跟社区版本相似，大多数原理相同，建议先熟悉社区版本后再尝试旗舰版本。

## 安装Unity、IDE及相关SDK

此步骤与社区版本完全相同，详见[安装hybridclr](../../basic/install.md)。

## 从零创建Unity热更新项目

从零开始构造热更新项目的过程较冗长，以下步骤中涉及的代码可参考dhe_demo项目，其仓库地址为 [github](https://github.com/focus-creative-games/dhe_demo) 。

### 创建项目

创建空的Unity项目。

### 安装HybridCLR

- 将hybridclr_unity.zip解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下。请确保文件`libil2cpp\hybridclr\RuntimeApi.cpp`存在，否则说明hybridclr目录位置有误。
- 打开 `HybridCLR/Installer`，启用`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装
- 根据你的Unity版本：
  - 如果版本 >= 2020，将 `ModifiedDlls\{verions}\Unity.IL2CPP.dll` 文件替换 `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll`(Unity 2020)或`{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`(Unity 2021+)。如果没有你的版本对应的文件，联系我们制作一个
  - 如果版本 为 2019，不需要任何操作，因为Install过程中已经自动复制

![installer](/img/hybridclr/ultimate-installer.jpg)

### 配置PlayerSettings

- `Scripting Backend` 切换为 `IL2CPP`
- `Api Compatability Level` 切换为 `.Net 4.x`(Unity 2019-2020) 或 `.Net Framework`（Unity 2021+）

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

### 创建主场景

- 创建默认初始场景 main.scene
- 在`Build Settings`中添加main场景到打包场景列表

### 创建 HotUpdate 热更新模块

- 创建 `Assets/HotUpdate` 目录
- 在目录下 右键 `Create/Assembly Definition`，创建一个名为`HotUpdate`的程序集模块

### 配置HybridCLR

- 打开菜单 `HybridCLR/Settings`
- 在`differentialHybridAssemblies`列表中添加`HotUpdate`程序集

![settings](/img/hybridclr/ultimate-hybridclr-settings.jpg)

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
        // 演示项目出于方便，在发布热更新时才复制这个目录。
        // 实际项目推荐在CreateAotSnapshot时就复制这个目录到StreamingAssets目录下，随包发布。
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

至此，完成整个热更新工程的创建工作！！！

## Editor中试运行

运行main场景，Console窗口会打印 'Hello, World'，表示代码工作正常。

## 构建游戏

- 运行菜单 `HybridCLR/Generate/All` 进行必要的生成操作。**这一步不可遗漏**!!!
- 打开 `Build Settings` 对话框，点击`Build`，选择输出目录`{build}`，执行构建
- 运行 `Build/CreateAotSnapshot`创建构建时生成的AOT快照。 **这一步必须在`Build`之后**，因为AOT快照中必须复制构建时生成的dll，而不能是`HybridCLR/Generate/all`时生成的dll。

CreateAotSnapshot生成的AOT快照包含以下内容：

- 所有AOT dll
- InjectRules文件，它们被放到InjectRules目录下
- AOT dll对应的meta version文件，它们被放到MetaVersions目录下
- manifest.json，主要记录了DHE程序集列表
- signature-mapper.json

:::tip

`Build/CreateAotSnapshot`创建的AOT快照目录应该加入版本管理，用于将来生成热更新dll的meta version文件。

:::

## 首包测试

- 运行`{build}/Xxx.exe`，Player Log日志文件中有 `Hello, World`日志，表示执行了原始代码！

## 测试热更新

- 请确保`构建游戏`这一步已经执行了`Build/CreateAotSnapshot`，运行一次即可，不要多次运行
- 修改`Hello::Run`函数中`Debug.Log("Hello, World")`为`Debug.Log("Hello, HybridCLR")`
- 运行`Build/CompileAndGenerateHotUpdatemeta versionFiles` 生成热更新dll及对应的meta version文件
- 运行`Build/CopyHotUpdateDllAndMetaVersionFilesToHotUpdateDataDir`。它会将热更新dll及对应的meta version文件复制到`{proj}/HotUpdateSnapshot/{buildTarget}`目录
- 手动复制`{proj}/HotUpdateSnapshot/{buildTarget}`目录下所有文件到`{build}\StreamingAssets`目录下
- 再次运行，Player Log日志文件中有`Hello, HybridCLR`日志

至此完成热更新！！！
