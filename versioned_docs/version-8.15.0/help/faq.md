# FAQ

## HybridCLR支持哪些平台?

il2cpp支持的平台都支持

## HybridCLR会增加多大的包体

以 2019版本为例，release模式下导出Android工程的libil2cpp.a文件， 原始版本12.69M，HybridCLR版本13.97M，也就是增加了大约1.3M。

## 为什么使用HybridCLR打出的包体增大很多

HybridCLR本身只会增加很少包体(1-2M)。包体增大很多是因为你错误地在link.xml保留了太多类，导致包体急剧增大。请自行参照Unity的裁剪规则优化。

## HybridCLR是嵌了mono吗？

不是。HybridCLR给il2cpp补充了完全独立自主实现的完整的寄存器解释器。

## HybridCLR写代码有什么限制吗？

几乎没有限制，参见[未支持的特性](/basic/notsupportedfeatures.md)


## 支持泛型类和泛型函数吗？

彻底完整的支持，无任何限制。

## 支持热更新MonoBehaviour吗？

完全支持。不仅能在代码中添加，也可以直接挂在热更新资源上。具体参见[使用热更新MonoBehaviour](/basic/monobehaviour.md)

## 支持反射吗？

支持， 无任何限制。

## 对多线程支持如何？

完整支持。 支持Thread, Task, volatile, ThreadStatic, async。

## 支持多个Assembly吗？

支持。但是不会自动加载依赖dll。需要你手动按依赖顺序加载热更dll。

## 支持最多同时加载多少个dll?

最多可以同时加载3个最大64M的dll、16个最大16M的dll、64个最大4M的dll、255个最大1M的dll。也就是最多可以同时加载338个dll。

## 支持 .net standard 2.0 吗？

支持。但请注意，主工程打包用.net standard，而热更新dll打包**必须用.net 4.x**。详细解释请参照[常见错误文档](/help/commonerrors.md)

## 支持Unity的DOTS框架吗？

支持。AOT部分的burst代码工作正常，但热更新部分的burst代码以解释方式执行。这个是显然的。

## [CVE-2025-59489漏洞](https://unity.cn/security/sept-2025-01) 需要升级到哪个hybridclr版本？

此漏洞跟il2cpp没有关联，因此不需要升级hybridclr版本，只需要升级当前Unity版本到对应的patch版本或者其他已经修复此漏洞的Unity版本。
