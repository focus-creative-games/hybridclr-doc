# Differential Hybrid Execution (DHE)

HybridCLR introduces the groundbreaking Differential Hybrid Execution (DHE) technology. It allows for arbitrary modifications to AOT DLLs, intelligently running changed or newly added classes and functions in interpreter mode while unchanged classes and functions run in AOT mode, enabling the performance of hot-updated game logic to reach nearly the level of native AOT.

:::tip

DHE is only available in the **Ultimate Edition**. Please refer to the [Ultimate Edition introduction](../business/ultimate/intro) for details.

:::

## Principle

The assemblies marked as DHE are also packaged into the main bundle. After running, the latest hotfix DLL is loaded. During execution, when calling a function from a DHE assembly, if the function has not changed, the native AOT implementation is directly invoked; otherwise, the latest code is executed in interpreter mode. Since in practice, the two versions often do not modify too much code, DHE can basically achieve performance close to native levels.

## Features and Advantages

- Unchanged code performs exactly like native AOT, with performance gains ranging from **3-30** times or higher compared to pure interpretation versions, nearly reaching native performance levels.
- Arbitrary changes can be made to the code, with almost no intrusions to the codebase and minimal special considerations, similar to the community version.
- Simple workflow, no need to manually mark which functions have changed like other solutions such as xxxfix; everything is handled automatically by the tool.
- Lower project transformation costs compared to pure hotfix versions. For example, extern functions can be directly defined in DHE without the need to move to the AOT module.
- All native code is included in the package, significantly reducing the risk of iOS rejection.

## Unsupported Features

- No code from the corresponding AOT assembly can be executed before loading DHE hotfix code. This means that DHE does not support differential mixing like mscorlib, but supports traditional hotfix assembly differential updates.
- Due to the first limitation, features such as `[InitializeOnLoadMethod]` and `Script Execution Order settings` are not supported in DHE assemblies.
- DHE scripts cannot be mounted on resources included in the package, including Resources.
- Extern functions cannot be added through hotfix updates in DHE assemblies.

## dhao Files

The dhao file is a core concept of the DHE technology. It contains pre-calculated information about the types and functions that have changed in the latest hotfix DLL, allowing the runtime to determine whether to use the latest interpreted version or directly call the original AOT function when executing a hotfix function. Pre-calculated dhao files are crucial for DHE technology to function properly. Without a dhao file, the original AOT DLL must be carried along, and the cost of calculating function changes is extremely high.

By comparing the latest hotfix DLL with the AOT DLL generated during packaging, the changed types and functions are calculated offline and saved as dhao files. Therefore, for the DHE mechanism to work properly, it depends on the correctness of the dhao file, which in turn depends on accurately providing the latest hotfix DLL and the AOT DLL generated during packaging.
