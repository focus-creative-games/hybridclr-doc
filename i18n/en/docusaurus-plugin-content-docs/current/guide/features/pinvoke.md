---
title: 'PInvoke Support'
description: 'HybridCLR has always supported calling extern functions defined in AOT. This is the recommended and only supported way to use PInvoke.'
slug: /basic/pinvoke
---

# PInvoke Support

HybridCLR has always supported **calling extern functions defined in AOT**. This is the recommended and only supported way to use PInvoke.

:::warning

Starting from v9.0.0, **support for defining extern functions in hot update code has been removed**.

The feature was available from v8.0.0 to v8.15.0, but it relied on looking up function symbols in dynamic link libraries at runtime, so it could not work on platforms such as iOS and WebGL. It also performed no marshalling of parameters and return values, which made it restrictive and error-prone with limited practical value. It was therefore removed in v9.0.0.

If your project depends on this feature, follow the `Migration` section below to move the extern functions into an AOT assembly, or stay on **8.15.0**.

:::

## Defining extern Functions in AOT

Put all `[DllImport]` declarations in an AOT assembly (your main project assembly), and have hot update code reach native code by calling those AOT functions. This approach:

- Works on every platform il2cpp supports, including iOS and WebGL
- Lets il2cpp generate complete marshalling code, so string, array and struct parameters are all passed correctly
- Has no additional bridge function reservation requirement

Example:

```csharp
// Defined in an AOT assembly
public static class NativeApi
{
    [DllImport("MyNativePlugin", EntryPoint = "GetStringLength")]
    public static extern int GetStringLength(string str);

    [DllImport("MyNativePlugin", EntryPoint = "Process")]
    public static extern void Process(int value);
}
```

```csharp
// Called directly from hot update code
public class HotUpdateLogic
{
    public void Run()
    {
        int len = NativeApi.GetStringLength("abc");
        NativeApi.Process(len);
    }
}
```

## Migration

If you upgrade from 8.x to 9.0.0 with extern functions defined in hot update code, the runtime throws `ExecutionEngineException: not support extern method: xxxx`. Migration steps:

1. Find every extern function declaration carrying `[DllImport]` in your hot update assemblies.
2. Move those declarations into a static class in an AOT assembly (such as `NativeApi` above).
3. Change the hot update code to call the methods on that AOT class.
4. If a native function signature is not yet settled when you ship the main package, you still have to declare it in AOT ahead of time -- this part cannot be hot updated, so plan your native interface in advance.

:::tip

If you need to define extern functions in hot update code, consider the commercial **DHE (Differential Hybrid Execution)** technology, which allows extern functions to be defined directly in DHE assemblies. See [Differential Hybrid Execution](../../business/differentialhybridexecution.md).

:::

## Related Documents

- [MonoPInvokeCallback Support](./monopinvokecallback.md) -- how native code calls back into managed functions
- [Working with Scripting Languages](./workwithscriptlanguage.md)
