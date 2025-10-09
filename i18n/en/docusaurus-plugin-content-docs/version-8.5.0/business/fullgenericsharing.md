# Full Generic Sharing

Although supplemental metadata completely solves the AOT generic problem, supplemental metadata leads to the need to carry supplemental metadata dlls with the package or download them during hot updates, causing increased package size or increased hot update time.
Loading supplemental metadata not only significantly increases memory usage but also increases startup time. For scenarios like WeChat mini-games that have strict requirements for package size and memory, this is a significant issue.
Additionally, supplemented generic functions execute in interpretation mode, which also reduces runtime performance.

After HybridCLR supports `full generic sharing`, supplemental metadata is no longer needed, simplifying the workflow and better addressing the above shortcomings of supplemental metadata.

## Supported Versions

Supports Unity 2021 and higher LTS versions.

## Principle

The old generic sharing technology could only perform generic sharing for class types. Starting from 2021.3.x LTS versions, il2cpp already supports `full generic sharing` technology,
meaning generic parameters can be shared regardless of type (including value types). HybridCLR utilizes this mechanism to achieve perfect support for AOT generics without needing supplemental metadata.

## Configuration

:::warning

`faster (smaller build)` will have a significant impact on generic function performance (15% or even higher), so it's recommended not to enable this option.

If using 2021 version and there's no memory pressure, it's still recommended to use supplemental metadata technology to solve generic problems.

:::

- 2020 version does not support full generic sharing
- 2021 version needs to set IL2CPP Code Generation option to `faster(smaller build)`
- 2022 version enables full generic sharing by default and cannot be disabled. If setting IL2CPP Code Generation option to `faster(smaller build)`, it can further reduce package size.
