# Unsupported Features

:::tip
HybridCLR supports all features not listed in the limitations below. Please don't ask whether HybridCLR supports a specific feature.
:::

- Starting from v8.0.0, defining extern functions in hot update scripts is supported, but with certain limitations on return values and parameters. See the [PInvoke](./pinvoke) documentation for details.
- Functions in `System.Runtime.InteropServices.Marshal` that serialize structures, such as `Marshal.StructureToPtr`, are not supported. However, regular Marshal functions like `Marshal.PtrToStringAnsi` work normally.
- `[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)]` is not supported. This is purely a timing issue - Unity collects these functions very early, before hot update DLLs are loaded. A recommended approach is to use reflection to collect these functions and actively call them at an appropriate time.
- C#-level debugging of interpreted code is not supported, as we haven't had time to write a debugger yet.
- `RequireComponent(typeof(AAA))` requires that AAA must have been instantiated elsewhere in resources or added via AddComponent, otherwise Unity cannot recognize AAA as a script and will ignore it.
