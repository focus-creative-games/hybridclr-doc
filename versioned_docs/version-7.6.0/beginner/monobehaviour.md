
# 使用MonoBehaviour

HybridCLR完全支持MonoBehaviour工作流，你既可以通过AddComponent的方式在代码里动态挂载热更新脚本，也可以将热更新脚本挂到资源上，再通过加载资源的方式还原脚本。

基于快速上手文档的项目，我们演示如何使用热更新脚本。

## 创建 `Print.cs` 热更新脚本

创建 `Assets/HotUpdate/Print.cs`脚本，代码如下：

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

## 代码中调用AddComponent来动态挂载热更新脚本

修改 `Hello.Run`函数，添加动态挂载Print脚本的代码，最终代码如下:

```csharp
    public static void Run()
    {
        Debug.Log("Hello, World");

        GameObject go = new GameObject("Test1");
        go.AddComponent<Print>();
    }
```

## 解决GameObject被裁剪的问题

由于快速上手中完全没有用到GameObject，导致GameObject类型的部分函数在打包时被裁剪。需要执行以下操作，否则运行下一步的热更新代码时会出现`GameObject::.ctor`函数找不到的错误：

- 运行`HybridCLR/Generate/All`命令重新扫描热更新程序集，生成link.xml以保留热更新代码中用到的类型。
- **重新构建一次新包**。

热更新后，屏幕上会新增一行日志 `[Print] GameObject:Test1`。

## 将脚本挂载到热更新资源

由于Unity资源管理系统的限制，热更新脚本所挂载的资源（prefab、scene、ScriptableObject资源）**必须打成assetbundle**，从ab包中实例化资源，才能正确还原脚本。

:::danger
**如果将热更新脚本挂载到Resources等随主包的资源上，会发生scripting missing的错误！**但如果先打成assetbundle包，再放到Resources下，运行时加载该随包assetbundle则没有问题。
:::

由于整个过程涉及到打ab包，比较冗长，这儿不详细说明。请直接体验 hybridclr_trial 项目（[github](https://github.com/focus-creative-games/hybridclr_trial) 或 [gitee](https://gitee.com/focus-creative-games/hybridclr_trial)）。

对于新手来说，你只需要记住：挂载热更新脚本的资源（场景或prefab）必须打包成ab，在实例化资源前先加载热更新dll即可（这个要求是显然的！）。


