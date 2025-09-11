# Best Practices

## Don't Save assemblyBytes After Assembly.Load

Don't save the assembly's byte[] data after calling Assembly.Load, as Assembly.Load automatically makes a copy internally.

## Recommend Mounting Startup Scripts to the First Hot Update Scene Loaded After Hot Update Completion

Recommend mounting startup scripts to the startup hot update scene, which allows zero-modification conversion of non-hot update projects to hot update projects without requiring any reflection operations.

## Timing of `RuntimeApi.LoadMetadataForAOTAssembly` Calls

You only need to call it before using AOT generics (only needs to be called once), and theoretically the earlier the better. In practice, reasonable timing is after hot update completion, or after hot update dll loading but before executing any code. If supplemental metadata dlls are also packaged into the main package as additional data files, loading them during main project startup is better. Refer to the [HybridCLR_trial](https://github.com/focus-creative-games/hybridclr_trial) project

## `Assembly.Load` or `RuntimeApi.LoadMetadataForAOTAssembly` Taking Too Long, Causing Game Stuttering

You can put them in other threads for asynchronous loading.

## For Performance-Sensitive Interactions Between Native and Interpreter Parts, Don't Use Reflection - Use Delegates or Virtual Functions Instead

Taking the Update function as an example, most people would think of interaction between the main project and hot update part like this:

```csharp
var klass = ass.GetType("App");
var method = klass.GetMethod("Update");
method.Invoke(null, new object[] {deltaTime});
```

The disadvantage of this approach is high reflection cost, and if parameters are involved, additional GC occurs. Actually, there are more efficient methods. There are mainly two approaches:

### Hot Update Layer Returns a Delegate

```csharp
// Hotfix.asmdf hot update part 
class App
{
    public static Action<float> GetUpdateDelegate()
    {
        return Update;
    }

    public static void Update(float deltaTime)
    {
    }
}

// Main.asmdf main project
var klass = ass.GetType("App");
var method = klass.GetMethod("GetUpdateDelegate");
var updateDel = (Action<float>)method.Invoke(null, null);

updateDel(deltaTime);
```

### Use Delegate.Create to Create Corresponding Delegate Based on MethodInfo

```csharp
var klass = ass.GetType("App");
var method = klass.GetMethod("Update");
updateDel = (Action<float>)System.Delegate.CreateDelegate(typeof(Action<float>), null, method);
updateDel(deltaTime);
```

## Don't Use `faster(smaller) builds` Option in 2021 Versions

Starting from 2021.3.x LTS versions, il2cpp fully supports `full generic sharing` technology. When the `Il2Cpp Code Generation` option in Build Settings is `faster runtime`, it uses the standard generic sharing mechanism; when it's `faster(smaller) builds`, it enables the `full generic sharing` mechanism.

When `full generic sharing` is enabled, each generic function (regardless of whether generic parameters are value types or class types) completely shares a single copy of code. The advantage is saving package size, but the disadvantage is severely hurting generic function performance. Fully generic shared code compared to standard generic shared code can sometimes be several to dozens of times slower, even worse than pure interpretation versions. Therefore, it's strongly recommended to **not enable** the `faster(smaller) builds` option.
