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
|Memory Optimization||✔|✔|✔|
|Basic instruction optimization||✔|✔|✔|
|Basic Code Encryption||✔|✔|✔|
|**Differential Hybrid Execution**|||✔||
|Advanced instruction optimization|||✔||
|Advanced Code Encryption|||✔||
|Hot Reload||||✔|
|Technical Support|||✔|✔|

- Professional Edition [detailed introduction](./pro/intro.md)
- Ultimate Edition [Details](./ultimate/intro.md)
- Hot reload version [Details](./reload/intro.md)

## Feature Introduction

### Full generic sharing

:::tip

il2cpp supports full generic sharing since Unity 2021+, so you can't use this feature if you are using Unity 2020 or older versions.

:::

Full generic sharing no longer needs to load supplementary metadata dll, which solves the defects of supplementary metadata technology. Compared with supplementary metadata technology, it has several advantages:

- reducing the package body and update time
- significantly saves memory (generally on the order of tens of M)
- improves the startup speed, and can even shorten a few seconds on the WebGL platform
- simplifies the hot update workflow

For detailed documentation, see [AOT Generic](../basic/aotgeneric.md)

### Memory optimization

Optimized metadata allocation and reduced memory usage to a certain extent.

### Basic instruction optimization

Careful and reliable optimization of common code paradigms has greatly improved the performance of common instructions such as variable access (50%-100%), numerical calculations (100-300%), object access (50-200%), etc., like some special The performance of codes such as typeof instructions has been improved by more than 1000%.

### Basic Code Encryption

Preprocess the IL instructions so that they cannot be directly cracked by decompilation tools such as ILSpy. For detailed documentation, see [Basic Code Encryption](./encryption).

### DHE Technology

Pioneering Differential Hybrid Execution technology. After the AOT assembly is marked as a DHE assembly, you can add, delete, or modify the assembly at will. After the hot update, it will intelligently make the changed or newly added classes and functions run in interpreter mode, but the unchanged classes and functions will run in AOT mode. Running, let the running performance of the game logic basically reach the level of native AOT. DHE technology greatly improves the performance of hot update projects.


### Advanced instruction optimization technology

Advanced instruction optimization technology greatly improves the performance of the interpreter module. Instructions are optimized offline and converted to register instructions in advance. The overall execution performance of optimized instructions is improved by 100%-1000% (you read that right, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%. The loading and instruction translation process is faster and less stuttering due to the pre-translation.

### Advanced Code Encryption

Advanced Code Encryption  technology converts IL instructions into register instructions in advance, which is naturally resistant to cracking and tracking by decompilation tools such as ILSpy, and is safer and more reliable.

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