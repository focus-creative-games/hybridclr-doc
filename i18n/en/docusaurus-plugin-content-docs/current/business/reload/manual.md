# Manual

## Supported Features

- Supports unloading assemblies, unloading 100% of the memory occupied by assemblies
- Supports reloading assemblies, code can change arbitrarily or even be completely different (MonoBehaviour and Scriptable have certain limitations)
- Supports **limiting the set of functions that can be accessed within hot update assemblies**, suitable for creating sandbox environments in UGC games to prevent malicious player code from causing damage.

## Unsupported Features and Special Requirements

- Requires business code to no longer use objects or functions from unloaded assemblies, and to exit all executing old logic
- Cannot directly unload dependent assemblies; must unload in reverse dependency order, first unloading dependents, then dependencies. For example, if A.dll depends on B.dll, A.dll must be unloaded first, then B.dll
- MonoBehaviour and ScriptableObject related
  - Requires that event or message functions like Awake, OnEnable in reloaded MonoBehaviour do not change in number (but function bodies can change)
  - Requires that serialized field names of script classes with the same name in the old assembly do not change after reloading (types can change)
  - If field type is a custom type A (class, struct, or enum) from an unloadable assembly, it must be marked with the `[Serializable]` attribute
  - Does not support field types like `List<A>` where A is a type from an unloadable assembly; replace with `A[]`
  - Cannot inherit from generic types, e.g., `class MyScript : CommonScript<int>`
- Some libraries that cache reflection information (this behavior is most common in serialization-related libraries like LitJson) need to clear cached reflection information after hot reload
- Does not support destructors, ~XXX(). Also does not allow instantiation of generic classes with destructors where generic parameters include types from this assembly
- Incompatible with DOTS. Due to DOTS heavily caching type information and complex implementation, it's difficult to individually clear cached information.

## Memory Unload Rate

Except for the following metadata memory that cannot be unloaded, almost all (99.9%) metadata can be unloaded:

- Script classes like MonoBehaviour, ScriptableObject. Their corresponding Il2CppClass at runtime level is referenced internally by Unity engine and cannot be released, but most member metadata like methods can be released
- Types marked with `[Serializable]`. Similar to MonoBehaviour, they may also be referenced internally by Unity engine during serialization and cannot be released.
- Generic classes used during assembly execution that don't involve types from this assembly. For example, `List<int>` metadata won't be released, but `List<MyHotReloadClass>` will be released

All unreleased metadata (MonoBehaviour, Serializable classes) will be **reused** when reloading the assembly. Multiple loads and unloads of the same assembly will only cause one unreleased behavior and won't lead to leakage or continuous growth of unreleased metadata memory.

In actual projects, for most assemblies, over 99% of metadata memory can be unloaded.

## Installation

:::tip

Since version v8.6.0, the libil2cpp directory has been included in the com.code-philosophy.hybridclr package.

:::

- After extracting `hotreload-{version}`, place the `com.code-philosophy.hybridclr` folder into your project’s **Packages** directory.
- Open **HybridCLR/Installer**, then click **Install** — this will automatically copy **libil2cpp** from the `Data~/libil2cpp` directory and complete the installation.

![installer](/img/hybridclr/ultimate-installer.jpg)

## Full Generic Sharing

See [Full Generic Sharing](../fullgenericsharing).

## Code Encryption

See [Code Protection](../basicencryption).

## Access Control

Sometimes you may want to limit the scope of types and functions that hot update code can access. For example, sandbox games may not want UGC code to access file reading interfaces. Access control can achieve this goal.

Please read the detailed documentation [Access Control Policy](../accesspolicy).

## Unloading Assemblies

Currently, two interfaces are provided for unloading assemblies:

- RuntimeApi::TryUnloadAssembly
- RuntimeApi::ForceUnloadAssembly

### RuntimeApi::TryUnloadAssembly

This interface attempts to unload an assembly. If unloading completes normally, report.success is true; otherwise, the report.success field is false.

```csharp
        /// <summary>
        /// Attempts to unload the assembly.
        /// </summary>
        /// <param name="assembly">The assembly to unload.</param>
        /// <param name="printObjectReferenceLink">If true, prints the reference chain when illegal references are detected. Enabling this may increase unloading time.</param>
        /// <returns></returns>
        public static UnloadAssemblyReport TryUnloadAssembly(Assembly assembly, bool printObjectReferenceLink)
        {
            //...
        }
```

