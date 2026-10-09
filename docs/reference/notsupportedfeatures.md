---
title: '不支持的特性'
description: 'HybridCLR 热更新代码的限制事项清单：不支持定义extern函数、不支持Marshal结构序列化函数、不支持RuntimeInitializeOnLoadMethod、不支持C#级别调试解释代码等。'
slug: /basic/notsupportedfeatures
---

# 不支持的特性

:::tip
不在限制事项中的特性HybridCLR都支持，请不要再问HybridCLR是否支持某个功能。
:::

- 不支持在热更新代码中定义extern函数（`[DllImport]`）。该特性曾在v8.0.0-v8.15.0期间可用，自**v9.0.0**版本起已移除。请将extern函数定义在AOT程序集中，详见文档[PInvoke支持](../guide/features/pinvoke.md)。
- 不支持`System.Runtime.InteropServices.Marshal`中 `Marshal.StructureToPtr`之类序列化结构的函数，但普通Marshal函数如`Marshal.PtrToStringAnsi`都是能正常工作的。
- 不支持[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)]。纯粹是时机问题，Unity收集这些函数的时机很早，此时热更新dll还没加载。一个推荐的办法是你使用反射收集这些函数，在合适的时机主动调用它们。
- 不支持对解释代码部分进行C#级别调试，因为没暂时没时间写调试器
- `RequireComponent(typeof(AAA))` 要求AAA必须已经在别处资源中实例化或者AddComponent过，否则Unity无法识别AAA为脚本而忽略处理。
