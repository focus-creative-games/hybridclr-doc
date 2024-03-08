# Hot reload technology

Hot reload technology is used to completely uninstall or reload an assembly, which is suitable for small game collection type games. This program only provides **commercial version**.

## Supported features

- Supports uninstalling assembly and uninstalling 100% of the memory occupied by assembly
- Supports reloading the assembly, the code can be changed arbitrarily or even completely different (MonoBehaviour and Scriptable have certain restrictions)
- Supports **limited set of functions that can be accessed in the hot update assembly**, which is suitable for creating a sandbox environment in UGC games to avoid damage caused by malicious player code.

## Does not support features and special requirements

- Require business code to no longer use objects or functions in the uninstalled Assembly, and exit all old logic being executed
- The dependent Assembly cannot be uninstalled directly. The dependent Assembly must be uninstalled first, and then the dependent Assembly must be uninstalled in reverse dependency order. For example, if A.dll depends on B.dll, you need to uninstall A.dll first, and then uninstall B.dll.
- MonoBehaviour is related to ScriptableObject
   - It is required that the event or message functions in the overloaded MonoBehaviour, such as Awake and OnEable, are not added or deleted (but the function body can be changed)
   - It is required that the serialized field name of the script class with the same name in the old Assembly does not change after overloading (the type can be changed)
   - Cannot inherit from generic types, such as `class MyScript : CommonScript<int>`
- Some libraries that cache reflection information (this behavior is most common in serialization-related libraries, such as LitJson) need to clear the cached reflection information after hot reloading.
- Destructor, ~XXX() is not supported. It is also not allowed to instantiate a generic class with a destructor that takes a generic parameter of this assembly type.
- Not compatible with dots. Due to the large amount of type information cached by dots, the implementation is complex and it is difficult to clear the cache information alone.


## Some incompatible libraries

- Jobs in 2022 will cache type-related information, and you need to slightly [modify UnityEngine.CoreModule.dll](./modifydll.md) code yourself. Versions lower than 2022 do not need to be modified
- Deserialization libraries such as LitJson will cache reflection information. It is necessary to clean up the reflection information cached in the library after hot reloading. The specific operation is related to the implementation of the library.