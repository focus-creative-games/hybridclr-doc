---
title: 'Unsupported Features'
description: 'The list of limitations for HybridCLR hot update code: no extern function definitions, no Marshal struct serialization functions, no RuntimeInitializeOnLoadMethod, no C#-level debugging of interpreted code, and more.'
slug: /basic/notsupportedfeatures
---

# Unsupported Features

:::tip
HybridCLR supports all features not listed in the limitations below. Please don't ask whether HybridCLR supports a specific feature.
:::

- Defining extern functions (`[DllImport]`) in hot update code is not supported. This feature was available from v8.0.0 to v8.15.0 and was removed in **v9.0.0**. Define extern functions in AOT assemblies instead; see the [PInvoke](./pinvoke.md) documentation for details.
- Functions in `System.Runtime.InteropServices.Marshal` that serialize structures, such as `Marshal.StructureToPtr`, are not supported. However, regular Marshal functions like `Marshal.PtrToStringAnsi` work normally.
- `[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)]` is not supported. This is purely a timing issue - Unity collects these functions very early, before hot update DLLs are loaded. A recommended approach is to use reflection to collect these functions and actively call them at an appropriate time.
- C#-level debugging of interpreted code is not supported, as we haven't had time to write a debugger yet.
- `RequireComponent(typeof(AAA))` requires that AAA must have been instantiated elsewhere in resources or added via AddComponent, otherwise Unity cannot recognize AAA as a script and will ignore it.
