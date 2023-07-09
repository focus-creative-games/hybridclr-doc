# Introduction

The Ultimate Edition is mainly for projects with strict performance requirements. Compared with the community edition, the performance of the ultimate edition has been greatly improved, basically reaching the native performance level, and at the same time, it has better optimization in terms of security and memory.


## Advantage

- Contains the `DHE` technology, the performance of the unchanged part of the code is exactly the same as that of the original, compared with the pure interpretation method of the community version, it is astonishing **3-30** times or even higher, and the overall **almost reaches** the original performance level
- Supports the `full generic sharing` technology of il2cpp starting from Unity 2021. Value types can also be shared generically. AOT generic functions are executed natively, which greatly improves the execution performance of generic functions. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL
- **Support incremental GC**
- Will support **Deep Instruction Optimization Technology** in 2023.7, deeply optimize the instructions, and the interpretation performance will be improved by 100%-1000% (you read it correctly, more than 10 times) or even higher, and the overall improvement for numerical instructions will be nearly 300% . Due to the conversion of instructions into register instructions in advance, the runtime instruction translation time is greatly shortened, and the game runs more smoothly
- Optimized metadata allocation, taking up less memory
- Convert the original IL instructions into register instructions in advance, which is naturally anti-decompilation and cracking, and is safer
- Optimize metadata allocation during loading and running to save memory
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations)
- The native code is all in the package body, and the risk of being rejected by major AppStore is greatly reduced
- One-year technical support is attached to quickly solve various problems encountered during use


The following is the interpretation performance improvement data of the ultimate edition compared to the community version. Note that only the changed code will be interpreted. If it is not changed, the performance of the two is the same as the original.

![interpreter_optimization](/img/hybridclr/interpreter_optimization.jpg)

The following is a comparison of the interpretation performance of the native version and the ultimate edition in terms of numerical calculations. The addition is about 7-16 times, the multiplication is 4 times, and the division is 2 times. Note that only the changed code will be interpreted. If it is not changed, the performance is the same as the original.

![benchmark_numeric](/img/hybridclr/benchmark_numeric.jpg)