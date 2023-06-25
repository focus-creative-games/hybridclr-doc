# HybridCLR+lua/js/python

有一些项目已经上线，它们的大多数代码已经用lua实现了；或者一些新项目已经用lua开发到一半，他们无法完全切换为全C#开发，但希望
可以同时接入HybridCLR，帮助慢慢过渡到全部原生C#热更新。由于HybridCLR是原生C#热更新技术，原生支持与这些脚本语言配合工作。

:::tip

你要做的，仅仅是将那些要热更新wrapper文件生成到热更新模块，同时提前预留足够多的ReversePInvoke函数。

:::

## xlua

xlua并未考虑过模块化，生成的代码全在全局Assembly-CSharp里，甚至做成partial类与Runtime代码关联，因此你可能需要对这些热更新方案的生成代码做少量调整，才能与热更新配合工作。
已经有群友制作了 `HybridCLR+xlua` 的项目 [HybridCLRXlua](https://gitee.com/ldr123/HybridCLRXlua)，已经跑通。没有充分理解的开发者可以借鉴学习。

## tolua、slua、puerts

确保预留了足够多的ReversePInvokeWrapper函数并且生成的wrapper代码能放到热更新模块，并且正确注册即可。

## MonoPInvokeCallbackAttribute支持

HybridCLR对 `[MonoPInvokeCallbackAttribute]` 的支持跟原生完全。由于每个标注 `[MonoPInvokeCallbackAttribute]` 的函数必须有一个唯一对应的c++函数，而AOT限制导致不可能运行时新增函数，
因而要提前为每个`[MonoPInvokeCallbackAttribute]`函数生成一个`c++ wrapper函数`，用于与之绑定。这些wrapper函数在 `hybridclr/generated/ReversePInvokeMethodStub_{abi}.cpp` 文件中。

[com.code-philosophy.hybridclr](/basic/com.code-philosophy.hybridclr.md) 已经提供了脚本帮助自动生成这些wrapper函数，运行菜单命令`HybridCLR/Generate/ReversePInvokeWrapper` 即可。

## 预留 ReversePInvokeWrapper 函数

`HybridCLR/Generate/ReversePInvokeWrapper`默认为每个带`[MonoPInvokeCallbackAttribute]`特性的函数生成一个wrapper函数。
但如果仅仅生成跟当前拥有`[MonoPInvokeCallbackAttribute]`特性的函数相同个数的wrapper函数，后面新增热更新函数则
会发生wrapper函数不足的问题。解决方法是使用`HybridCLR.ReversePInvokeWrapperGenerationAttribute`进行预留操作。

在带有`MonoPInvokeCallbackAttribute`的函数上新增一个特性 `[ReversePInvokeWrapperGeneration(int preserveCount)]`，则为**这个签名**的函数生成preserveCount个wrapper函数。如果不包含此特性，则只会为这个函数生成
一个wrapper函数。如果对多个相同签名的函数添加了`[ReversePInvokeWrapperGeneration(xx)]` 特性，则wrapper函数总数为 `所有 preserveCount之和 + 不包含 ReversePInvokeWrapperGenerationAttribute 特性的函数个数`。

如下如示， `LuaFunction` 类型的wrapper有10个， `Func<int, int, int>` 类型的wrapper有101个，`Func<int, int>` 类型的wrapper有1个。 

```csharp

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

:::caution
请确保函数参数都是简单primitive类型如int、float之类。
:::

目前没有对引用类型参数作marshal处理，诸如string之类引用类型的参数都是直接传参处理，使用后必然会导致崩溃！
如果实在有这种需求，可以将回调函数放到AOT中，在AOT中再回调热更新
函数。
