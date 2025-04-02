# Manual

## Supported features

- Supports uninstalling assemblies, uninstalling nearly 100% of the memory used by assemblies
- Supports reloading assemblies, the code can be changed arbitrarily or even completely different (MonoBehaviour and Scriptable have certain restrictions)
- Supports **limiting the set of functions that can be accessed in hot updates of assemblies**, which is suitable for creating sandbox environments in UGC games to avoid damage caused by malicious player code.

## Unsupported features and special requirements

- Requires that business code will no longer use objects or functions in the uninstalled assembly, and exit all old logic in execution
- Cannot directly uninstall the dependent assembly, must first uninstall the dependent in reverse dependency order, and then uninstall the dependent. For example, if A.dll depends on B.dll, you need to uninstall A.dll first, then uninstall B.dll
- MonoBehaviour is related to ScriptableObject
- It is required that events or message functions in the overloaded MonoBehaviour, such as Awake and OnEable, do not be added or deleted (but the function body can change)
- It is required that the serialized field name of the script class with the same name in the old assembly does not change after overloading (the type can change)
- If the field type is a custom type A (class or struct or enum) in the uninstallable assembly, it must be given the `[Serializable]` attribute
- The field type `List<A>` is not supported, where A is a type in the uninstallable assembly, please replace it with `A[]`
- Generic types cannot be inherited, such as `class MyScript : CommonScript<int>`
- Some libraries that cache reflection information (this behavior is most common in serialization-related libraries, such as LitJson), need to clean up the cached reflection information after hot reloading
- Destructors, ~XXX(), are not supported. It is also not allowed to instantiate generic classes with destructors whose generic parameters are of this assembly type
- Incompatible with dots. Since dots caches a large amount of type information and the implementation is complex, it is difficult to clean up the cache information separately.

## Memory unloading rate

Except for the following metadata memory that cannot be unloaded, almost all other (99.9%) metadata can be unloaded:

- Script classes such as MonoBehavoiur and ScriptableObject. The Il2CppClass corresponding to them at the runtime level will be referenced by the Unity engine internally and cannot be released, but most member metadata such as method can be released
- Types marked with `[Serializable]`. Similar to MonoBehaviour, they may also be referenced by the Unity engine memory during serialization and cannot be released.
- Generic classes used during the operation of this assembly, but not involving this assembly type. For example, `List<int>` metadata will not be released, but `List<MyHotReloadClass>` will be released

All unreleased metadata (MonoBehaviour, Serializable class) will be reused when the assembly is loaded again. Loading and unloading the same assembly multiple times will only cause one unreleased behavior, which will not cause leaks or continuous growth of unreleased metadata memory.

In actual projects, more than 99% of metadata memory can be unloaded for most assemblies.

## Installation

