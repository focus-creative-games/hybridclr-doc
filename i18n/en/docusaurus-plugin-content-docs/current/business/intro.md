# Introduction

We provide a variety of high-end commercial versions and flexible customized technical services to meet the needs of game projects in various application scenarios.

## Commercial version

There are currently three commercial versions: Professional Edition, Ultimate Edition, and Hot Reload Edition. The features are compared as follows.

|Features|Community Edition|Professional Edition|Ultimate Edition|Hot Reload Edition|
|-|-|-|-|-|
|Explain execution|✔|✔|✔|✔|
|MonoBehaviour|✔|✔|✔|✔|
|Supplementary metadata|✔|✔|✔|✔|
|Incremental GC|✔|✔|✔|✔|
|Full Generic Sharing||✔|✔|✔|
|**Differential Hybrid Execution**|||✔||
|Memory Optimization||✔|✔|✔|
|Basic instruction optimization||✔|✔|✔|
|Deep instruction optimization|||✔||
|Code Protection||✔|✔||
|Hot Reload||||✔|
|Security Sandbox||||✔|
|Technical Support|||✔|✔|

- Professional Edition [detailed introduction](./pro/intro.md)
- Ultimate Edition [Details](./ultimate/intro.md)
- Hot reload version [Details](./reload/intro.md)

## Feature Introduction

### Full generic sharing

Full generic sharing no longer needs to load supplementary metadata dll, which solves the defects of supplementary metadata technology. Compared with supplementary metadata technology, it has several advantages:

- It is no longer necessary to download supplementary metadata dll with the package or hot update, reducing the package body and update time
- It is no longer necessary to load the supplementary metadata dll at runtime, which significantly saves memory (generally on the order of tens of M)
- It is no longer necessary to load supplementary metadata dll at runtime, which improves the startup speed, and can even shorten a few seconds on the WebGL platform
- It is no longer necessary to carry with the package or download supplementary metadata dll for hot update, which simplifies the hot update workflow

For detailed documentation, see [AOT Generic](../basic/aotgeneric.md)

### DHE Technology

Pioneering Differential Hybrid Execution technology. After the AOT assembly is marked as a DHE assembly, you can add, delete, or modify the assembly at will. After the hot update, it will intelligently make the changed or newly added classes and functions run in interpreter mode, but the unchanged classes and functions will run in AOT mode. Running, let the running performance of the game logic basically reach the level of native AOT. DHE technology greatly improves the performance of hot update projects.

### Memory optimization

Optimized metadata allocation and reduced memory usage to a certain extent.

### Deep instruction optimization technology

Deep instruction optimization technology greatly improves the performance of the interpreter module. Instructions are optimized offline and converted to register instructions in advance. The overall execution performance of optimized instructions is improved by 100%-1000% (you read that right, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%. The loading and instruction translation process is faster and less stuttering due to the pre-translation.

### Code Protection

Deep instruction technology converts IL instructions into register instructions in advance, which is naturally resistant to cracking and tracking by decompilation tools such as ILSpy, and is safer and more reliable.

### Security Sandbox

It supports limiting the set of functions that can be called in the hot update part, which is very suitable for the case of UGC code, and prevents the malicious code submitted by the player from performing operations that endanger the security of the App.

### Technical Support

The Ultimate and Hot Reload editions each come with one year (or more) of technical support.


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

## contact us

Please use your company's **company email** to send inquiries to email business@code-philosophy.com. Emails initiated by individuals such as QQ or 126 emails will be ignored, please understand.