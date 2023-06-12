# HybridCLR packaging workflow

Due to the requirements of the hot update itself and some limitations of Unity resource management, some special processing is required for the packaging workflow, which is mainly divided into several parts:

- Set the UNITY_IL2CPP_PATH environment variable
- Automatically exclude hot update assembly when packaging
- Add the hot update dll name to the assembly list when packaging
- Copy the trimmed aot dll generated during the packaging process for supplementary metadata
- Compile hot update dll
- Generate some files and codes needed for packaging
- Special handling for iOS platform

Manually operating these is cumbersome and error-prone. The `com.code-philosophy.hybridclr` package contains standard tool scripts related to packaging workflows, simplifying these complex processes into one-click operations.
For detailed implementation, please refer to the source code or [com.code-philosophy.hybridclr introduction](../basic/com.code-philosophy.hybridclr.md)

## Packaging process

1. Run the menu `HybridCLR/Generate/All` to execute the necessary generation operations with one click
1. Add the hot update dll under `HybridCLRData/HotUpdateDlls` to the hot update resource management system of the project
1. Add the supplementary metadata dll under `HybridCLRData/AssembliesPostIl2CppStrip` to the hot update resource management system of the project
1. Pack according to the original packaging process of your project


## Special handling for iOS platform

Platforms other than iOS compile the target program based on the libil2cpp source code, and the iOS platform uses the pre-compiled libil2cpp.a file. The xcode project exported by Unity references the pre-generated libil2cpp.a, but does not contain the libil2cpp source code.
Direct packaging cannot support hot updates. Therefore, when compiling an iOS program, you need to compile libil2cpp.a separately, then **replace the libil2cpp.a file** of the xcode project, and then package it.

**Please replace the libil2cpp.a file in the xcode project by yourself**.

The `com.code-philosophy.hybridclr/Data~/iOSBuild` directory contains the scripts needed to compile `libil2cpp.a`. After completing the installation using `HybridCLR/Installer...`, the iOSBuild directory will be copied to the `{project}/HybridCLRData/iOSBuild` directory.

## Compile libil2cpp.a

- Run `HybridCLR/Generate/All` to generate all necessary files
- Open the command console and switch to the `{project}/HybridCLRData/iOSBuild` directory. Please make sure the absolute path of this path does not contain spaces! Otherwise an error will occur.
- bash ./build_libil2cpp.sh compiles libil2cpp.a. After running, if the libil2cpp.a file can be found in the `iOSBuild/build` directory and the size is greater than 60M, it means the compilation is successful

## Common errors

- Installation did not complete in `HybridCLR/Installer...`
- Didn't run `HybridCLR/Generate/All`
- Newer macOS (above 12) and latest xcode not installed
- cmake is not installed
- Due to the git settings, the pulled down build_libil2cpp.sh and build_lump.sh contain incorrect file end characters, resulting in an error in the first few lines of code when the script runs. Error messages are also obvious, such as `/bin/bash^M file does not exist`. Run the command `cat -v build_libil2cpp.sh` to check that the line breaks are correct. Run `git config --global core.autocrlf input`, and then pull these two script files again. For details, please refer to [Git Line Break Settings](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings).
- The absolute path to `{project}/HybridCLRData/iOSBuild` contains spaces, causing the gen_lump.sh script to generate wrong results
