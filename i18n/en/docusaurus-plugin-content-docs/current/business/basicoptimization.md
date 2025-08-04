# Standard Interpretation Optimization

:::tip

Standard interpretation optimization technology is only available in commercial versions.

:::

Standard interpretation optimization uses multiple techniques to significantly improve the performance of interpreted execution, with basic instructions (such as variable access and numerical calculations) benefiting greatly.

Taking numerical calculation instructions as an example, after using standard interpretation optimization technology, performance has made a qualitative leap, achieving **280%-735%** of the original performance! The performance of some special codes such as typeof instructions has improved by more than 1000%.


## Implementation

Standard interpretation optimization uses the following techniques to improve interpretation performance:

- Instruction dispatch optimization
- Instruction merging  
- Dead instruction elimination
- Special instinct instructions


## Performance Report

The following is a OnePlus 9R ArmV8 device test report, with test code attached at the end.

### AOT Time vs Commercial Version Time vs Community Version Time (smaller is better)

![data](/img/benchmark/numeric_datas.jpg)

### Commercial Version Time/AOT Time vs Community Version Time/AOT Time (smaller is better)

AOT version performance is `4.1 - 90` times that of the community version, and `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)


### Commercial Version Performance/Community Version Performance (larger is better)

Commercial version performance is `2.87-7.35` times that of the community version.

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### Commercial Version Time/AOT Version Time (smaller is better)

AOT version performance is `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_dialog_business_div_aot.jpg)

## Enabling and Disabling Standard Instruction Optimization

Standard optimization is **enabled** by default. This is a global setting that affects all assemblies including supplemental metadata assemblies.

You can actively enable or disable this feature through the `RuntimeApi.EnableTransformOptimization` function.

```csharp

    /// Disable standard instruction optimization
    void DisableCodeOptimization()
    {
        RuntimeApi.EnbleTransformOptimization(false);
    }
```