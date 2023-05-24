# AOT泛型问题

CLR中有两类泛型特性：泛型类型和泛型函数。泛型是c#中使用极其广泛的特性，即使一个没有明显包含泛型的用法，也可能隐含了泛型相关的定义或者操作。

对于**热更新代码中定义**的泛型类，可以随意使用没有限制，但是对于**AOT泛型**，则遇到了一些问题。

il2cpp是AOT运行时，它运行时使用的几乎所有（为什么不是全部？）类型都是编译期已经静态确定的。你在AOT中只实例化过`List<int>` 和 `List<string>`，在热更新代码中可以使用`new List<int>()`
，但不能使用 `new List<float>()`。因为尽管il2cpp可以在内存中创建出`List<float>`类型的大多数元数据，但它无法创建出它的各个成员函数实现。
比如你可以通过反射获得`typeof(List<float>)`，却无法调用它的任何成员函数，包括构造函数。

泛型类，尤其是泛型容器List、Dictionary之类在代码中使用如此广泛，如果因为AOT限制，导致`List<HotUpdateType>`之类的都不能运行，那游戏热更新的代码限制也太大了。幸运的是，HybridCLR使用两类技术彻底解决了这个问题：

- 基于il2cpp的`泛型共享`技术
- 基于`补充元数据`技术，这也是HybridCLR的专利技术

?> 由于il2cpp泛型共享技术存在较大限制，强烈推荐使用`补充元数据`技术解决泛型问题。

## il2cpp的泛型共享机制

