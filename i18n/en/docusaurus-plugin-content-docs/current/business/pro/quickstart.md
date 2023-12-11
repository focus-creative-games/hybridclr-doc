# Getting Started 

Almost the same as the community version [Quickstart](../../beginner/quickstart.md), this document only introduces the differences.

## Install

- After decompressing hybridclr_unity, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Place the hybridclr directory after decompression of `hybridclr.zip` into the libil2cpp directory after decompression of `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, turn on the `Copy libil2cpp from Local` option, select the libil2cpp directory you just decompressed, and install it

![installer](/img/hybridclr/ultimate-installer.jpg)

## Enable full generic sharing

- The 2020 version does not support fully generic sharing
- The 2021 version needs to set the IL2CPP Code Generation option to `faster(smaller)`
- Full generic sharing is enabled by default in the 2022 version and cannot be turned off. If you set the IL2CPP Code Generation option to `faster(smaller)`, you can further reduce the package body.