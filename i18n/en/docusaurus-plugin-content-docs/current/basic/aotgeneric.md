# AOT Generics

CLR has two types of generic features: generic types and generic functions. Generics are an extremely widely used feature in C#. Even code that doesn't obviously contain generic usage may implicitly include generic-related definitions or operations.

## AOT Generic Problems

For generic classes **defined in hot update code**, they can be used freely without restrictions. However, for **AOT generics**, some problems are encountered.

il2cpp is an AOT runtime, and almost all types used at runtime (why not all?) are statically determined at compile time. If you only instantiated `List<int>` and `List<string>` in AOT, you can use `new List<int>()` in hot update code,
but you cannot use `new List<float>()`. This is because although il2cpp can create most metadata for the `List<float>` type in memory, it cannot create implementations for its member functions.
For example, you can get `typeof(List<float>)` through reflection, but you cannot call any of its member functions, including constructors.

Additionally, some special C# mechanisms also cause AOT generic problems, such as the compiler potentially generating implicit AOT generic references for complex syntax sugar like async. Therefore, to make these mechanisms work properly, the AOT generic instantiation problems they cause must also be resolved.
Taking async as an example, the compiler generates several classes, state machines, and some code for async. These hidden generated code contains calls to multiple AOT generic functions. For example, `void AsyncTaskMethodBuilder::Start<TStateMachine>(ref TStateMachine stateMachine)`.

Generic classes, especially generic containers like List and Dictionary, are so widely used in code that if AOT limitations prevented things like `List<HotUpdateType>` from running, the code restrictions for game hot updates would be too severe. Fortunately, HybridCLR uses several technologies to completely solve this problem:

- Based on il2cpp's `generic sharing` technology.
- Based on `supplemental metadata` technology. This is also HybridCLR's patented technology. This technology is also available in the community version.
- Based on `full generic sharing` complete generic sharing technology. This technology is currently only available in commercial versions.

:::tip
Due to the significant limitations of il2cpp generic sharing technology, it is strongly recommended to use `supplemental metadata` or `full generic sharing` technology to solve generic problems.
:::

## il2cpp's Generic Sharing Mechanism

