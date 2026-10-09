# Multiple DHE Assemblies

When there are multiple DHE assemblies, you can decide whether to call LoadOriginalDifferentialHybridAssembly or LoadDifferentialHybridAssemblyUnchecked interface for loading based on whether each assembly has changed,
but there are some additional restrictions.

## Restrictions

Loading multiple DHE assemblies needs to meet the following restrictions:

- Load in the dependency order of assemblies
- If a DHE assembly is loaded using LoadDifferentialHybridAssemblyUnchecked, then all DHE assemblies that directly or indirectly depend on it must also use
LoadDifferentialHybridAssemblyUnchecked for loading, **even if these assemblies have no changes**

## Transitivity of LoadDifferentialHybridAssemblyUnchecked

Due to some complex implementation reasons, if a DHE assembly is loaded using LoadDifferentialHybridAssemblyUnchecked, then all DHE assemblies that directly or indirectly depend on it must also use
LoadDifferentialHybridAssemblyUnchecked for loading.

For example: Suppose assembly B references assembly A:

|Assembly| A | B |
|-|-|-|
|Loading Method|LoadOriginalDifferentialHybridAssembly|LoadOriginalDifferentialHybridAssembly or LoadDifferentialHybridAssemblyUnchecked|
|Loading Method|LoadDifferentialHybridAssemblyUnchecked|LoadDifferentialHybridAssemblyUnchecked|

If assembly A changes, even if assembly B has no modifications, it must still be loaded using LoadDifferentialHybridAssemblyUnchecked.

## Calculating DHE Assemblies that Need to be Loaded with LoadDifferentialHybridAssemblyUnchecked

Suppose you have multiple DHE assemblies A1-An. In a certain update, only A1 and A3 have changed. Simply using LoadDifferentialHybridAssemblyUnchecked to load only these two assemblies is not enough,
all assemblies that directly or indirectly depend on A1 and A3 need to be loaded using LoadDifferentialHybridAssemblyUnchecked. When there are few assemblies, this is not a problem, you can manually find out
the assemblies that depend on them, but when there are many assemblies, it's easy to make mistakes.

Starting from v7.5.0, a new function `HybridCLR.Editor.DHE.BuildUtils::ComputeAssembliesLoadedByLoadDifferentialHybridAssembly` has been added to calculate the final list of DHE assemblies that need to be loaded using LoadDifferentialHybridAssemblyUnchecked based on the known list of changed
DHE assemblies.

Example code is as follows:

```csharp
    BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
    HybridCLRSettings settings = HybridCLRSettings.Instance;
    string[] differentialHybridAssemblyList = settings.differentialHybridAssemblies;

    string currentAssemblyDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
    
    var assList = BuildUtils.ComputeAssembliesLoadedByLoadDifferentialHybridAssembly(new string[] { "MyCode" }, differentialHybridAssemblyList, currentAssemblyDir);
    foreach (var ass in assList)
    {
        Debug.Log($"assembly:{ass}");
    }

```
