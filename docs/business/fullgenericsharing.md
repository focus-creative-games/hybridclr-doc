# 完全泛型共享

补充元数据虽然彻底解决了AOT泛型问题，但补充元数据会导致需要随包携带或者热更新下载补充元数据dll，导致包体增大或者增加了热更新时间。
加载补充元数据不仅导致内存占用明显增加，还增加了启动时间。对于微信小游戏这些对包体和内存要求严苛的场合，这是一个影响较大的问题。
另外，被补充的泛型函数以解释方式执行，还降低了运行性能。

HybridCLR支持`full genric sharing`后，不再需要补充元数据，简化了工作流，以原生方式运行AOT泛型，性能大幅提升，彻底解决了补充元数据的以上缺点。

## 支持的版本

支持 Unity 2021及更高的LTS版本。

## 原理

旧的泛型共享技术只能对class类型进行泛型共享。自2021.3.x LTS版本起，il2cpp已经支持`完全泛型共享（full generic sharing）`技术，
即泛型参数无论是任何类型（包含值类型）都可以共享。HybridCLR利用这个机制实现了不需要补充元数据，也可以完美支持AOT泛型。


## 设置

- 2021.3.x LTS版本。当Build Settings中`Il2Cpp Code Generation`选项为为 `faster(smaller) build` 时开启
`full generic sharing` 机制。启用此选项后，泛型函数的所有泛型实例（无论泛型参数是值类型还是class类型）完全共享一份代码。
- 2022.3.x LTS版本。强制支持`full generic sharing`，即使Build Settings中使用`faster runtime`选项也会开启此机制。与`faster(smaller) build`区别
在于：`faster runtime`对于AOT中已经实例化的泛型函数，会使用单独的泛型函数实现，不走完全泛型共享的版本，提升了泛型函数的执行性能；
`faster(smaller) build`选项则迫使同个函数的所有泛型函数都使用一份代码，此时与2021版本的含义相同。
