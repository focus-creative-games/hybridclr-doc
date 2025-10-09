# HybridCLR+lua/js/python

有一些项目已经上线，它们的大多数代码已经用lua实现了；或者一些新项目已经用lua开发到一半，他们无法完全切换为全C#开发，但希望
可以同时接入HybridCLR，帮助慢慢过渡到全部原生C#热更新。由于HybridCLR是原生C#热更新技术，原生支持与这些脚本语言配合工作。

## 原理

所有第三方脚本（lua、typescript、python等）与C#代码交互都依赖于用`[MonoPInvokeCallback]`标记要从native回调的C#函数。
il2cpp会为每个标记了`[MonoPInvokeCallback]`的函数绑定一个单独的Wrapper函数，处理managed与native之间传参与返回值marshal之类的问题。

同样的，hybridclr也需要为每个标记了`[MonoPInvokeCallback]`的函数生成对应的Wrapper函数。但对于iOS这类禁用了jit的平台，显然没法运行时
动态生成这些wrapper函数。因此需要提前为将来可能用到的这类函数预留相应的Wrapper函数。

如何预留Wrapper函数，详见文档[MonoPInvokeCallback支持](./monopinvokecallback)。

## xlua

xlua并未考虑过模块化，生成的代码全在全局Assembly-CSharp里，甚至做成partial类与Runtime代码关联，因此你可能需要对这些热更新方案的生成代码做少量调整，才能与热更新配合工作。
已经有群友制作了 `HybridCLR+xlua` 的项目 [HybridCLRXlua](https://gitee.com/ldr123/HybridCLRXlua)，已经跑通。没有充分理解的开发者可以借鉴学习。

## tolua、slua、puerts

确保预留了足够多的ReversePInvokeWrapper函数并且生成的wrapper代码能放到热更新模块，并且正确注册即可。

