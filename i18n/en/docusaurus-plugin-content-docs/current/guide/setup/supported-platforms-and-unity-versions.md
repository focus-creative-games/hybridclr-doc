---
title: 'Supported Unity Versions and Platforms'
description: 'HybridCLR stably supports the 2022.3.x LTS series as well as 2023.2.x and 6000.x.y, and supports every platform il2cpp supports.'
slug: /basic/supportedplatformanduniyversion
---

# Supported Unity Versions and Platforms

HybridCLR stably supports the 2022.3.x LTS series as well as 2023.2.x and 6000.x.y, and supports every platform il2cpp supports.

## Compatible Unity Versions

For maintenance cost considerations, HybridCLR only supports LTS series versions.

- 2022.3.x
- 2023.2.x
- 6000.x.y (excluding 6000.5.x)

:::warning

Starting from v9.0.0, support for Unity 2019, 2020 and 2021 has been removed, along with support for 6000.5.x (6000.5.x is not an LTS version).

If your project still uses one of those versions, use **8.15.0** -- the last version supporting Unity 2019/2020/2021. For the matching documentation, switch to the 8.15.0 version using the selector in the top right of this site.

:::

:::tip

We regularly merge the latest Unity version's il2cpp code into the il2cpp_plus repository. Although sometimes we haven't merged the latest il2cpp code yet, it works normally in most cases. If there are issues, you can report them to us. We will
complete the merge ahead of time and release it in the next version.
:::

Although we only support LTS versions, since there are minimal changes between il2cpp minor versions, non-LTS series minor versions may still work. You just need to first switch to a recent supported minor version to complete HybridCLR installation, then switch back to your current version.
If a certain minor version is not our standard supported version, you can also contact us for [commercial services](../../business/intro.md).

## Supported Platforms

Starting from v4.0.0, all known platform-incompatible code has been eliminated, thoroughly supporting all platforms where il2cpp can run. However, for some uncommon platforms, there may be residual small Editor or Runtime bugs.
If you encounter issues, please contact us for business solutions.

The following platforms have been extensively tested and are very stably supported:

- Windows x86, x64
- MacOS x86, x64
- MacOS arm64(silicon)
- Android armv7, armv8(arm64)
- iOS arm64
- tvOS
- visionOS
- WebGL including WebGL, MiniGame, WeChat Mini Games, TikTok Mini Games (only supports WebGL, not Android Native builds)
- PS4, PS5
- UWP
- Huawei Harmony platform (currently only Unity China supports Harmony)
- Linux x86, x86, armv7, armv8
- Other platforms

## Unity China

Starting from v5.2.0, the community version officially supports Unity China, with usage identical to the official Unity version.

Unity China 1.1.x's new metadata index slim optimization for WeChat Mini Games platform will cause HybridCLR to fail to run normally on the WeChat Mini Games platform.
Starting from Unity China 1.2.0, a `Use Slim Format For global-metadata.dat` option has been added to the WeixinMiniGame platform's Publishing Settings. Disabling this optimization allows normal use of HybridCLR.

## Special Notes

### WeChat Mini Games

The WeChat Mini Games conversion tool defaults to setting IL2CPP Code Generation to Faster(Smaller) builds mode. Without supplemental metadata, this will cause inability to access AOT generic functions. All commercial versions
support full generic sharing, eliminating the need for supplemental metadata, reducing package size, significantly lowering memory usage, and dramatically improving execution performance of AOT generic functions not instantiated in the main project.
