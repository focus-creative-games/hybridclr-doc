# Load Hot Update Assembly

The Ultimate edition adds DHE assemblies compared to the community edition and professional edition. Since DHE assemblies require additional parameters to instruct the runtime on how to dynamically choose between executing original AOT code or hot update code, they cannot be loaded using the `Assembly.Load` interface.
Therefore, special loading rules are required.

## Supported Assembly Types

The Ultimate edition is a superset of the community edition and professional edition. It supports loading both ordinary purely interpreted hot update assemblies and DHE assemblies.
If no DHE assemblies are configured, the Ultimate edition degrades to the professional edition (or can be considered as a community edition that runs somewhat faster).

## Loading Order

The Ultimate edition uses the same dependency loading rules as the community edition, i.e., if assembly B depends on assembly A, then assembly A needs to be loaded first, then assembly B.

Since DHE assemblies will be compiled into AOT, they cannot depend on hot update assemblies, otherwise packaging errors will occur. We have added dependency checking in `HybridCLR.Editor.BuildProcessors.CheckSettings` to detect errors early.

Due to this characteristic, a relatively simple approach is to first load all DHE assemblies in order, then load ordinary hot update assemblies in order.

## Load DHE Assembly

RuntimeApi provides three interfaces for loading DHE assemblies:

- LoadOriginalDifferentialHybridAssembly is used to load DHE assemblies that have not changed at all
- LoadDifferentialHybridAssemblyWithDHAO is used to load DHE assemblies that have not changed or have changed, using dhao files
- LoadDifferentialHybridAssemblyWithMetaVersion is used to load DHE assemblies that have not changed or have changed, using meta version files

When it is clear that no changes have occurred, you can call the LoadOriginalDifferentialHybridAssembly interface to indicate direct use of the original DHE assembly, only needing to pass the assembly name, without needing to pass the original DHE assembly data, because AOT already
contains complete original DHE assembly information.

Whether there are changes or not, you can call LoadDifferentialHybridAssemblyWithXxx to load DHE assemblies.

There are some restrictions for calling LoadOriginalDifferentialHybridAssembly:

1. The DHE assemblies it depends on must also be loaded with LoadOriginalDifferentialHybridAssembly, i.e., Original loading dependency
2. AOT generic instantiation issues
  
  DHE assemblies loaded with it are equivalent to ordinary AOT assemblies. If other hot update assemblies use generics from this DHE assembly, and the Unity version is less than 2021 or equals 2021 but the `Il2Cpp Code Generation` option also has AOT generic instantiation issues.
  Although supplementary metadata can solve this problem, a better approach is to switch to LoadOriginalDifferentialHybridAssembly loading.

Actual projects may have many DHE assemblies, and determining which interface each DHE assembly should use for loading is difficult. Even determining whether an assembly has changed is not an easy task.
We recommend using the following simple rules:

- After releasing the main package, when no hot updates have occurred, use LoadOriginalDifferentialHybridAssembly to load all DHE assemblies
- After releasing hot updates, regardless of whether there are changes, uniformly use LoadDifferentialHybridAssemblyWithXxx to load DHE assemblies

## LoadDifferentialHybridAssemblyWithDHAO

This function has the following parameters:

|Parameter|Description|
|-|-|
|currentDllBytes|File content of the latest DHE assembly|
|currentDllSymbolBytes|pdb file content of the latest DHE assembly, this parameter can be null|
|dhaoBytes|dhao file content generated using the latest DHE assembly|

## LoadDifferentialHybridAssemblyWithMetaVersion

This function has the following parameters:

|Parameter|Description|
|-|-|
|currentDllBytes|File content of the latest DHE assembly|
|currentDllSymbolBytes|pdb file content of the latest DHE assembly, this parameter can be null|
|originalMetaVersinFileBytes|meta version file content of the original DHE assembly|
|currentMetaVersionFileBytes|meta version file content of the latest DHE assembly|

originalMetaVersinFileBytes is completely determined when building the main package and corresponds one-to-one with that main package. We strongly recommend adding it to the StreamingAssets directory to carry with the package.
