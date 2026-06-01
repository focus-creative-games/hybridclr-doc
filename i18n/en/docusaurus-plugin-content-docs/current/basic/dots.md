# DOTS Support

DOTS's TypeManager initializes too early and doesn't support dynamic registration of Components and Systems. To make hot update modules run properly in DOTS systems, DOTS source code needs to be modified to adjust the initialization timing of World.

## Jobs and BurstCompile

If your project only uses Jobs and Burst and does not use `com.unity.entities`, then you do **not** need to modify the source code of `com.unity.entities`.

Jobs and Burst can be used normally in hot update code. However, for editions other than Ultimate Edition (Community Edition, Professional Edition, and Hot Reload Edition), Burst code falls back to pure interpreted execution.
For Ultimate Edition, as long as the function itself has not changed, it still runs in Burst mode with no performance degradation.

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

:::warning

If your project only uses Jobs and Burst and does not use `com.unity.entities`, then you do **not** need to modify the source code of `com.unity.entities`.

:::

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
otherwise a `GetReversePInvokeWrapper fail. exceed max wrapper num of method` error will occur during runtime. For detailed introduction, see the [HybridCLR+lua/js/python](https://www.hybridclr.cn/docs/basic/workwithscriptlanguage) documentation.

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

There are two cases:

1. Only Jobs and Burst are used, and `com.unity.entities` is not used

For non-Ultimate editions, usage is no different from ordinary hot update code. You can freely add, delete, and modify related code.

For Ultimate Edition, you need to rename the Job type, like this:

```csharp
        /// Code before hot update
        [BurstCompile]
        public struct MyJobBeforeHotUpdate : IJobParallelFor
        {
            public void Execute(int index)
            {
            }
        }


        /// Code after hot update
        [BurstCompile]
        public struct MyJobAfterHotUpdate : IJobParallelFor
        {
            public void Execute(int index)
            {
            }
        }
```

1. `com.unity.entities` is used

For non-Ultimate editions, usage is still no different from ordinary hot update code, and you can freely add, delete, and modify related code. However, in interpreted execution mode, Burst code not only fails to improve performance, but also causes Unity to inject a large amount of complex helper code,
which leads to severe performance degradation. Developers using non-Ultimate editions are advised to remove `[BurstCompile]` from hot update code.

For Ultimate Edition, if a hot update function containing `[BurstCompile]` changes, you must remove the `[BurstCompile]` attribute. Otherwise, the old code will still be executed.
