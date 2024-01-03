# Introduce

The Ultimate Edition is mainly for projects with strict performance requirements. Compared with the community version, the performance of the flagship version has been greatly improved, basically reaching the native performance level, and at the same time, it has better optimization in terms of security and memory.

## Supported versions

All Unity 2020-2022 LTS versions are supported.

## Advantage

- Contains the original [Differential Hybrid Execution(DHE)](../differentialhybridexecution) technology, the performance of the unchanged part of the code is exactly the same as that of the original, compared with the pure interpretation method of the community version, the improvement is amazing**3-30 ** times or even higher, the overall ** almost reaches the level of ** native performance
- Supports the `full generic sharing` technology of il2cpp starting from Unity 2021. Value types can also be shared generically. AOT generic functions are executed natively, which greatly improves the execution performance of generic functions. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL
- **Primary instruction optimization**. Careful and reliable optimization of common code paradigms, greatly improving the performance of common instructions such as variable access (50%-100%), numerical calculation (100-300%), and object access (50-200%), like some special The performance of the code, such as the typeof instruction, has been improved by more than 1000%.
- **Deep instruction optimization technology**. In-depth optimization of instructions, the overall interpretation performance is improved by 100%-1000% (more than 10 times) or even higher, and the overall improvement of numerical instructions is nearly 300%. Due to the conversion of instructions into register instructions in advance, the runtime instruction translation time is greatly shortened, and the game runs more smoothly
- Optimized metadata allocation, taking up less memory
- Convert the original IL instructions into register instructions in advance, which is naturally anti-decompilation and cracking, and is safer
- Optimize metadata allocation during loading and running to save memory
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations)
- The native code is all in the package body, and the risk of being rejected by major AppStore is greatly reduced
- One-year technical support is attached to quickly solve various problems encountered during use