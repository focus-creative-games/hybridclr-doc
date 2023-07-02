# Commercial Services

We provide a variety of high-end commercial versions and flexible customized technical services to meet the needs of game projects in various application scenarios.

Please use your company's **company email** to send inquiries to email business@code-philosophy.com, emails initiated by QQ or 126 emails will be ignored, please understand.

## Ultimate

:::tip

Compared with the community version, the performance of the flagship version has been greatly improved, and it has basically reached the native performance level. At the same time, the fully generic sharing technology has significantly optimized the workflow, package body and memory usage. It is the best for large-scale or performance-critical projects. choose.
`Deep Instruction Optimization Technology` Due to the conversion of the original instruction in advance, the dll file does not contain the original IL instruction, which is naturally resistant to decompilation and cracking, and is safer and more reliable!
:::

The flagship version has been verified online by commercial projects and has reached a high level of stability, so you can use it with confidence. Here is a list of some live projects:

- **Wonderful Fighter**, from Thunder Games. [iOS](https://apps.apple.com/cn/app/%E5%A5%87%E8%91%A9%E6%88%98%E6%96%97%E5%AE%B6/id1434798394 ) 11w comments, [taptap](https://www.taptap.cn/app/45981?utm_medium=seo&utm_source=google) has 1.69 million followers and 3.57 million downloads.

Advantages of the flagship version:

- Contains the original `DHE` technology, the performance of the unchanged part of the code is exactly the same as that of the original, compared with the pure interpretation method of the community version, it is astonishingly improved by **3-30** times or even higher, and the overall **almost reaches** the original performance level.
- Supports the `full generic sharing` technology of il2cpp starting from Unity 2021. Value types can also be shared generically. AOT generic functions are executed natively, which greatly improves the execution performance of generic functions. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- **Support incremental GC**
- Will support **Deep Instruction Optimization Technology** in 2023.7, deeply optimize the instructions, and the interpretation performance will be improved by 100%-1000% (you read it correctly, more than 10 times) or even higher, and the overall improvement for numerical instructions will be nearly 300% , while having better loading performance.
- Support for dll code obfuscation, natural resistance to decompilation and cracking.
- Optimize metadata allocation during loading and running to save memory
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
- **Support incremental GC**
- Optimize metadata allocation during loading and running to save memory
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations).

## HotReload Special Edition

HotReload Special Edition provides support for the original `Hot Reload Technology`. It can completely unload or reload an assembly during operation, especially suitable for small game collection type games.

Version advantages:

- Support the `full generic sharing` technology of il2cpp starting from Unity 2021, value types can also be shared generically. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- **Support incremental GC**
- Support unloading a single assembly, unloading most of the memory (expected to be more than 90%), but there is a small amount of residue (such as the memory occupied by the thread static member field marked by `[ThreadStatic]`)
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
- Optimization guidance
- Other special customized services