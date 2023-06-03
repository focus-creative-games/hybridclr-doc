# HybridCLR code structure and version

The complete HybridCLR code consists of three repositories:

-il2cpp_plus
- hybridclr
- com.code-philosophy.hybridclr


These three warehouses have independent version numbers, so when talking about the HybridCLR version, these three version numbers are generally included.

##il2cpp_plus

Warehouse address [github](https://github.com/focus-creative-games/il2cpp_plus) [gitee](https://gitee.com/focus-creative-games/il2cpp_plus).


When HybridCLR extends il2cpp to run, it needs to make some adjustments to the original il2cpp code to support the hybrid running mode. This part of the code corresponds to the il2cpp_plus repository. Since each major version of il2cpp changes greatly, each major version of Unity needs to be individually adapted.

Each annual release corresponds to a `{version}-main` master branch, such as `2021-main`.

Each current annual version also has an old 1.0 branch `{version}-1.0`, such as `2019-1.0`.

##hybridclr


Warehouse address [github](https://github.com/focus-creative-games/hybridclr) [gitee](https://gitee.com/focus-creative-games/hybridclr)

The hybridclr warehouse contains the core code of the interpreter. All il2cpp_plus share the same set of hybridclr codes, regardless of the major version of Unity. There are currently two branches:

- main
- 1.0

## com.code-philosophy.hybridclr

Warehouse address [github](https://github.com/focus-creative-games/hybridclr_unity) [gitee](https://gitee.com/focus-creative-games/hybridclr_unity)

com.code-philosophy.hybridclr is a Unity Package that contains some runtime code and editor workflow tools needed to use HybridCLR.

com.code-philosophy.hybridclr does not distinguish between major versions of Unity, so like hybridclr, there are currently two branches:

- main
- 1.0

In earlier versions (such as the 1.0 branch), you need to specify the branch of il2cpp_plus and hybridclr you want to install in the Installer. The branches of the two repositories must match,
That is, `{version}-main` of il2cpp_plus matches `main` of hybridclr, and `{version}-1.0` matches `1.0`.

Since the `v2.0.0-rc` version (belonging to the main branch), com.code-philosophy.hybridclr is directly configured with the version numbers of the compatible il2cpp_plus and hybridclr warehouses. For developers,
Just install the appropriate version of com.code-philosophy.hybridclr.