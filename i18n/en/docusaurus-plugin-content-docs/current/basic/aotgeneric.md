# AOT generic problem

There are two types of generic features in the CLR: generic types and generic functions. Generics are an extremely widely used feature in C#. Even a usage that does not explicitly contain generics may imply generic-related definitions or operations.

For the generic class defined in **hot update code, you can use it freely without restrictions, but for **AOT generics**, you have encountered some problems.

il2cpp is an AOT runtime, and almost all (why not all?) types used in its runtime are statically determined at compile time. You have only instantiated `List<int>` and `List<string>` in AOT, you can use `new List<int>()` in hot update code
, but cannot use `new List<float>()`. Because although il2cpp can create most of the metadata of the `List<float>` type in memory, it cannot create its member function implementations.
For example, you can get `typeof(List<float>)` through reflection, but you cannot call any of its member functions, including constructors.

Generic classes, especially generic containers such as List and Dictionary are widely used in code. If `List<HotUpdateType>` cannot run due to AOT restrictions, then the code restriction for game hot update is also too large up. Fortunately, HybridCLR solves this problem completely using two types of techniques:

- `Generic sharing` technology based on il2cpp
- Based on `Supplementary Metadata` technology, which is also HybridCLR's patented technology

:::tip
Since the il2cpp generic sharing technology has great limitations, it is strongly recommended to use the `supplementary metadata` technology to solve the generic problem.
:::

## Generic sharing mechanism of il2cpp

