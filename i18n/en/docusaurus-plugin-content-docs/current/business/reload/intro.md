# Introduction

Hot Reload Special Edition provides support for the original `Hot Reload Technology`. It can completely unload or reload an assembly during operation, especially suitable for small game collection type games.

## Supported versions

All Unity 2020-2022 LTS versions are supported.

## Advantage

- Support the `full generic sharing` technology of il2cpp starting from Unity 2021, value types can also be shared generically. It is no longer necessary to add metadata to AOT, which simplifies the workflow, effectively reduces the package size, and significantly reduces memory usage. Especially useful for packages and memory-critical platforms such as WebGL.
- Support unloading a single assembly, unloading 100% of the metadata memory
- Support reloading assembly, the code can be changed arbitrarily or even completely different (except MonoBehaviour class). Hot overloading of MonoBehaviour and ScriptableObject.
- Support **Limit the collection of functions that can be accessed in the hot update assembly**, suitable for creating a sandbox environment in UGC games to avoid damage caused by malicious player code.
- More agile maintenance support, get the latest code at any time (the community version will only be released regularly due to maintenance cost considerations).