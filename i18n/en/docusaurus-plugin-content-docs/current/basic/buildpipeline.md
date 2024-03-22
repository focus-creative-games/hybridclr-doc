# Building Pipeline

Due to the requirements of the hot update itself and some limitations of Unity resource management, some special processing is required for the buiding workflow, which is mainly divided into several parts:

- Set the UNITY_IL2CPP_PATH environment variable
- Automatically exclude hot update assembly when buiding
- Add the hot update dll name to the assembly list when buiding
- Copy the trimmed aot dll generated during the buiding process for supplementary metadata
- Compile hot update dll
- Generate some files and codes needed for buiding
- Special handling for iOS platform

Manually operating these is cumbersome and error-prone. The `com.code-philosophy.hybridclr` package contains standard tool scripts related to buiding workflows, simplifying these complex processes into one-click operations.
For detailed implementation, please refer to the source code or [com.code-philosophy.hybridclr introduction](/basic/com.code-philosophy.hybridclr.md)

## Buiding Steps

1. Run the menu `HybridCLR/Generate/All` to execute the necessary generation operations with one click
1. Add the hot update dll under `HybridCLRData/HotUpdateDlls` to the hot update resource management system of the project
1. Add the supplementary metadata dll under `HybridCLRData/AssembliesPostIl2CppStrip` to the hot update resource management system of the project
1. Pack according to the original buiding process of your project

## Optimized buiding pipeline

During the `HybridCLR/Generate/All` command, an export project will be executed to generate the trimmed AOT dll. This step can be time-consuming for large projects, almost doubling the buiding time. If you need to optimize the buiding time, you can follow the process below to package at one time.

- Run `HybridCLR/Generate/LinkXml`
- Export project
- run `HybridCLR/Generate/Il2cppDef`
- Run `HybridCLR/Generate/MethodBridge` to generate the bridge function
- Run `HybridCLR/Generate/PReverseInvokeWrapper`. Projects that do not need to interact with lua can skip this step.
- Replace the `{proj}\HybridCLRData\LocalIl2CppData-{platform}\il2cpp\libil2cpp\hybridclr\generated` directory with this directory in the exported project.
- Execute build on the exported project


## Special handling for iOS platform

### When com.code-philosophy.hybridclr version &ge; v3.2.0

No need for any processing, just export the xcode project directly, and then pack it. Since the libil2cpp source code is added to the xcode project after the build is completed, you can only export xcode first, and then compile it manually or on the command line. If you try to `Build And Run` directly, you will get an error.

:::danger
If your com.code-philosophy.hybridclr version is < v3.3.0, since the path of libil2cpp-related code is hard-coded in the xcode project, if you export the xcode project and push it to other computers for buiding, the code file will not be found mistake!
:::


### When com.code-philosophy.hybridclr version &lt; v3.2.0

Platforms other than iOS compile the target program based on the libil2cpp source code, and the iOS platform uses the pre-compiled libil2cpp.a file. The xcode project exported by Unity references the pre-generated libil2cpp.a, but does not contain the libil2cpp source code.
Direct buiding cannot support hot updates. Therefore, when compiling an iOS program, you need to compile libil2cpp.a separately, then **replace the libil2cpp.a file** of the xcode project, and then package it.

**Please replace the libil2cpp.a file in the xcode project by yourself**.

The `com.code-philosophy.hybridclr/Data~/iOSBuild` directory contains the scripts needed to compile `libil2cpp.a`. After completing the installation using `HybridCLR/Installer...`, the iOSBuild directory will be copied to the `{project}/HybridCLRData/iOSBuild` directory.

### Compile libil2cpp.a

- Run `HybridCLR/Generate/All` to generate all necessary files
- Open the command console and switch to the `{project}/HybridCLRData/iOSBuild` directory. Please make sure the absolute path of this path does not contain spaces! Otherwise an error will occur.
- bash ./build_libil2cpp.sh compiles libil2cpp.a. After running, if the libil2cpp.a file can be found in the `iOSBuild/build` directory and the size is greater than 60M, it means the compilation is successful

## Common errors

- Installation did not complete in `HybridCLR/Installer...`
- Didn't run `HybridCLR/Generate/All`
- Newer macOS (above 12) and latest xcode not installed
- cmake is not installed
- Due to the git setting, the pulled build_libil2cpp.sh and build_lump.sh contain incorrect file end characters, which cause errors in the first few lines of code when the script runs. Error messages are also obvious, such as `/bin/bash^M file does not exist`. Run the command `cat -v build_libil2cpp.sh` to check that the line breaks are correct. Run `git config --global core.autocrlf input`, and then pull these two script files again. For details, please refer to [Git Line Break Settings](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings).
- The absolute path to `{project}/HybridCLRData/iOSBuild` contains spaces, causing the gen_lump.sh script to generate wrong results