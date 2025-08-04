# DOTS Support

DOTS's TypeManager initializes too early and doesn't support dynamic registration of Components and Systems. To make hot update modules run properly in DOTS systems, DOTS source code needs to be modified to adjust the initialization timing of World.

## Supported Versions

Since DOTS is still rapidly iterating and changing, to reduce maintenance costs, only the following versions of com.unity.entities are maintained:

- 0.51.1-preview.21
- 1.0.16

Currently only tested on Unity 2021+ versions, Unity 2020 and lower versions haven't been tested for compatibility. Generally speaking, as long as the corresponding version of com.unity.entities can run normally on that Unity version, it can also support HybridCLR.

Developers with special DOTS version requirements need to contact us for separate paid customization due to the high cost of maintaining individual DOTS versions.

## Supported Features

Currently most DOTS features can run normally under HybridCLR, with only features related to BurstCompile and resource serialization having poor support.

### Version 1.0.16

|Feature|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|Aspect|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

### Version 0.51.1-preview.21

|Feature|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

## Installation

### Installing com.unity.entities

- Remove the com.unity.entities package from the project, exit Unity Editor, and clear the corresponding directory in the `Library\PackageCache` directory
- Based on the version used by your project, download the [modified com.unity.entities](https://code-philosophy.feishu.cn/file/NH0cbaeneozfd8xdbvmcLNvfn2d), extract the `com.unity.entities.7z` from the corresponding directory to the Packages directory. Make sure the extracted directory name is com.unity.entities.

When reopening Unity Editor, you may be prompted whether to perform API upgrade. Decide whether to upgrade based on your project situation.

### Modifying Project Settings

To avoid potential issues with dynamic registration of Components or Systems during DOTS runtime, you need to adjust World initialization timing to ensure all hot update types are registered before running all Worlds.

In `Player Settings`'s `Scripting Define Symbols`, add the compilation macro `UNITY_DISABLE_AUTOMATIC_SYSTEM_BOOTSTRAP_RUNTIME_WORLD`. For detailed introduction, see World's
[custom initialization documentation](https://docs.unity3d.com/Packages/com.unity.entities@0.51/manual/world.html).

### Initialization

To avoid encountering problems, please initialize **after loading hot update code and before running any DOTS code**.

Initialization mainly includes two parts:

- Register hot update DOTS types
- Initialize World

Different com.unity.entities versions have slightly different initialization implementations.

0.51.1 version initialization code:

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies are all AOT and hot update assemblies containing custom Component, System and other DOTS types
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<System.Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddNewComponentTypes(componentTypes.ToArray());
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);

    }
```

1.0.16 version initialization code:

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies are all AOT and hot update assemblies containing custom Component, System and other DOTS types
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

### Solving ReversePInvokeCallback Issues

When DOTS system initializes Unmanaged Systems, it tries to get Marshal pointers for functions like OnStart. HybridCLR needs to bind a runtime-unique cpp function pointer for each such function,
otherwise a `GetReversePInvokeWrapper fail. exceed max wrapper num of method` error will occur during runtime. For detailed introduction, see the [HybridCLR+lua/js/python](https://hybridclr.doc.code-philosophy.com/docs/basic/workwithscriptlanguage) documentation.

Simply put, you need to reserve enough wrapper functions corresponding to SystemBaseRegistry.ForwardingFunc. Add the following code in the hot update module (can also be in DHE assembly, but not in AOT assembly):

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

Change the 100 in the code to an appropriate number. It's recommended to be 5-10 times the number of Unmanaged System types.

### Burst Related

- When hot update functions containing `[BurstCompile]` change, you need to remove the `[BurstCompile]` attribute, otherwise runtime errors will occur. This issue may be optimized in the future