If printObjectReferenceLink is true, it will significantly increase unloading time. It's recommended to first try unloading with printObjectReferenceLink as false, and if it fails, then use printObjectReferenceLink as true for unloading. Example code as follows:

```csharp

    void TwoPhaseUnloadAssembly(Assembly ass)
    {
        var report = RuntimeApi.TryUnloadAssembly(ass, false);
        if (!report.success)
        {
            report = RuntimeApi.TryUnloadAssembly(ass, true);
            foreach (string log in report.invalidObjectReferenceLinkLogs)
            {
                Debug.LogError(log);
            }
        }
    }

```

### RuntimeApi::ForceUnloadAssembly

This interface forcefully unloads an assembly and returns an UnloadAssemblyReport. If unloading completes normally, report.success is true; otherwise, the report.success field is false. Regardless of the return result, the assembly will be removed.

```csharp
        /// <summary>
        /// Forcefully unloads the assembly regardless of remaining references to it in the AppDomain.
        /// </summary>
        /// <param name="assembly">The assembly to be unloaded.</param>
        /// <param name="ignoreObjectReferenceValidation">Whether to skip LiveObjectValidator's illegal reference checking. Recommended to set to false.</param>
        /// <param name="printObjectReferenceLink">If true, prints reference chains when illegal references are detected. Enabling this may increase unloading time.</param>
        /// <returns>Indicates whether no illegal references were found (true means no illegal references, false means some exist).</returns>
        /// <exception cref="UnloadAssemblyException">Thrown when assembly unloading fails.</exception>
        public static UnloadAssemblyReport ForceUnloadAssembly(Assembly assembly, bool ignoreObjectReferenceValidation, bool printObjectReferenceLink)
        {
            // ...
        }
```

## HotReload Compatibility Check

Due to Unity engine internally caching some type (MonoBehaviour, Serializable classes) metadata, these classes have certain usage limitations. Violating these limitations may cause runtime crashes.
`HybridCLR.Editor.HotReload.HotReloadCompatibilityValidator` can detect most code incompatible with hot reload in advance.

```csharp
        [MenuItem("Test/CheckCompatibility")]
        public static void CheckCompatibility()
        {
            BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
            CompileDllCommand.CompileDll(target);
            // This should contain hot reload assemblies, not hot update assemblies. 
            // Please don't add assemblies that don't need hot reload to this list.
            var hotReloadDlls = new List<string> { "Tests" };
            var assResolver = MetaUtil.CreateHotUpdateAndAOTAssemblyResolver(target, hotReloadDlls);
            var validator = new HotReloadCompatibilityValidator(hotReloadDlls, assResolver);
            if (!validator.Validate())
            {
                UnityEngine.Debug.LogError("CheckCompatibility failed");
            }
        }

```

## Resolving References to Unloaded Objects

Hot reload technology requires that no metadata from unloaded assembly U should be held in unloaded assemblies or global memory. This includes but is not limited to:

- Instances of types from unloaded assemblies
- Generic classes or functions with generic parameters containing types from unloaded assemblies
- Reflection information related to unloaded assemblies, such as Assembly, Type, MethodInfo, PropertyInfo, etc.
- Delegates pointing to functions in unloaded assemblies
- Async Tasks defined in unloaded assemblies
- Others

Actual projects can be very complex, and it's difficult and impractical for developers to find all illegal references. We have implemented illegal reference checking, and the unloading process will print logs of all illegal references. Developers can clear all illegal references based on the printed logs.

## Known Libraries with Compatibility Issues

Most incompatibility issues are essentially caused by caching of unloaded objects, types, or functions. These incompatibility issues can be resolved by manually clearing these illegal references.

- Jobs in 2022 will cache type-related information, requiring minor [modifications to UnityEngine.CoreModule.dll](./modifydll.md) code. Versions below 2022 don't need modifications
- Deserialization libraries like LitJson will cache reflection information and need to clear cached reflection information in the library after hot reload. Specific operations depend on the library's implementation
