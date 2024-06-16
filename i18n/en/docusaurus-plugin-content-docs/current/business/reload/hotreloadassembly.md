# Hot Reload Technology

Hot reload technology is used to completely unload or reload an assembly, suitable for small game collections. This solution is only available in the **commercial version**.

## Supported Features

- Supports unloading assemblies, freeing up 100% of the memory occupied by the assembly.
- Supports reloading assemblies, allowing code to change arbitrarily or even be completely different (with certain limitations on MonoBehaviour and Scriptable).
- Supports **restricting the set of functions that can be accessed in hot-updated assemblies**, suitable for creating sandbox environments in UGC games to prevent malicious player code from causing damage.

## Unsupported Features and Special Requirements

- Business code must stop using objects or functions from the unloaded assembly and exit all old logic being executed.
- Cannot directly unload dependent assemblies; dependencies must be unloaded first in reverse dependency order before unloading the dependent assemblies. For example, if A.dll depends on B.dll, then A.dll must be unloaded first before unloading B.dll.
- MonoBehaviour and ScriptableObject related:
  - Events or message functions in reloaded MonoBehaviours such as Awake, OnEnable, etc., should not be added or removed (but the function body can change).
  - After reloading, the serialized field names of the same-named script classes in the old assembly must not change (but the types can change).
  - Cannot inherit generic types, such as `class MyScript: CommonScript<int>`.
- Some libraries that cache reflection information (this behavior is most common in serialization-related libraries like LitJson) need to clear the cached reflection information after hot reload.
- Does not support destructors, ~XXX(). Also, does not allow instantiating generic classes with destructor functions that belong to the generic parameters of this assembly.
- Not compatible with DOTS. Due to DOTS caching a large amount of type information and its complex implementation, it is difficult to clean up cached information separately.

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

