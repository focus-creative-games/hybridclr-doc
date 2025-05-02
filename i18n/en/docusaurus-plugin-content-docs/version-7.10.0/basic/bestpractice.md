# Best Practices

## Unity version recommendation

It is recommended to use `2020.3.x(x >= 21)` series and `2021.3.x` series, which are the most stable.

## It is recommended to mount the startup script to the first loaded hot update scene after the hot update is completed

It is recommended to mount the startup script to the startup hot update scene, so that the non-hot update project can be transformed into a hot update project with zero changes, and no reflection operation is required.

## When `RuntimeApi.LoadMetadataForAOTAssembly` is called

You just need to call it before using AOT generics (you only need to call it once). In theory, the earlier the loading, the better. In practice, a more reasonable time is after the hot update is completed, or after the hot update dll is loaded but before any code is executed. If the dll that supplements the metadata is also entered into the main package as an additional data file, it will be better loaded when the main project starts. Please refer to [HybridCLR_trial](https://github.com/focus-creative-games/hybridclr_trial) project

## Do not use reflection to interact with native and interpreter performance-sensitive occasions, you should use Delegate or virtual function

Taking the Update function as an example, most people would think that the interaction between the main project and the update part is like this:

```csharp
var klass = ass. GetType("App");
var method = klass. GetMethod("Update");
method.Invoke(null, new object[] {deltaTime});
```

The disadvantage of this method is that the cost of reflection is high. In case there are parameters and additional gc, there is actually a more efficient method. There are two main ways:

### The hot update layer returns a Delegate

```csharp
// Hotfix.asmdf hot update part
class app
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
var klass = ass. GetType("App");
var method = klass. GetMethod("GetUpdateDelegate");
var updateDel = (Action<float>)method. Invoke(null, null);

updateDel(deltaTime);
```

### Through Delegate.Create, create the corresponding Delegate according to MethodInfo

```csharp
var klass = ass. GetType("App");
var method = klass. GetMethod("Update");
updateDel = (Action<float>)System.Delegate.CreateDelegate(typeof(Action<float>), null, method);
updateDel(deltaTime);
```

## 2021 version don't use `faster(smaller) builds` option

Since the 2021.3.x LTS version, il2cpp has fully supported the `full generic sharing` technology. When the `Il2Cpp Code Generation` option in Build Settings is `faster runtime`, it is a standard generic sharing mechanism, and `faster(smaller) builds` open when
`full generic sharing` mechanism.

When `full generic sharing` is enabled, each generic function (regardless of whether the generic parameter is a value type or a class type) will completely sharing a code. The advantage is to save the size of the package body, and the disadvantage is that it greatly hurts the performance of the generic function . The fully generic shared code is sometimes several to ten times slower than the standard generic shared code, and even worse than the purely interpreted version. Therefore it is strongly recommended to **not enable** the `faster(smaller) builds` option.
