# Hot Reload Technology

Hot reload technology is used to completely unload or reload an assembly, suitable for mini-game collection type games. This solution is only available in **commercial versions**.

## Supported Features

- Supports unloading assemblies, unloading 100% of the memory occupied by assemblies
- Supports reloading assemblies, code can change arbitrarily or even be completely different (MonoBehaviour and Scriptable have certain limitations)
- Supports **limiting the set of functions that can be accessed within hot update assemblies**, suitable for creating sandbox environments in UGC games to prevent malicious player code from causing damage.

## Unsupported Features and Special Requirements

- Requires business code to no longer use objects or functions from unloaded assemblies, and to exit all executing old logic
- Cannot directly unload dependent assemblies; must unload in reverse dependency order, first unloading dependents, then dependencies. For example, if A.dll depends on B.dll, A.dll must be unloaded first, then B.dll
- MonoBehaviour, ScriptableObject, and types marked with `[Serializable]`
  - Requires that event or message functions like Awake, OnEnable in reloaded MonoBehaviour do not change in number (but function bodies can change)
  - Requires that serialized field names of script classes with the same name in the old assembly do not change after reloading (types can change)
  - If field type is a custom type A (class, struct, or enum) from an unloadable assembly, it must be marked with the `[Serializable]` attribute
  - Does not support field types like `List<A>` where A is a type from an unloadable assembly; replace with `A[]`
  - Cannot be generic or inherit from generic types, e.g., `class MyScript<T>` or `class MyScript : CommonScript<int>`
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

