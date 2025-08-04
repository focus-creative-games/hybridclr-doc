# Build Workflow

Due to the requirements of hot updating itself and some limitations of Unity's resource management, special handling is needed for the build workflow, mainly divided into several parts:

- Set UNITY_IL2CPP_PATH environment variable
- Automatically exclude hot update assemblies during build
- Add hot update dll names to assembly list during build
- Copy the stripped AOT dlls generated during the build process for supplemental metadata use
- Compile hot update dlls
- Generate some files and code needed for packaging
- Special handling for iOS platform

Manual operation of these processes is tedious and error-prone. The `com.code-philosophy.hybridclr` package includes standard tool scripts related to the build workflow, simplifying these complex processes into one-click operations.
For detailed implementation, please see the source code or [com.code-philosophy.hybridclr introduction](/basic/com.code-philosophy.hybridclr.md)

## Build Process

1. Run menu `HybridCLR/Generate/All` to execute all necessary generation operations with one click
1. Add the hot update dlls from `HybridCLRData/HotUpdateDlls` to your project's hot update resource management system
1. Add the supplemental metadata dlls from `HybridCLRData/AssembliesPostIl2CppStrip` to your project's hot update resource management system
1. Build according to your project's original packaging workflow

## Optimized Build Process

:::tip

Unity 2019's Android platform and HarmonyOS platform of Unity China will automatically compile libil2cpp.a during the second step of `exporting project`. At this time, bridge functions and others have not been generated yet, so these platforms **cannot use** the optimized build process.

:::

The `HybridCLR/Generate/All` command executes a project export during its run to generate stripped AOT dlls. This step can be very time-consuming for large projects, almost doubling the build time. If you need to optimize build time, you can follow this workflow for one-time packaging:

- Run `HybridCLR/Generate/LinkXml`
- Export project
- Run `HybridCLR/Generate/Il2cppDef`
- Run `HybridCLR/Generate/MethodBridge` to generate bridge functions
- Run `HybridCLR/Generate/PReverseInvokeWrapper`. Projects that don't need to interact with lua and similar can skip this step.
- Replace the `{proj}\HybridCLRData\LocalIl2CppData-{platform}\il2cpp\libil2cpp\hybridclr\generated` directory with this directory in the exported project.
- Execute build on the exported project

## Special Handling for iOS Platform

### When com.code-philosophy.hybridclr version &ge; v3.2.0

No special handling is needed. Simply export the Xcode project and then build. Since the libil2cpp source code is added to the Xcode project only after build completion, you can only export Xcode first, then compile manually or via command line. Attempting to directly `Build And Run` will cause errors.

### When com.code-philosophy.hybridclr version &lt; v3.2.0

All platforms except iOS compile the target program based on libil2cpp source code. The iOS platform uses a pre-compiled libil2cpp.a file. The Xcode project exported by Unity references a pre-generated libil2cpp.a and does not include libil2cpp source code,
so direct packaging cannot support hot updates. Therefore, when compiling iOS programs, you need to compile libil2cpp.a separately and **replace the libil2cpp.a file in the Xcode project**, then build.

The `com.code-philosophy.hybridclr/Data~/iOSBuild` directory contains the scripts needed to compile `libil2cpp.a`. After completing the installation using `HybridCLR/Installer...`, this iOSBuild directory will be copied to the `{project}/HybridCLRData/iOSBuild` directory.

The process is as follows:

- Compile `libil2cpp.a`
  - Run `HybridCLR/Generate/All` to generate all necessary files
  - Open command console and switch to the `{project}/HybridCLRData/iOSBuild` directory. Please ensure the absolute path of this directory does not contain spaces! Otherwise, errors will occur.
  - bash ./build_libil2cpp.sh to compile libil2cpp.a. After completion, if you can find the libil2cpp.a file in the `iOSBuild/build` directory and its size is larger than 60M, it indicates successful compilation.
- Replace the libil2cpp.a file in the Xcode project. Please complete this yourself.

## Common Errors

- Installation not completed in `HybridCLR/Installer...`
- `HybridCLR/Generate/All` not executed
- Not using newer macOS (12 or above) and latest Xcode
- cmake not installed
- Due to git settings, the downloaded build_libil2cpp.sh and build_lump.sh contain incorrect line endings, causing script errors in the first few lines. The error message is also obvious, such as `/bin/bash^M file not found`. Run command `cat -v build_libil2cpp.sh` to check and confirm line ending correctness. Run `git config --global core.autocrlf input`, then re-download these two script files. For details, see [git line ending settings](https://docs.github.com/cn/get-started/getting-started-with-git/configuring-git-to-handle-line-endings).
- The absolute path of `{project}/HybridCLRData/iOSBuild` contains spaces, causing gen_lump.sh script to generate incorrect results