To avoid generic code bloat and save memory, il2cpp only generates one copy of code for code that can be shared while ensuring code logic correctness. This introduces a concept called **Generic Code Sharing** [Generic Sharing](https://blog.unity.com/technology/il2cpp-internals-generic-sharing-implementation).
Simply put, as long as you **instantiate a shared instance of a generic class or generic function in AOT**, you can use it in hot update code.

Taking List&lt;T&gt; as an example:

- You can use any List instantiation type used in AOT. For example, if you used List&lt;vector3&gt; in AOT, you can also use it in hot updates
- You can use any List&lt;HotUpdateEnum&gt;. You just need to instantiate a List&lt;enum type with the same underlying type&gt; in AOT.
- You can use generic parameters of any reference type List&lt;HotUpdateClass&gt;. You just need to have instantiated List&lt;object&gt; (or any reference generic parameter like List&lt;string&gt;) in AOT

## Shared Type Calculation Rules

Assume the shared type of generic class T is sharing type, calculated as follows.

### Non-enum Value Types

sharing type is itself. For example, int's share type is int

### Enum Types

sharing type is an enum with the same underlying type. For example

```csharp
enum MyEnumA
{
    A = 1,
}
enum MyEnumB
{
    A = 10,
}

enum MyEnumC : short
{
    A = 1,
}

enum MyEnumD : short
{
    A = 1,
}

```

MyEnumA and MyEnumB have the same shared type, MyEnumC and MyEnumD have the same shared type.

### Class Reference Types

sharing type is object

### Generic Types

For `GenericType<T1, T2, ...>`, if GenericType is a class type, then share type is object, otherwise share type is `GenericType<shareType<T1>, shareType<T2>, ...>`. For example:

- The share type of `Dictionary<int, string>` is `object`
- The share type of `ValueTuple<int, string>` is `ValueTuple<int, object>`

### Shared Generic Function Calculation Rules for Generic Functions

The AOT generic function for `Class<C1, C2, ...>.Method<M1, M2, ...>(A1, A2, ...)` is `Class<sharing(C1), sharing(C2), ...>.Method<sharing(M1), sharing(M2), ...>(sharing(A1), sharing(A2), ...>`. For example:

- The shared function for `List<string>.ctor` is `List<object>.ctor`
- The shared function for `List<int>.Add(int)` is `List<int>.Add(int)`
- The shared function for `YourGenericClass<string, int, List<int>>.Show<string, List<int>, int>(ValueTuple<int, string>, string, int)` is `YourGenericClass<object, int, object>.Show<object, object, int>(ValueTuple<int, object>, object, int)`


## Why Value Types Don't Support Generic Sharing in il2cpp

It's easy to understand that value types of different sizes cannot be shared, but why can't value types of the same size support generic sharing like classes? There are mainly two reasons.

### Problems Caused by Memory Alignment

Even if value types have the same size, if their alignment methods are different, when they are subfields of other classes, the final memory size and layout of the containing class may be different.

```csharp
struct A // size = 4, alignment = 2
{
    short x;
    short y;
};

struct B // size = 4，alignment = 4
{
    int x;
};

struct GenericDemo<T>
{
    short x;
    T v;

    public T GetValue() => v;
};

```

`GenericDemo<A>` size=6, alignment=2, field v has offset 2 in the class; while `GenericDemo<B>` size=8, alignment=4, field v has offset 4 in the class. Obviously for the GetValue function, due to different v offsets, it's impossible to use the same C++ code to work correctly for both classes.

### ABI Issues

Structs with the same size and alignment are equivalent in [x64 ABI](https://docs.microsoft.com/en-us/cpp/build/x64-software-conventions?redirectedfrom=MSDN&view=msvc-170) and can use structs of the same size as shared generic instantiations. However, this is not possible in [arm64 ABI](https://docs.microsoft.com/en-us/cpp/build/arm64-windows-abi-conventions?view=msvc-170).

`struct IntVec3 { int32_t x, y, z; }` and `struct FloatVec3 { float x, y, z}` although both have size 12, they have different parameter passing methods when passed as function arguments:

- IntVec3 is passed by reference
- FloatVec3's three fields are placed in three separate floating-point registers

This is another key reason why structs cannot support generic sharing.

## Limitations of Generic Sharing Mechanism

Since value types cannot support generic sharing, if value types appear in the generic parameters of generic instances (classes or functions), these generic instances must be instantiated in advance in AOT. If your generic parameter type is a value type defined in hot update code, since hot update types obviously cannot be generically instantiated in advance in AOT, you cannot use code like `List<HotUpdateValueType>` in hot update code. This not only brings great inconvenience to development, but re-releasing the main package in the short term after going online is also unrealistic.

In addition, syntax sugar like async generates state machines that are value types when compiled in non-Development mode, which cannot support generic sharing. You must compile the dll in Development mode to utilize the generic sharing mechanism. This is not only troublesome but also reduces the performance of interpretation execution to some extent.

Fortunately, we have innovatively proposed the patented `supplemental metadata` technology and the `full generic sharing` technology supporting il2cpp, which completely solves this problem.

## Generic Function Instantiation Technology Based on Supplemental Metadata (HybridCLR's Patented Technology)

All metadata in AOT generic metadata except functions can be instantiated in memory through Inflate technology, but functions cannot be instantiated. The problem that AOT generic functions cannot be instantiated is essentially because il2cpp loses the original function body IL metadata during the `IL -> C++` translation process.
Taking the `List<T>.Add` function as an example, without the original IL function information, it's impossible to get the correct implementation of `List<long>.Add` from existing `List<int>.Add` or `List<object>.Add`. Our solution is ingenious—supplementing the missing original generic function body metadata.


Use the `HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly` function in the com.code-philosophy.hybridclr package to supplement corresponding metadata for AOT assemblies.
The LoadMetadataForAOTAssembly function can be called at any time, and can be called both in AOT and hot update code. You just need to call it before using AOT generics (only need to call once).
Theoretically, the earlier the loading the better. In practice, a reasonable timing is after hot update completion, or after hot update dll loading but before executing any code. If the supplemental metadata dll is also packaged into the main package as additional data files (e.g., placed in StreamingAssets), loading during main project startup is better.

**Supplemental metadata has no loading order requirements**.

After supplemental metadata is loaded, it will occupy approximately 6 times the dll size in memory, and this memory cannot be reclaimed. For applications with high memory requirements, please use the commercial version's full generic sharing technology, which no longer requires supplemental metadata and saves this memory.

:::tip
It's the generic functions that lose IL function body metadata, not the generic parameter types that lose metadata. Taking `List<YourValueType>.Add` as an example,
it's the `List<T>.Add` function that lacks original IL function body metadata, not `YourValueType` that loses metadata. Therefore,
you should supplement the metadata of `mscorlib.dll` where `List<T>.Add` is located, not the metadata of the dll where `YourValueType` is located.
:::

If AOT generics have supplemental corresponding generic metadata and il2cpp generic sharing instantiation also exists, to maximize performance, HybridCLR will prioritize trying il2cpp generic sharing.

Although the generic function instantiation technology based on supplemental metadata is quite perfect, the instantiated functions are executed in interpretation mode after all. If they can be generically instantiated in advance in AOT, performance can be significantly improved.
So for commonly used and especially performance-sensitive generic classes and functions, they can be instantiated in advance in AOT. We provide tools to help automatically scan and collect corresponding generic instances. You can run the menu command `HybridCLR/Generate/AOTGenericReference`.

:::tip
This command only collects AOT generic instances used in hot updates, and all generated code is in comment form. You need to refer to this file yourself and explicitly instantiate some generics elsewhere according to actual needs.
:::
### Obtaining Supplemental Metadata DLL

The trimmed AOT dll generated during the **packaging process** can be used for supplemental metadata. The com.code-philosophy.hybridclr plugin will automatically copy them to `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`. Note that trimmed AOT dlls from different BuildTargets cannot be reused.

You can also use the `HybridCLR/Generate/AotDlls` command to immediately generate trimmed AOT dlls. Its working principle is to obtain trimmed AOT dlls by exporting a Temp project.


:::tip

Please save the trimmed AOT dlls generated during packaging (usually in the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}` directory). Use these saved AOT dlls when supplemental metadata is needed.

After packaging is complete, supplemental metadata dlls will not change. Please **do not use the latest generated AOT dlls for every hot update**.

:::

### Assembly List That Should Supplement Metadata

The `AOTGenericReferences.cs` file generated by the `HybridCLR/generate/AOTGenericReference` command contains the assembly list that should supplement metadata, as shown in the example below. You can quickly know which metadata should be supplemented without running the game.

:::tip

The calculation result of the PatchedAOTAssemblyList is conservative, and in practice you may not need to supplement so many. If there's no obvious memory pressure, supplementing all according to the list is more convenient. If optimization is needed, you can only supplement the most common dlls (like mscorlib), and add corresponding dlls later when encountering AOT generic errors.

Supplemental metadata dlls can be hot updated, so you don't need to worry about suddenly encountering generic errors in a version after release.

:::

```csharp
using System.Collections.Generic;
public class AOTGenericReferences : UnityEngine.MonoBehaviour
{

	// {{ AOT assemblies
	public static readonly IReadOnlyList<string> PatchedAOTAssemblyList = new List<string>
	{
		"Main.dll",
		"System.Core.dll",
		"UnityEngine.CoreModule.dll",
		"mscorlib.dll",
	};

    	// {{ constraint implement type
	// }} 

	// {{ AOT generic types
	// AOTDefs.HierarchyGeneric2<int>
	// IBar<object>
	// IRun<object>
	// System.Action<UnityEngine.RaycastHit>
}
```

### Metadata Mode HomologousImageMode

Currently supports two metadata modes:

- `HomologousImageMode::Consistent` mode, which means the supplemented dll is exactly the same as the trimmed dll during packaging. Therefore, you must use the trimmed dll generated during the build process, and cannot directly copy the original dll.
- `HomologousImageMode::SuperSet` mode, which means the supplemented dll is a superset of the trimmed dll during packaging. This mode relaxes the requirements for AOT dlls, allowing you to use either trimmed AOT dlls or original AOT dlls.

### Sample Code for Loading Supplemental Metadata

The method for loading supplemental metadata dlls in code is shown in the following sample code. You can also refer to [hybridclr_trial](https://github.com/focus-creative-games/hybridclr_trial).

When executing `HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly`, a copy of the passed dllBytes will be made internally. After calling this interface, **please do not save dllBytes**, otherwise it will cause memory waste.

:::tip
If RuntimeApi.LoadMetadataForAOTAssembly takes too much time and causes lag, you can load it asynchronously in another thread.
:::
```csharp
    public static unsafe void LoadMetadataForAOTAssembly()
    {
        List<string> aotDllList = new List<string>
        {
            "mscorlib.dll",
            "System.dll",
            "System.Core.dll", // If using Linq, this is needed
            // "Newtonsoft.Json.dll",
            // "protobuf-net.dll",
        };

        AssetBundle dllAB = LoadDll.AssemblyAssetBundle;
        foreach (var aotDllName in aotDllList)
        {
            byte[] dllBytes = dllAB.LoadAsset<TextAsset>(aotDllName).bytes;
            // When executing supplemental metadata, dllBytes will be automatically copied internally. Please do not save dllBytes after calling to avoid unnecessary memory waste
            int err = HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly(dllBytes, HomologousImageMode.SuperSet);
              Debug.Log($"LoadMetadataForAOTAssembly:{aotDllName}. ret:{err}");
        }
    }
```

## Optimizing Supplemental Metadata DLL Size

:::tip

Whether to optimize supplemental metadata does not affect the normal operation of the supplemental metadata mechanism. It is recommended for projects with package size or memory optimization pressure to perform this operation.

:::

Loading supplemental metadata dlls not only increases package size or hot update resource size, but also consumes considerable memory space at runtime. For details, see the [Memory and GC](./memory) documentation. Optimizing supplemental metadata dll size has positive significance for memory-sensitive scenarios.

Supplemental metadata technology only uses the metadata information of generic functions in supplemental metadata dlls. The metadata of non-generic functions contained in supplemental metadata dlls is redundant, and completely removing them will not affect the normal operation of the supplemental metadata mechanism. Therefore, starting from v4.0.16, `com.code-philosophy.hybridclr` provides the supplemental metadata optimization tool class `HybridCLR.Editor.AOT.AOTAssemblyMetadataStripper` to implement this removal optimization work.

The removal effect varies by assembly, with significant differences. The following are our test results on a unit test project:

|Assembly Name|Original Size|Optimized Size|Optimization Rate|
|-|-|-|-|
|mscorlib|2139k|1329k|37.9%|
|System|186k|63.0k|66.2%|
|System.Core|96.3k|89.1k|7.4%|


Sample code is as follows:

```csharp

        /// Further remove non-generic function metadata from AOT dll, output to StrippedAOTAssembly2 directory
        public static void StripAOTAssembly()
        {
            BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
            string srcDir = SettingsUtil.GetAssembliesPostIl2CppStripDir(target);
            string dstDir = $"{SettingsUtil.HybridCLRDataDir}/StrippedAOTAssembly2/{target}";
            foreach (var src in Directory.GetFiles(srcDir, "*.dll"))
            {
                string dllName = Path.GetFileName(src);
                string dstFile = $"{dstDir}/{dllName}";
                AOTAssemblyMetadataStripper.Strip(src, dstFile);
            }
        }

```


## Full Generic Sharing Technology

:::tip
The `full generic sharing` technology is currently only available in commercial versions.
:::

Although supplemental metadata completely solves AOT generic problems, supplemental metadata requires carrying or hot updating supplemental metadata dlls, leading to increased package size or increased hot update time.
Loading supplemental metadata not only significantly increases memory usage (generally **3-4** times the supplemental metadata dll size), but also increases startup time. For scenarios like WeChat mini-games that have strict requirements for package size and memory, this is a significant impact.
Supplemented generic functions execute in interpretation mode, which also reduces runtime performance.

After HybridCLR supports `full generic sharing`, supplemental metadata is no longer needed, simplifying the workflow, running AOT generics natively with significantly improved performance, completely solving the above shortcomings of supplemental metadata.
For detailed documentation, see [Full Generic Sharing](../business/fullgenericsharing).

## Appendix: Shared Generic Instantiation Examples for AOT Generics

:::caution
HybridCLR has excellent performance. Unless you actually encounter performance issues, in most cases you should use supplemental metadata technology or `full generic sharing` technology to solve AOT generic problems.
:::

### Example 1

Error log

```text
MissingMethodException: AOT generic method not instantiated in aot module 
  void System.Collections.Generic.List<System.String>.ctor()
```

You can add a call to `List<string>.ctor()` anywhere in the main project (e.g., in RefTypes.cs), which is `new List<string>()`. Due to the **generic sharing mechanism**, you can call `new List<object>()`.

```csharp
class RefTypes
{
  public void MyAOTRefs()
  {
      new List<object>(); // You can also use new List<string>()
  }
}
```

### Example 2

Error log

```text
MissingMethodException: AOT generic method not instantiated in aot module 
    void System.ValueType<System.Int32, System.String>.ctor()
```

:::tip
The empty constructor of value types doesn't call the corresponding constructor, but corresponds to the initobj instruction. Actually you cannot directly reference it, but you just need to force instantiate this type, preserve all functions of this class, and naturally it will include the .ctor function.
:::

In practice, you can use forced boxing `(object)(default(ValueTuple<int, object>))`.

```csharp
class RefTypes
{
  public void MyAOTRefs()
  {
      // Both of the following approaches work
      _ = (object)(new ValueTuple<int, object>());
      _ = (object)(default(ValueTuple<int, object>));
  }
}
```

### Example 3

Error log

```text
MissingMethodException: AOT generic method not instantiated in aot module 
  System.Void System.Runtime.CompilerService.AsyncVoidMethodBuilder::Start<UIMgr+ShowUId__2>(UIMgr+<ShowUI>d__2&)
```

```csharp
class RefTypes
{
  public void MyAOTRefs()
  {
      System.Runtime.CompilerService.AsyncVoidMethodBuilder builder = default;
      IAsyncStateMachine asm = default;
      builder.Start(ref asm);
  }
}
```


