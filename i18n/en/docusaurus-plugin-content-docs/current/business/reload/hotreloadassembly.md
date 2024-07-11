# Hot Reload Technology

Hot reload technology is used to completely unload or reload an assembly, suitable for small game collections. This solution is only available in the **commercial version**.

## Supported Features

- Supports unloading assemblies, freeing up 100% of the memory occupied by the assembly.
- Supports reloading assemblies, allowing code to change arbitrarily or even be completely different (with certain limitations on MonoBehaviour and Scriptable).
- Supports **restricting the set of functions that can be accessed in hot-updated assemblies**, suitable for creating sandbox environments in UGC games to prevent malicious player code from causing damage.

## Unsupported Features and Special Requirements

- Ensure that the business code no longer uses objects or functions from the unloaded Assembly and exits all executing old logic.
- You cannot directly unload a dependent Assembly; you must unload the dependents before the dependencies in reverse dependency order. For example, if A.dll depends on B.dll, you need to unload A.dll first, then B.dll.
- Related to MonoBehaviour and ScriptableObject:
  - Ensure that overloaded MonoBehaviour event or message functions like Awake and OnEnable are not added or removed (but the function body can change).
  - Ensure that the serialized field names in the script classes with the same name in the old Assembly do not change (the types can change).
  - If the field type is a custom type A (class, struct, or enum) from an unloadable Assembly, it must be marked with the `[Serializable]` attribute.
  - Field types such as `List&lt;A&gt;`, where A is a type from an unloadable Assembly, are not supported; replace them with `A[]`.
  - Generic types cannot be inherited, e.g., `class MyScript : CommonScript<int>`.
- Some libraries that cache reflection information (most common in serialization-related libraries like LitJson) need to clear cached reflection information after hot reload.
- Destructors `~XXX()` are not supported. Instantiating generic classes with destructors where the generic parameter is a type from the current Assembly is also not allowed.
- Incompatible with DOTS. Due to the extensive caching of type information and the complexity of implementation, it is difficult to individually clear the cached information.


## Incompatible Libraries

- Jobs in 2022 cache type-related information and require minor [modifications to UnityEngine.CoreModule.dll](./modifydll.md) code. Versions earlier than 2022 do not require modifications.
- Deserialization libraries like LitJson cache reflection information and need to clear the cached reflection information in the library after hot reload. The specific operation depends on the implementation of the library.

## Resolving References to Unloaded Objects

Hot reload technology requires that metadata of unloaded assembly U cannot be held in the assembly or global memory that has not been unloaded. This includes, but is not limited to:

- Instances of types in the unloaded assembly
- Generic parameters of generic classes or functions that include types from the unloaded assembly
- Reflection information related to the unloaded assembly, such as Assembly, Type, MethodInfo, PropertyInfo, etc.
- Delegates pointing to functions in the unloaded assembly
- Tasks defined in the unloaded assembly
- Others

Real-world projects can be complex, and it is difficult and impractical for developers to find all illegal references. We have implemented illegal reference checks, and when unloading, logs of all illegal references will be printed. Developers can clear all illegal references based on the printed logs.

