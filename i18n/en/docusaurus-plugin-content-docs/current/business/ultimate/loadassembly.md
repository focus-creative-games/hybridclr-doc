# Loading Hot Update Assemblies

The flagship version introduces Differential Hybrid Assemblies (DHE) in addition to the community and professional versions. Since DHE assemblies require additional parameters to indicate how the runtime should dynamically select between the original AOT code and the hot update code, they cannot be loaded using the `Assembly.Load` interface. Therefore, a special loading mechanism is required.

## Supported Assembly Types

The flagship version is a superset of the community and professional versions, supporting both ordinary interpreted hot update assemblies and DHE assemblies. If no DHE assemblies are configured, the flagship version degrades to the professional version (or can be considered a slightly faster community version).

## Loading Order

The flagship version uses the same dependency loading rules as the community version. Specifically, if Assembly B depends on Assembly A, Assembly A must be loaded before Assembly B.

Since DHE assemblies are compiled into AOT, they cannot depend on hot update assemblies; otherwise, packaging will fail. We have added dependency checks in `HybridCLR.Editor.BuildProcessors.CheckSettings` to detect errors early.

Given this characteristic, a simple approach is to load all DHE assemblies in order first, followed by loading ordinary hot update assemblies in order.

## Loading DHE Assemblies

The `RuntimeApi` provides two interfaces for loading DHE assemblies:

- `LoadOriginalDifferentialHybridAssembly`: Used to load DHE assemblies that have not changed.
- `LoadDifferentialHybridAssemblyWithMetaVersion`: Used to load DHE assemblies that may or may not have changed.

When it is certain that no changes have occurred, the `LoadOriginalDifferentialHybridAssembly` interface can be called to indicate the use of the original DHE assembly. Only the assembly name needs to be passed, without the original DHE assembly data, as the AOT already contains the complete original DHE assembly information.

The `LoadDifferentialHybridAssemblyWithMetaVersion` interface can be used regardless of whether changes have occurred.

There are some limitations when using `LoadOriginalDifferentialHybridAssembly`:

1. **Original Loading Dependency**: Any DHE assemblies it depends on must also be loaded using `LoadOriginalDifferentialHybridAssembly`.
2. **AOT Generic Instantiation Issues**: Loading DHE assemblies with this method is equivalent to loading ordinary AOT assemblies. If other hot update assemblies use generics from this DHE assembly and the Unity version is less than 2021 or equal to 2021 with the `Il2Cpp Code Generation` option enabled, AOT generic instantiation issues may arise. Although these issues can be resolved by supplementing metadata, a better approach is to use `LoadDifferentialHybridAssemblyWithMetaVersion`.

In practice, a project may have many DHE assemblies, and determining which interface to use for each DHE assembly can be challenging. Even determining whether an assembly has changed is not straightforward. We recommend the following simple rules:

- After the main package is released and no hot updates have occurred, use `LoadOriginalDifferentialHybridAssembly` to load all DHE assemblies.
- After a hot update is released, use `LoadDifferentialHybridAssemblyWithMetaVersion` to load DHE assemblies regardless of whether they have changed.

## LoadDifferentialHybridAssemblyWithMetaVersion

This function has four parameters:

| Parameter | Description |
|-----------|-------------|
| `currentDllBytes` | The content of the latest DHE assembly file. |
| `currentDllSymbolBytes` | The content of the pdb file for the latest DHE assembly. This parameter can be `null`. |
| `originalMetaVersionFileBytes` | The content of the meta version file for the original DHE assembly. |
| `currentMetaVersionFileBytes` | The content of the meta version file for the latest DHE assembly. |

The `originalMetaVersionFileBytes` is fully determined during the main package build and is specific to that main package. We strongly recommend including it in the StreamingAssets directory and packaging it with the main package.