il2cpp为了避免泛型代码膨胀，节约内存，在保证代码逻辑正确性的情况下对于一些能够共享代码，只生成一份代码。为此引入一个概念叫**泛型代码共享** [Generic Sharing](https://blog.unity.com/technology/il2cpp-internals-generic-sharing-implementation)。
泛型参数为class类型的泛型的函数实现可以共享。例如为List&lt;String&gt;方法编译的代码可以直接用于List&lt;Stream&gt;方法，但对于值类型的泛型参数则无法共享。

 以List&lt;T&gt; 举例：

- 可以使用AOT中使用过的任何List的实例化类型。例如你在AOT里用过List&lt;vector3&gt;,则热更新里也可以用
- 可以使用任意List&lt;HotUpdateEnum&gt;。 只需要你在AOT里实例化某一个List&lt;相同underlying type的枚举类型&gt;。
- 可以使用任意引用类型的泛型参数List&lt;HotUpdateClass&gt;。 只需要你在AOT里实例化过 List&lt;object&gt;(或任意一个引用泛型参数如List&lt;string&gt;)

## 共享类型计算规则

假设泛型类 T 的共享类型为share type， 计算规则如下。

### 非枚举的值类型

share type为自身。如int的share type为int

### 枚举类型

share type为 underlying type与它相同的枚举。例如

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

MyEnumA和MyEnumB共享类型相同，MyEnumC和MyEnumD的共享类型相同。

### class引用类型

share type为 object

### 泛型类型

对于`GenericType<T1, T2, ...>`， 如果GenericType是class类型则share type为object，否则share type为 `GenericType<shareType<T1>, shareType<T2>, ...>`。例如：

- `Dictionary<int, string>`的share type为`object`
- `ValueTuple<int, string>`的share type为`ValueTuple<int, object>`

### 泛型函数的共享泛型函数计算规则

`Class<C1, C2, ...>.Method<M1, M2, ...>(A1, A2, ...)` 的AOT泛型函数为`Class<share(C1), share(C2), ...>.Method<share(M1), share(M2), ...>(share(A1), share(A2), ...)`。例如：

- `List<string>.ctor` 的共享函数为 `List<object>.ctor`
- `List<int>.Add(int)` 的共享函数为 `List<int>.Add(int)`
- `YourGenericClass<string, int, List<int>>.Show<string, List<int>, int>(ValueTuple<int, string>, string, int)` 的共享函数为 `YourGenericClass<object, int, object>.Show<object, object, int>(ValueTuple<int, object>, object, int)`


## il2cpp中值类型不支持泛型共享的原因

不同大小的值类型不能共享这容易理解，但为何相同大小的值类型不能像class那样泛型共享呢？主要有两个原因。

### 内存对齐引发的问题

值类型就算大小相同，如果对齐方式(aligment)不一样，作为其他类的子字段时，最终所在的类的内存大小和布局可能不同。

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

`GenericDemo<A>` size=6，alignment=2，字段v在类中偏移为2；而 `GenericDemo<B>` size=8，alignment=4， v字段在类中偏移为4。显然对于GetValue函数，由于v的偏移不同，无法用一套相同的c++代码对这两个类都能正确工作。

### ABI 问题

相同大小及对齐的结构体，在[x64 ABI](https://docs.microsoft.com/zh-cn/cpp/build/x64-software-conventions?redirectedfrom=MSDN&view=msvc-170)是等效的，可以用同等大小的结构体来作共享泛型实例化。但在[arm64 ABI](https://docs.microsoft.com/zh-cn/cpp/build/arm64-windows-abi-conventions?view=msvc-170)却是不行的。

`struct IntVec3 { int32_t x, y, z; }` 和 `struct FloatVec3 { float x, y, z}` 它们虽然大小都是12，但作为函数参数传递时，传参方式是不一样的：

- IntVec3 以引用的方式传参
- FloatVec3 的三个字段，分别放到三个浮点寄存器里

这个是结构体无法泛型共享的另一个关键原因。

## 泛型共享机制的缺陷

由于值类型不能泛型共享，泛型实例（类或函数）的泛型参数中如果出现值类型，这个泛型实例必须提前在AOT提前实例化。如果
你的泛型参数类型是热更新代码中定义的值类型，由于热更新类型显然不可能提前在AOT中泛型实例化，导致你在热更新代码
中无法使用 `List<热更新值类型>` 这样的代码，给开发带来极多的不便。

所幸我们创新性地提出`补充元数据`专利技术，彻底解决了这个问题。

## 基于补充元数据的泛型函数实例化技术（HybridCLR的专利技术）

AOT泛型元数据中除了函数以外的所有元数据都可以通过Inflate技术在内存中实例化，唯独函数无法实例化。AOT泛型函数无法实例化的问题本质上因为il2cpp执行`IL -> C++`翻译过程中丢失了原始函数体IL元数据。
以`List<T>.Add`函数为例，如果没有原始的IL函数信息，凭现成的`List<int>.Add`或者`List<object>.Add`是无法获得正确的`List<long>.Add`的实现的。我们的解决思路很巧妙——补充上丢失的原始泛型函数体元数据。


使用 hybridclr_unity package中的 `HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly`函数为AOT的assembly补充对应的元数据。
LoadMetadataForAOTAssembly函数可以在任何时机调用，另外既可以在AOT中调用，也可以在热更新中调用，你只要在使用AOT泛型前调用即可（只需要调用一次）。
理论上越早加载越好，实践中比较合理的时机是热更新完成后，或者热更新dll加载后但还未执行任何代码前。如果补充元数据的dll作为额外数据文件也打入了主包（例如放到StreamingAssets下），则主工程启动时加载更优。

**补充元数据没有加载顺序的要求**。

!> 是泛型函数丢失了IL函数体元数据，而不是泛型参数类型丢失了元数据。以`List<YourValueType>.Add`为例，
是 `List<T>.Add`函数缺失了原始IL函数体元数据，而不是`YourValueType`丢失了元数据，因此
应该补充泛型类所在的aot dll的元数据。例如为了使用`List<Vector3>`应该补充`List<T>`所在dll（即`mscorlib`）的元数据，而不是补充`YourValueType`所在的dll的元数据。


如果AOT泛型补充相应的泛型元数据，同时il2cpp泛型共享实例化也存在，为了最大程度提升性能，HybridCLR会优先尝试il2cpp泛型共享。

基于补充元数据的泛型函数实例化技术虽然相当完美，但毕竟实例化的函数以解释方式执行，如果能提前在AOT中泛型实例化，可以大幅提升性能。
所以对于常用尤其是性能敏感的泛型类和函数，可以提前在AOT中实例化。我们提供了工具帮助自动扫描收集相应的泛型实例，你运行菜单命令`HybridCLR/Generate/AOTGenericReference`即可。

?> 该命令只收集了热更新中用到的AOT泛型实例，并且生成的全部是注释形式的葮，需要你自己参考这个文件，根据实际需求在其他地方显式地实例化部分泛型。

### 获得补充元数据dll

**打包过程**生成的裁剪后的AOT dll可以用于补充元数据。hybridclr_unity插件会自动把它们复制到`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`。注意，不同BuildTarget的裁剪AOT dll不可复用。

使用`HybridCLR/Generate/AotDlls`命令也可以立即生成裁剪后的AOT dll，它的工作原理是通过导出一个Temp工程来获得裁剪AOT dll。

### 应该补充元数据的assembly列表

`HybridCLR/generate/AOTGenericReference` 命令生成的`AOTGenericReferences.cs`文件中包含了应该补充元数据的assembly列表，类似这样。你不需要运行游戏也能快速知道应该补充哪些元数据。

```csharp
	// {{ AOT assemblies
	// Main.dll
	// System.Core.dll
	// UnityEngine.CoreModule.dll
	// mscorlib.dll
	// }}
```

### 元数据模式 HomologousImageMode

目前支持两种元数据模式：

- `HomologousImageMode::Consistent` 模式，即补充的dll与打包时裁剪后的dll精确一致。因此必须使用build过程中生成的裁剪后的dll，则不能直接复制原始dll。
- `HomologousImageMode::SuperSet` 模式，即补充的dll是打包时裁剪后的dll的超集。这个模式放松对了AOT dll的要求，你既可以用裁剪后的AOT dll，也可以用原始AOT dll。

### 加载补充元数据示例代码

代码中加载补充元数据dll的方式见以下示例代码，你也可以参考 [hybridclr_trial](https://github.com/focus-creative-games/hybridclr_trial)。

```csharp
    public static unsafe void LoadMetadataForAOTAssembly()
    {
        List<string> aotDllList = new List<string>
        {
            "mscorlib.dll",
            "System.dll",
            "System.Core.dll", // 如果使用了Linq，需要这个
            // "Newtonsoft.Json.dll",
            // "protobuf-net.dll",
        };

        AssetBundle dllAB = LoadDll.AssemblyAssetBundle;
        foreach (var aotDllName in aotDllList)
        {
            byte[] dllBytes = dllAB.LoadAsset<TextAsset>(aotDllName).bytes;
              int err = HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly(dllBytes, HomologousImageMode.SuperSet);
              Debug.Log($"LoadMetadataForAOTAssembly:{aotDllName}. ret:{err}");
        }
    }
```

## 一些C#特殊机制引发的AOT泛型问题

编译器可能为会async之类的复杂语法糖生成隐含的AOT泛型引用。故为了让这些机制能够正常工作，也必须解决它们引发的AOT泛型实例化问题。

以async为例，编译器为async生成了若干类及状态机及一些代码，这些隐藏生成的代码中包含了对多个AOT泛型函数的调用，常见的有：

- `void AsyncTaskMethodBuilder::Start<TStateMachine>(ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder::AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(ref TAwaiter awaiter, ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder::SetException(Exception exception)`
- `void AsyncTaskMethodBuilder::SetResult()`
- `void AsyncTaskMethodBuilder<T>::Start<TStateMachine>(ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder<T>::AwaitUnsafeOnCompleted<TAwaiter, TStateMachine>(ref TAwaiter awaiter, ref TStateMachine stateMachine)`
- `void AsyncTaskMethodBuilder<T>::SetException(Exception exception)`
- `void AsyncTaskMethodBuilder<T>::SetResult(T result)`

两种泛型实例化技术都可以解决这些问题。你可以使用泛型共享机制，即在AOT里提前实例化这些函数，不过要**注意**，Unity在release模式下编译的dll中生成的状态机是ValueType类型，导致无法泛型共享，但debug模式下生成的状态机是class类型，可以泛型共享。因此如果使用il2cpp泛型共享机制，为了能够让热更新中使用async语法，使用脚本编译dll时，务必加上 `scriptCompilationSettings.options = ScriptCompilationOptions.DevelopmentBuild;` 代码，这样编译出的状态机是class类型，在热更新代码中能正常工作。如果已经使用`补充元数据技术`，由于彻底支持AOT泛型，则对编译方式**无限制**。

在AOT中实例化这些泛型非常繁琐，**强烈推荐**使用补充元数据机制。

## `full generic share` 技术补充介绍

自2021.3.x LTS版本起，il2cpp已经完全支持`完全泛型共享（full generic share）`技术，当 Build Settings中 `Il2Cpp Code Generation` 选项为 `faster runtime` 时为之前章节介绍的泛型共享机制，为 `faster(smaller) build` 时开启
`full generic share` 机制。`full generic share`技术可以克服传统的il2cpp的值类型泛型无法共享的缺陷，泛型函数的所有泛型实例（无论泛型参数是值类型还是class类型）完全共享一份代码。

完全泛型共享的优点是可以任意泛型实例化，而且可以节约代码大小，缺点是极大地伤害了泛型函数的性能。完全泛型共享的代码相比于标准泛型共享代码有时候会慢几倍到十几倍，甚至比不上纯解释版本。因此强烈推荐**不要开启** `faster(smaller) build` 选项。也正因如此，HybridCLR虽然能跟`full generic share` 机制配合工作，但完全没有利用这种机制。因为这种机制除了想极端减少包体的场合，基本没有实践意义。

## 附录：AOT泛型的共享泛型实例化示例

### 示例1

错误日志

```csharp
MissingMethodException: AOT generic method isn't instantiated in aot module 
  void System.Collections.Generic.List<System.String>.ctor()
```

你在RefType里加上 `List<string>.ctor()` 的调用，即 `new List<string>()`。由于**泛型共享机制**，你调用 `new List<object>()` 即可。

```csharp
class RefTypes
{
  public void MyAOTRefs()
  {
      new List<object>(); // 也可以用 new List<string>()
  }
}
```

### 示例2

错误日志

```csharp
MissingMethodException: AOT generic method isn't instantiated in aot module 
    void System.ValueType<System.Int32, System.String>.ctor()
```

!> 值类型的空构造函数没有调用相应的构造函数，而是对应 initobj指令。实际上你无法直接引用它，但你只要强制实例化这个类型就行了，preserve这个类的所有函数，自然就会包含.ctor函数了。

实际中你可以用强制装箱 `(object)(default(ValueTuple<int, object>))`。

```csharp
class RefTypes
{
  public void MyAOTRefs()
  {
      // 以下两种写法都是可以的
      _ = (object)(new ValueTuple<int, object>());
      _ = (object)(default(ValueTuple<int, object>));
  }
}
```

### 示例3

错误日志

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


