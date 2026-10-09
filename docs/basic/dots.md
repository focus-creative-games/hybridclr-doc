---
title: 'DOTS支持'
description: 'DOTS的TypeManager初始化时机过早，而且不支持动态注册Component和System等类型。为了让热更新模块能在DOTS系统中正常 运行，需要调整World的初始化时机，确保加载完热更新程序集之后、创建任何World之前完成类型注册。'
slug: /basic/dots
---

# DOTS支持

DOTS的TypeManager初始化时机过早，而且不支持动态注册Component和System等类型。为了让热更新模块能在DOTS系统中正常
运行，需要调整World的初始化时机，确保**加载完热更新程序集之后、创建任何World之前**完成类型注册。

不同Entities版本的接入方式不同：

- **0.51.1 / 1.0.16**：需要替换为HybridCLR修改后的`com.unity.entities`包，并调用包内扩展的注册API。
- **1.3.15**：**不需要**修改`com.unity.entities`源码，使用Unity官方包即可；通过`TypeManager.Shutdown` + `TypeManager.Initialize`重建类型表。

各版本在手动调用热更程序集 `EarlyInit` 时，默认可使用项目侧 `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies)`（纯反射，实现简单）。热更程序集较大时可再按[优化 EarlyInitAssemblies 的性能](#优化-earlyinitassemblies-的性能各版本通用)切换到 JSON 方案。

## Jobs and BurstCompile

如果项目中仅仅用到了Jobs和Burst，并没有使用 `com.unity.entities`，则**不需要**对`com.unity.entities`进行任何改造（也不需要下文的World推迟初始化流程）。

在热更新代码中可以正常使用jobs和burst，但是，对于旗舰版本以外的版本（社区版、专业版和热重载版），burst代码会退化为纯解释执行。
对于旗舰版本，只要没有改动函数，仍然以burst方式运行，性能没有任何衰减。

## 支持的版本

由于DOTS仍然在快速迭代和修改，为了减少维护成本，只维护以下几个版本的com.unity.entities：

- 0.51.1-preview.21
- 1.0.16
- 1.3.15

一般来说，只要对应版本的com.unity.entities能在该Unity版本上正常运行，也能支持hybridclr。

其中 **1.3.15** 建议在 **Unity 2022.3 LTS** 上使用（已完成验证）。

有特殊DOTS版本需求的开发者，由于维护单独的DOTS版本成本较高，需要联系我们单独付费定制。


## 支持的特性

目前绝大多数DOTS特性都可以在hybridclr下正常运行，只有跟BurstCompile及资源序列化相关的特性支持较差。

### 1.3.15版本

|特性|社区版本|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|Aspect|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

### 1.0.16版本

|特性|社区版本|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|Aspect|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

### 0.51.1-preview.21版本

|特性|社区版本|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

## 安装

### 安装com.unity.entities

:::warning

如果项目中仅仅用到了Jobs和Burst，并没有使用 `com.unity.entities`，则**不需要**安装或改造Entities包。

:::

#### 0.51.1 / 1.0.16（替换修改后的包）

- 在项目中移除 com.unity.entities包，退出Unity Editor，清空 `Library\PackageCache` 目录下该包对应的目录
- 根据项目使用的版本，下载[修改后的com.unity.entities](https://code-philosophy.feishu.cn/file/NH0cbaeneozfd8xdbvmcLNvfn2d)，将对应目录下的`com.unity.entities.7z` 解压到 Packages目录。请确保解压后的目录名为com.unity.entities。

重新打开Unity Editor时可能会提示是否要进行Api升级，根据项目情况自行决定是否升级。

#### 1.3.15（使用官方包，不改源码）

1.3.15 **不要**替换为修改后的Entities包，直接通过 Package Manager / `manifest.json` 安装官方 `com.unity.entities` **1.3.15** 即可。

与旧版本的关键差异：

| 项 | 0.51.1 / 1.0.16 | 1.3.15 |
|-|-|-|
| Entities包 | 必须替换HybridCLR修改包 | **使用官方包，不改源码** |
| 类型注册 | `CollectComponentTypes` / `AddComponentTypes` 等扩展API | `TypeManager.Shutdown` + `TypeManager.Initialize` 整表重建 |
| EarlyInit | 改包 `TypeManager.EarlyInitAssemblies`，或项目侧简单反射版 | 项目侧 `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies)`（简单反射版） |

### 修改项目设置

为了避免DOTS运行过程中带动态注册Component或System可能引发的问题，需要调整World的初始化时机以确保运行所有World之前已经注册了所有热更新类型。

在`Player Settings`的`Scripting Define Symbols`中，添加编译宏 `UNITY_DISABLE_AUTOMATIC_SYSTEM_BOOTSTRAP_RUNTIME_WORLD`。详细介绍可以参见World的
[自定义初始化文档](https://docs.unity3d.com/Packages/com.unity.entities@1.3/manual/systems-update-order.html)。

建议在各个目标平台（Standalone / Android / iOS / WebGL等）都加上该宏。

### 初始化

为了避免遇到问题，请在**加载完热更新代码后，运行任何dots代码之前**进行初始化。

初始化中主要包含两部分：

- 注册热更新的dots类型
- 初始化World

不同的com.unity.entities版本的初始化实现略有差别。

#### 1.3.15版本初始化

1.3.15 官方`TypeManager`在`Initialize()`时会扫描当前`AppDomain`中的程序集（含ILPP生成的`AssemblyTypeRegistry`）。因此只要热更新DLL已经加载进AppDomain，再执行一次`Shutdown`（若已初始化）+ `Initialize`，即可把热更类型注册进去。

AOT程序集的Unmanaged `ISystem` 会通过`RuntimeInitializeOnLoadMethod`自动执行codegen生成的`EarlyInit`；**晚加载的热更新/DHE程序集不会触发该回调**，必须手动调用。1.3.15 **没有**修改包内的`TypeManager.EarlyInitAssemblies`，请使用项目侧辅助类（下方为默认的简单反射版；性能优化见[优化 EarlyInitAssemblies 的性能](#优化-earlyinitassemblies-的性能各版本通用)）。

请将以下辅助类放到项目中（热更新或AOT程序集均可），**不要**改Entities包源码：

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Unity.Entities
{
    public static class TypeManagerEarlyInitHelper
    {
        public const string EarlyInitTypePrefix = "__UnmanagedPostProcessorOutput__";
        public const string EarlyInitMethodName = "EarlyInit";
        const BindingFlags EarlyInitFlags = BindingFlags.Static | BindingFlags.Public | BindingFlags.NonPublic;

        /// <summary>
        /// 简单版：Assembly.GetTypes() 扫描后调用 EarlyInit。实现简单，但会初始化程序集内几乎所有类型。
        /// </summary>
        public static void EarlyInitAssemblies(IEnumerable<Assembly> assemblies)
        {
            if (assemblies == null)
                return;

            foreach (var assembly in assemblies)
            {
                if (assembly == null)
                    continue;

                Type[] types;
                try
                {
                    types = assembly.GetTypes();
                }
                catch (ReflectionTypeLoadException ex)
                {
                    types = ex.Types.Where(t => t != null).ToArray();
                }

                foreach (var type in types)
                {
                    if (type == null || !type.Name.StartsWith(EarlyInitTypePrefix, StringComparison.Ordinal))
                        continue;

                    var earlyInit = type.GetMethod(EarlyInitMethodName, EarlyInitFlags, null, Type.EmptyTypes, null);
                    earlyInit?.Invoke(null, null);
                }
            }
        }
    }
}
```

```csharp
private static void InitializeWorld()
{
    var dotsAssemblies = new Assembly[] { /* 热更新程序集 */ };
#if !UNITY_EDITOR
    // TypeManager.IsInitialized 为 internal，通过反射读取
    var isInitializedProp = typeof(TypeManager).GetProperty("IsInitialized",
        BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public);
    if (isInitializedProp != null && (bool)isInitializedProp.GetValue(null))
        TypeManager.Shutdown();

    TypeManager.Initialize();
    TypeManagerEarlyInitHelper.EarlyInitAssemblies(dotsAssemblies);
#endif
    DefaultWorldInitialization.Initialize("Default World", false);
}
```

:::warning

- 必须在**创建任何 World / EntityManager 之前**完成上述流程；若World已创建再`Shutdown`，已有Archetype中的TypeIndex会失效。
- 热更新程序集需经过Entities ILPP（生成`AssemblyTypeRegistry`等），否则`Initialize`扫描不到组件类型。
- Editor下热更程序集通常已在域内，可按项目情况决定是否走`Shutdown`/`Initialize`；Player上务必按上面流程执行。

:::

#### 0.51.1版本初始化

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies为所有包含自定义Component、System等DOTS类型的AOT和热更新程序集
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<System.Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddNewComponentTypes(componentTypes.ToArray());
        // 也可用项目侧简单版：TypeManagerEarlyInitHelper.EarlyInitAssemblies(dotsAssemblies);
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);

    }
```

#### 1.0.16版本初始化

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies为所有包含自定义Component、System等DOTS类型的AOT和热更新程序集
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.RegisterSystemTypes(dotsAssemblies);
        TypeManager.InitializeSharedStatics();
        // 也可用项目侧简单版：TypeManagerEarlyInitHelper.EarlyInitAssemblies(dotsAssemblies);
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);
    }
```

:::info

默认初始化示例使用的是**简单反射版**（`GetTypes()`），接入成本最低。  
热更程序集较大、启动耗时明显时，再按下一节切换到 JSON 优化版。

:::

### 优化 EarlyInitAssemblies 的性能（各版本通用）

晚加载的热更新/DHE程序集不会走 `RuntimeInitializeOnLoadMethod`，需要手动调用 Entities codegen 生成的 `EarlyInit`（类型名形如 `__UnmanagedPostProcessorOutput__*`），才能把 Unmanaged `ISystem` 注册进 `SystemBaseRegistry`。

上一节默认介绍的简单版会调用 `Assembly.GetTypes()`，这会：

- 触发该程序集内**几乎所有类型的静态初始化**
- 产生大量不必要的 `Type` 反射对象

这与具体 Entities 版本无关，**0.51.1 / 1.0.16 / 1.3.15 均适用**同一优化：

1. **Editor**：用 dnlib 扫描热更 DLL，生成 EarlyInit 类型清单 JSON（`TypeManagerEarlyInitGenerator`）。
2. **Runtime**：调用重载 `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies, json)`，按 JSON 中的类型名 `Assembly.GetType` 后调用 `EarlyInit`（不再 `GetTypes()`）。

在上一节简单版 `TypeManagerEarlyInitHelper` 基础上，补充 Manifest 类型与 JSON 重载（可与简单版放在同一文件）：

```csharp
using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;

namespace Unity.Entities
{
    [Serializable]
    public class TypeManagerEarlyInitManifest
    {
        public List<TypeManagerEarlyInitAssemblyEntry> assemblies = new List<TypeManagerEarlyInitAssemblyEntry>();
    }

    [Serializable]
    public class TypeManagerEarlyInitAssemblyEntry
    {
        public string name;
        public List<string> earlyInitTypes = new List<string>();
    }

    public static partial class TypeManagerEarlyInitHelper
    {
        /// <summary>
        /// 优化版：仅调用 JSON 中列出的 EarlyInit，避免 Assembly.GetTypes()。
        /// </summary>
        public static void EarlyInitAssemblies(IEnumerable<Assembly> assemblies, string earlyInitJson)
        {
            if (assemblies == null)
                throw new ArgumentNullException(nameof(assemblies));
            if (string.IsNullOrEmpty(earlyInitJson))
                throw new ArgumentException("earlyInitJson is null or empty", nameof(earlyInitJson));

            var manifest = JsonUtility.FromJson<TypeManagerEarlyInitManifest>(earlyInitJson);
            if (manifest?.assemblies == null || manifest.assemblies.Count == 0)
                return;

            var assemblyByName = new Dictionary<string, Assembly>(StringComparer.Ordinal);
            foreach (var assembly in assemblies)
            {
                if (assembly == null)
                    continue;
                assemblyByName[assembly.GetName().Name] = assembly;
            }

            foreach (var entry in manifest.assemblies)
            {
                if (entry == null || string.IsNullOrEmpty(entry.name) || entry.earlyInitTypes == null)
                    continue;
                if (!assemblyByName.TryGetValue(entry.name, out var assembly))
                {
                    Debug.LogWarning($"[TypeManagerEarlyInitHelper] Assembly not loaded: {entry.name}");
                    continue;
                }

                foreach (var typeName in entry.earlyInitTypes)
                {
                    if (string.IsNullOrEmpty(typeName))
                        continue;

                    var type = assembly.GetType(typeName, throwOnError: false, ignoreCase: false);
                    if (type == null)
                    {
                        Debug.LogError($"[TypeManagerEarlyInitHelper] Type not found: {entry.name}::{typeName}");
                        continue;
                    }

                    var earlyInit = type.GetMethod(EarlyInitMethodName, EarlyInitFlags, null, Type.EmptyTypes, null);
                    if (earlyInit == null)
                    {
                        Debug.LogError($"[TypeManagerEarlyInitHelper] EarlyInit not found: {type.FullName}");
                        continue;
                    }

                    earlyInit.Invoke(null, null);
                }
            }
        }
    }
}
```

请将以下**Editor**类放到 Editor 程序集（依赖 HybridCLR 自带的 dnlib；`SettingsUtil` 来自 `HybridCLR.Editor`）。打包热更 DLL 后调用 `Generate`，把 JSON 随热更资源一起发布：

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using dnlib.DotNet;
using Unity.Entities;
using UnityEditor;
using UnityEngine;

namespace HybridCLR.Editor
{
    /// <summary>
    /// Editor-only: scan hot-update DLLs with dnlib and write a JSON manifest of codegen EarlyInit types.
    /// Runtime loads that JSON and calls TypeManagerEarlyInitHelper.EarlyInitAssemblies.
    /// </summary>
    public static class TypeManagerEarlyInitGenerator
    {
        public static string DefaultOutputJsonPath =>
            Path.Combine(Application.streamingAssetsPath, "TypeManagerEarlyInit.json");

        /// <param name="hotUpdateDllPaths">热更新 dll 文件路径列表</param>
        /// <param name="outputJsonPath">输出的 json 路径（可放到 StreamingAssets）</param>
        public static TypeManagerEarlyInitManifest Generate(IEnumerable<string> hotUpdateDllPaths, string outputJsonPath)
        {
            if (hotUpdateDllPaths == null)
                throw new ArgumentNullException(nameof(hotUpdateDllPaths));
            if (string.IsNullOrEmpty(outputJsonPath))
                throw new ArgumentException("outputJsonPath is null or empty", nameof(outputJsonPath));

            var manifest = new TypeManagerEarlyInitManifest();
            var dllPaths = hotUpdateDllPaths.Where(p => !string.IsNullOrEmpty(p)).Distinct(StringComparer.OrdinalIgnoreCase).ToList();

            foreach (var dllPath in dllPaths)
            {
                if (!File.Exists(dllPath))
                {
                    Debug.LogError($"[TypeManagerEarlyInitGenerator] DLL not found: {dllPath}");
                    continue;
                }

                ModuleDefMD module = null;
                try
                {
                    module = ModuleDefMD.Load(File.ReadAllBytes(dllPath));
                    var assemblyName = module.Assembly?.Name?.String;
                    if (string.IsNullOrEmpty(assemblyName))
                        assemblyName = Path.GetFileNameWithoutExtension(dllPath);

                    var entry = new TypeManagerEarlyInitAssemblyEntry
                    {
                        name = assemblyName,
                        earlyInitTypes = new List<string>()
                    };

                    foreach (var type in module.GetTypes())
                    {
                        if (type == null || type.IsGlobalModuleType)
                            continue;

                        var typeName = type.Name?.String;
                        if (string.IsNullOrEmpty(typeName) ||
                            !typeName.StartsWith(TypeManagerEarlyInitHelper.EarlyInitTypePrefix, StringComparison.Ordinal))
                            continue;

                        if (!HasStaticParameterlessEarlyInit(type))
                            continue;

                        var fullName = string.IsNullOrEmpty(type.Namespace)
                            ? typeName
                            : type.FullName;
                        entry.earlyInitTypes.Add(fullName);
                    }

                    entry.earlyInitTypes.Sort(StringComparer.Ordinal);
                    if (entry.earlyInitTypes.Count > 0)
                        manifest.assemblies.Add(entry);

                    Debug.Log($"[TypeManagerEarlyInitGenerator] {assemblyName}: {entry.earlyInitTypes.Count} EarlyInit type(s) from {dllPath}");
                }
                catch (Exception e)
                {
                    Debug.LogException(e);
                    Debug.LogError($"[TypeManagerEarlyInitGenerator] Failed to scan: {dllPath}");
                }
                finally
                {
                    module?.Dispose();
                }
            }

            manifest.assemblies.Sort((a, b) => string.CompareOrdinal(a.name, b.name));

            var dir = Path.GetDirectoryName(outputJsonPath);
            if (!string.IsNullOrEmpty(dir))
                Directory.CreateDirectory(dir);

            var json = JsonUtility.ToJson(manifest, true);
            File.WriteAllText(outputJsonPath, json);
            Debug.Log($"[TypeManagerEarlyInitGenerator] Wrote {outputJsonPath}");

            if (outputJsonPath.Replace('\\', '/').Contains("/Assets/"))
                AssetDatabase.Refresh();

            return manifest;
        }

        [MenuItem("HybridCLR/Generate/TypeManager EarlyInit JSON")]
        public static void GenerateFromHybridCLRHotUpdateDlls()
        {
            var target = EditorUserBuildSettings.activeBuildTarget;
            var dllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
            var dllPaths = SettingsUtil.HotUpdateAssemblyFilesExcludePreserved
                .Select(dll => Path.Combine(dllDir, dll))
                .ToList();

            if (dllPaths.Count == 0)
            {
                Debug.LogError("[TypeManagerEarlyInitGenerator] No hot update assemblies configured in HybridCLR Settings.");
                return;
            }

            Generate(dllPaths, DefaultOutputJsonPath);
        }

        static bool HasStaticParameterlessEarlyInit(TypeDef type)
        {
            foreach (var method in type.Methods)
            {
                if (method == null || !method.IsStatic)
                    continue;
                if (method.Name != TypeManagerEarlyInitHelper.EarlyInitMethodName)
                    continue;
                if (method.MethodSig != null && method.MethodSig.Params.Count == 0)
                    return true;
            }

            return false;
        }
    }
}
```

:::tip

- 简单版：`TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies)`（各版本初始化默认用法）。
- 优化版：`TypeManagerEarlyInitGenerator.Generate(hotUpdateDllPaths, outputJsonPath)`，再在运行时调用 `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies, json)`。
- 打包热更 DLL 后请重新生成 JSON，并随热更资源一起发布。
- 若热更程序集中没有任何 Unmanaged `ISystem`，JSON 中对应列表可为空，调用仍是安全的。

:::

### 解决ReversePInvokeCallback的问题

DOTS系统初始化Unmanaged System时会尝试获得它的OnStart之类函数的Marshal指针。hybridclr需要为每个这种函数绑定一个运行时唯一的cpp函数指针，
否则运行过程中会出现`GetReversePInvokeWrapper fail. exceed max wrapper num of method`错误。详细介绍可见[HybridCLR+lua/js/python](https://www.hybridclr.cn/docs/basic/workwithscriptlanguage)文档。

简单来说，需要预留足够多的 SystemBaseRegistry.ForwardingFunc对应的 wrapper函数。在热更新模块（也可以在DHE程序集，但不能在AOT程序集）中添加如下代码：

```csharp
public static class PreserveDOTSReversePInvokeWrapper
{
    [ReversePInvokeWrapperGeneration(100)]
    [MonoPInvokeCallback(typeof(SystemBaseRegistry.ForwardingFunc))]
    public static void ForwordMethod(IntPtr system, IntPtr state)
    {

    }
}


```

将代码中的100改为一个适当的数字即可，推荐为Unmanaged System类型个数的5-10倍。

### 热更新带`[BurstCompile]`的代码

分为两种情况：

1. 仅使用 jobs和burst，没有使用`com.unity.entities`

如果是非旗舰版本，则用法与普通热更新代码没有任何区别，随意添加、删除和修改相关代码。

如果是旗舰版本，则需要修改Job类的名字，像这样：

```csharp
        /// 热更新前的代码
        [BurstCompile]
        public struct MyJobBeforeHotUpdate : IJobParallelFor
        {
            public void Execute(int index)
            {
            }
        }


        /// 热更新后的代码
        [BurstCompile]
        public struct MyJobAfterHotUpdate : IJobParallelFor
        {
            public void Execute(int index)
            {
            }
        }
```

1. 使用`com.unity.entities`

如果是非旗舰版本，则用法与普通热更新代码没有任何区别，随意添加、删除和修改相关代码。但由于解释执行模式下burst代码不仅不能提升性能，还会导致unity会插入大量复杂的辅助代码，
导致性能严重下降。建议非旗舰版本开发者移除热更新代码中`[BurstCompile]`。

如果是旗舰版本，包含`[BurstCompile]`的热更新函数发生变化，需要移除`[BurstCompile]`特性，否则仍然会运行了旧的代码！
