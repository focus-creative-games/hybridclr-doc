
# 内存与GC

HybridCLR运行时消耗内存主要分为几部分：

- HybridCLR模块初始化消耗的内存
- 加载补充元数据、热更新程序集消耗的元数据内存
- 解释执行过程中产生的内存

## 初始化消耗内存

元数据模块、解释器模块、指令翻译模块均消耗了一些内存，其中解释器模块的桥接函数注册占了绝大多数。视项目大小，初始化过程会消耗1M或更多内存。

## 元数据内存

### 补充元数据内存

我们测试了对常见的aot程序集补充元数据后消耗的内存。社区版本消耗的内存大约为dll大小的4倍；商业化版本未开启完全泛型共享时约为1.3倍；
商业化版本开启完全泛型共享后由于不需要补充元数据，此项为0。商业化版本相比社区降低了**67%**（开启完全泛型共享时为100%）的内存。

**详细数据**：

![aot-metadata-data](/img/memory-optimization/aot-metadata-data.jpg)


**消耗内存**:


![aot-metadata-memory](/img/memory-optimization/aot-metadata-memory.jpg)

**消耗内存/dll大小**：

![aot-metadata-dll-rate](/img/memory-optimization/aot-metadata-dll-rate.jpg)


### 加载热更新程序集内存

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

## 解释执行过程中产生的内存

HybridCLR是CLR级别的实现，除了执行方式是以解释模式执行，其他方式跟AOT部分完全相同的。因此运行过程中创建的对象，无论在AOT还是热更新中，大小是完全相同的。

:::tip

同等对象在ILRuntime或者lua方案下消耗的内存是HybridCLR的4-88甚至更多，这个差距是惊人的！

:::

另外经过精心优化，HybridCLR执行代码过程中消耗的内存跟il2cpp AOT部分完全相同。例如`foreach 循环`在il2cpp或mono下产生多少GC，在HybridCLR中解释执行时也产生完全相同的GC。

### 与lua、ILRuntime的对象内存大小对比

lua的计算规则略复杂，参见[第三方文章](https://www.linuxidc.com/Linux/2018-10/154971.htm)。空table占56字节，每多一个字段至少多占32字节。

ILRuntime的类型除了enum外统一以IlTypeInstance表达，空类型占72字节，每多一个字段至少多用16字节。如果对象中包含引用类型数据，则整体又至少多24字节，并且每多一个object字段多8字节。

|类型 | Xlua | ILRuntime | HybridCLR/原生il2cpp|
|:---:|:---:|:---:|:---:|
|V1|88+| 88 | 1|
|V2|120+|104|8|
|V3|184+|168|24|
|C1|88+| 88 | 24|
|C2|120+|104|24|
|C3|184+|168|40|

以下是测试类型：

```csharp

// V1 对象大小 1
struct V1
{
    public byte a1;
}

// V2 对象大小 8
struct V2
{
    public byte a1;
    public int a2;
}

// V3 对象大小 24
struct V3
{
    public int a1;
    public int a2;
    public object a3;
    public byte a4;
}

// C1 对象大小 24
class C1
{
    public byte a1;
}
// C2 对象大小 24
class C2
{
    public byte a1;
    public int a2;
}
// C3 对象大小 40
class C3
{
    public int a1;
    public int a2;
    public object a3;
    public byte a4;
}
```