# Standard Interpretation Optimization

:::tip

Standard interpretation optimization technology is only available in the commercial version.

:::

The standard interpretation optimization greatly improves the performance of interpreted execution using a variety of techniques, benefiting basic instructions (such as variable access and numerical calculations) immensely.

For example, in numerical calculation instructions, the performance has seen a qualitative leap after using standard interpretation optimization technology, with an increase of **280%-735%**! Special codes like typeof instructions have seen an increase of over 1000%.

## Implementation

The standard interpretation optimization uses the following techniques to enhance interpretation performance.

- Instruction dispatch optimization
- Instruction merging
- Useless instruction elimination
- Special instinct instructions

## Performance Report

The following is the performance report of OnePlus 9R ArmV8 real machine testing, with the test code attached at the end.

### AOT Time vs. Commercial Version Time vs. Community Version Time (Lower is better)

![data](/img/benchmark/numeric_datas.jpg)

### Commercial Version Time/AOT Time vs. Community Version Time/AOT Time (Lower is better)

The performance of the AOT version is `4.1 - 90` times that of the community version, and `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)

### Commercial Version Performance/Community Version Performance (Higher is better)

The performance of the commercial version is `2.87-7.35` times that of the community version.

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### Commercial Version Time/AOT Time (Lower is better)

The performance of the AOT version is `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_dialog_business_div_aot.jpg)

## Enabling and Disabling Standard Instruction Optimization

Standard optimization is **enabled** by default. This setting is global and applies to all assemblies, including supplementary metadata assemblies.

You can manually enable or disable this feature using the `RuntimeApi.EnableTransformOptimization` function.

```csharp

    /// Disable standard instruction optimization
    void DisableCodeOptimization()
    {
        RuntimeApi.EnableTransformOptimization(false);
    }
```
