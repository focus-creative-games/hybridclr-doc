# DOTS Support

DOTS's TypeManager initializes too early and does not support dynamic registration of Components and Systems. To make hot update modules work correctly with DOTS, you must adjust World initialization timing so that type registration finishes **after hot update assemblies are loaded and before any World is created**.

Integration differs by Entities version:

- **0.51.1 / 1.0.16**: Replace `com.unity.entities` with HybridCLR's modified package and call the extended registration APIs inside that package.
- **1.3.15**: **Do not** modify `com.unity.entities` source. Use the official Unity package; rebuild the type tables with `TypeManager.Shutdown` + `TypeManager.Initialize`.

For every supported version, when you must manually invoke hot-update assembly `EarlyInit`, the default integration uses the simple project-side helper `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies)` (pure reflection). For large hot-update assemblies, switch to the JSON approach in [Optimizing EarlyInitAssemblies performance](#optimizing-earlyinitassemblies-performance-all-versions).

## Jobs and BurstCompile

If your project only uses Jobs and Burst and does not use `com.unity.entities`, you do **not** need to change Entities at all (and you do not need the delayed World initialization flow below).

Jobs and Burst can be used normally in hot update code. However, for editions other than Ultimate Edition (Community Edition, Professional Edition, and Hot Reload Edition), Burst code falls back to pure interpreted execution.
For Ultimate Edition, as long as the function itself has not changed, it still runs in Burst mode with no performance degradation.

## Supported Versions

Since DOTS is still rapidly iterating and changing, to reduce maintenance costs, only the following versions of com.unity.entities are maintained:

- 0.51.1-preview.21
- 1.0.16
- 1.3.15

Currently only tested on Unity 2021+ versions; Unity 2020 and lower have not been tested for compatibility. Generally speaking, as long as the corresponding version of com.unity.entities can run normally on that Unity version, it can also support HybridCLR.

For **1.3.15**, **Unity 2022.3 LTS** is recommended (verified).

Developers with special DOTS version requirements need to contact us for separate paid customization due to the high cost of maintaining individual DOTS versions.

## Supported Features

Currently most DOTS features can run normally under HybridCLR, with only features related to BurstCompile and resource serialization having poor support.

### Version 1.3.15

|Feature|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
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

### Version 1.0.16

|Feature|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
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

### Version 0.51.1-preview.21

|Feature|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

## Installation

### Installing com.unity.entities

:::warning

If your project only uses Jobs and Burst and does not use `com.unity.entities`, you do **not** need to install or modify the Entities package.

:::

#### 0.51.1 / 1.0.16 (replace with the modified package)

- Remove the com.unity.entities package from the project, exit Unity Editor, and clear the corresponding directory under `Library\PackageCache`
- Based on the version used by your project, download the [modified com.unity.entities](https://code-philosophy.feishu.cn/file/NH0cbaeneozfd8xdbvmcLNvfn2d), extract the `com.unity.entities.7z` from the corresponding directory into the Packages directory. Make sure the extracted directory name is `com.unity.entities`.

When reopening Unity Editor, you may be prompted whether to perform an API upgrade. Decide based on your project.

#### 1.3.15 (official package, no source changes)

For 1.3.15, **do not** replace Entities with a modified package. Install the official `com.unity.entities` **1.3.15** via Package Manager / `manifest.json`.

Key differences from older versions:

| Item | 0.51.1 / 1.0.16 | 1.3.15 |
|-|-|-|
| Entities package | Must use HybridCLR's modified package | **Official package, no source changes** |
| Type registration | Extended APIs such as `CollectComponentTypes` / `AddComponentTypes` | Rebuild tables with `TypeManager.Shutdown` + `TypeManager.Initialize` |
| EarlyInit | Patched `TypeManager.EarlyInitAssemblies`, or project-side simple reflection helper | Project-side `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies)` (simple reflection) |

### Modifying Project Settings

To avoid potential issues with dynamic registration of Components or Systems during DOTS runtime, adjust World initialization timing so that all hot update types are registered before any World runs.

In `Player Settings` → `Scripting Define Symbols`, add the compilation macro `UNITY_DISABLE_AUTOMATIC_SYSTEM_BOOTSTRAP_RUNTIME_WORLD`. For details, see World's
[custom initialization documentation](https://docs.unity3d.com/Packages/com.unity.entities@1.3/manual/systems-update-order.html).

Add this macro on every target platform you care about (Standalone / Android / iOS / WebGL, etc.).

### Initialization

To avoid problems, initialize **after loading hot update code and before running any DOTS code**.

Initialization mainly includes two parts:

- Register hot update DOTS types
- Initialize World

Different com.unity.entities versions have slightly different initialization implementations.

#### Version 1.3.15 initialization

On 1.3.15, the official `TypeManager.Initialize()` scans assemblies currently in the `AppDomain` (including ILPP-generated `AssemblyTypeRegistry`). Therefore, once hot update DLLs are loaded into the AppDomain, calling `Shutdown` (if already initialized) and then `Initialize` registers the hot update types.

Unmanaged `ISystem` types in AOT assemblies automatically run codegen `EarlyInit` via `RuntimeInitializeOnLoadMethod`. **Late-loaded hot update / DHE assemblies do not get that callback** and must be invoked manually. 1.3.15 does **not** provide a patched `TypeManager.EarlyInitAssemblies`; use the project-side helper below (simple reflection by default; see [Optimizing EarlyInitAssemblies performance](#optimizing-earlyinitassemblies-performance-all-versions) for the faster path).

Place the following helper in your project (hot update or AOT assembly). **Do not** modify the Entities package source:

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
        /// Simple path: scan with Assembly.GetTypes() then invoke EarlyInit.
        /// Easy to integrate, but initializes nearly every type in the assembly.
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
    var dotsAssemblies = new Assembly[] { /* hot update assemblies */ };
#if !UNITY_EDITOR
    // TypeManager.IsInitialized is internal; read it via reflection
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

- Complete the flow above **before creating any World / EntityManager**. Calling `Shutdown` after a World already exists invalidates TypeIndex values stored in existing Archetypes.
- Hot update assemblies must go through Entities ILPP (so that `AssemblyTypeRegistry` etc. are generated); otherwise `Initialize` will not discover those component types.
- In the Editor, hot update assemblies are often already in the AppDomain, so you may skip `Shutdown`/`Initialize` depending on your setup. On Player builds, follow the flow above.

:::

#### Version 0.51.1 initialization

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies are all AOT and hot update assemblies containing custom Component, System and other DOTS types
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<System.Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddNewComponentTypes(componentTypes.ToArray());
        // Or project-side simple helper: TypeManagerEarlyInitHelper.EarlyInitAssemblies(dotsAssemblies);
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);

    }
```

#### Version 1.0.16 initialization

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies are all AOT and hot update assemblies containing custom Component, System and other DOTS types
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.RegisterSystemTypes(dotsAssemblies);
        TypeManager.InitializeSharedStatics();
        // Or project-side simple helper: TypeManagerEarlyInitHelper.EarlyInitAssemblies(dotsAssemblies);
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);
    }
```

:::info

The default initialization samples use the **simple reflection path** (`GetTypes()`), which is easiest to adopt.  
When hot-update assemblies are large and startup cost matters, switch to the JSON-optimized path in the next section.

:::

### Optimizing EarlyInitAssemblies performance (all versions)

Late-loaded hot update / DHE assemblies do not run `RuntimeInitializeOnLoadMethod`, so you must manually invoke Entities codegen `EarlyInit` methods (type names like `__UnmanagedPostProcessorOutput__*`) to register unmanaged `ISystem` types with `SystemBaseRegistry`.

The default simple helper from the previous section calls `Assembly.GetTypes()`, which will:

- Trigger **static initialization of nearly every type** in that assembly
- Allocate many unnecessary `Type` reflection objects

This is independent of the Entities version. The same optimization applies to **0.51.1 / 1.0.16 / 1.3.15**:

1. **Editor**: scan hot-update DLLs with dnlib and write an EarlyInit type-list JSON (`TypeManagerEarlyInitGenerator`).
2. **Runtime**: call the overload `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies, json)`, which resolves types by name via `Assembly.GetType` (no `GetTypes()`).

On top of the simple `TypeManagerEarlyInitHelper` from the previous section, add the Manifest types and JSON overload (can live in the same file):

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
        /// Optimized path: invoke only EarlyInit methods listed in JSON; avoids Assembly.GetTypes().
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

Place the following **Editor** class in an Editor assembly (depends on dnlib shipped with HybridCLR; `SettingsUtil` is from `HybridCLR.Editor`). After compiling hot-update DLLs, call `Generate` and ship the JSON with hot-update assets:

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

        /// <param name="hotUpdateDllPaths">hot-update dll file paths</param>
        /// <param name="outputJsonPath">output json path (e.g. under StreamingAssets)</param>
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

- Simple path: `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies)` (default in each version's init samples).
- Optimized path: `TypeManagerEarlyInitGenerator.Generate(hotUpdateDllPaths, outputJsonPath)`, then `TypeManagerEarlyInitHelper.EarlyInitAssemblies(assemblies, json)` at runtime.
- Regenerate the JSON after rebuilding hot-update DLLs, and ship it with hot-update assets.
- If a hot-update assembly has no unmanaged `ISystem`, its list in the JSON may be empty; calling the helper is still safe.

:::

### Solving ReversePInvokeCallback Issues

When DOTS initializes Unmanaged Systems, it tries to get Marshal pointers for functions such as OnStart. HybridCLR needs to bind a runtime-unique C++ function pointer for each such function; otherwise runtime fails with `GetReversePInvokeWrapper fail. exceed max wrapper num of method`. For details, see the [HybridCLR+lua/js/python](https://www.hybridclr.cn/docs/basic/workwithscriptlanguage) documentation.

Simply put, reserve enough wrapper functions for `SystemBaseRegistry.ForwardingFunc`. Add the following code in the hot update module (or a DHE assembly, but not an AOT assembly):

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

Change `100` to an appropriate number. A common recommendation is 5–10× the number of Unmanaged System types.

### Hot Updating Code with `[BurstCompile]`

There are two cases:

1. Only Jobs and Burst are used, and `com.unity.entities` is not used

For non-Ultimate editions, usage is no different from ordinary hot update code. You can freely add, delete, and modify related code.

For Ultimate Edition, rename the Job type, like this:

```csharp
        /// Code before hot update
        [BurstCompile]
        public struct MyJobBeforeHotUpdate : IJobParallelFor
        {
            public void Execute(int index)
            {
            }
        }


        /// Code after hot update
        [BurstCompile]
        public struct MyJobAfterHotUpdate : IJobParallelFor
        {
            public void Execute(int index)
            {
            }
        }
```

1. `com.unity.entities` is used

For non-Ultimate editions, usage is still no different from ordinary hot update code, and you can freely add, delete, and modify related code. However, in interpreted execution mode, Burst code not only fails to improve performance, but also causes Unity to inject a large amount of complex helper code,
which leads to severe performance degradation. Developers using non-Ultimate editions are advised to remove `[BurstCompile]` from hot update code.

For Ultimate Edition, if a hot update function containing `[BurstCompile]` changes, you must remove the `[BurstCompile]` attribute. Otherwise, the old code will still be executed.
