# DOTS Support

The initialization timing of TypeManager in DOTS is too early, and it does not support dynamically registering Component and System types. To ensure the normal operation of the hot update module in the DOTS system, modifications need to be made to the DOTS source code to adjust the initialization timing of the World.

## Supported Versions

Due to the rapid iteration and modification of DOTS, in order to reduce maintenance costs, only the following versions of com.unity.entities are maintained:

- 0.51.1-preview.21
- 1.0.16

Currently, compatibility testing has only been completed on Unity 2021+ versions, and compatibility with Unity 2020 and lower versions has not been tested. Generally, as long as the corresponding version of com.unity.entities can run normally on that Unity version, hybridclr support should also be available.

Developers with special requirements for DOTS versions need to contact us for separate customized payment due to the higher maintenance cost of maintaining separate DOTS versions.


## Supported Features

Currently, most DOTS features can run normally under hybridclr, except for features related to BurstCompile and resource serialization.

### Version 1.0.16

| Feature          | Community Version | Professional Version | Enterprise Version | Hot Reload Version |
|------------------|-------------------|----------------------|--------------------|--------------------|
| Jobs             | ✔                 | ✔                    | ✔                  | ✔                  |
| Managed Component | ✔                 | ✔                    | ✔                  | ✔                  |
| Unmanaged Component | ✔               | ✔                    | ✔                  | ✔                  |
| Managed System   | ✔                 | ✔                    | ✔                  | ✔                  |
| Unmanaged System | ✔                 | ✔                    | ✔                  | ✔                  |
| Aspect           | ✔                 | ✔                    | ✔                  | ✔                  |
| IJobEntity       | ✔                 | ✔                    | ✔                  | ✔                  |
| BurstCompile     |                   |                      | ✔                  |                    |
| SubScene         |                   |                      |                    |                    |

### Version 0.51.1-preview.21

| Feature          | Community Version | Professional Version | Enterprise Version | Hot Reload Version |
|------------------|-------------------|----------------------|--------------------|--------------------|
| Jobs             | ✔                 | ✔                    | ✔                  | ✔                  |
| Managed Component | ✔                 | ✔                    | ✔                  | ✔                  |
| Unmanaged Component | ✔               | ✔                    | ✔                  | ✔                  |
| Managed System   | ✔                 | ✔                    | ✔                  | ✔                  |
| Unmanaged System | ✔                 | ✔                    | ✔                  | ✔                  |
| IJobEntity       | ✔                 | ✔                    | ✔                  | ✔                  |
| BurstCompile     |                   |                      | ✔                  |                    |
| SubScene         |                   |                      |                    |                    |

## Installation

### Installing com.unity.entities

- Remove the com.unity.entities package from the project, exit the Unity Editor, and clear the directory corresponding to the package under `Library\PackageCache`.
- Download the [modified com.unity.entities](https://code-philosophy.feishu.cn/file/NH0cbaeneozfd8xdbvmcLNvfn2d) according to the version used by the project, and unzip the `com.unity.entities.7z` in the corresponding directory to the Packages directory. Make sure that the directory name after decompression is com.unity.entities.

When reopening the Unity Editor, you may be prompted to perform API upgrades. Decide whether to upgrade according to the project situation.

### Modify Project Settings

To avoid potential issues caused by dynamically registering Component or System during DOTS runtime, adjust the initialization timing of World to ensure that all hot update types are registered before running all Worlds.

Add the compilation macro `UNITY_DISABLE_AUTOMATIC_SYSTEM_BOOTSTRAP_RUNTIME_WORLD` in `Player Settings` under `Scripting Define Symbols`. For detailed instructions, refer to the World's [custom initialization documentation](https://docs.unity3d.com/Packages/com.unity.entities@0.51/manual/world.html).

### Initialization

To avoid encountering issues, perform initialization **after loading the hot update code and before running any dots code**.

Initialization mainly consists of two parts:

- Register hot update dots types.
- Initialize World.

There are slight differences in the initialization implementations of different versions of com.unity.entities.

For version 0.51.1, the initialization code is as follows:

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<System.Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddNewComponentTypes(componentTypes.ToArray());
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);

    }
```

For version 1.0.16, the initialization code is as follows:

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.RegisterSystemTypes(dotsAssemblies);
        TypeManager.InitializeSharedStatics();
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);
    }
```

## Resolve ReversePInvokeCallback Issues

When initializing Unmanaged Systems, the DOTS system will attempt to obtain the Marshal pointer of its OnStart-like functions. hybridclr needs to bind a runtime-unique cpp function pointer for each of these functions, otherwise the error GetReversePInvokeWrapper fail. exceed max wrapper num of method will occur during runtime. For detailed instructions, refer to the HybridCLR+lua/js/python documentation.

In simple terms, a sufficient number of SystemBaseRegistry.ForwardingFunc corresponding wrapper functions need to be reserved. Add the following code to the hot update module (or DHE assembly, but not in AOT assemblies):

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

Change the number 100 in the code to an appropriate number, recommended to be 5-10 times the number of Unmanaged System types.

## Burst Related

Hot update functions containing [BurstCompile] have changed, remove the [BurstCompile] attribute, otherwise errors will occur during runtime. This issue may be optimized in the future.