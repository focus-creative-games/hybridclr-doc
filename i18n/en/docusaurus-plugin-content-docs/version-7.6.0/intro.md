# Introduction

[![license](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/focus-creative-games/hybridclr/blob/main/LICENSE)

![logo](/img/logo.png)

<br/>
<br/>

HybridCLR is a **almost perfect** full-platform native c# hot update solution for Unity with complete features, zero cost, high performance, and low memory.

HybridCLR expands the code of il2cpp, making it change from pure [AOT](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) runtime to `AOT+Interpreter` hybrid runtime, and then natively supports dynamic loading of assembly , so that the games packaged based on il2cpp backend can be executed not only on the Android platform, but also on IOS, Consoles and other platforms that limit JIT efficiently in **AOT+interpreter** hybrid mode, completely supporting hot updates from the bottom layer.

HybridCLR not only supports the traditional fully interpreted execution mode, but also pioneered the [Differential Hybrid Execution(DHE)](./business/intro.md) differential hybrid execution technology. That is, you can add, delete, or modify the AOT dll at will, and intelligently make the changed or newly added classes and functions run in interpreter mode, but the unchanged classes and functions run in AOT mode, so that the running performance of the hot-updated game logic basically reaches the original AOT level.

Welcome to embrace modern native C# hot update technology! ! !


## Features

- Features complete. Nearly complete implementation of the [ECMA-335 specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-335/), with only a very small number of [unsupported features](basic/notsupportedfeatures.md) features.
- Zero learning and use costs. HybridCLR enhances the pure AOT runtime into a complete runtime, making hot update code work seamlessly with AOT code. The script class and the AOT class are in the same runtime, and you can freely write codes such as inheritance, reflection, and multi-threading (volatile, ThreadStatic, Task, async). No need to write any special code, no code generation, almost unlimited.
- Efficient execution. Implemented an extremely efficient register interpreter, all indicators are significantly better than other hot update schemes. [Performance Test Report](basic/performance.md)
- Memory efficient. The classes defined in the hot update script occupy the same memory space as ordinary c# classes, which is far superior to other hot update solutions. [Memory usage report](basic/memory.md)
- Due to the perfect support for generics, libraries that are not compatible with il2cpp due to AOT generics issues can now run perfectly under il2cpp
- Support some features not supported by il2cpp, such as __makeref, __reftype, __refvalue directives
- The original [Differential Hybrid Execution(DHE)](./business/differentialhybridexecution) makes the running performance of hot update basically reach the level of native AOT.

## working principle

Inspired by mono's [mixed mode execution](https://www.mono-project.com/news/2017/11/13/mono-interpreter/) technology, HybridCLR provides an additional interpreter module for unity's il2cpp runtime , Transform them from pure AOT runtime to `AOT + Interpreter` hybrid runtime.

![icon](/img/hybridclr/architecture.png)

More specifically, HybridCLR does the following:

- Implemented an efficient metadata (dll) parsing library
- Modified the metadata management module to realize the dynamic registration of metadata
- Implemented a compiler from IL instruction set to custom register instruction set
- Implemented an efficient register interpreter
- Provide a large number of instinct functions to improve the performance of the interpreter

## The difference from other popular c# hot update schemes

HybridCLR is a native c# hot update solution. In layman's terms, il2cpp is equivalent to the aot module of mono, and HybridCLR is equivalent to the interpreter module of mono, and the combination of the two becomes a complete mono. HybridCLR makes il2cpp a full-featured runtime, natively (that is, through System.Reflection.Assembly.Load) supports dynamic loading of dlls, thereby supporting hot updates of the ios platform.

Just because HybridCLR is implemented at the native runtime level, the types of the hot update part and the AOT part of the main project are completely equivalent and seamlessly unified. You can call, inherit, reflect, and multi-thread at will, without generating code or writing adapters.

Other hot update solutions are independent vm, and the relationship with il2cpp is essentially equivalent to the relationship of embedding lua in mono. Therefore, the type system is not uniform. In order to allow the hot update type to inherit some AOT types, an adapter needs to be written, and the type in the interpreter cannot be recognized by the type system of the main project. Incomplete features, troublesome development, and low operating efficiency.

## Compatibility

- Supports 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x, 2023.2.x、**6000.x.y** versions
- Support for common platforms. It has stably supported PC (Win32 and Win64), macOS (x86, x64, Arm64), Android (armv7, armv8), iOS (64bit), WebGL, **WeChat applet platform**, and the remaining platforms are yet to be tested.
- Tested a large number of common game libraries, and did not find a library that is natively compatible with il2cpp but incompatible after using HybridCLR. As long as the library can work under the il2cpp backend, it can work normally under HybridCLR. Even those libraries that are incompatible with il2cpp due to AOT issues can now run normally because of HybridCLR's ability to expand il2cpp.

## Low risk of rejection

:::tip

HybridCLR is very popular in mainland China, and there are at least hundreds of games using HybridCLR on the App Store and Google Play.

:::

The underlying principle of HybridCLR is still interpretation and execution, and from this point of view there is no essential difference from lua. Therefore, it meets the requirements of App Store and Google Play Store, and there is no special risk of rejection. And because of the high integration of HybridCLR and il2cpp,
It is even much safer than the lua scheme, and the probability of rejection is very low.

## Stability Status

At present, **extremely stable** 1.x, 2.x, 3.x, 4.x, 5.x official versions have been released, which are sufficient to meet the stability requirements of large and medium-sized commercial projects. Since the first game was launched on June 7, 2022, only one small bug occurred in the online project, and it was quickly fixed within a few hours.

At present, at least **thousands** commercial game projects have completed access, and **hundreds** of them have been launched on both ends. The online projects include MMORPG, heavy card, heavy tower defense and other games.

Most leading companies such as Tencent, NetEase, funplus, Perfect World, Stacked Paper, and ByteDance have already connected to multiple projects and will soon (or already) go online.


## About the author

**walon** : Founder of **Code Philosophy (code philosophy)**

Graduated from the Department of Physics of Tsinghua University, won the CMO gold medal in 2006, a member of the National Mathematical Olympiad Training Team, and was recommended to Tsinghua University for basic courses. Focus on game technology, good at developing architecture and basic technical facilities.

## license

HybridCLR is licensed under the [MIT](https://github.com/focus-creative-games/hybridclr/blob/main/LICENSE) license