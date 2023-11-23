# Hotreload Technology

The hot reloading technology is used to completely unload or reload an assembly, which is suitable for small game collection type games. This solution only provides **commercial version**, please refer to [Introduction to Hot Reload Version](./intro.md) for details.

## Supported features

- Support unloading assembly
- Support reloading assembly, the code can be changed arbitrarily or even completely different (except MonoBehaviour class)
- Unload 100% of the metadata memory


## To be implemented, currently unsupported features

- Most of the metadata can be released, but Il2CppClass and MethodInfo objects have not been released yet. The follow-up will be perfected soon.
- Support **Limit the collection of functions that can be accessed in the hot update assembly**, suitable for creating a sandbox environment in UGC games to avoid damage caused by malicious player code.

## does not support features and special requirements

- Cannot unload itself in the code of the unloaded assembly.
- It is required that the business code will no longer use the objects or functions in the uninstalled Assembly, and exit all the old logic that is being executed
- It is required that after overloading, in the MonoBehaviour of the same name class in the old Assembly, the functions specially processed by the Unity engine, such as Awake, will not be added or deleted (but the function body can be changed)
- The dependent Assembly cannot be uninstalled directly, the dependent must be uninstalled first and then the dependent must be uninstalled according to the reverse dependency order. For example, if A depends on B, you need to uninstall B first, and then uninstall A.
- Due to Unity's own implementation, it is not compatible with 2022 Jobs, and you need to slightly modify the code of UnityEngine.CoreModule.dll by yourself. 2020-2021 will still work normally.
- Does not support unloading assemblies containing MonoBehaviour or Scriptable scripts. It is temporarily recommended to put it in another aot or hot update assembly that will not be uninstalled, and reference it in the uninstallable assembly.
- Destructors, ~XXX() are not supported. It is also not allowed to instantiate a generic class with a destructor with a generic parameter of this assembly type