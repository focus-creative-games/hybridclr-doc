# HotReload hot reload technology

The HotReload technology is used to completely unload or reload an assembly, and is suitable for mini-game collection games. This solution only provides **commercial version**, please refer to [commercial service](/en/other/business.md) for details.

## Supported Features

- Support unloading assembly
- Support reloading assembly, the code can be changed arbitrarily or even completely different (except MonoBehaviour class)
- Unload most of the memory (expected to be more than 95%), but a small amount remains (such as the memory occupied by the thread static member field marked by `[ThreadStatic]`)
- Support hot reloading of MonoBehaviour and ScriptableObject.

## does not support features and special requirements

- It is required that the business code will no longer use the objects or functions in the uninstalled Assembly, and exit all the old logic that is being executed
- It is required that after overloading, in the MonoBehaviour of the same name class in the old Assembly, the functions specially processed by the Unity engine, such as Awake, will not be added or deleted (but the function body can be changed)
