# Install


## Install a compatible Unity version

Any version of 2019.4.x, 2020.3.x, 2021.3.x, 2022.3.x or 6000.x.y is supported. It is recommended to install versions 2019.4.40, 2020.3.26+, 2021.3.x, 2022.3.x and 6000.x.y .

:::tip
If your version is 2019.4.0-2019.4.39, **Need to switch to 2019.4.40 to complete HybridCLR installation, and then switch back to the current version**.

If your version is 2020.3.0-2020.3.25, after completing the installation in Installer, copy `2020.3.x/Editor/Data/il2cpp/external` from the installation directory of any version 2020.3.26+ to replace
  `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/external`.
:::

According to the target platform you packaged, select the necessary modules during the installation process. If you package Android or iOS, just select the corresponding module directly. If you want to package Standalone, you must additionally select `Windows Build Support(IL2CPP)` or `Mac Build Support(IL2CPP)`.

![select il2cpp modules](/img/hybridclr/select_il2cpp_modules.jpg)

## Install IDE and related tools

-Windows
   - Under Win, you need to install `visual studio 2019` or later. The installation must include at least the `Game Development with Unity` and `Game Development with C++` components.
   - install git
-Mac
   - Requires MacOS version >= 12, xcode version >= 13, for example `xcode 13.4.1, macos 12.4`.
   - install git
   - install cmake


### Select `com.code-philosophy.hybridclr` version

:::tip
The package name before v3.0.0 is `com.focus-creative-games.hybridclr_unity`.
:::

The `v3.x.y` and `v4.x.y` series versions have removed support for Unity 2019, but starting from the `v5.0.0` version, support for Unity 2019 has been restored, and support for source code Form packaging for iOS.
Developers using the 2019 version are strongly recommended to choose the `v5.x.y` version.

These versions currently exist: `1.0` branch, `v2.x.y`, `v3.x.y`, `v.4.x.y`, `v5.x.y` (also the current main branch) series.
The `1.0` branch, `v2.x.y`, and `v3.x.y` series versions are no longer maintained and are not recommended for use. It is recommended to use `v4.x.y` and `v5.x.y` series versions.

These versions have been verified by a large number of online projects and are already very stable. There is no need to worry about which one is better. Generally speaking, the newer version has more bugs fixed, more optimizations, and a better user experience.

## Install the `com.code-philosophy.hybridclr` package

