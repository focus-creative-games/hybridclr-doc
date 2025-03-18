# Loading Hot-Update Assemblies

The flagship version, compared to the community and professional versions, includes DHE assemblies. Since DHE assemblies require additional parameters to indicate how the runtime should dynamically select to execute the original AOT code or the hot-update code, they cannot be loaded using the `Assembly.Load` interface. Therefore, special loading rules are required.

## Supported Assembly Types

The flagship version is a superset of the community and professional versions. It supports loading both regular interpreted hot-update assemblies and DHE assemblies. If no DHE assemblies are configured, the flagship version degrades to the professional version (or can be considered a faster-running community version).

## Loading Order

The flagship version uses the same dependency loading rules as the community version. That is, if Assembly B depends on Assembly A, Assembly A must be loaded before Assembly B.

Since DHE assemblies are compiled into AOT, they cannot depend on hot-update assemblies; otherwise, errors will occur during packaging. We have added dependency checks in `HybridCLR.Editor.BuildProcessors.CheckSettings` to detect errors in advance.

Given this characteristic, a relatively simple approach is to load all DHE assemblies in order first, followed by loading regular hot-update assemblies in order.

## Loading DHE Assemblies

The RuntimeApi provides three interfaces for loading DHE assemblies:

- `LoadOriginalDifferentialHybridAssembly` is used to load DHE assemblies that have not changed at all.
- `LoadDifferentialHybridAssemblyWithDHAO` is used to load DHE assemblies that have not changed or have changed, using a dhao file.
- `LoadDifferentialHybridAssemblyWithMetaVersion` is used to load DHE assemblies that have not changed or have changed, using a meta version file.

When it is clear that there are no changes, the `LoadOriginalDifferentialHybridAssembly` interface can be called to indicate the use of the original DHE assembly directly. Only the assembly name needs to be passed, without the need to pass the original DHE assembly data, as the AOT already contains the complete information of the original DHE assembly.

Regardless of whether there are changes or not, the `LoadDifferentialHybridAssemblyWithXxx` interfaces can be used to load DHE assemblies.

There are some restrictions when calling `LoadOriginalDifferentialHybridAssembly`:

1. The DHE assemblies it depends on must also be loaded using `LoadOriginalDifferentialHybridAssembly`, i.e., Original loading dependency.
2. AOT generic instantiation issues

   DHE assemblies loaded with this interface are equivalent to regular AOT assemblies. If other hot-update assemblies use generics from this DHE assembly, and the Unity version is less than 2021 or equal to 2021 but with the `Il2Cpp Code Generation` option enabled, there will be AOT generic instantiation issues.
   Although this issue can be resolved by supplementing metadata, a better approach is to switch to loading with `LoadOriginalDifferentialHybridAssembly`.

In actual projects, there may be many DHE assemblies, and it is difficult to determine which interface should be used to load each DHE assembly. Even determining whether an assembly has changed is not an easy task. We recommend using the following simple rules:

- After the main package is released and no hot-update has occurred, use `LoadOriginalDifferentialHybridAssembly` to load all DHE assemblies.
- After a hot-update is released, regardless of whether there are changes or not, use `LoadDifferentialHybridAssemblyWithXxx` to load DHE assemblies.

## `LoadDifferentialHybridAssemblyWithDHAO`

The function has the following parameters:

| Parameter | Description |
| - | - |
| `currentDllBytes` | The file content of the latest DHE assembly |
| `currentDllSymbolBytes` | The pdb file content of the latest DHE assembly. This parameter can be `null`. |
| `dhaoBytes` | The content of the dhao file generated using the latest DHE assembly |

## `LoadDifferentialHybridAssemblyWithMetaVersion`

The function has the following parameters:

| Parameter | Description |
| - | - |
| `currentDllBytes` | The file content of the latest DHE assembly |
| `currentDllSymbolBytes` | The pdb file content of the latest DHE assembly. This parameter can be `null`. |
| `originalMetaVersionFileBytes` | The content of the original DHE assembly's meta version file |
| `currentMetaVersionFileBytes` | The content of the latest DHE assembly's meta version file |

The `originalMetaVersionFileBytes` is fully determined at the time of main package build and corresponds one-to-one with that package. We strongly recommend including it in the StreamingAssets directory and shipping it with the package.
