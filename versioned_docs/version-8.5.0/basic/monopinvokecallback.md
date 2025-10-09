# MonoPInvokeCallback支持

当与lua之类的第三方语言交互时，需要从这些第三方语言调用C#函数。必须解决两个问题：

1. 如何获取C#函数对应的native函数指针
2. 如何处理string之类的复杂类型的传参和返回值的问题

mono和il2cpp使用`[MonoPInvokeCallbackAttribute]`解决这些问题。当一个静态托管函数添加上该特性时，会为它生成一个单独的c++ Wrapper函数，
调用`Marshal.GetFunctionPointerForDelegate`可获取该函数指针。另外，Wrapper函数会处理参数和返回值中string这种复杂参数或返回值。以`string`
类型为例，Wrapper函数会将native的`const char*`类型数据转为C#中的托管`string`对象，并且在返回native前将`string`类型的返回值转为`const char*`。

同样的，hybridclr也需要为每个标记了`[MonoPInvokeCallback]`的函数生成对应的Wrapper函数。但对于iOS这类禁用了jit的平台，显然没法运行时
动态生成这些wrapper函数。因此需要提前为将来可能用到的这类函数预留相应的Wrapper函数。

## 预留 ReversePInvokeWrapper 函数

`HybridCLR/Generate/ReversePInvokeWrapper`默认为每个带`[MonoPInvokeCallbackAttribute]`特性的函数生成一个wrapper函数。
但如果仅仅生成跟当前拥有`[MonoPInvokeCallbackAttribute]`特性的函数相同个数的wrapper函数，后面新增热更新函数则
会发生wrapper函数不足的问题。解决方法是使用`HybridCLR.ReversePInvokeWrapperGenerationAttribute`进行预留操作。

在带有`MonoPInvokeCallbackAttribute`的函数上新增一个特性 `[ReversePInvokeWrapperGeneration(int preserveCount)]`，则为**这个签名**的函数生成preserveCount个wrapper函数。如果不包含此特性，则只会为这个函数生成
一个wrapper函数。如果对多个相同签名的函数添加了`[ReversePInvokeWrapperGeneration(xx)]` 特性，则wrapper函数总数为 `所有 preserveCount之和 + 不包含 ReversePInvokeWrapperGenerationAttribute 特性的函数个数`。

如下如示， `LuaFunction` 类型的wrapper有10个， `Func<int, int, int>` 类型的wrapper有101个，`Func<int, int>` 类型的wrapper有1个。 

```csharp

[UnmanagedFunctionPointer(CallingConvention.Cdecl)]
delegate int LuaFunction(IntPtr luaState);

public class MonoPInvokeWrapperPreserves
{
    [ReversePInvokeWrapperGeneration(10)]
    [MonoPInvokeCallback(typeof(LuaFunction))]
    public static int LuaCallback(IntPtr luaState)
    {
        return 0;
    }

    [ReversePInvokeWrapperGeneration(100)]
    [MonoPInvokeCallback(typeof(Func<int, int, int>))]
    public static int Sum(int a, int b)
    {
        return a + b;
    }

    [MonoPInvokeCallback(typeof(Func<int, int, int>))]
    public static int Sum2(int a, int b)
    {
        return a + b;
    }

    [MonoPInvokeCallback(typeof(Func<int, int>))]
    public static int Inc(int a)
    {
        return a + 1;
    }
}

```

## 限制

目前调用MonoPInvokeCallback类型函数时没有对参数作marshal处理。普通的int、float类型工作正常，但像string之类参数由于native层传递的是'char*'，没有marshal转为string，直接使用后必然会崩溃！

如果遇到string类型参数的情况，有两种解决办法：

1. 可以将回调函数放到AOT中，在AOT中再回调热更新函数。
2. 将参数改为IntPtr类型，然后再调用Marshal.PtrToStringUTF8将IntPtr类型的原始char*类型数据转成string。示例代码如下。

```csharp
    [MonoPInvokeCallback(typeof(Func<Intptr, int>))]
    public static int Inc(IntPtr ptr)
    {
        string s = Marshal.PtrToStringUTF8(ptr);
        return s.Length;
    }

```

其他需要Marshal的非primitive类型的参数均可仿照这个方法处理。
