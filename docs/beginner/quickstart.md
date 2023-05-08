# 快速上手

本教程引导从空项目开始体验HybridCLR热更新。出于简化起见，只演示BuildTarget为**Windows**或**MacOS** Standalone平台的情况。

请在Standalone平台上正确跑通热更新流程后再自行尝试Android、iOS平台的热更新，它们的流程非常相似。

## 准备环境

### 安装Unity

- 安装 2019.4.40、2020.3.26+、2021.3.0+ 中任一版本。如果你不是经验丰富的Unity开发者，推荐使用2021.3.1版本。
- 根据你所用的操作系统，安装过程中选择模块时，必须选中 `Windows Build Support(IL2CPP)`或`Mac Build Support(IL2CPP)`。

![select il2cpp modules](../img/hybridclr/select_il2cpp_modules.jpg)

### 安装IDE及相关编译环境

- Windows
  - Win下需要安装`visual studio 2019`或更高版本。安装时至少要包含 `使用Unity的游戏开发` 和 `使用c++的游戏开发` 组件。
  - 安装git
- Mac
  - 要求MacOS版本 >= 12，xcode版本 >= 13，例如`xcode 13.4.1， macos 12.4`。
  - 安装 git
  - 安装cmake

### clone 示例项目hybridclr_trial （可选）

尽管教程中会一步一步详尽介绍如何从一个空项目搭建HybridCLR热更新项目，但由于过程略长，新手在操作时有可能失误。而hybridclr_trial项目则是一个极佳的现成的可测试的项目，
包含了教程中用到的所有代码和资源。

