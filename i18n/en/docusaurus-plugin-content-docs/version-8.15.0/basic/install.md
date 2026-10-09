
# Installation

## Install Compatible Unity Version

Supports any version from 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x, 6000.x.y. We recommend installing versions 2019.4.40, 2020.3.26+, 2021.3.x, 2022.3.x, 6000.x.y.

:::tip
If your version is 2019.4.0-2019.4.39, **you need to first switch to version 2019.4.40 to complete the HybridCLR installation, then switch back to your current version**.

If your version is 2020.3.0-2020.3.25, after completing the installation in the Installer, copy `2020.3.x/Editor/Data/il2cpp/external` from any 2020.3.26+ version installation directory to replace `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external`.
:::

Based on your target build platform, select the necessary modules during installation. For Android or iOS builds, simply select the corresponding modules. For Standalone builds, you must additionally select `Windows Build Support(IL2CPP)` or `Mac Build Support(IL2CPP)`.

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

## Install IDE and Related Tools

- Windows
  - On Windows, you need to install `Visual Studio 2019` or higher. The installation must include at least `Game development with Unity` and `Game development with C++` components.
  - Install git
- Mac
  - Requires macOS version >= 12, Xcode version >= 13, for example `Xcode 13.4.1, macOS 12.4`.
  - Install git
  - Install cmake

### Select `com.code-philosophy.hybridclr` Version

:::tip
Versions prior to v3.0.0 were named `com.focus-creative-games.hybridclr_unity`.
:::

The `v3.x.y` and `v4.x.y` series removed support for Unity 2019, but starting from `v5.0.0`, **support for Unity 2019 has been restored**, and it supports iOS builds in source code form.
Developers using Unity 2019 are strongly recommended to choose `v8.x.y` and newer versions.

These versions have all been validated by numerous online projects and are very stable. You don't need to worry about which one is better - generally speaking, newer versions fix more bugs and optimize more, providing a better user experience.

## Install `com.code-philosophy.hybridclr` package

