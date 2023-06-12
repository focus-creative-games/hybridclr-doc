# Getting started 

This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is **Windows** or **MacOS** Standalone platform is demonstrated.

Please run through the hot update process correctly on the Standalone platform and then try the hot update on the Android and iOS platforms. Their processes are very similar.

## Experience Goals

- Create hot update assembly
- Load the hot update assembly and execute the hot update code, print `Hello, HybridCLR`
- Modify the hot update code to print `Hello, World`

## Prepare the environment

### Install Unity

!> HybridCLR also supports 2019.4.x, but beginners must install the appropriate version according to the following requirements, and do not install the 2019 version on their own. After running through the process, carefully read the [Install HybridCLR](../basic/install.md) document and try other versions.

- Install any version of 2020.3.26+, 2021.3.0+, 2022.3.0+. If you are not an experienced Unity developer, version 2021.3.1 is recommended.
- Depending on your operating system, when selecting modules during installation, you must select `Windows Build Support(IL2CPP)` or `Mac Build Support(IL2CPP)`.

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

### Install IDE and related compilation environment

-Windows
   - Under Win, you need to install `visual studio 2019` or later. The installation must include at least the `Game Development with Unity` and `Game Development with C++` components.
   - install git
-Mac
   - Requires MacOS version >= 12, xcode version >= 13, for example `xcode 13.4.1, macos 12.4`.
   - install git
   - install cmake

## Initialize the Unity hot update project