你可以从 [github](https://github.com/focus-creative-games/hybridclr_trial) 或 [gitee](https://gitee.com/focus-creative-games/hybridclr_trial) 下载。

## 从零创建Unity热更新项目

从零开始构造热更新项目的过程较冗长，项目结构及资源及代码均可参考hybridclr_trial。

### 创新项目和初始场景

- 创建空的Unity项目，假设叫Demo
- 创建一个带主相机和光源的默认初始场景 main.scene
- 在`Build Settings`中将main场景添加到打包场景列表

### 创建主工程代码文件

#### 创建`ConsoleToScreen.cs`脚本

这个脚本对于演示热更新没有直接作用，只因为它可以打印日志到屏幕上，方便定位错误。

在Assets目录下创建 `Assets/Main/ConsoleToScreen.cs` 脚本类，代码如下：

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConsoleToSceen : MonoBehaviour
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

#### 创建`LoadDll.cs`脚本

此脚本为入口脚本，负责加载热更新程序集。

创建`Assets/Main/LoadDll.cs`脚本，代码如下：

```csharp
using HybridCLR;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using UnityEngine;
using UnityEngine.Networking;

public class LoadDll : MonoBehaviour
{

    void Start()
    {
        StartGame();
    }

    public static byte[] ReadBytesFromStreamingAssets(string file)
    {
        // Android平台不支持直接读取StreamingAssets下文件，请自行修改实现
        return File.ReadAllBytes($"{Application.streamingAssetsPath}/{file}");
    }

    void StartGame()
    {
#if !UNITY_EDITOR
        Assembly.Load(ReadBytesFromStreamingAssets("HotUpdate.dll.bytes"));
#endif
        var demos = new Demos();
        demos.Run();
    }
}

```

#### 创建 `Demos.cs`

此脚本负责调用热更新代码。

创建 `Assets/Main/Demos.cs` 文件，代码如下：

```csharp
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;


public class Demos
{
    private Assembly _hotUpdateAss;

    public Demos()
    {
        _hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
    }

    public void Run()
    {
        Run_ReflectionInvoke();
    }

    private void Run_ReflectionInvoke()
    {
        Type type = _hotUpdateAss.GetType("ReflectionInvoke");
        type.GetMethod("Run").Invoke(null, null);
    }
}
```

### 创建 HotUpdate 热更新模块

- 创建 `Assets/HotUpdate` 目录
- 在目录下 右键 `Create/Assembly Definition`，创建一个名为`HotUpdate`的模块
- 创建 `Assets/HotUpdate/ReflectionInvoke.cs` 文件，代码内容如下

```csharp
using System.Collections;
using UnityEngine;

public class ReflectionInvoke
{
    public static void Run()
    {
        GameObject cube = GameObject.Find("Cube");
        cube.GetComponent<MeshRenderer>().material.color = Color.red;
        Debug.Log("[ReflectionInvoke.Run] Cube颜色变成红色");
    }
}
```

### 编辑main场景

- 在场景中创建一个空GameObject，挂上 `ConsoleToScreen` 和 `LoadDll` 脚本。
- 在场景中创建一个名为Cube的立方体对象（注意必须是这个名字，跟函数`ReflectionInvoke.Run`中查找的GameObject名字一致）
- 调整主相机位置和朝向，让Cube出现在相机视野内。

## 安装和配置HybridCLR

### 安装 `com.focus-creative-games.hybridclr_unity` 包

主菜单中点击`Windows/Package Manager`打开包管理器。如下图所示点击`Add package from git URL...`，填入`https://gitee.com/focus-creative-games/hybridclr_unity`或`https://github.com/focus-creative-games/hybridclr_unity`。

![add package](../img/hybridclr/install_hybridclrunity_package.jpg)

不熟悉从url安装package的请看[install from giturl](https://docs.unity3d.com/Manual/upm-ui-giturl.html)。

由于国内网络原因，在unity中可能遇到网络异常而无法安装。你可以先把 `hybridclr_unity` clone或者下载到本地，将文件夹改名为`com.focus-creative-games.hybridclr_unity`，直接移动到项目的`Packages`目录下即可。

### 初始化 `com.focus-creative-games.hybridclr_unity` 

打开菜单`HybridCLR/Installer...`， 点击`安装`按钮进行安装。 耐心等待30s左右，安装完成后会在最后打印 `安装成功`日志。

### 配置HybridCLR

- 打开菜单 `HybridCLR/Settings`， 在`Hot Update Assemblies`配置项中添加`HotUpdate`程序集，如下图：

![settings](../img/hybridclr/settings.jpg)

### 配置PlayerSettings

- 关闭增量式GC(Use Incremental GC) 选项。因为目前不支持增量式GC。
- `Scripting Backend` 切换为 `IL2CPP`。
- `Api Compatability Level` 切换为 `.Net 4.x`(Unity 2019-2020) 或 `.Net Framework`（Unity 2021+）。

![player settings](../img/hybridclr/player-setting.png)

至此，完成整个热更新工程的创建工作！！！

## Editor中试运行

运行，如果main场景中出现一个红色立方体，表示代码工作正常。

注意，在Editor中试运行跟HybridCLR毫无关系，只为测试非热更新情况下代码正常。

## 热更新流程

- 把热更新程序集`HotUpdate.dll`复制到`StreamingAssets/HotUpdate.dll.bytes`，供运行时加载。
- `LoadDll.StartGame`函数中使用`Assembly.Load(ReadBytesFromStreamingAssets("HotUpdate.dll.bytes"))`，加载 `StreamingAssets/HotUpdate.dll.bytes`，
完成热更新程序集加载工作。
- `Run_ReflectionInvoke.Run_ReflectionInvoke`函数中通过常规的反射方式调用HotUpdate程序集中`ReflectionInvoke::Run`函数，执行热更新逻辑。

## 打包运行

- 运行菜单 `HybridCLR/Generate/All` 进行必要的生成操作。**这一步不可遗漏**!!!
- 将`{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64(MacOS下为StandaloneMacXxx)`目录下的HotUpdate.dll复制到`Assets/StreamingAssets/HotUpdate.dll.bytes`，**注意**，要加`.bytes`后缀！！！
- 打开`Build Settings`对话框，点击`Build And Run`，打包并且运行热更新示例工程。

如果打包成功，并且场景中显示一个红色Cube，表示热更新代码被顺利执行！

## 测试热更新

- 修改`Assets/HotUpdate/ReflectionInvoke.cs`的Run函数中`cube.GetComponent<MeshRenderer>().material.color = Color.red;`代码，将`Color.red`改成`Color.blue`。
- 运行菜单命令`HybridCLR/CompileDll/ActiveBulidTarget`重新编译热更新代码。
- 将`{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64(MacOS下为StandaloneMacXxx)`目录下的HotUpdate.dll复制为刚才的打包输出目录的 `XXX_Data/StreamingAssets/HotUpdate.dll.bytes`。
- 重新运行程序，会发现场景中显示一个蓝色Cube，表示热更新代码生效了！ 

至此完成热更新体验！！！
