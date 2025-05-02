# Full Generic Sharing

Although supplementary metadata has completely solved the AOT generic problem, it leads to the need to carry supplementary metadata DLLs with the package or download them during hot updates, thus increasing the size of the package or the time required for hot updates.
Loading supplementary metadata not only significantly increases memory usage but also increases startup time. This is a major issue for scenarios with strict requirements on package size and memory, such as WeChat mini-games.
Furthermore, generic functions that have been supplemented are executed in interpreted mode, which also reduces runtime performance.

With the introduction of Full Generic Sharing in HybridCLR, there is no longer a need for supplementary metadata, simplifying the workflow and effectively addressing the aforementioned shortcomings of supplementary metadata.

## Supported Versions

Supported Unity LTS versions include Unity 2021 and higher.

## Principle

The old generic sharing technology could only share generics for class types. Starting from Unity 2021.3.x LTS versions, il2cpp has supported the `Full Generic Sharing` technology, which means that generic parameters of any type (including value types) can be shared. HybridCLR leverages this mechanism to achieve perfect support for AOT generics without the need for supplementary metadata.

## Configuration

:::warning

Enabling `faster (smaller build)` will significantly affect the performance of generic functions (15% or even higher), so it is recommended not to enable this option.

If you are using Unity 2021 and there is no memory pressure, it is still recommended to use the supplementary metadata technology to solve the generic problem.

:::

- The 2020 version does not support Full Generic Sharing.
- For the 2021 version, the IL2CPP Code Generation option should be set to `faster (smaller build)`.
- The 2022 version has Full Generic Sharing enabled by default and cannot be disabled. If the IL2CPP Code Generation option is set to `faster (smaller build)`, it can further reduce the package size.
