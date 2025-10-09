# Code Obfuscation

If hot update code is not obfuscated, tools like ILSpy can easily decompile it back to near-source-code C# code, posing serious threats to intellectual property and code security for commercial game projects and indie game development.

Among current open-source code obfuscation tools, only [Obfuz](https://github.com/focus-creative-games/obfuz) is deeply integrated with Unity and fully supports HybridCLR.

**Obfuz** is an open-source, powerful, easy-to-use, stable and reliable Unity code obfuscation and hardening solution that fully meets the needs of commercial game projects. We strongly recommend using Obfuz to encrypt and protect your code.

Obfuz has provided the following related documentation:

- [Obfuz+HybridCLR](https://www.obfuz.com/docs/beginner/work-with-hybridclr)
- [Executing Obfuscation During Build Process](https://www.obfuz.com/docs/manual/build-pipeline)
- [Incremental Obfuscation and Code Hot Updates](https://www.obfuz.com/docs/manual/incremental-obfuscation-and-hotupdate)
- [Working with HybridCLR](https://www.obfuz.com/docs/manual/work-with-hybridclr)
- **[Polymorphic DLL Files](https://www.obfuz.com/docs/manual/hybridclr/polymorphic-dll)**

:::tip
**Polymorphic DLL files** can effectively protect against cracking and DLL tampering. We strongly recommend commercial projects use this feature.
:::
