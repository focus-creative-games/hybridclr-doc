# Getting Started 

This tutorial guides you to experience HybridCLR hot update from an empty project. For the sake of simplicity, only the case where the BuildTarget is **Windows** or **MacOS** Standalone platform is demonstrated.
Please run through the hot update process correctly on the Standalone platform and then try the hot update on the Android and iOS platforms. Their processes are very similar.

The difficulty of using the ultimate edition is similar to that of the community version, and most of the principles are the same. It is recommended to familiarize yourself with the community version before trying the ultimate edition.

## Experience Goals

- Create hot update assembly
- Load the hot update assembly and execute the hot update code, print `Hello, HybridCLR`
- Modify the hot update code to print `Hello, World`

## Prepare the environment

### Install Unity

:::caution
The ultimate edition does not support the 2019.4.x series.
:::

- Install any version of 2020.3.26+, 2021.3.0+, 2022.3.0+. Versions 2020.3.0-2020.3.25 are also supported, but after the installation is completed in the Installer, you need to copy `2020.3.x/Editor/Data/il2cpp/external` from the installation directory of any version 2020.3.26+ to replace
  `{project}/HyridCLRData/LocalIl2CppData-{platform}/il2cpp/external`
- Depending on your operating system, when selecting modules during installation, you must select `Windows Build Support(IL2CPP)` or `Mac Build Support(IL2CPP)`

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

### Install IDE and related compilation environment

-Windows
   - Under Win, you need to install `visual studio 2019` or later. The installation must include at least the `Game Development with Unity` and `Game Development with C++` components
   - install git
-Mac
   - Requires MacOS version >= 12, xcode version >= 13, e.g. `xcode 13.4.1, macos 12.4`
   - install git

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

### Install

- After decompressing hyridclr_unity.zip, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr
- Decompress the corresponding `libil2cpp-{version}.7z` according to your unity version
- Open `HybridCLR/Installer`, enable the `copy libil2cpp from local` option, select the libil2cpp directory you just decompressed, and install
- Replace `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll` with `ModifiedDlls\{verions}\Unity.IL2CPP.dll` according to your Unity version ( Unity 2020) or `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll` (Unity 2021+). If your version is not available, contact us to make one

![installer](/img/hybridclr/ultimate-installer.jpg)

### Configure HybridCLR

- Open the menu `HybridCLR/Settings`
- Add `HotUpdate` assembly in `differentialHybridAssemblies` list

![settings](/img/hybridclr/ultimate-hybridclr-settings.jpg)

### Configure PlayerSettings

- if your package version less than v4.0.0, you have to turn off the incremental GC (Use Incremental GC) option. Because it is not yet stable, it will not be demonstrated in this tutorial
- `Scripting Backend` switched to `IL2CPP`
- `Api Compatability Level` switched to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

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

## Load hot update assembly

In order to simplify the demonstration, we do not download HotUpdate.dll through the http server, but directly put HotUpdate.dll in the StreamingAssets directory.

HybridCLR is a native runtime implementation, so call `Assembly Assembly.Load(byte[])` to load the hot update assembly.

Create the `Assets/LoadDll.cs` script, then **create a GameObject object in the main scene, add the LoadDll script**.

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
         Assembly hotUpdateAss = LoadDifferentialHybridAssembly("HotUpdate");
#else
         // No need to load under Editor, directly find the HotUpdate assembly
         Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
#endif
         Type helloType = hotUpdateAss. GetType("Hello");
         MethodInfo runMethod = helloType. GetMethod("Run");
         runMethod.Invoke(null, null);
     }

     private Assembly LoadDifferentialHybridAssembly(string assName)
     {
         byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");
         string dhaoPath = $"{Application.streamingAssetsPath}/{assName}.dhao.bytes";
         byte[] dhaoBytes = File.Exists(dhaoPath) ? File.ReadAllBytes(dhaoPath) : null;
         LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssembly(dllBytes, dhaoBytes, true);
         if (err == LoadImageErrorCode. OK)
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


So far, the creation of the entire hot update project has been completed! ! !

## Trial run in Editor

Run the main scene, 'Hello, HybridCLR' will be displayed on the screen, indicating that the code is working properly.

## Build and Run

- Run the menu `HybridCLR/Generate/All` to perform the necessary generation operations. **This step cannot be missed**!!!
- Open the `Build Settings` dialog box, click `Build`, select the output directory `Release-Win64`, and package the project.
- Run menu `HybridCLR/CreateAOTDllSnapshot`. **This step cannot be missed**!!!
- Copy `{proj}/HybridCLRData/AOTDllOutput/StandaloneWindows64/HotUpdate.dll` (StandaloneMacXxx under MacOS) to `XXX_Data/StreamingAssets/HotUpdate.dll.bytes`
- Run `Release-Win64/Xxx.exe`, the screen will display 'Hello, HybridCLR', indicating that the hot update code has been successfully executed!

## Test hot update

- Modify the `Debug.Log("Hello, HybridCLR");` code in the Run function of `Assets/HotUpdate/Hello.cs` to `Debug.Log("Hello, World");`.
- Run the menu command `HybridCLR/CompileDll/ActiveBulidTarget` to recompile the hot update code.
- Run `HybridCLR/Generate/DHEAssmeblyOptionData` to generate dhao data.
- Copy `{proj}/HybridCLRData/HotUpdateDlls/StandaloneWindows64/HotUpdate.dll` to replace `XXX_Data/StreamingAssets/HotUpdate.dll.bytes`
- Copy `{proj}/HybridCLRData/DifferentialHybridOptionDatas/HotUpdate.dhao.bytes` to `XXX_Data/StreamingAssets/HotUpdate.dhao.bytes`
- Re-run the program, and you will find `Hello, World` displayed on the screen, indicating that the hot update code has taken effect!

:::caution
When no hot update happens, use original AOT dll, from `{proj}/HybridCLRData/AOTDllOutput/{target}` directory. When a hot update occurs, use the latest hot update dll from `{proj}/HybridCLRData/HotUpdateDlls/{target}` directory.
:::

This completes the hot update experience! ! !
