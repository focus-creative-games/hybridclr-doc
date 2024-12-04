# AOT泛型

CLR中有两类泛型特性：泛型类型和泛型函数。泛型是c#中使用极其广泛的特性，即使一个没有明显包含泛型的用法，也可能隐含了泛型相关的定义或者操作。

## AOT泛型问题

对于**热更新代码中定义**的泛型类，可以随意使用没有限制，但是对于**AOT泛型**，则遇到了一些问题。

il2cpp是AOT运行时，它运行时使用的几乎所有（为什么不是全部？）类型都是编译期已经静态确定的。你在AOT中只实例化过`List<int>` 和 `List<string>`，在热更新代码中可以使用`new List<int>()`
，但不能使用 `new List<float>()`。因为尽管il2cpp可以在内存中创建出`List<float>`类型的大多数元数据，但它无法创建出它的各个成员函数实现。
比如你可以通过反射获得`typeof(List<float>)`，却无法调用它的任何成员函数，包括构造函数。

另外一些C#特殊机制也会引发的AOT泛型问题，如编译器可能为会async之类的复杂语法糖生成隐含的AOT泛型引用。故为了让这些机制能够正常工作，也必须解决它们引发的AOT泛型实例化问题。
以async为例，编译器为async生成了若干类及状态机及一些代码，这些隐藏生成的代码中包含了对多个AOT泛型函数的调用。例如 `void AsyncTaskMethodBuilder::Start<TStateMachine>(ref TStateMachine stateMachine)`。

泛型类，尤其是泛型容器List、Dictionary之类在代码中使用如此广泛，如果因为AOT限制，导致`List<HotUpdateType>`之类的都不能运行，那游戏热更新的代码限制也太大了。幸运的是，HybridCLR使用几类技术彻底解决了这个问题：

- 基于il2cpp的`泛型共享`技术。
- 基于`补充元数据`技术。这也是HybridCLR的专利技术。该技术社区版本也可使用。
- 基于`full generic sharing` 完全泛型共享技术。该技术目前只在商业化版本提供。

:::tip
由于il2cpp泛型共享技术存在较大限制，强烈推荐使用`补充元数据`或者`full generic sharing`技术解决泛型问题。
:::

## il2cpp的泛型共享机制

