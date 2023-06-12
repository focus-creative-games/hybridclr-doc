# Business Services

We provide a variety of high-end commercial versions and flexible customized technical services to meet the needs of game projects in various application scenarios.

Please use your company's **company email** to send inquiries to email business@code-philosophy.com, emails initiated by QQ or 126 emails will be ignored, please understand.

## Ultimate

:::tip

The flagship version includes our original [`Differential Hybrid Execution(DHE)`](/advanced/differentialhybridexecution.md) technology, which will intelligently make changed or newly added classes and functions run in interpreter mode, but unchanged classes and The function runs in AOT mode,
It is the first time in the industry to realize the business logic "arbitrary change" and at the same time, the operating performance **reaches the level of native AOT**, which is the best choice for large-scale or performance-critical projects.

:::

The flagship version has been verified online by commercial projects and has reached a high level of stability, so you can use it with confidence.

Advantages of the flagship version:

- Contains the original `DHE` technology, the performance of the unchanged part of the code is exactly the same as that of the original, compared with the pure interpretation method of the community version, it is astonishing **3-30** times or even higher, and the overall **almost reaches** the original performance level.
- Supports the `full generic sharing` technology of il2cpp starting from Unity 2021. Value types can also be shared generically. AOT generic functions are executed natively, which greatly improves the execution performance of generic functions. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- **Advanced Interpretation Instruction Optimization**, support function inline (more than 10 times performance improvement for short functions), newobj inline, class member access optimization, typeof optimization, **numerical instruction** optimization and other important optimizations. The performance of the most core numerical instructions has been improved by 100-300%, making it possible for the interpreter module to perform heavy numerical calculations.
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations).
- All the native codes are in the package body, the risk of being rejected by major AppStore is greatly reduced.
- One-year technical support is included to quickly solve various problems encountered during use.


The following is the interpretation performance improvement data of the flagship version compared to the community version. Note that only the changed code will be interpreted. If it is not changed, the performance of the two is the same as the original.

![interpreter_optimization](/img/hybridclr/interpreter_optimization.jpg)

The following is a comparison of the interpretation performance of the native version and the flagship version in terms of numerical calculations. The addition is about 7-16 times, the multiplication is 4 times, and the division is 2 times. Note that only the changed code will be interpreted. If it is not changed, the performance is the same as the original.

![benchmark_numeric](/img/hybridclr/benchmark_numeric.jpg)


## Professional version

Provides some advanced features not supported by the community version, **very high cost performance**.

Version advantages:

- Supports the `full generic sharing` technology of il2cpp starting from Unity 2021. Value types can also be shared generically. AOT generic functions are executed natively, which greatly improves the execution performance of generic functions. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- Includes basic interpreted instruction optimizations (DHE includes more instruction optimizations). Support function inline (more than 10 times performance improvement for short functions such as Property access), newobj inline and other optimization technologies.
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations).

## HotReload Special Edition

HotReload Special Edition provides support for the original `Hot Reload Technology`. It can completely unload or reload an assembly during operation, especially suitable for small game collection type games.

Version advantages:

- Support the `full generic sharing` technology of il2cpp starting from Unity 2021, value types can also be shared generically. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- Support unloading a single assembly, unloading most of the memory (expected to be more than 95%), but there is a small amount of residue (such as the memory occupied by the thread static member field marked by `[ThreadStatic]`)
- Support reloading assembly, the code can be changed arbitrarily or even completely different (except MonoBehaviour class). Hot overloading of MonoBehaviour and ScriptableObject.
- Support **Limit the collection of functions that can be accessed in the hot update assembly**, suitable for creating a sandbox environment in UGC games to avoid damage caused by malicious player code.
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations).



## Enterprise Technical Support

You can flexibly choose the technical service items required by the enterprise. If you subscribe annually, you will be charged according to the service item, otherwise you will be charged according to the service duration.

- Technical support for Android64 and iOS64 platforms (other services are only for these platforms)
- Technical support for Android32, **WebGL (including MiniGame, WeChat games)**, Win64, MacOS platforms
- Transplant support for unsupported platforms such as Linux and Switch
- Bug standard response and resolution, including one-to-one remote assistance guidance, most reproducible bugs will be fixed within 2-7 days or provide circumvention solutions
- Bug fix support for expired LTS versions such as 2019.4.x
- Transplant technical guidance for minor versions within the scope of non-standard support, such as guidance to support version 2022.2.4.
- **Get the support of Unity2023 series preview version in advance**
- Obtain the support of the LTS minor version that the community version has not followed up in advance
- Support for .net standard 2.0 and 2.1
- Support for incremental GC
- Optimization guidance
- Other special customized services