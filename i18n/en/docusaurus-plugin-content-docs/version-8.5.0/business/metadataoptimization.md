# Metadata Optimization

HybridCLR doesn't consume additional memory during code execution, but loading assembly metadata occupies a large amount of memory. For scenarios with significant memory pressure (such as WeChat mini-games), this could be a problem.
For this situation, all commercial versions significantly optimize metadata memory.

Memory usage is optimized from several aspects:

- Using full generic sharing technology
- Optimizing supplemental metadata assembly loading memory
- Optimizing hot update assembly metadata memory

Additionally, the Assembly.Load time for loading hot update assemblies has been significantly optimized, **with commercial version loading time being 30% of the community version**.

**According to current test results, on 64-bit platforms, commercial versions save approximately `{total supplemental metadata size} * 4 + {total hot update assembly size} * 1.8` memory compared to community versions.**

For WebGL platforms (including WeChat mini-games), enabling the faster(smaller) build option will further reduce package size (approximately 1-2 times the size of all aot dlls), leading to significantly reduced memory usage.
For most projects, commercial versions can ultimately reduce WebGL platform memory by nearly 50-100M or even more.

## Full Generic Sharing

Completely eliminates supplemental metadata memory, approximately 4 times the dll size. The drawback is that full generic sharing is only supported from 2021 onwards. Enabling full generic sharing can significantly reduce package size (reducing approximately 30-40% of managed code compiled size).

## Optimizing Supplemental Metadata Memory

We tested the memory consumed after supplementing metadata for common aot assemblies. Community versions consume approximately 4 times the dll size; commercial versions consume about 1.3 times when full generic sharing is not enabled;
commercial versions consume 0 when full generic sharing is enabled since supplemental metadata is not needed. Commercial versions reduce memory by **67%** (100% when full generic sharing is enabled) compared to community versions.

**Detailed Data**:

![aot-metadata-data](/img/memory-optimization/aot-metadata-data.jpg)

**Memory Consumption**:

![aot-metadata-memory](/img/memory-optimization/aot-metadata-memory.jpg)

**Memory Consumption/DLL Size**:

![aot-metadata-dll-rate](/img/memory-optimization/aot-metadata-dll-rate.jpg)


## Optimizing Hot Update Assembly Memory

We tested the memory consumed by common plugins when loaded in interpretation mode. Community versions consume approximately 4.7 times the dll size, while commercial versions consume 2.9 times. Commercial versions reduce memory by **39%** compared to community versions.

:::tip

This data does not include memory occupied by runtime lazy-initialized Il2CppClass, MethodInfo, and translated instructions, which accounts for approximately 2.9-3.5 times the dll size. The final metadata memory consumption is 7.6-8.2 times for community versions and 5.8-6.4 times for commercial versions.
Commercial versions reduce memory by approximately **25%** compared to community versions.

:::

**Detailed Data**:

![aot-metadata-data](/img/memory-optimization/assembly-load-data.jpg)

**Memory Consumption**:

![aot-metadata-memory](/img/memory-optimization/assembly-load-memory.jpg)

**Memory Consumption/DLL Size**:

![aot-metadata-dll-rate](/img/memory-optimization/assembly-load-rate.jpg)