- Unzip hybridclr_unity and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Put the hybridclr directory after unzipping `hybridclr.zip` into the libil2cpp directory after unzipping `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, turn on the `Copy libil2cpp from local` option, select the libil2cpp directory just unzipped, and install it

![installer](/img/hybridclr/ultimate-installer.jpg)

## Full generic sharing

See [Full generic sharing](../fullgenericsharing).

## Code encryption

See [Code hardening](../basicencryption).

## Control access

Sometimes you may want to limit the types and functions that hot update code can access, for example, sandbox games do not want UGC code to access file reading interfaces, access control can achieve this goal.

For details, please read the document [Access Control Policy](../accesspolicy).

## Uninstall assembly

Currently, two interfaces are provided for uninstalling assemblies:

- RuntimeApi::TryUnloadAssembly
- RuntimeApi::ForceUnloadAssembly

### RuntimeApi::TryUnloadAssembly

This interface attempts to uninstall the assembly. If the uninstallation succeeds, true is returned; if the uninstallation fails, the status quo is maintained and false is returned.

```csharp
/// <summary>
/// Try to uninstall the assembly
/// </summary>
/// <param name="assembly"></param>
/// <param name="printObjectReferenceLink">Whether to print the reference chain when an illegal reference is found. This option will not only significantly extend the uninstallation time,
/// but also cause a spike in native memory during uninstallation (it will fall back after uninstallation). It is strongly recommended that online projects turn off this option</param>
/// <returns></returns>
public static extern bool TryUnloadAssembly(Assembly assembly, bool printObjectReferenceLink);
```

### RuntimeApi::ForceUnloadAssembly

This interface forcibly uninstalls the assembly. If an exception is issued during the uninstallation process, false is returned, otherwise true is returned. Regardless of the return result, the assembly will be removed.

```csharp
/// <summary>
/// Forcefully uninstall an assembly, regardless of whether there is still a reference to the assembly in the AppDomain
/// </summary>
/// <param name="assembly">Assembly to be uninstalled</param>
/// <param name="ignoreObjectReferenceValidation">Whether to not call LiveObjectValidator to check for illegal references, it is recommended to take false</param>
/// <param name="printObjectReferenceLink">Whether to print the reference chain when an illegal reference is found. This option will not only significantly extend the uninstall time,
/// but also cause a spike in native memory during uninstallation (it will fall back after uninstallation is completed). It is strongly recommended that online projects do not enable this option</param>
/// <returns>Whether there are no illegal references, true means no, false means yes</returns>
/// <exception cref="UnloadAssemblyException"></exception>
public static bool ForceUnloadAssembly(Assembly assembly, bool ignoreObjectReferenceValidation, bool printObjectReferenceLink)
{
    throw new UnloadAssemblyException($"Failed to unload assembly {assembly.FullName}");
}
```

## HotReload compatibility check

Because the Unity engine caches metadata of some types (MonoBehaviour, Serializable classes) internally, there are some restrictions on the use of these classes. If these restrictions are violated, the runtime may crash.
`HybridCLR.Editor.HotReload.HotReloadCompatibilityValidator` can detect most of the codes that are incompatible with hot reload in advance.

```csharp
[MenuItem("Test/CheckCompatibility")]
public static void CheckCompatibility()
{
    BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
    CompileDllCommand.CompileDll(target);
    // This is the hot reload assembly, not the hot update assembly. Please do not add assemblies that do not require hot reload to this list.
    var hotReloadDlls = new List<string> { "Tests" };
    var assResolver = MetaUtil.CreateHotUpdateAndAOTAssemblyResolver(target, hotReloadDlls);
    var validator = new HotReloadCompatibilityValidator(hotReloadDlls, assResolver);
    if (!validator.Validate())
    {
        UnityEngine.Debug.LogError("CheckCompatibility failed");
    }
}

```

## Solve the reference problem of unloaded objects

Hot reload technology requires that the metadata of the unloaded assembly U cannot be held in the unloaded assembly or global memory. Including but not limited to:

- Instances of the type of the uninstalled assembly
- Generic parameters of generic classes or functions that contain the type of the uninstalled assembly
- Reflection information related to the uninstalled assembly, such as Assembly, Type, MethodInfo, PropertyInfo, etc.
- Delegate pointing to a function in the uninstalled assembly
- Asynchronous Task defined in the uninstalled assembly
- Others

Actual projects may be very complex, and it is difficult and impractical for developers to find all illegal references. We have implemented illegal reference checks, and logs of all illegal references will be printed during the uninstallation process. Developers can clear all illegal references according to the printed logs.

## Known libraries with compatibility issues

Most incompatibility issues are essentially caused by the caching of uninstalled objects, types, or functions. Incompatibility issues can be resolved by manually clearing these illegal references.

- Jobs in 2022 will cache type-related information, and you need to slightly modify the code of UnityEngine.CoreModule.dll (./modifydll.md). Versions lower than 2022 do not need to be modified
- Deserialization libraries such as LitJson will cache reflection information. You need to clean up the cached reflection information in the library after hot reload. The specific operation depends on the implementation of the library.
