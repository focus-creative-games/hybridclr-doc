# HotReload Technology

Hot reload technology is used to completely uninstall or reload an assembly, which is suitable for games of the mini-game collection type. This solution only provides **commercial version**.

## Supported features

- Support uninstalling assemblies, uninstalling 100% of the memory occupied by assemblies
- Support reloading assemblies, the code can be arbitrarily changed or even completely different (MonoBehaviour and Scriptable have certain restrictions)
- Support **limiting the set of functions that can be accessed in hot updates of assemblies**, which is suitable for creating sandbox environments in UGC games to avoid damage caused by malicious player code.

## Unsupported features and special requirements

- Require that business code will no longer use objects or functions in the uninstalled assembly, and exit all old logic in execution
- Cannot directly uninstall the dependent assembly, must first uninstall the dependent in reverse dependency order, and then uninstall the dependent. For example, if A.dll depends on B.dll, you need to uninstall A.dll first, then uninstall B.dll
- MonoBehaviour,ScriptableObject and types are marked `[Serializable]`
    - It is required that events or message functions in the overloaded MonoBehaviour, such as Awake and OnEable, do not be added or deleted (but the function body can change)
    - It is required that the serialized field name of the script class with the same name in the old assembly does not change after overloading (the type can change)
    - If the field type is a custom type A (class or struct or enum) in the uninstallable assembly, it must be given the `[Serializable]` attribute
    - The field type `List<A>` is not supported, where A is a type in the uninstallable assembly, please replace it with `A[]`
    - Cann't be generic types, .eg `class MyScript<T> : MonoBehaviour`
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