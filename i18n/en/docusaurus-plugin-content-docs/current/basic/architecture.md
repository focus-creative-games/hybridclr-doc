# Code Structure and Versioning

The complete HybridCLR codebase consists of three repositories:

- il2cpp_plus
- hybridclr
- com.code-philosophy.hybridclr

These three repositories have independent version numbers, so when referring to HybridCLR versions, it generally includes all three version numbers.

## il2cpp_plus

Repository: [github](https://github.com/focus-creative-games/il2cpp_plus) [gitee](https://gitee.com/focus-creative-games/il2cpp_plus)

HybridCLR extends the il2cpp runtime, requiring minor adjustments to the original il2cpp code to support hybrid execution mode. This code corresponds to the il2cpp_plus repository. Since il2cpp has significant changes with each major annual version, adaptation is required for each Unity major version.

Each annual version corresponds to a `{version}-main` branch, such as `2021-main`.

Currently, each annual version also has an older 1.0 branch `{version}-1.0`, such as `2019-1.0`.

## hybridclr

Repository: [github](https://github.com/focus-creative-games/hybridclr) [gitee](https://gitee.com/focus-creative-games/hybridclr)

The hybridclr repository contains the interpreter's core code. All il2cpp_plus versions share the same hybridclr codebase, regardless of Unity major version. Currently, there are two branches:

- main
- 3.x
- 2.x
- 1.0

## com.code-philosophy.hybridclr

Repository: [github](https://github.com/focus-creative-games/hybridclr_unity) [gitee](https://gitee.com/focus-creative-games/hybridclr_unity)

com.code-philosophy.hybridclr is a Unity Package that contains runtime code and editor workflow tools needed for using HybridCLR.

com.code-philosophy.hybridclr also doesn't distinguish Unity major versions, so like hybridclr, it currently has two branches:

- main
- 3.x
- 2.x
- 1.0

In early versions (such as the 1.0 branch), you needed to specify which il2cpp_plus and hybridclr branches to install in the Installer. The branches of these two repositories must match,
i.e., il2cpp_plus's `{version}-main` matches with hybridclr's `main`, `{version}-1.0` matches with `1.0`.

Starting from version `v2.0.0-rc` (belonging to the main branch), com.code-philosophy.hybridclr directly configures the version numbers of compatible il2cpp_plus and hybridclr repositories. For developers,
you only need to install the appropriate com.code-philosophy.hybridclr version.