# Publish WebGL Platform

Due to the particularity of the WebGL platform, a separate document introduces how to release the WebGL platform. This document is published on the hybridclr_trial project ([github](https://focus-creative-games/hybridclr_trial) [gitee](https://gitee.com/focus-creative-games/hybridclr_trial) ) process.

:::tip
Starting from Unity 2021.3.4+ and 2022.3.0+ versions, global installation is no longer required, that is, the construction process of the webgl platform is exactly the same as other platforms.
:::

## version used

The release process of different Unity versions and hybridclr package is similar and will not be repeated here.

- Unity 2021.3.1f1
- com.code-philosophy.hybridclr v3.4.0

## Preparation

:::tip
Beginners, please at least read the [Quick Start](../beginner/quickstart.md) document, and have mastered the release process of platforms such as Win or Android.
:::


- Make sure that the WebGL module is installed in Unity Editor, as shown below
- Complete HybridCLR installation and configuration according to [install](install.md) document
- In HybridCLRSettings, enable the `Use Global Il2cpp` option because the webgl platform only supports global installation. From 2021.3.4+, 2022.3.0+, it is no longer necessary to turn this option on


![select_il2cpp_module_webgl](/img/hybridclr/select_il2cpp_modules_webgl.jpg)

## Create a soft (hard) reference from libil2cpp in the Editor directory to the local libil2cpp directory

:::warning
Note: Starting from Unity 2021.3.4+ and 2022.3.0+ versions, since local installation is supported, it is no longer necessary to establish this reference.
:::

### Win platform

Developers who are not familiar with the command line should first master the basic usage of the command line.

- Open the command line window with administrator privileges. This operation is different for different operating system versions, please handle it as appropriate. Under Win11, it is `right click on the start menu and select the terminal administrator menu item`.
- Run `cd /d {editor_install_dir}/Editor/Data/il2cpp`, switch directory to the il2cpp directory of the installation directory
- Run `ren libil2cpp libil2cpp-origin` to rename the original libil2cpp to libil2cpp-origin
- Run `mklink /D libil2cpp "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp"` to create a symbolic reference from libil2cpp in the Editor directory to the local libil2cpp directory

### MacOS or Linux platform

- Open command line window
- Run `cd /d {editor_install_dir}/Editor/Data/il2cpp` to switch directories to the il2cpp directory of the installation directory. The specific directory may vary depending on the operating system, please handle accordingly
- Run `mv libil2cpp libil2cpp-origin` to rename the original libil2cpp to libil2cpp-origin
- Run `ln -s "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" libil2cpp` to create a symbolic reference from libil2cpp in the Editor directory to the local libil2cpp directory


## Pack

- Run `HybridCLR/Generate/All`
- Run `HybridCLR/Build/BuildAssetsAndCopyToStreamingAssets`. Notice! This menu is added by the `hybridclr_trial` project, not a command that comes with the hybridclr package.
- Just run `Build And Run` in `Build Player`