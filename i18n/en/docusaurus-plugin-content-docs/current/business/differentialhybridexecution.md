# Differential Hybrid Execution

HybridCLR pioneered the implementation of Differential Hybrid Execution (DHE) technology. It allows arbitrary additions, deletions, and modifications to AOT DLLs, intelligently running changed or new classes and functions in interpreter mode while unchanged classes and functions run in AOT mode, making hot-updated game logic performance essentially reach native AOT levels.

:::tip

DHE is only included in the **Ultimate Edition**. For details, please see [Ultimate Edition Introduction](../business/ultimate/intro).

:::

## Principle

Assemblies marked as DHE are also packaged into the main build, then the latest hot update DLL is loaded at runtime. During execution, when calling a function from a DHE assembly, if the function hasn't changed, it directly calls the native AOT implementation; otherwise, it executes the latest code interpretively.
Since in practice, two versions often don't modify too much code, DHE can achieve performance levels close to native.

## Features and Advantages

- Unchanged code parts have identical performance to native, providing an amazing **3-30x** or higher improvement compared to pure interpretation versions, with overall performance nearly reaching native levels.
- Allows arbitrary code changes with minimal code intrusion and almost no special considerations. Usage is similar to the community version.
- Simple workflow that doesn't require manually marking which functions have changed like xxxfix solutions - tools handle everything automatically.
- Lower transformation cost for projects compared to pure hot update versions. For example, extern functions can be defined directly in DHE without moving to AOT modules.
- Native code is fully included in the package, significantly reducing the risk of iOS App Store rejection.

## Unsupported Features

- No code from the DHE-corresponding AOT assembly can be executed before loading DHE hot update code. This means DHE doesn't support differential hybrid for basic libraries like mscorlib, but supports differential hot updates for traditional hot update assemblies.
- Due to the first limitation, `[InitializeOnLoadMethod]` and `Script Execution Order settings` are not supported in DHE assemblies.
- DHE scripts cannot be attached to bundled assets, including Resources.
- Cannot add new extern functions through hot updates in DHE assemblies.

## dhao Files

The dhao file is the core concept of DHE technology. It contains offline-calculated information about changed types and functions in the latest hot update DLL. At runtime, the system directly uses information from the dhao file to decide whether to use the latest interpreted version or directly call the original AOT function when executing a hot update function.
Offline-calculated dhao files are crucial for DHE technology. Without dhao files, the original AOT DLL would need to be carried additionally, and the cost of calculating function changes would be extremely high.

By comparing the latest hot update DLL with the AOT DLL generated during packaging, changed types and functions are calculated offline and saved as dhao files. Therefore, for the DHE mechanism to work correctly, it must rely on the correctness of the dhao file, which in turn depends on accurately providing the latest hot update DLL and the AOT DLL generated during packaging.
