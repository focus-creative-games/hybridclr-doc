# 元数据内存优化

HybridCLR执行代码过程中并不会额外多占用内存，但加载assembly的元数据占据了大量内存。对于一些内存有较大压力的场合（如微信小游戏），这可能是个问题。
针对此情况，所有商业化版本显著优化了元数据内存。

从几个方面优化内存占用：

- 使用完全泛型共享技术
- 优化加载补充元数据程序集内存
- 优化热更新程序集元数据内存
- **TODO** 提供基于原始IL指令的解释器


**根据目前的测试结果，在64位平台，商业化版本相比社区版本大约节省了 `{补充元数据总大小} * 4 + {热更新程序集总大小} * 1.8` 内存。**

对于WebGL平台（包括微信小游戏之类），由于可以开启faster(smaller) build选项，将进一步减少包体（约为所有aot dll大小的1-2倍），导致内存占用显著减少。
对于大多数项目来说，商业化版本最终可以减少WebGL平台近50-100M甚至更多多内存。

## 完全泛型共享

完全省去补充元数据内存，大约为dll大小的4倍。缺点是只有2021起才支持完全泛型共享。开启完全泛型共享后，能显著减少包体（减少约30-40%托管代码编译后大小）。

## 优化补充元数据内存

我们测试了对常见的aot程序集补充元数据后消耗的内存。社区版本消耗的内存大约为dll大小的4倍；商业化版本未开启完全泛型共享时约为1.3倍；
商业化版本开启完全泛型共享后由于不需要补充元数据，此项为0。商业化版本相比社区降低了**67%**（开启完全泛型共享时为100%）的内存。

**详细数据**：

![aot-metadata-data](/img/memory-optimization/aot-metadata-data.jpg)


**消耗内存**:


![aot-metadata-memory](/img/memory-optimization/aot-metadata-memory.jpg)

**消耗内存/dll大小**：

![aot-metadata-dll-rate](/img/memory-optimization/aot-metadata-dll-rate.jpg)


## 优化热更新程序集内存

我们测试了常见的插件以解释模式加载后消耗的内存。社区版本消耗的内存大约dll大小的4.7倍，商业化版本为2.9倍。商业化版本相比社区降低了**39%**的内存。

:::tip

此数据未包含运行时延迟数据化的
Il2CppClass、MethodInfo及翻译后指令占据的内存，此部分延迟初始化的内存大约为2.9-3.5倍dll大小。最终消耗的元数据内存，社区版本为7.6-8.2倍，商业化版本为5.8-6.4倍。
商业化版本相比社区版本降低了大约**25%**内存。

:::

**详细数据**：

![aot-metadata-data](/img/memory-optimization/assembly-load-data.jpg)

**消耗内存**:

![aot-metadata-memory](/img/memory-optimization/assembly-load-memory.jpg)

**消耗内存/dll大小**：

![aot-metadata-dll-rate](/img/memory-optimization/assembly-load-rate.jpg)


## 基于原始IL指令的解释器

不再需要运行时转换为寄存器指令集，节省了大量指令内存。缺点是明显降低了解释性能。
