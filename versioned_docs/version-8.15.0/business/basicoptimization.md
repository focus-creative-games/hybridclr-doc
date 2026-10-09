# 标准解释优化

:::tip

标准解释优化技术仅在商业化版本上可用。

:::

标准解释优化使用多种技术大幅提升了解释执行的性能，基础指令（如变量访问、数值计算）受益极大。

以数值计算指令为例，使用标准解释优化技术后性能有了质的飞跃，是原来的**280%-735%**！像一些特殊代码如typeof指令的性能，提升了1000%以上。


## 实现

标准解释优化使用了以下技术提升了解释性能。

- 指令分发优化
- 指令合并
- 无用指令消除
- 特殊instinct指令


## 性能报告


以下是OnePlus 9R ArmV8 实机测试报告，测试代码附录最后。

### AOT耗时 vs 商业化版本耗时 vs 社区版本耗时 （越小越好）

![data](/img/benchmark/numeric_datas.jpg)

### 商业化版本耗时/AOT耗时 vs 社区版本耗时/AOT耗时  （越小越好）

AOT版本性能是社区版本的`4.1 - 90`倍，是商业化版本的`1.30 - 12.9`倍。

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)


### 商业化版本性能/社区版本性能 （越大越好）

商业化版本性能是社区版本的`2.87-7.35`倍。

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### 商业化版本耗时/AOT版本耗时 （越小越好）

AOT版本性能是是商业化版本的`1.30 - 12.9`倍。

![data](/img/benchmark/numeric_dialog_business_div_aot.jpg)


## 开启和关闭标准指令优化

默认已经**开启**标准优化，此设置为全局设置，对所有程序集包括补充元数据程序集都生效。

可以通过 `RuntimeApi.EnableTransformOptimization`函数主动开启或者关闭这个特性。

```csharp

    /// 禁用标准指令优化
    void DisableCodeOptimization()
    {
        RuntimeApi.EnbleTransformOptimization(false);
    }
```