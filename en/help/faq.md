# FAQ

## What platforms does HybridCLR support?

All platforms supported by il2cpp support

## How much will HybridCLR increase the package body

Taking the 2019 version as an example, the libil2cpp.a file of the Android project is exported in release mode, the original version is 12.69M, and the HybridCLR version is 13.97M, which means an increase of about 1.3M.

## Why does the package size printed by HybridCLR increase a lot?

HybridCLR itself will only add a few inclusions (1-2M). The package body has increased a lot because you mistakenly reserved too many classes in link.xml, resulting in a sharp increase in the package body. Please refer to Unity's clipping rules for optimization.

## Is HybridCLR embedded with mono?

no. HybridCLR supplements il2cpp with a complete register interpreter implemented completely independently.

## Are there any restrictions on writing code in HybridCLR?

Few restrictions, see [Unsupported Features](/en/basic/notsupportedfeatures.md)


## Does it support generic classes and generic functions?

Thorough and complete support without any limitations.

## Support hot update MonoBehaviour?

fully support. Not only can it be added in the code, but it can also be directly linked to hot update resources. For details, see [Using Hot Update MonoBehaviour](/en/basic/monobehaviour.md)

## Does it support reflection?

Supported, without any restrictions.

## How about multithreading support?

Full support. Support Thread, Task, volatile, ThreadStatic, async.

## Does it support multiple assemblies?

Support, up to 255. But the dependent dll will not be loaded automatically. You need to manually load hot-updated dlls in the order of dependencies.


## Does it support .net standard 2.0?

support. But please note that the main project is packaged with .net standard, while the hot update dll must be packaged with .net 4.x**. For detailed explanation, please refer to [Common Errors Documentation](/en/help/commonerrors.md)

## Does it support Unity's DOTS framework?

support. The burst code in the AOT part works fine, but the burst code in the hot update part is executed interpretively. This is obvious.
