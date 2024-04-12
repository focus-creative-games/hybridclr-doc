# Metadata Optimization

While executing code, HybridCLR does not significantly increase memory usage, but loading the metadata of assemblies consumes a considerable amount of memory. This may be a problem in scenarios with high memory pressure, such as WeChat Mini Games. To address this, all commercial versions have significantly optimized metadata memory.

Several aspects have been optimized to reduce memory usage:

- Using full generic sharing technology
- Optimizing memory usage of loading supplementary metadata assemblies
- Optimizing memory usage of loading hot update assembly metadata

Additionally, the time taken to load hot update assemblies has been significantly optimized, with **commercial versions taking only 30% of the time compared to the community version**.

**Based on current test results, on a 64-bit platform, commercial versions save approximately `{total size of supplementary metadata} * 4 + {total size of hot update assemblies} * 1.8` memory compared to the community version.**

For WebGL platforms (including WeChat Mini Games), enabling the faster (smaller) build option will further reduce package size (approximately 1-2 times the size of all AOT DLLs), leading to a significant reduction in memory usage. For most projects, commercial versions can ultimately reduce memory usage by nearly 50-100MB or even more on the WebGL platform.

## Full Generic Sharing

Completely eliminates supplementary metadata memory, approximately 4 times the size of the DLL. The downside is that full generic sharing is only supported from 2021 onwards. Enabling full generic sharing can significantly reduce package size (by approximately 30-40% after compilation of managed code).

## Optimizing Memory Usage of Supplementary Metadata

We tested the memory consumption of common AOT assemblies after adding supplementary metadata. The memory consumption of the community version is approximately 4 times the size of the DLL; for the commercial version without full generic sharing, it is approximately 1.3 times; with full generic sharing enabled, this becomes 0. The commercial version reduces memory consumption by **67%** compared to the community version (100% when full generic sharing is enabled).

**Detailed Data**:

![aot-metadata-data](/img/memory-optimization/aot-metadata-data.jpg)

**Memory Consumption**:

![aot-metadata-memory](/img/memory-optimization/aot-metadata-memory.jpg)

**Memory Consumption per DLL Size**:

![aot-metadata-dll-rate](/img/memory-optimization/aot-metadata-dll-rate.jpg)

## Optimizing Memory Usage of Hot Update Assemblies

We tested the memory consumption of common plugins after loading them in interpreted mode. The memory consumption of the community version is approximately 4.7 times the size of the DLL, while for the commercial version it is 2.9 times. The commercial version reduces memory consumption by **39%** compared to the community version.

:::tip

This data does not include memory consumed by Il2CppClass, MethodInfo, and translated instructions that are lazily initialized at runtime. This part of the memory consumes approximately 2.9-3.5 times the size of the DLL. The final memory consumption of metadata, for the community version, is 7.6-8.2 times, while for the commercial version it is 5.8-6.4 times the size of the DLL. The commercial version reduces memory consumption by approximately **25%** compared to the community version.

:::

**Detailed Data**:

![aot-metadata-data](/img/memory-optimization/assembly-load-data.jpg)

**Memory Consumption**:

![aot-metadata-memory](/img/memory-optimization/assembly-load-memory.jpg)

**Memory Consumption per DLL Size**:

![aot-metadata-dll-rate](/img/memory-optimization/assembly-load-rate.jpg)
