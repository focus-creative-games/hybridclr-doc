# Supported Unity versions and platforms

HybridCLR has stably supported the 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x series of LTS versions, and supports mainstream Win, MacOS, Android, iOS, and WebGL platforms.

## Compatible Unity versions

For maintenance cost considerations, HybridCLR only supports LTS series versions. And versions before 2019 are no longer supported.

- 2019.4.x
- 2020.3.x
- 2021.3.x
- 2022.3.x
- 2023.2.0ax (already supported, **not yet released**)


Although we only support the LTS version, since the il2cpp minor version does not change much, the minor version of the non-LTS series may still work, you just need to switch to a minor version that can be supported recently to complete the HybridCLR installation, and then switch back The current version will do.

If a minor version is not our standard support version, you can also contact us to provide [commercialization service](../business/intro.md).


## Supported platforms

- Windows x86, x64
- MacOS x86, x64, arm64 (silicon)
- Android armv7, armv8(arm64)
- iOS arm64
- WebGL Standard WebGL, MiniGame, WeChat Mini Games

## Special Instructions

### WeChat Mini Game

The WeChat mini game conversion tool will set IL2CPP Code Generation to Faster(Smaller) builds mode by default. If the metadata is not supplemented, the AOT generic functions will not be accessible.

###MiniGame

Additional notes on version compatibility:

- The recommended versions of MiniGame2019 and 2020 overlap with the compatible version of HybridCLR. Try to choose those cross-versions directly (such as 2019.4.35, 2020.3.33), because they have been verified by the project, and basically you will not encounter problems.
- The recommended version of the MiniGame2021 series is 2021.2.5-2021.2.18, which is not an LTS version supported by HybridCLR, but these versions have been verified by other developers and can also use HybridCLR normally (a small amount of code adjustment may be required). If you encounter any problems, you can contact us to provide [business technical support](../business/intro.md).