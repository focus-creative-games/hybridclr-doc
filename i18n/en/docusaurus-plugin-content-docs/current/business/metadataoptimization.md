# Metadata Optimization

HybridCLR does not occupy additional memory when executing code, but loading assembly metadata occupies a large amount of memory. This may be a problem for some situations where there is a lot of memory pressure (such as WeChat mini-games).
For this situation, all commercial editions have significantly optimized metadata memory.

Optimize memory usage from several aspects:

- Use fully generic sharing technology
- Optimize loading of supplementary metadata assembly memory
- Optimize hot update assembly metadata memory

In addition, the time for Assembly.Load to load hot-updated assemblies has been significantly optimized. **The loading time of the commercial edition is 30% of that of the community edition**.


**According to the current test results, on the 64-bit platform, the commercial edition saves approximately `{Total size of supplementary metadata} * 4 + {Total size of hot update assembly} * 1.8` compared to the community edition. **

For the WebGL platform (including WeChat mini games), since the faster (smaller) build option can be turned on, the package body will be further reduced (about 1-2 times the size of all aot dlls), resulting in a significant reduction in memory usage.
For most projects, the commercial edition can ultimately reduce the memory of the WebGL platform by nearly 50-100M or more.

## Fully generic sharing

Completely omitting supplementary metadata memory, it is about 4 times the size of the dll. The disadvantage is that full generic sharing is only supported from 2021 onwards. After turning on full generic sharing, the package body can be significantly reduced (reducing the compiled size of managed code by about 30-40%).

## Optimize supplementary metadata memory

We tested the memory consumption after supplementing metadata for common aot assemblies. The memory consumed by the community edition is about 4 times the size of the dll; the commercial edition consumes about 1.3 times when full generic sharing is not enabled;
After the commercial edition turns on full generic sharing, this item does not need to be supplemented with metadata, so this item is 0. Compared with the community edition, the commercial edition reduces memory by **67%** (100% when full generic sharing is enabled).

**detailed data**:

![aot-metadata-data](/img/memory-optimization/aot-metadata-data.jpg)


**Memory consumption**:


![aot-metadata-memory](/img/memory-optimization/aot-metadata-memory.jpg)

**Memory consumption/dll size**:

![aot-metadata-dll-rate](/img/memory-optimization/aot-metadata-dll-rate.jpg)


## Optimize hot update assembly memory

We tested the memory consumed by common plugins after loading in interpreted mode. The memory consumed by the community edition is about 4.7 times the size of the dll, and the commercial edition is 2.9 times. The commercial edition uses **39%** less memory than the community edition.

:::tip

This data does not include runtime latency data
The memory occupied by Il2CppClass, MethodInfo and translated instructions, the delayed initialization memory of this part is about 2.9-3.5 times the size of the dll. The final metadata memory consumed is 7.6-8.2 times for the community edition and 5.8-6.4 times for the commercial edition.
The commercial edition reduces memory by approximately **25%** compared to the community edition.

:::

**detailed data**:

![aot-metadata-data](/img/memory-optimization/assembly-load-data.jpg)

**Memory consumption**:

![aot-metadata-memory](/img/memory-optimization/assembly-load-memory.jpg)

**Memory consumption/dll size**:

![aot-metadata-dll-rate](/img/memory-optimization/assembly-load-rate.jpg)