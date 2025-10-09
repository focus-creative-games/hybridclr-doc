# FAQ

## Which platforms does HybridCLR support?

All platforms supported by il2cpp are supported.

## How much does HybridCLR increase the package size?

Taking the 2019 version as an example, the libil2cpp.a file exported for Android in release mode: original version 12.69M, HybridCLR version 13.97M, which means an increase of approximately 1.3M.

## Why does the package built with HybridCLR increase significantly in size?

HybridCLR itself only increases the package size by a small amount (1-2M). The significant increase is because you incorrectly preserved too many classes in link.xml, causing the package size to increase dramatically. Please optimize according to Unity's stripping rules.

## Does HybridCLR embed mono?

No. HybridCLR provides il2cpp with a completely independent and self-implemented register-based interpreter.

## Are there any limitations when writing code with HybridCLR?

Almost no limitations. See [Unsupported Features](/basic/notsupportedfeatures.md)

## Does it support generic classes and generic functions?

Complete and thorough support with no limitations.

## Does it support hot updating MonoBehaviour?

Full support. You can not only add them in code but also directly attach them to hot update resources. See [Using Hot Update MonoBehaviour](/basic/monobehaviour.md) for details.

## Does it support reflection?

Yes, with no limitations.

## How is multi-threading support?

Complete support. Supports Thread, Task, volatile, ThreadStatic, async.

## Does it support multiple assemblies?

Yes. However, it won't automatically load dependent DLLs. You need to manually load hot update DLLs in dependency order.

## What's the maximum number of DLLs that can be loaded simultaneously?

You can simultaneously load a maximum of 3 DLLs up to 64M each, 16 DLLs up to 16M each, 64 DLLs up to 4M each, and 255 DLLs up to 1M each. That means a maximum of 338 DLLs can be loaded simultaneously.

## Does it support .NET Standard 2.0?

Yes. However, note that the main project should be packaged with .NET Standard, while hot update DLLs **must be packaged with .NET 4.x**. For detailed explanation, see [Common Errors Documentation](/help/commonerrors.md)

## Does it support Unity's DOTS framework?

Yes. Burst code in the AOT part works normally, but burst code in the hot update part executes in interpreter mode. This is expected.


