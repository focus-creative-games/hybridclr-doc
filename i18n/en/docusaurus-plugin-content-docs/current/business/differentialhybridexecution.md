# Differential Hybrid Execution

HybridCLR pioneered the implementation of Differential Hybrid Execution (DHE) differential hybrid execution technology. That is, you can add, delete, or modify the AOT dll at will, and intelligently make the changed or newly added classes and functions run in interpreter mode, but the unchanged classes and functions run in AOT mode, so that the running performance of the hot-updated game logic basically reaches the original AOT level.

:::tip

DHE is only included in **Ultimate Edition**, please refer to [Ultimate Edition Introduction](../business/ultimate/intro) for details.

:::

## principle

Put the assembly marked as DHE into the main package, and then load the latest hot update dll after running. During the execution process, when calling a function of a DHE assembly, if the function has not changed, the native AOT implementation will be called directly, otherwise the latest code will be executed in an interpreted manner.
Since the two versions often do not modify too much code in practice, DHE can basically approach the native performance level.

## Features and Benefits

- The performance of the unchanged part of the code is exactly the same as that of the native version, which is an astonishing **3-30** times or even higher than the purely interpreted version, and the overall performance almost reaches the native performance level.
- The code can be changed arbitrarily, there is basically no intrusion to the code, there are almost no special precautions, and the usage method is similar to the community version.
- The workflow is simple, you don’t need to mark which functions have changed like xxxfix and other solutions, and the tools will automatically handle them
- Retrofits to items cost less than pure hot update versions. For example, extern functions can be defined directly in DHE without moving to the AOT module.
- includes **interpretation instruction optimization, and the performance of most numerical calculation instructions in the changed part is improved by 100-300% or more**, further greatly improving the performance level.
- The native code is all in the package body, the risk of being rejected by iOS is greatly reduced

## Unsupported feature

- Any code in the AOT assembly corresponding to DHE cannot be executed before the DHE hot update code is loaded. It means that DHE does not support differential mixing of basic libraries like mscorlib, but supports differential hot update of traditional hot update assembly.
- Due to the first restriction, `[InitializeOnLoadMethod]` and `Script Execution Order settings` are not supported in DHE assemblies.
- DHE scripts are not supported to be mounted in package resources, including Resources. (This restriction will be relaxed or removed in the future)
- Cannot add extern function in DHE assembly through hot update.

## dhao file

The dhao file is the core concept of DHE technology. The dhao file contains information about the types and functions changed in the latest hot update dll that has been calculated offline. When running a hot update function directly based on the information in the dhao file, whether to use the latest interpreted version or directly call the original The AOT function.
The dhao file calculated offline is extremely critical for DHE technology. If there is no dhao file, the original AOT dll needs to be carried additionally, and the cost of calculating function changes is extremely high.

By comparing the latest hot update dll with the AOT dll generated during packaging, the changed type and function are calculated offline and saved as a dhao file. Therefore, in order for the DHE mechanism to work normally, it must depend on the correctness of the dhao file, and the correctness of the dhao file
It relies on providing the latest hot update dll and AOT dll generated during packaging.