In order to avoid generic code expansion and save memory, il2cpp generates only one code for some codes that can be shared while ensuring the correctness of code logic. To introduce a concept called **generic code sharing** [Generic Sharing](https://blog.unity.com/technology/il2cpp-internals-generic-sharing-implementation).
Generic function implementations whose generic parameters are of class type can be shared. For example, the code compiled for the List&lt;String&gt; method can be directly used for the List&lt;Stream&gt; method, but the generic parameter of the value type cannot be shared.

  Take List&lt;T&gt; as an example:

- You can use any instantiation type of List used in AOT. For example, if you have used List&lt;vector3&gt; in AOT, you can also use it in hot update
- Any List&lt;HotUpdateEnum&gt; can be used. You only need to instantiate a certain List&lt;enumeration type of the same underlying type&gt; in AOT.
- The generic parameter List&lt;HotUpdateClass&gt; of any reference type can be used. You only need to instantiate List&lt;object&gt; (or any reference generic parameter such as List&lt;string&gt;) in AOT

## Shared type calculation rules

Assuming that the shared type of the generic class T is sharing type, the calculation rules are as follows.

### Non-enumeration value types

The sharing type is itself. For example, the sharing type of int is int

### Enum Type

The sharing type is an enumeration whose underlying type is the same as it. For example

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

MyEnumA and MyEnumB sharing the same type, and MyEnumC and MyEnumD sharing the same type.

### class reference type

sharing type is object

### Generic Types

For `GenericType<T1, T2, ...>`, if the GenericType is a class type, then the sharing type is object, otherwise the sharing type is `GenericType<shareType<T1>, shareType<T2>, ...>`. For example:

- The sharing type of `Dictionary<int, string>` is `object`
- The sharing type of `ValueTuple<int, string>` is `ValueTuple<int, object>`

### Shared generic function evaluation rules for generic functions

The AOT generic function of `Class<C1, C2, ...>.Method<M1, M2, ...>(A1, A2, ...)` is `Class<sharing(C1), sharing(C2) , ...>.Method<sharing(M1), sharing(M2), ...>(sharing(A1), sharing(A2), ...)`. For example:

- Shared function of `List<string>.ctor` is `List<object>.ctor`
- The shared function of `List<int>.Add(int)` is `List<int>.Add(int)`
- The shared function of `YourGenericClass<string, int, List<int>>.Show<string, List<int>, int>(ValueTuple<int, string>, string, int)` is `YourGenericClass<object, int, object >.Show<object, object, int>(ValueTuple<int, object>, object, int)`


## The reason why the value type in il2cpp does not support generic sharing

It is easy to understand that value types of different sizes cannot be shared, but why can't value types of the same size be shared generically like a class? There are two main reasons.

### Problems caused by memory alignment

Even if the value types have the same size, if the alignment is different, when they are used as subfields of other classes, the memory size and layout of the final class may be different.

```csharp
struct A // size = 4, alignment = 2
{
     short x;
     short y;
};

struct B // size = 4, alignment = 4
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

`GenericDemo<A>` size=6, alignment=2, field v is offset by 2 in the class; and `GenericDemo<B>` size=8, alignment=4, field v is offset by 4 in the class. Obviously, for the GetValue function, due to the different offsets of v, it is impossible to use the same set of c++ codes to work correctly for these two classes.

### ABI issues

Structures of the same size and alignment are equivalent in [x64 ABI](https://docs.microsoft.com/zh-cn/cpp/build/x64-software-conventions?redirectedfrom=MSDN&view=msvc-170) , you can use structures of the same size for shared generic instantiation. But it doesn't work in [arm64 ABI](https://docs.microsoft.com/zh-cn/cpp/build/arm64-windows-abi-conventions?view=msvc-170).

`struct IntVec3 { int32_t x, y, z; }` and `struct FloatVec3 { float x, y, z}` are both 12 in size, but when they are passed as function parameters, the way of passing parameters is different:

- IntVec3 is passed by reference
- The three fields of FloatVec3 are placed in three floating-point registers respectively

This is another key reason why structs cannot be shared generically.

## Defects of the generic sharing mechanism

Since value types cannot be shared generically, if a value type appears in the generic parameter of a generic instance (class or function), this generic instance must be instantiated in advance in AOT. if
Your generic parameter type is the value type defined in the hot update code. Since the hot update type is obviously impossible to instantiate generics in AOT in advance, you are hot updating the code
Codes such as `List<hot update value type>` cannot be used in , which brings great inconvenience to development.

Fortunately, we innovatively proposed the patented technology of `Supplementary Metadata`, which completely solved this problem.

## Generic function instantiation technology based on supplementary metadata (HybridCLR's patented technology)

All metadata except functions in AOT generic metadata can be instantiated in memory through the Inflate technology, but functions cannot be instantiated. The problem that AOT generic functions cannot be instantiated is essentially because il2cpp loses the original function body IL metadata during the translation of `IL -> C++`.
Take the `List<T>.Add` function as an example, if there is no original IL function information, the correct `List<long The implementation of >.Add`. Our solution is very ingenious - to supplement the lost metadata of the original generic function body.


Use the `HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly` function in the com.code-philosophy.hybridclr package to supplement the corresponding metadata for the AOT assembly.
The LoadMetadataForAOTAssembly function can be called at any time. In addition, it can be called in AOT or hot update. You just need to call it before using AOT generics (only need to call it once).
In theory, the earlier the loading, the better. In practice, the more reasonable time is after the hot update is completed, or after the hot update dll is loaded but before any code is executed. If the dll that supplements the metadata is also entered into the main package as an additional data file (for example, put it under StreamingAssets), it will be better loaded when the main project starts.

**Supplementary metadata has no load order requirement**.

:::tip
It is the generic function that loses the IL function body metadata, not the generic parameter type that loses metadata. Take `List<YourValueType>.Add` as an example,
It is the `List<T>.Add` function that is missing raw IL function body metadata, not `YourValueType` that is missing metadata, so
The metadata of the aot dll where the generic class resides should be supplemented. For example, in order to use `List<Vector3>`, you should supplement the metadata of the dll where `List<T>` resides (namely `mscorlib`), instead of supplementing the metadata of the dll where `YourValueType` resides.
:::

If the AOT generic supplements the corresponding generic metadata, and il2cpp generic sharing instantiation also exists, in order to maximize performance, HybridCLR will give priority to il2cpp generic sharing.

Although the generic function instantiation technology based on supplementary metadata is quite perfect, after all, the instantiated function is executed in an interpreted manner. If the generic instantiation in AOT can be performed in advance, the performance can be greatly improved.
Therefore, generic classes and functions that are commonly used, especially performance-sensitive, can be instantiated in AOT in advance. We provide tools to help automatically scan and collect corresponding generic instances, you can run the menu command `HybridCLR/Generate/AOTGenericReference`.

:::tip
This command only collects the AOT generic instances used in the hot update, and all generated are in the form of annotations. You need to refer to this file yourself and explicitly instantiate some generics in other places according to actual needs.
:::

### Get Supplementary Metadata dll

The clipped AOT dll generated by **building pipeline** can be used to supplement metadata. The com.code-philosophy.hybridclr plugin will automatically copy them to `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`. Note that tailoring AOT dlls of different BuildTargets cannot be reused.

Using the `HybridCLR/Generate/AotDlls` command can also generate the trimmed AOT dll immediately, it works by exporting a Temp project to get the trimmed AOT dll.

### should make up
A list of assemblies filled with metadata

The `AOTGenericReferences.cs` file generated by the `HybridCLR/generate/AOTGenericReference` command contains a list of assemblies that should be supplemented with metadata, like this. You don't need to run the game to quickly know which metadata should be added.

```csharp
// {{ AOT assemblies
// Main.dll
// System. Core. dll
// UnityEngine.CoreModule.dll
// mscorlib.dll
// }}
```

### Metadata Mode HomologousImageMode

Two metadata schemas are currently supported:

- `HomologousImageMode::Consistent` mode, that is, the supplementary dll is exactly the same as the cropped dll when packaging. Therefore, the clipped dll generated during the build process must be used, and the original dll cannot be copied directly.
- `HomologousImageMode::SuperSet` mode, that is, the supplementary dll is a superset of the cropped dll when packaging. This mode relaxes the requirements for AOT dll, you can use either the cut AOT dll or the original AOT dll.

### Load supplementary metadata sample code

See the sample code below for how to load the supplementary metadata dll in the code, and you can also refer to [hybridclr_trial](https://github.com/focus-creative-games/hybridclr_trial).

```csharp
     public static unsafe void LoadMetadataForAOTAssembly()
     {
         List<string> aotDllList = new List<string>
         {
             "mscorlib.dll",
             "System.dll",
             "System.Core.dll", // required if using Linq
             // "Newtonsoft.Json.dll",
             // "protobuf-net.dll",
         };

         AssetBundle dllAB = LoadDll. AssemblyAssetBundle;
         foreach (var aotDllName in aotDllList)
         {
             byte[] dllBytes = dllAB.LoadAsset<TextAsset>(aotDllName).bytes;
               int err = HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly(dllBytes, HomologousImageMode.SuperSet);
               Debug.Log($"LoadMetadataForAOTAssembly:{aotDllName}.ret:{err}");
         }
     }
```

## AOT generic problems caused by some C# special mechanisms

The compiler may generate implicit AOT generic references for complex syntactic sugar such as async. Therefore, in order for these mechanisms to work properly, the AOT generic instantiation problems caused by them must also be resolved.

Taking async as an example, the compiler generates several classes, state machines and some codes for async. These hidden generated codes contain calls to multiple AOT generic functions. The common ones are:

- `void AsyncTaskMethodBuilder::Start<TStateMachine>(ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder::AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(ref TAwaiter awaiter, ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder::SetException(Exception exception)`
- `void AsyncTaskMethodBuilder::SetResult()`
- `void AsyncTaskMethodBuilder<T>::Start<TStateMachine>(ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder<T>::AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(ref TAwaiter awaiter, ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder<T>::SetException(Exception exception)`
- `void AsyncTaskMethodBuilder<T>::SetResult(T result)`

Both generic instantiation techniques can solve these problems. You can use the generic sharing mechanism, that is, instantiate these functions in advance in AOT, but **Note**, the state machine generated by Unity in the dll compiled in release mode is of the ValueType type, which makes it impossible to sharing generics, but The state machine generated in debug mode is of class type and can be shared generically. Therefore, if you use the il2cpp generic sharing mechanism, in order to use the async syntax in the hot update, when using the script to compile the dll, you must add `scriptCompilationSettings.options = ScriptCompilationOptions.DevelopmentBuild;` code, so that the compiled state machine is a class type, Works fine in hot update code. If `Supplementary Metadata Technology` has been used, due to full support for AOT generics, there are **unlimited** compilation methods.

Instantiating these generics in AOT is tedious and **strongly recommended** to use the supplementary metadata mechanism.

## `full generic sharing` technical supplementary introduction

Since the 2021.3.x LTS version, il2cpp has fully supported the `full generic sharing' technology. When the `Il2Cpp Code Generation` option in Build Settings is `faster runtime`, it is the generic sharing mechanism introduced in the previous chapter , enabled for `faster(smaller) build`
`full generic sharing` mechanism. The `full generic sharing` technology can overcome the defect that the value type generics of traditional il2cpp cannot be shared. All generic instances of generic functions (regardless of whether the generic parameters are value types or class types) completely sharing one code.

The advantage of full generic sharing is that it can be instantiated arbitrarily, and it can save code size. The disadvantage is that it greatly hurts the performance of generic functions. The fully generic shared code is sometimes several to ten times slower than the standard generic shared code, and even worse than the purely interpreted version. Therefore it is strongly recommended to **not enable** the `faster(smaller) build` option. Because of this, although HybridCLR can work with the `full generic sharing` mechanism, it does not take advantage of this mechanism at all. Because this mechanism has basically no practical significance except when you want to reduce the inclusion extremely.

## Appendix: Example of shared generic instantiation of AOT generics

### Example 1

error log

```csharp
MissingMethodException: AOT generic method isn't instantiated in aot module
   void System.Collections.Generic.List<System.String>.ctor()
```

You add a call to `List<string>.ctor()` in RefType, which is `new List<string>()`. Thanks to the **generic sharing mechanism**, you just call `new List<object>()`.

```csharp
class RefTypes
{
   public void MyAOTRefs()
   {
       new List<object>(); // can also use new List<string>()
   }
}
```

### Example 2

error log

```csharp
MissingMethodException: AOT generic method isn't instantiated in aot module
     void System.ValueType<System.Int32, System.String>.ctor()
```

:::info
The empty constructor of the value type does not call the corresponding constructor, but corresponds to the initobj instruction. In fact, you can't directly reference it, but you just need to force the instantiation of this type, and all functions of the preserve class will naturally include the .ctor function.
:::

In practice you can use forced boxing `(object)(default(ValueTuple<int, object>))`.

```csharp
class RefTypes
{
   public void MyAOTRefs()
   {
       // The following two ways of writing are both possible
       _ = (object)(new ValueTuple<int, object>());
       _ = (object)(default(ValueTuple<int, object>));
   }
}
```

### Example 3

error log

```csharp
MissingMethodException: AOT generic method isn't instantiated in aot module
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