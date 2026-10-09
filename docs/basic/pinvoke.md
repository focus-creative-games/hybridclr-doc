---
title: 'PInvoke支持'
description: 'hybridclr 一直以来都支持调用 AOT 中定义的 extern 函数，这是推荐且唯一受支持的 PInvoke 使用方式。'
slug: /basic/pinvoke
---

# PInvoke支持

hybridclr 一直以来都支持**调用 AOT 中定义的 extern 函数**，这是推荐且唯一受支持的 PInvoke 使用方式。

:::warning

自 **v9.0.0** 版本起，**移除了在热更新代码中定义 extern 函数的支持**。

该特性曾在 v8.0.0 - v8.15.0 期间可用，但它依赖运行时查找动态链接库中的函数符号，无法在 iOS、WebGL 等平台工作，且没有对参数和返回值做 marshal 处理，
限制多、易出错，实际使用价值有限。因此在 v9.0.0 中移除。

如果你的项目依赖此特性，请按下面的`迁移办法`将 extern 函数移到 AOT 程序集中，或继续使用 **8.15.0** 版本。

:::

## 在AOT中定义extern函数

将所有 `[DllImport]` 声明放在 AOT 程序集（主工程程序集）中，热更新代码通过调用 AOT 中的这些函数来访问 native 代码。这种方式：

- 在所有 il2cpp 支持的平台上都能正常工作，包括 iOS 和 WebGL
- 由 il2cpp 生成完整的 marshal 代码，string、数组、结构体等参数都能正确传递
- 没有额外的桥接函数预留要求

示例：

```csharp
// 在 AOT 程序集中定义
public static class NativeApi
{
    [DllImport("MyNativePlugin", EntryPoint = "GetStringLength")]
    public static extern int GetStringLength(string str);

    [DllImport("MyNativePlugin", EntryPoint = "Process")]
    public static extern void Process(int value);
}
```

```csharp
// 热更新代码中直接调用
public class HotUpdateLogic
{
    public void Run()
    {
        int len = NativeApi.GetStringLength("abc");
        NativeApi.Process(len);
    }
}
```

## 迁移办法

如果你从 8.x 升级到 9.0.0，且热更新代码中定义了 extern 函数，运行时会抛出 `ExecutionEngineException: not support extern method: xxxx`。迁移步骤：

1. 找出热更新程序集中所有带 `[DllImport]` 的 extern 函数声明。
2. 将这些声明移到 AOT 程序集的一个静态类中（如上面的 `NativeApi`）。
3. 热更新代码改为调用该 AOT 类的方法。
4. 如果 native 函数签名在发布主包时还不确定，需要在 AOT 中预先定义好这些声明——这部分无法热更新，请提前规划好 native 接口。

:::tip

如果你需要在热更新中定义 extern 函数，可以考虑使用商业版的 **DHE（差分混合执行）** 技术，在 DHE 程序集中可以直接定义 extern 函数。
详见[差分混合执行](../business/differentialhybridexecution.md)。

:::

## 相关文档

- [MonoPInvokeCallback 支持](./monopinvokecallback.md)——native 回调 managed 函数的方式
- [与脚本语言共存](./workwithscriptlanguage.md)