il2cpp为了避免泛型代码膨胀，节约内存，在保证代码逻辑正确性的情况下对于一些能够共享代码，只生成一份代码。为此引入一个概念叫**泛型代码共享** [Generic Sharing](https://blog.unity.com/technology/il2cpp-internals-generic-sharing-implementation)。
简单来说，你只要**在AOT中实例化过某个泛型类或泛型函数的共享实例**，你就可以在热更新代码中使用它了。

 以List&lt;T&gt; 举例：

- 可以使用AOT中使用过的任何List的实例化类型。例如你在AOT里用过List&lt;vector3&gt;,则热更新里也可以用
- 可以使用任意List&lt;HotUpdateEnum&gt;。 只需要你在AOT里实例化某一个List&lt;相同underlying type的枚举类型&gt;。
- 可以使用任意引用类型的泛型参数List&lt;HotUpdateClass&gt;。 只需要你在AOT里实例化过 List&lt;object&gt;(或任意一个引用泛型参数如List&lt;string&gt;)

## 共享类型计算规则

假设泛型类 T 的共享类型为sharing type， 计算规则如下。

### 非枚举的值类型

sharing type为自身。如int的share type为int

### 枚举类型

sharing type为 underlying type与它相同的枚举。例如

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

sharing type为 object

### 泛型类型

对于`GenericType<T1, T2, ...>`， 如果GenericType是class类型则share type为object，否则share type为 `GenericType<shareType<T1>, shareType<T2>, ...>`。例如：

- `Dictionary<int, string>`的share type为`object`
- `ValueTuple<int, string>`的share type为`ValueTuple<int, object>`

### 泛型函数的共享泛型函数计算规则

`Class<C1, C2, ...>.Method<M1, M2, ...>(A1, A2, ...)` 的AOT泛型函数为`Class<sharing(C1), sharing(C2), ...>.Method<sharing(M1), sharing(M2), ...>(sharing(A1), sharing(A2), ...)`。例如：

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
中无法使用 `List<热更新值类型>` 这样的代码。不仅给开发带来极多的不便，上线后短期内重新发主包也是不现实的。

另外像async之类语法糖，在非Development模式下编译时，生成的状态是值类型，无法泛型共享，必须以Development模式编译dll，
才能利用泛型共享机制。这不仅麻烦，还一定程度降低了解释执行的性能。

所幸我们创新性地提出`补充元数据`专利技术以及支持il2cpp的`full generic sharing`技术，彻底解决了这个问题。

## 基于补充元数据的泛型函数实例化技术（HybridCLR的专利技术）

AOT泛型元数据中除了函数以外的所有元数据都可以通过Inflate技术在内存中实例化，唯独函数无法实例化。AOT泛型函数无法实例化的问题本质上因为il2cpp执行`IL -> C++`翻译过程中丢失了原始函数体IL元数据。
以`List<T>.Add`函数为例，如果没有原始的IL函数信息，凭现成的`List<int>.Add`或者`List<object>.Add`是无法获得正确的`List<long>.Add`的实现的。我们的解决思路很巧妙——补充上丢失的原始泛型函数体元数据。


使用 com.code-philosophy.hybridclr package中的 `HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly`函数为AOT的assembly补充对应的元数据。
LoadMetadataForAOTAssembly函数可以在任何时机调用，另外既可以在AOT中调用，也可以在热更新中调用，你只要在使用AOT泛型前调用即可（只需要调用一次）。
理论上越早加载越好，实践中比较合理的时机是热更新完成后，或者热更新dll加载后但还未执行任何代码前。如果补充元数据的dll作为额外数据文件也打入了主包（例如放到StreamingAssets下），则主工程启动时加载更优。

**补充元数据没有加载顺序的要求**。

补充元数据加载后，大约会占用6倍dll大小的内存，而且这些内存无法回收。对内存有较高的要求，请使用商业版本的完全泛型共享技术，不再需要补充元数据，节省这部分内存。

:::tip
是泛型函数丢失了IL函数体元数据，而不是泛型参数类型丢失了元数据。以`List<YourValueType>.Add`为例，
是 `List<T>.Add`函数缺失了原始IL函数体元数据，而不是`YourValueType`丢失了元数据，因此
应该补充`List<T>.Add`所在的`mscorlib.dll`的元数据，而不是补充`YourValueType`所在的dll的元数据。
:::

如果AOT泛型补充相应的泛型元数据，同时il2cpp泛型共享实例化也存在，为了最大程度提升性能，HybridCLR会优先尝试il2cpp泛型共享。

基于补充元数据的泛型函数实例化技术虽然相当完美，但毕竟实例化的函数以解释方式执行，如果能提前在AOT中泛型实例化，可以大幅提升性能。
所以对于常用尤其是性能敏感的泛型类和函数，可以提前在AOT中实例化。我们提供了工具帮助自动扫描收集相应的泛型实例，你运行菜单命令`HybridCLR/Generate/AOTGenericReference`即可。

:::tip
该命令只收集了热更新中用到的AOT泛型实例，并且生成的全部是注释形式的代码，需要你自己参考这个文件，根据实际需求在其他地方显式地实例化部分泛型。
:::
### 获得补充元数据dll

**打包过程**生成的裁剪后的AOT dll可以用于补充元数据。com.code-philosophy.hybridclr插件会自动把它们复制到`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`。注意，不同BuildTarget的裁剪AOT dll不可复用。

使用`HybridCLR/Generate/AotDlls`命令也可以立即生成裁剪后的AOT dll，它的工作原理是通过导出一个Temp工程来获得裁剪AOT dll。

### 应该补充元数据的assembly列表

`HybridCLR/generate/AOTGenericReference` 命令生成的`AOTGenericReferences.cs`文件中包含了应该补充元数据的assembly列表，示例如下。你不需要运行游戏也能快速知道应该补充哪些元数据。

:::tip

PatchedAOTAssemblyList列表的计算结果是保守的，实践中很可能不需要补充这么多。如果没有明显的内存压力，直接按列表全补充比较省事。如果需要优化则可以只补充最常见的几个dll（如mscorlib之类），后面遇到AOT泛型错误再加上相应的dll。

补充元数据dll是可以热更的，不用担心发布后在某个版本突然遇到泛型错误的问题。

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

### 元数据模式 HomologousImageMode

目前支持两种元数据模式：

- `HomologousImageMode::Consistent` 模式，即补充的dll与打包时裁剪后的dll精确一致。因此必须使用build过程中生成的裁剪后的dll，则不能直接复制原始dll。
- `HomologousImageMode::SuperSet` 模式，即补充的dll是打包时裁剪后的dll的超集。这个模式放松对了AOT dll的要求，你既可以用裁剪后的AOT dll，也可以用原始AOT dll。

### 加载补充元数据示例代码

代码中加载补充元数据dll的方式见以下示例代码，你也可以参考 [hybridclr_trial](https://github.com/focus-creative-games/hybridclr_trial)。

执行`HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly`时会在内部将传入的dllBytes复制一份，调用完该接口后**请不要保存dllBytes**，否则会造成内存浪费。

:::tip
如果RuntimeApi.LoadMetadataForAOTAssembly花费太多时间，造成卡顿，你可以在其他线程异步加载。
:::
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
            // 执行补充元数据时内部会自动将dllBytes复制一份，调用完成后请不要将dllBytes保存，造成无谓的内存浪费
            int err = HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly(dllBytes, HomologousImageMode.SuperSet);
              Debug.Log($"LoadMetadataForAOTAssembly:{aotDllName}. ret:{err}");
        }
    }
