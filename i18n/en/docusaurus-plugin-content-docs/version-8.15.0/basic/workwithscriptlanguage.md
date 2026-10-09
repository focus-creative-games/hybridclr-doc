# HybridCLR + lua/js/python

Some projects are already online with most of their code implemented in lua; or some new projects have been developed halfway using lua. They cannot completely switch to full C# development, but they want to integrate HybridCLR to help gradually transition to full native C# hot updates. Since HybridCLR is a native C# hot update technology, it natively supports working with these scripting languages.

## Using ZLua/ZenTS

**Strongly recommended.**

[ZLua](https://github.com/focus-creative-games/zlua) and [ZenTS](https://github.com/focus-creative-games/zen-ts) are our official lua and javascript/typescript solutions for the Unity engine. They interact directly with il2cpp and do not require generating or configuring complex `[MonoPInvokeCallback]` attributes like other third-party solutions.

ZLua and ZenTS are modern Unity scripting solutions with **zero configuration**, high performance, extremely low GC, no wrappers, and complete C# interoperability. HybridCLR developers can gain scripting capabilities at zero cost.

## Other Third-Party Scripting Solutions

Compared to ZLua/ZenTS, these scripting solutions can work, but they are cumbersome to configure and require some source code modifications to the original solutions. In terms of integration difficulty, runtime performance, GC, and development efficiency, they fall far short of ZLua/ZenTS. Only recommended for projects with relatively strong technical capabilities.

### Principle

All third-party scripts (lua, typescript, python, etc.) interact with C# code by depending on C# functions marked with `[MonoPInvokeCallback]` for native callbacks.
il2cpp binds a separate Wrapper function for each function marked with `[MonoPInvokeCallback]`, handling issues like parameter passing and return value marshaling between managed and native.

Similarly, HybridCLR also needs to generate corresponding Wrapper functions for each function marked with `[MonoPInvokeCallback]`. However, for platforms like iOS that prohibit JIT, it's obviously impossible to dynamically generate these wrapper functions at runtime. Therefore, corresponding Wrapper functions need to be reserved in advance for such functions that may be used in the future.

For how to reserve Wrapper functions, see the documentation [MonoPInvokeCallback Support](./monopinvokecallback).

### xlua

xlua doesn't consider modularization, with all generated code in the global Assembly-CSharp, even creating partial classes associated with Runtime code. Therefore, you may need to make minor adjustments to the generated code of these hot update solutions to work with hot updates.
Community members have already created a `HybridCLR + xlua` project [HybridCLRXlua](https://gitee.com/ldr123/HybridCLRXlua) that's working. Developers who don't fully understand can learn from this reference.

### tolua, slua, puerts

Just ensure that enough ReversePInvokeWrapper functions are reserved, that the generated wrapper code can be placed in hot update modules, and that they are correctly registered.
