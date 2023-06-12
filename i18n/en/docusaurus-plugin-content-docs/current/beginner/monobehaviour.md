# Use MonoBehaviour

HybridCLR fully supports the MonoBehaviour workflow. You can not only dynamically mount the hot update script in the code through AddComponent, but also hang the hot update script on the resource, and then restore the script by loading the resource.

Based on the project of the quickstart document, we demonstrate how to use the hot update script.

## Create `Print.cs` hot update script

Create `Assets/HotUpdate/Print.cs` script, the code is as follows:

```csharp
using System. Collections;
using System.Collections.Generic;
using UnityEngine;

public class Print : MonoBehaviour
{
     public int value = 1;

     void Start()
     {
         Debug.Log($"[Print] GameObject:{name} value:{value}");
     }
}
```

## Call AddComponent in the code to dynamically mount the hot update script

Modify the `Hello.Run` function and add the code to dynamically mount the Print script. The final code is as follows:

```csharp
     public static void Run()
     {
         Debug. Log("Hello, World");

         GameObject go = new GameObject("Test1");
         go. AddComponent<Print>();
     }
```

After the hot update, a line of log `[Print] GameObject:Test1 value:1` will be added on the screen.

## Mount the script to the hot update resource

Due to the limitations of the Unity resource management system, the resources (prefab, scene, ScriptableObject resources) mounted by the hot update script must be typed into assetbundle**, and the resources can be instantiated from the ab package to restore the script correctly.

!> If you mount the hot update script to Resources and other resources that come with the main package, a scripting missing error will occur!

Since the whole process involves packing the ab package, it is relatively lengthy, so I won't detail it here. Try the hyridclr_trial project ([github](https://focus-creative-games/hybridclr_trial) or [gitee](https://gitee.com/focus-creative-games/hybridclr_trial)) directly.

For beginners, you just need to remember: the resource (scene or prefab) that mounts the hot update script must be packaged into ab, and the hot update dll can be loaded before instantiating the resource (this requirement is obvious!).