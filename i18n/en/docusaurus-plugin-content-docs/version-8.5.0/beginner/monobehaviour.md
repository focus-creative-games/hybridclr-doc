
# Using MonoBehaviour

HybridCLR fully supports the MonoBehaviour workflow. You can dynamically attach hot update scripts through AddComponent in code, or attach hot update scripts to assets and restore them by loading assets.

Based on the quick start guide project, we demonstrate how to use hot update scripts.

## Create `Print.cs` Hot Update Script

Create the `Assets/HotUpdate/Print.cs` script with the following code:

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Print : MonoBehaviour
{
    void Start()
    {
        Debug.Log($"[Print] GameObject:{name}");   
    }
}
```

## Dynamically Attach Hot Update Scripts Using AddComponent in Code

Modify the `Hello.Run` function to add code for dynamically attaching the Print script. The final code is as follows:

```csharp
    public static void Run()
    {
        Debug.Log("Hello, World");

        GameObject go = new GameObject("Test1");
        go.AddComponent<Print>();
    }
```

## Resolve GameObject Stripping Issues

Since GameObject is not used at all in the quick start guide, some functions of the GameObject type are stripped during packaging. You need to perform the following operations, otherwise you'll encounter a `GameObject::.ctor` function not found error when running the hot update code:

- Run the `HybridCLR/Generate/All` command to re-scan hot update assemblies and generate link.xml to preserve types used in hot update code.
- **Rebuild the package**.

After hot updating, a new log line `[Print] GameObject:Test1` will appear on the screen.

## Attach Scripts to Hot Update Assets

Due to Unity's resource management system limitations, assets (prefab, scene, ScriptableObject resources) with hot update scripts attached **must be built into assetbundles** and instantiated from ab packages to properly restore scripts.

:::danger
**If hot update scripts are attached to resources that come with the main package like Resources, scripting missing errors will occur!** However, if they are first built into assetbundle packages and then placed in Resources, loading that bundled assetbundle at runtime is fine.
:::

Since the entire process involves building ab packages and is quite lengthy, it won't be detailed here. Please directly experience the hybridclr_trial project ([github](https://github.com/focus-creative-games/hybridclr_trial) or [gitee](https://gitee.com/focus-creative-games/hybridclr_trial)).

For beginners, you just need to remember: resources (scenes or prefabs) with hot update scripts attached must be packaged into ab, and load the hot update dll before instantiating resources (this requirement is obvious!).


