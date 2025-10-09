# HybridCLR

[![license](http://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/focus-creative-games/hybridclr/blob/main/LICENSE)

![logo](/img/logo.png)

<br/>
<br/>

HybridCLR is a **feature-complete, zero-cost, high-performance, low-memory** and **near-perfect** native C# hot update solution for Unity that works across all platforms.

HybridCLR extends the il2cpp runtime code, transforming it from a pure [AOT](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) runtime into a hybrid AOT+Interpreter runtime, enabling native support for dynamic assembly loading and providing comprehensive hot update capabilities at the fundamental level. Games using HybridCLR technology can run efficiently not only on Android but also on iOS, Consoles, WebGL, and all other platforms supported by il2cpp.

Thanks to HybridCLR's excellent support for the ECMA-335 specification and high compatibility with Unity's development workflow, Unity projects can seamlessly gain C# code hot update capabilities after integrating HybridCLR, without requiring developers to change their daily development habits or requirements. HybridCLR has, for the first time, reduced the engineering complexity of implementing cross-platform code hot updates on Unity to an almost zero level.

Welcome to embrace modern native C# hot update technology!!!

## Documentation

- [Official Documentation](./intro)
- [Quick Start Guide](./beginner/quickstart)
- [Business Case Studies](./other/businesscase)


## Features

- Near-complete implementation of the [ECMA-335 specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-335/), with only a minimal set of [unsupported features](./basic/notsupportedfeatures).
- Zero learning curve and usage cost. Most developers can write code with almost no restrictions. Hot update code works seamlessly with AOT code, allowing free use of inheritance, **generics**, **reflection**, and similar features. No need for special code or code generation.
- Full multi-threading support, including but not limited to volatile, ThreadStatic, async Task, and related features - something no other hot update solution supports.
- Nearly complete compatibility with Unity's workflow. This includes support for hot-updating **MonoBehaviour**, ScriptableObject, **DOTS** technology, and proper instantiation of hot update scripts attached to assets - features not supported by any other hot update solution.
- High execution efficiency. Implements an extremely efficient register-based interpreter, with all metrics significantly outperforming other hot update solutions. [Performance Test Report](./basic/performance)
- Memory efficient. Classes defined in hot update scripts use the same memory space as regular C# classes, far superior to other hot update solutions. [Memory Usage Report](./basic/memory)
- Supports MonoPInvokeCallback, enabling smooth interaction with native code and other languages like Lua, JavaScript, and Python.
- Supports some features not supported by il2cpp, such as __makeref, __reftype, and __refvalue instructions.
- Features the innovative **Differential Hybrid Execution (DHE)** technology, allowing arbitrary modifications to AOT dlls while intelligently running unmodified functions in AOT mode and changed or new functions in interpreter mode, achieving near-native AOT performance for hot-updated game logic.
- Supports **Hot Reload** technology, enabling 100% assembly unloading.
- Supports modern DLL encryption technology for effective code security.

## Supported Versions and Platforms

- Supports all LTS versions including 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x, 2023.2.x, and **6000.x.y** series
- Supports all platforms that il2cpp supports
- Supports Unity Engine and HarmonyOS platforms

## Working Principle

Inspired by mono's [mixed mode execution](https://www.mono-project.com/news/2017/11/13/mono-interpreter/) technology, HybridCLR provides an additional interpreter module for AOT runtimes like Unity's il2cpp, transforming them from pure AOT runtimes into hybrid "AOT + Interpreter" execution systems.

![icon](/img/hybridclr/architecture.png)

More specifically, HybridCLR performs the following tasks:

- Implements an efficient metadata (DLL) parsing library
- Redesigns the metadata management module to enable dynamic metadata registration
- Implements a compiler that translates IL instruction sets to custom register instruction sets
- Implements an efficient register-based interpreter
- Provides numerous intrinsic functions to enhance interpreter performance

## Stability Status

HybridCLR has been extensively validated as a highly efficient and stable Unity hot update solution.

Currently, **extremely stable** official versions 1.x-5.x have been released, meeting the stability requirements of medium to large commercial projects.
Thousands of commercial game projects have successfully integrated HybridCLR, with hundreds already launched on both platforms. Released projects include MMORPGs, complex card games, tower defense games, and more. **Most leading game companies** (such as Tencent and NetEase) are already using HybridCLR.

You can view our known [project list](./other/businesscase) of leading companies using HybridCLR that have already launched.

## Support and Contact

- Official Group 1 (3000 members): 651188171 (Full)
- Beginner Group 1 (3000 members): 428404198 (Full)
- Beginner Group 2 (2000 members): 680274677 (Full)
- Beginner Group 3 (2000 members): **920714552 (Recommended)**
- Discord Channel: <https://discord.gg/BATfNfJnm2>
- Business Cooperation Email: business#code-philosophy.com
- [Commercial Support](./business/intro)

## About the Author

**walon**: Founder of **Code Philosophy**

Graduate of Tsinghua University Physics Department, 2006 CMO Gold Medal winner, member of the National Mathematical Olympiad Training Team, admitted to Tsinghua's Basic Science Class. Focuses on game technology, specializing in development architecture and infrastructure technology.

## License

HybridCLR is licensed under the [MIT](https://github.com/focus-creative-games/hybridclr/blob/main/LICENSE) license