The repository address is [github](https://github.com/focus-creative-games/hybridclr_unity), and the domestic fast mirror repository is [gitee](https://gitee.com/focus-creative-games/hybridclr_unity).

There are several installation methods:

- Install from git URL using Package Manager
- Local installation

### Install from git URL

Click `Windows/Package Manager` in the main menu to open the package manager. As shown in the image below, click `Add package from git URL...` and enter `https://gitee.com/focus-creative-games/hybridclr_unity.git` or `https://github.com/focus-creative-games/hybridclr_unity.git`.

- The main branch address is `https://gitee.com/focus-creative-games/hybridclr_unity.git`
- Other tag version addresses are `https://gitee.com/focus-creative-games/hybridclr_unity.git#{tag}`

To install a specific branch or tag version, add `#{tag}` after the address, such as `https://gitee.com/focus-creative-games/hybridclr_unity.git#v3.0.1`.

![add package](/img/hybridclr/install_hybridclrunity_package.jpg)

If you're unfamiliar with installing packages from URLs, please refer to [install from giturl](https://docs.unity3d.com/Manual/upm-ui-giturl.html).

### Install from local files

After cloning the repository locally, rename the directory to `com.code-philosophy.hybridclr` (for versions prior to v3.0.0, use `com.focus-creative-games.hybridclr_unity`), then move it directly to the project's Packages directory.

## Update com.code-philosophy.hybridclr

After updating com.code-philosophy.hybridclr, you need to re-run `HybridCLR/Installer`.

## Initialize HybridCLR

To reduce the size of the package itself, some files need to be copied from Unity Editor's installation directory. Therefore, after installing the plugin, an additional initialization process is required.

Click the menu `HybridCLR/Installer...` to open the installation interface.

The `Data~/hybridclr_version.json` file in com.code-philosophy.hybridclr has already configured the compatible hybridclr and il2cpp_plus branches or tags corresponding to the current package version.
The Installer will install the versions specified in the configuration and no longer supports custom version selection for installation.

The configuration looks like this:

```json
{
    "versions": [
    {
        "unity_version":"2019",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2019-2.0.1"}
    },
    {
        "unity_version":"2020",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2020-2.0.1"}
    },
    {
        "unity_version":"2021",
        "hybridclr" : { "branch":"v2.0.1"},
        "il2cpp_plus": { "branch":"v2021-2.0.1"}
    }
    ]
}
```

If you must install other versions of hybridclr or il2cpp_plus, modify the branch in this configuration file to the target branch or tag. In most cases, you can simply click `Install` to download and install from the remote repository by default. After successful installation, the console will print `Installation successful` log. As shown in the image below.

![install_default](/img/hybridclr/install_default.jpg)

Starting from v2.3.1, support has been added for direct installation by copying from locally made libil2cpp directories containing hybridclr. If you have poor network connectivity or haven't installed git, preventing remote download from repositories, you can first download [il2cpp_plus](https://github.com/focus-creative-games/il2cpp_plus) and [hybridclr](https://github.com/focus-creative-games/hybridclr) locally, then follow the **Installation Principle** section documentation below to merge these two repositories into a libil2cpp directory containing hybridclr. Then in the `Installer` interface, enable the `Copy libil2cpp from local` option, select your made libil2cpp directory, and click `Install` to execute the installation. As shown in the image below.

![install](/img/hybridclr/install.jpg)

The most common failure reason is that git is not installed, or Unity Editor and Unity Hub were not restarted after installing git. If you're certain git is installed and cmd can indeed run git, try restarting your computer.

If automatic installation fails due to various special reasons, please refer to the **Installation Principle** section below to manually simulate the entire installation process.

## Special Handling After Installation

### WebGL Platform

:::tip
Starting from Unity 2021.3.4+ and 2022.3.0+ versions, local installation is already supported, and the WebGL platform build process is identical to other platforms
:::

Due to Unity's own reasons, if using Unity versions lower than 2021.3.4, building for WebGL platform requires global installation. Please refer to the `Global Installation` documentation in the section below.

### Unity 2019

To support 2019, we need to modify the source code generated by il2cpp, so we modified the il2cpp tool for the 2019 version. Therefore, the Installer's installation process includes an additional step: copying `{package}/Data~/ModifiedUnityAssemblies/2019.4.40/Unity.IL2CPP.dll` to `{project}/HybridCLRData/LocalIl2CppData/il2cpp/build/deploy/net471/Unity.IL2CPP.dll`

**Note that this operation is automatically completed during Installer installation and does not require manual operation.**

:::tip
For developers using versions 2019.4.0-2019.4.39, please first switch to version 2019.4.40 to complete the installation, then switch back to your current version.
:::

## Using HybridCLR in Non-Compatible Unity Versions

Since we haven't fully tested all Unity versions, some Unity versions not in the support list may actually work normally with HybridCLR. Installation method is as follows:

- Find a version in the support list that's closest to your version. For example, if your version is 2021.2.20, the closest version would be 2021.3.0.
- First switch your Unity project to this closest supported version and install HybridCLR.
- Switch back to your Unity version.
- Try building. If it runs smoothly, it means HybridCLR supports your version. If there are problems, it's better to upgrade your version.

If you must use that version, you can contact us for [commercial technical support](../business/intro.md).

## How `HybridCLR/Installer` Works

This section only explains the principle. **The libil2cpp installation operations have been completed by the installer and do not require manual operation**.

The HybridCLR installation process mainly includes these parts:

- Create libil2cpp that supports hot updates
- Local or global installation to make the new version of libil2cpp effective
- Minor modifications to Unity Editor

### Replace libil2cpp Code

The original libil2cpp code is an AOT runtime and needs to be replaced with a modified libil2cpp to support hot updates. The modified libil2cpp consists of two parts

- il2cpp_plus
- hybridclr

The il2cpp_plus repository is a version that has made minimal modifications to the original libil2cpp to support dynamic **register** metadata (modified a few hundred lines of code). This repository is highly
similar to the original libil2cpp code. hybridclr is the core code of the interpreter part, including metadata loading, code transform (compilation), and code interpretation execution.

As shown in the figure below, merge the `il2cpp_plus/libil2cpp` directory and the `hybridclr/hybridclr` directory to create the final libil2cpp that supports hot updates.

![merge_hybridclr_dir](/img/hybridclr/merge_hybridclr_dir.jpg)


### Local Installation

Unity allows using the environment variable `UNITY_IL2CPP_PATH` to customize the location of `il2cpp`, so you can create an il2cpp directory locally in the project, replace the libil2cpp directory in the il2cpp directory with the modified libil2cpp,
and then point the `UNITY_IL2CPP_PATH` environment variable to that directory. The general process is as follows:

- Copy the il2cpp directory from the Editor installation directory to `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp`
- Clone il2cpp_plus and hybridclr repositories to create the final libil2cpp directory
- Replace `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` with the final libil2cpp directory
- Copy the `MonoBleedingEdge` directory from the Editor installation directory to `{project}/HybridCLRData/LocalIl2CppData-{platform}/MonoBleedingEdge`
- Other processing. For example, for 2019 version, copy `{package}/Data~/ModifiedUnityAssemblies/2019.4.40/Unity.IL2CPP.dll` to `{project}/HybridCLRData/LocalIl2CppData/il2cpp/build/deploy/net471/Unity.IL2CPP.dll`

:::tip
The com.code-philosophy.hybridclr package modifies the environment variable `UNITY_IL2CPP_PATH` **within this UnityEditor process** and will not affect other Unity projects.
:::

The reason for creating the upper-level `LocalIl2CppData-{platform}` directory instead of just creating il2cpp is because testing has found that simply specifying the il2cpp directory location is not enough. During packaging, Unity implicitly assumes that there is a `MonoBleedingEdge` directory at the same level as il2cpp, so the upper-level directory was created, and both the il2cpp and MonoBleedingEdge directories were copied over.

Because the il2cpp directories that come with different platform Editors are slightly different, LocalIl2CppData needs to distinguish between platforms.

### Global Installation

Global installation requires replacing (or linking) the libil2cpp directory of the Editor installation directory (Win: {editor}/Data/il2cpp/libil2cpp, Mac: similar) with the modified libil2cpp, and additionally replacing some modified files (such as Unity.IL2CPP.dll for 2019). There are several drawbacks:

- May not be able to complete automatically due to directory permission issues
- Will affect other projects that do not use hybridclr
- `HybridCLR/Generate/xxxx` operations need to modify files in the libil2cpp directory, which may fail due to directory permission issues.

After completing installation using `HybridCLR/Installer`, enable the `useGlobalIl2Cpp` option in `HybridCLR/Settings` to start global installation, which will clear the environment variable `UNITY_IL2CPP_PATH`.

If you use the directory replacement method for global installation, then **the first time** before overwriting libil2cpp, please first run `HybridCLR/Generate/Il2cppDef` (only this once, no need later unless you switch project Unity version) to generate the correct version macros, then overwrite the original libil2cpp directory. **Symbolic link installation method does not need to perform this operation, just directly overwrite the original libil2cpp directory**.

Due to permission issues, even with global installation, the `Generate/xxx` commands modify files in the local `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` directory. **Please always overwrite the global installation directory with the local libil2cpp directory after each generate operation**.

Replacing the libil2cpp directory each time is very troublesome. It is recommended to use the method of linking the installation directory's libil2cpp directory to the local libil2cpp directory. The method is as follows:

- Windows platform: Open a command line window with administrator privileges, delete or rename the original libil2cpp, then run `mklink /D "<Editor installation directory libil2cpp directory path>" "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp"`.
- Linux or Mac platform: Open a command line window with administrator privileges, delete or rename the original libil2cpp, then run `ln -s "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" "<Editor installation directory libil2cpp directory path>"`.

For 2019 version Unity.IL2CPP.dll replacement, also use similar replacement or soft link methods as above.

## Precautions

Due to Unity's caching mechanism, after updating HybridCLR, you must clear the Library\Il2cppBuildCache directory, otherwise the latest code will not be used during packaging. If you use the Installer to automatically install or update HybridCLR, it will automatically clear these directories without requiring additional operations from you.

## Others

- [CVE-2025-59489 Vulnerability](https://unity.cn/security/sept-2025-01) is not related to IL2CPP, so there is no need to upgrade HybridCLR. You only need to update your current Unity version to the corresponding patch version or any other Unity version that has already fixed this vulnerability.