The warehouse address is [github](https://github.com/focus-creative-games/hybridclr_unity), and the domestic fast mirror warehouse is [gitee](https://gitee.com/focus-creative-games/hybridclr_unity) .

There are three installation methods:

- Install from git url using Package Manager
- Install from openupm using Package Manager
- local installation

### Install from git url

Click `Windows/Package Manager` in the main menu to open the package manager. Click `Add package from git URL...` as shown below, fill in `https://gitee.com/focus-creative-games/hybridclr_unity.git` or `https://github.com/focus-creative -games/hybridclr_unity.git`.


- The main branch address is `https://gitee.com/focus-creative-games/hybridclr_unity.git`
- Other tag version addresses are `https://gitee.com/focus-creative-games/hybridclr_unity.git#{tag}`

If you want to install a certain branch or tag version, please add `#{tag}` after the address, such as `https://gitee.com/focus-creative-games/hybridclr_unity.git#v3.0.1`.

![add package](/img/hybridclr/install_hybridclrunity_package.jpg)

If you are not familiar with installing packages from url, please see [install from giturl](https://docs.unity3d.com/Manual/upm-ui-giturl.html).

### Install from openupm

openump address [com.focus-creative-games.hybridclr_unity](https://openupm.com/packages/com.focus-creative-games.hybridclr_unity/).

For the specific installation method, please open this link and view the detailed installation instructions on the page.

### Install from local files

After cloning the warehouse locally, rename the directory to `com.code-philosophy.hybridclr` (for versions before v3.0.0, please use `com.focus-creative-games.hybridclr_unity`), and then directly move to the Packages directory of the project. Can.

## Update com.code-philosophy.hybridclr

After updating com.code-philosophy.hybridclr, you need to re-run `HybridCLR/Installer`.

## Initialize HybridCLR

In order to reduce the size of the package itself, some files need to be copied from the Unity Editor installation directory. Therefore, after installing the plug-in, an additional initialization process is required.

Click the menu `HybridCLR/Installer...` to pop up the installation interface. Some setup may be required before clicking install. Since the Installer has been adjusted as the version changes, please read the corresponding instructions below according to your current version.

### If your version >= v2.0.5

The branch or tag compatible with hybridclr and il2cpp_plus corresponding to the current package version has been configured in the `Data~/hybridclr_version.json` file in com.code-philosophy.hybridclr.
The Installer will install the version specified in the configuration, and no longer supports customizing the version to be installed.

The configuration looks like this:

```json
{
     "versions": [
     {
         "unity_version": "2019",
         "hybridclr" : { "branch": "v2.0.1"},
         "il2cpp_plus": { "branch": "v2019-2.0.1"}
     },
     {
         "unity_version": "2020",
         "hybridclr" : { "branch": "v2.0.1"},
         "il2cpp_plus": { "branch": "v2020-2.0.1"}
     },
     {
         "unity_version": "2021",
         "hybridclr" : { "branch": "v2.0.1"},
         "il2cpp_plus": { "branch": "v2021-2.0.1"}
     }
     ]
}
```

If you must install other versions of hybridclr or il2cpp_plus, modify the branch in the configuration file to be the target branch or tag.

In most cases, just click `Install` to download and install from the remote repository by default. After the installation is successful, the console will print the `installation successful` log. As shown below.

![install_default](/img/hybridclr/install_default.jpg)

From version 2.3.1 onwards, it supports copying and installing directly from the libil2cpp directory that contains hybridclr made locally. If your network is not good, or git is not installed and you cannot download and install remotely from the warehouse, you can first [il2cpp_plus](https://github.com/focus-creative-games/il2cpp_plus) and [hybridclr](https:/ /github.com/focus-creative-games/hybridclr) is downloaded to the local, and then according to the document in the **Installation Principle** section below, the libil2cpp directory containing hybridclr is merged from these two warehouses, and then installed in `Installer` Enable `Copy libil2cpp from local` option in the interface, select the libil2cpp directory you made, and click `Install` to execute the installation. As shown below.

![install](/img/hybridclr/install.jpg)



### If your version >= 1.1.20

The `Data~/hybridclr_version.json` file in com.code-philosophy.hybridclr has been configured with the version compatible with hybridclr and il2cpp_plus corresponding to the current package version.
The Installer will install the version specified in the configuration, and no longer supports customizing the version to be installed.

The configuration looks like this:

```json
{
     "versions": [
     {
         "unity_version": "2019",
         "hybridclr" : { "branch": "main", "hash": "531f98365eebce5d1390175be2b41c41e217d918"},
         "il2cpp_plus": { "branch": "2019-main", "hash": "ebe5190b0404d1857832bd1d52ebec7c3730a01d"}
     },
     {
         "unity_version": "2020",
         "hybridclr" : { "branch": "main", "hash": "531f98365eebce5d1390175be2b41c41e217d918"},
         "il2cpp_plus": { "branch": "2020-main", "hash": "c6cf54285381d0b03a58126e0d39b6e4d11937b7"}
     },
     {
         "unity_version": "2021",
         "hybridclr" : { "branch": "main", "hash": "531f98365eebce5d1390175be2b41c41e217d918"},
         "il2cpp_plus": { "branch": "2021-main", "hash": "99cd1cbbfc1f637460379e81c9a7776cd3e662ad"}
     }
     ]
}

```

If you want to install other versions of hybridclr or il2cpp_plus, just modify the branch and hash in the configuration file.

Just click `Install` to complete the installation. After the installation is successful, the console will print the `installation successful` log.

### If your package version <= 1.1.19

Fill in the commit id or branch or tag of the hybridclr and il2cpp_plus warehouses you want to install. If the version number of hybridclr is left blank, install the latest version from the main branch of the hybridclr repository.
If the version number of il2cpp_plus is left blank, install the latest version of the main branch of the corresponding annual release (such as 2020-main).

**hybridclr_unity branch

, The branch of the hybridclr warehouse and the branch of the il2cpp_plus warehouse must match**. If you use the main branch of com.code-philosophy.hybridclr, hybridclr must use the main branch, il2cpp_plus must use `{version}-main`, if your hybridclr_unity uses the 1.0 branch, then hybridclr must use the `1.0` branch, il2cpp_plus The `{version}-1.0` branch must be used. If you use a version of a tag, make sure the branch the tag belongs to matches.

The hybridclr warehouse recommends filling in `1.0`, that is, the latest version of the 1.0 branch is installed each time; the il2cpp_plus warehouse recommends filling in `{annual version}-1.0` (such as 2020-1.0), that is, each installation of the `{annual version}-1.0` branch latest version of . As shown in the picture:

![image](/img/hybridclr/install_version.jpg)

At present, the stable official version 1.0.1 has been released, and it is also recommended for projects that pursue stability. Com.code-philosophy.hybridclr takes `1.0.1-release`, the hybridclr version takes `1.0.1-release`, and the il2cpp_plus version takes `{version}-1.0.1-relase`.

After completing the above settings, click the `install` button to complete the installation. After the installation is successful, the console will print the `installation successful` log.

Since the installation process needs to pull the hybridclr and il2cpp_plus warehouses, it may fail due to network failures. If
`HybridCLRData/hybridclr_repo` or `HybridCLRData/il2cpp_plus_repo` is empty when finding failed, please try again.

The most common cause of failure is that git is not installed, or UnityEditor and UnityHub have not been restarted after installing git. If you are sure that git is installed and git can indeed be run in cmd, try restarting the computer.

If the automated installation cannot be completed due to various special reasons, please refer to the following **Installation Principle** to manually simulate the entire installation process.

## Special handling after installation

### WebGL Platform

:::tip
Local installation has been supported since Unity 2021.3.4+ and 2022.3.0+ versions, and the WebGL platform construction process is exactly the same as other platforms.
:::

Due to Unity's own reasons, if the Unity version used is lower than 2021.3.4, the WebGL platform must be installed globally. Please consult the `Global Installation` documentation in the following section.

### Unity 2019

In order to support 2019, the source code generated by il2cpp needs to be modified, so we modified the 2019 version of the il2cpp tool. Therefore, there is an additional step in the Installer installation process: copy `{package}/Data~/ModifiedUnityAssemblies/2019.4.40/Unity.IL2CPP.dll` to `{project}/HybridCLRData/LocalIl2CppData/il2cpp/build/deploy/net471 /Unity.IL2CPP.dll`

**Note that this operation is automatically completed when the Installer is installed, no manual operation is required. **

For developers using the 2019.4.0-2019.4.39 version, please switch to the 2019.4.40 version to complete the installation, and then switch back to your current version.

## Using HybridCLR in non-compatible versions of Unity

Since we haven't fully tested all Unity versions, in fact, some Unity versions that are not in the supported list may also be able to use HybridCLR normally. The installation method is as follows:

- Find a version in the support list that is closest to your version, for example, if your version number is 2021.2.20, then the latest version from you is 2021.3.0.
- First switch your Unity project to this latest supported version, install HybridCLR.
- Switch back to your Unity version.
- Try to package, if it can run smoothly, it means that HybridCLR supports your version, if there is a problem, then upgrade the version.

If you must use this version, you can contact us for [Business Technical Support](../business/intro.md).

## How `HybridCLR/Installer` works

This section is just an introduction to the principle. **The operation of installing libil2cpp has been completed by the installer, and you do not need to do it manually**.

The HybridCLR installation process mainly includes these parts:

- Make libil2cpp that supports hot update
- Install locally or globally to make the new version of libil2cpp take effect
- Minor improvements to the Unity Editor

### Replace libil2cpp code

The original libil2cpp code is AOT runtime and needs to be replaced with the modified libil2cpp to support hot updates. The modified libil2cpp consists of two parts

-il2cpp_plus
- hybridclr

The il2cpp_plus repository is a slightly modified version of the original libil2cpp to support dynamic **register** metadata (changed hundreds of lines of code). This repository is highly comparable to the original libil2cpp code
resemblance. hybridclr is the core code of the interpreter, including metadata loading, code transform (compilation), and code interpretation and execution.

As shown in the figure below, merge the `il2cpp_plus/libil2cpp` directory with the `hybridclr/hybridclr` directory to create the final libil2cpp that supports hot updates.

![merge_hybridclr_dir](/img/hybridclr/merge_hybridclr_dir.jpg)


### Local installation

Unity allows you to use the environment variable `UNITY_IL2CPP_PATH` to customize the location of `il2cpp`, so you can create an il2cpp directory locally in the project, replace the libil2cpp directory under the il2cpp directory with the modified libil2cpp,
Then point the `UNITY_IL2CPP_PATH` environment variable to this directory. The general process is as follows:

- Copy the il2cpp directory from the Editor installation directory to `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp`
- Create the final libil2cpp directory from the clone il2cpp_plus and hybridclr repositories
- Replace `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp` with the final libil2cpp directory
- Copy the `MonoBleedingEdge` directory from the Editor installation directory to `{project}/HybridCLRData/LocalIl2CppData-{platform}/MonoBleedingEdge`
- Other processing. For the 2019 version, copy `{package}/Data~/ModifiedUnityAssemblies/2019.4.40/Unity.IL2CPP.dll` to `{project}/HybridCLRData/LocalIl2CppData/il2cpp/build/deploy/net471/Unity.IL2CPP.dll`


Create the upper-level `LocalIl2CppData-{platform}` directory instead of only creating il2cpp because it is found that only specifying the location of the il2cpp directory is not enough. When packaging, Unity implicitly assumes that il2cpp has a `MonoBleedingEdge` directory at the same level, so the upper level is created directory, copy both the il2cpp and MonoBleedingEdge directories.

Because the il2cpp directory that comes with Editor on different platforms is slightly different, LocalIl2CppData needs to distinguish the platform.

### Global installation

Global installation needs to replace (or link) the libil2cpp directory of the Editor installation directory ({editor}/Data/il2cpp/libil2cpp under Win, similar to Mac) with the modified libil2cpp, and additionally replace some modified files (for example, 2019 also needs to be modified Unity.IL2CPP.dll). There are several flaws:

- Due to directory permissions, auto-completion may not be possible
- Will affect other projects that don't use hybridclr
- The `HybridCLR/Generate/xxxx` operation needs to modify the files in the libil2cpp directory, which may fail due to directory permissions.

After completing the installation using `HybridCLR/Installer`, enable the `useGlobalIl2Cpp` option in `HybridCLR/Settings` to start the global installation, and the environment variable `UNITY_IL2CPP_PATH` will be cleared.

If you use the replacement directory for global installation, and your com.code-philosophy.hybridclr version >= 2.1.0, please run `HybridCLR/Generate/Il2cppDef` before overriding libil2cpp **for the first time** (Only this time, it is no longer needed later, unless you switch the project Unity version) to generate the correct version macro, and then overwrite the original libil2cpp directory. **Symbolic link installation method or com.code-philosophy.hybridclr version lower than 2.1.0 does not need to perform this operation, just overwrite the original libil2cpp directory**.

Due to permissions, even if it is installed globally, the `Generate/xxx` command modifies the files under the local `{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp`. **Please overwrite the local libil2cpp directory with the global installation directory after each generate**.


It is very troublesome to replace the libil2cpp directory every time. It is recommended to link the libil2cpp directory of the installation directory to the local libil2cpp directory. Methods as below:
- Windows platform. Open the command line window with administrator privileges, delete or rename the original libil2cpp, and then run `mklink /D "<libil2cpp directory path of Editor installation directory>" "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" `.
- Linux or Mac platform. Open the command line window with administrator privileges, delete or rename the original libil2cpp, and then run `ln -s "{project}/HybridCLRData/LocalIl2CppData-{platform}/il2cpp/libil2cpp" "<libil2cpp directory path of Editor installation directory>" `.

For the 2019 version replace Unity.IL2CPP.dll, also use a method similar to the above replacement or soft link.


## Precautions

Due to Unity's caching mechanism, after updating HybridCLR, be sure to clear the Library\Il2cppBuildCache directory, otherwise the latest code will not be used when packaging. If you use Installer to automatically install or update HybridCLR, it will automatically clear these directories without any additional action on your part.