```

## 优化补充元数据dll大小

:::tip

是否优化补充元数据不影响补充元数据机制的正常工作，推荐有包体或内存优化压力的项目执行这个操作。

:::

加载补充元数据dll不仅增加了包体或者热更新资源大小，运行时加载也消耗了可观的内存空间，详细见[内存与GC](./memory)文档。优化补充元数据dll大小
对于内存敏感的场合有积极意义。

补充元数据技术只用到了补充元数据dll中泛型函数的元数据信息，补充元数据dll中包含的非泛型函数的元数据是多余的，将它们完全剔除不会
影响补充元数据机制的正常工作。因此`com.code-philosophy.hybridclr`自v4.0.16版本起提供了补充元数据优化工具类`HybridCLR.Editor.AOT.AOTAssemblyMetadataStripper`
实现这个剔除优化工作。

这个剔除效果因assembly而异，效果差别较大，以下是我们在单元测试工程上的测试结果：

|程序集名|原始大小|优化后大小|优化率|
|-|-|-|-|
|mscorlib|2139k|1329k|37.9%|
|System|186k|63.0k|66.2%|
|System.Core|96.3k|89.1k|7.4%|


示例代码如下：

```csharp

        /// 进一步剔除AOT dll中非泛型函数元数据，输出到StrippedAOTAssembly2目录下
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


## full generic sharing 技术

:::tip
`full generic sharing` 技术当前只提供商业化版本。
:::

补充元数据虽然彻底解决了AOT泛型问题，但补充元数据会导致需要随包携带或者热更新下载补充元数据dll，导致包体增大或者增加了热更新时间。
加载补充元数据不仅导致内存占用明显增加（一般为**3-4**倍补充元数据dll大小），还增加了启动时间。对于微信小游戏这些对包体和内存要求严苛的场合，这是一个影响较大的问题。
被补充的泛型函数以解释方式执行，还降低了运行性能。

HybridCLR支持`full genric sharing`后，不再需要补充元数据，简化了工作流，以原生方式运行AOT泛型，性能大幅提升，彻底解决了补充元数据的以上缺点。
详细文档见[完全泛型共享](../business/fullgenericsharing)。

## 附录：AOT泛型的共享泛型实例化示例

:::caution
HybridCLR性能非常优异，除非确实遇到到性能问题，否则绝大多数情况下你应该使用补充元技术或者`full generic sharing`技术来解决AOT泛型问题。
:::

### 示例1

错误日志

```text
MissingMethodException: AOT generic method not instantiated in aot module 
  void System.Collections.Generic.List<System.String>.ctor()
```

你在主工程中随便找个地方（比如在RefTypes.cs）加上 `List<string>.ctor()` 的调用，即 `new List<string>()`。由于**泛型共享机制**，你调用 `new List<object>()` 即可。

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

```text
MissingMethodException: AOT generic method not instantiated in aot module 
    void System.ValueType<System.Int32, System.String>.ctor()
```

:::tip
值类型的空构造函数没有调用相应的构造函数，而是对应 initobj指令。实际上你无法直接引用它，但你只要强制实例化这个类型就行了，preserve这个类的所有函数，自然就会包含.ctor函数了。
:::

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