The process of constructing a hot update project from scratch is tedious. The project structure, resources and codes can refer to the hybridclr_trial project, and its warehouse address is [github](https://github.com/focus-creative-games/hybridclr_trial) or [ gitee](https://gitee.com/focus-creative-games/hybridclr_trial).

### Create project

Create an empty Unity project.

### Create `ConsoleToScreen.cs` script

This script has no direct effect on demonstrating hot updates. It can print the log to the screen, which is convenient for locating errors.

Create `Assets/ConsoleToScreen.cs` script class, the code is as follows:

```csharp
using System;
using System. Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConsoleToScreen : MonoBehaviour
{
     const int maxLines = 50;
     const int maxLineLength = 120;
     private string _logStr = "";

     private readonly List<string>_lines = new List<string>();

     public int fontSize = 15;

     void OnEnable() { Application. logMessageReceived += Log; }
     void OnDisable() { Application. logMessageReceived -= Log; }

     public void Log(string logString, string stackTrace, LogType type)
     {
         foreach (var line in logString. Split('\n'))
         {
             if (line. Length <= maxLineLength)
             {
                 _lines. Add(line);
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
         if (_lines. Count > maxLines)
         {
             _lines. RemoveRange(0, _lines. Count - maxLines);
         }
         _logStr = string. Join("\n", _lines);
     }

     void OnGUI()
     {
         GUI.matrix = Matrix4x4.TRS(Vector3.zero, Quaternion.identity,
            new Vector3(Screen. width / 1200.0f, Screen. height / 800.0f, 1.0f));
         GUI.Label(new Rect(10, 10, 800, 370), _logStr, new GUIStyle() { fontSize = Math.Max(10, fontSize) });
     }
}


```

### Create the main scene

- Create default initial scene main.scene
- Create an empty GameObject in the scene and hang ConsoleToScreen on it
- Add the main scene to the list of packaged scenes in `Build Settings`

### Create HotUpdate hot update module

- Create `Assets/HotUpdate` directory
- Right-click `Create/Assembly Definition` in the directory to create an assembly module named `HotUpdate`

## Install and configure HybridCLR

### Install `com.code-philosophy.hybridclr` package

Click `Windows/Package Manager` in the main menu to open the package manager. Click `Add package from git URL...` as shown below, fill in `https://gitee.com/focus-creative-games/hybridclr_unity.git` or `https://github.com/focus-creative -games/hybridclr_unity.git`.

![add package](/img/hybridclr/install_hybridclrunity_package.jpg)

If you are not familiar with installing packages from url, please see [install from giturl](https://docs.unity3d.com/Manual/upm-ui-giturl.html).

Due to domestic network reasons, you may encounter network exceptions in Unity and fail to install. You can first clone or download `com.code-philosophy.hybridclr` to the local, rename the folder to `com.code-philosophy.hybridclr`, and move it directly to the `Packages` directory of the project.

### Initialize `com.code-philosophy.hybridclr`

Open the menu `HybridCLR/Installer...`, click the `Install` button to install. Wait patiently for about 30 seconds. After the installation is complete, the `Installation Successful` log will be printed at the end.

### Configure HybridCLR

Open the menu `HybridCLR/Settings`, add the `HotUpdate` assembly in the `Hot Update Assemblies` configuration item, as shown below:

![settings](/img/hybridclr/settings.jpg)

### Configure PlayerSettings

- Turn off the incremental GC (Use Incremental GC) option. Because incremental GC is not currently supported.
- `Scripting Backend` switched to `IL2CPP`.
- `Api Compatability Level` switched to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+).

![player settings](/img/hybridclr/player-setting.png)

## Create hot update script

Create `Assets/HotUpdate/Hello.cs` file, the code content is as follows

```csharp
using System. Collections;
using UnityEngine;

public class Hello
{
     public static void Run()
     {
         Debug. Log("Hello, HybridCLR");
     }
}
```

You may be concerned about whether the code in the hot update part has restrictions on C# syntax like other solutions. HybridCLR is a nearly complete implementation, and there are almost no restrictions on hot update code, so let's write it by ourselves.

See [Unsupported Features](../basic/notsupportedfeatures.md) for rare exceptions.

## Load hot update assembly

In order to simplify the demonstration, we do not download HotUpdate.dll through the http server, but directly put HotUpdate.dll in the StreamingAssets directory.

HybridCLR is a native runtime implementation, so call `Assembly Assembly.Load(byte[])` to load the hot update assembly.

Create the `Assets/LoadDll.cs` script, then **create a GameObject object in the main scene, mount the LoadDll script**.

```csharp
using HybridCLR;
using System;
using System. Collections;
using System.Collections.Generic;
using System.IO;
using System. Linq;
using System. Reflection;
using System. Threading. Tasks;
using UnityEngine;
using UnityEngine. Networking;
public class LoadDll : MonoBehaviour
{

     void Start()
     {
       // In the Editor environment, HotUpdate.dll.bytes has been automatically loaded and does not need to be loaded. Repeated loading will cause problems.
#if !UNITY_EDITOR
         Assembly hotUpdateAss = Assembly.Load(File.ReadAllBytes($"{Application.streamingAssetsPath}/HotUpdate.dll.bytes"));
#else
       // No need to load under Editor, directly find the HotUpdate assembly
         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
#endif
     }
}

```


## Call hot update code

Obviously, the main project cannot directly reference the hot update code. There are many ways to call the code in the hot update assembly from the main project. Here, the hot update code is called through reflection.

Add the reflection calling code after the `LoadDll.Start` function, the final code is as follows:

```csharp
     void Start()
     {
       // In the Editor environment, HotUpdate.dll.bytes has been automatically loaded and does not need to be loaded. Repeated loading will cause problems.
#if !UNITY_EDITOR
         Assembly hotUpdateAss = Assembly.Load(File.ReadAllBytes($"{Application.streamingAssetsPath}/HotUpdate.dll.bytes"));
#else
       // No need to load under Editor, directly find the HotUpdate assembly
         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
#endif
    
         Type type = hotUpdateAss. GetType("Hello");
         type. GetMethod("Run"). Invoke(null, null);
     }

```

So far, the creation of the entire hot update project has been completed! ! !

## Trial run in Editor

Run the main scene, 'Hello, HybridCLR' will be displayed on the screen, indicating that the code is working normally.

## Package and run

- Run the menu `HybridCLR/Generate/All` to perform the necessary generation operations. **This step cannot be missed**!!!
- Copy HotUpdate.dll in `{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64 (StandaloneMacXxx under MacOS)` directory to `Assets/StreamingAssets/HotUpdate.dll.bytes`, **Note**, you must add `.bytes `Suffix! ! !
- Open the `Build Settings` dialog box, click `Build And Run`, package and run the hot update sample project.

If the packaging is successful, and 'Hello, HybridCLR' is displayed on the screen, it means that the hot update code has been successfully executed!

## Test hot update

- Modify the `Debug.Log("Hello, HybridCLR");` code in the Run function of `Assets/HotUpdate/Hello.cs` to `Debug.Log("Hello, World");`.
- Run the menu command `HybridCLR/CompileDll/ActiveBulidTarget` to recompile the hot update code.
- Copy HotUpdate.dll in the `{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64 (StandaloneMacXxx under MacOS)` directory to `XXX_Data/StreamingAssets/HotUpdate.dll.bytes` in the package output directory just now.
- Re-run the program, and you will find `Hello, World` displayed on the screen, indicating that the hot update code has taken effect!

This completes the hot update experience! ! !