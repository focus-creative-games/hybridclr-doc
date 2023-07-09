# Getting Started 

Almost the same as the community version [Quickstart](../../beginner/quickstart.md), this document only introduces the differences.

## Install

- After decompressing hyridclr_unity, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr
- Decompress the corresponding `libil2cpp-{version}.7z` according to your unity version,
- Open `HybridCLR/Installer`, turn on the `Copy libil2cpp from Local` option, select the libil2cpp directory you just decompressed, and install it

![installer](/img/hybridclr/ultimate-installer.jpg)

## Enable incremental GC


Just enable the `use incremental GC` option in `Player Settings`, no need to make any settings for HybridCLR.

:::caution

At present, the incremental GC process is in the alpha stage. It is recommended not to enable this option for projects that have already been launched or are about to be launched.
:::

## Enable full generic sharing

- The 2020 version does not support fully generic sharing
- The 2021 version needs to set the IL2CPP Code Generation option to `faster(smaller)`
- Full generic sharing is enabled by default in the 2022 version and cannot be turned off. If you set the IL2CPP Code Generation option to `faster(smaller)`, you can further reduce the package body.