# Supported Unity versions and platforms

HybridCLR has stably supported the 2019.4.x, 2020.3.x, 2021.3.x, and 2022.3.x series LTS versions, and supports mainstream Win, MacOS, Android, iOS, and WebGL platforms.

## Compatible Unity versions

Due to maintenance cost considerations, HybridCLR only supports the LTS series version and some beta versions. And versions before 2019 are no longer supported.

- 2019.4.x
- 2020.3.x
- 2021.3.x
- 2022.3.x
- 2023.2.x
- 6000.x.y

:::tip

We will regularly merge the latest Unity version of il2cpp code into the il2cpp_plus repository. Although sometimes we have not merged the latest il2cpp code, in most cases it works normally. If you have any problems, you can give us feedback. we will
Complete the merge in advance and release it in the next version.
:::

Although we only support LTS versions, since there are not many changes between il2cpp minor versions, minor versions of non-LTS series may still work. You only need to switch to a recently supported minor version to complete the HybridCLR installation, and then switch back. The current version will do.
If a certain minor version is not our standard supported version, you can also contact us to provide [commercialization services] (../business/intro.md).


## Supported platforms

Since version v4.0.0, all known platform-incompatible codes have been eliminated, and all platforms that il2cpp can run on are fully supported. But for some uncommon platforms, there may be some small bugs in Editor or Runtime remaining.
If you encounter any problems, please contact us for business resolution.

The following platforms have been tested for a long time and are very stable and supported platforms:

- Windows x86, x64
- MacOS x86, x64
- MacOS arm64(silicon)
- Android armv7, armv8 (arm64)
- iOS arm64
- tvOS
- visionOS
- WebGL standard WebGL, MiniGame, WeChat mini games
- PS4, PS5
- UWP
- Linux x86、x86、armv7、armv8
- other platforms

## Special Instructions

### WeChat Mini Games

The WeChat mini game conversion tool sets IL2CPP Code Generation to Faster (Smaller) builds mode by default. If metadata is not supplemented, AOT generic functions will not be accessible. Since version 2021.3.x, all commercial versions
It supports full generic sharing, eliminating the need to supplement metadata, reducing the package body, significantly reducing memory usage, and greatly improving the execution performance of AOT generic functions that are not instantiated in the main project.

### MiniGame

Additional notes on version compatibility:

- The recommended versions of MiniGame 2019 and 2020 overlap with the compatible versions of HybridCLR. Try to directly choose those cross versions (such as 2019.4.35, 2020.3.33), because they have been verified by the project and basically will not encounter problems.
- The recommended versions of the MiniGame2021 series are 2021.2.5-2021.2.18, LTS versions that are not supported by HybridCLR, but these versions have been verified by other developers and can also use HybridCLR normally (a small amount of code adjustments may be required). If you encounter problems, you can contact us to provide commercial technical support.