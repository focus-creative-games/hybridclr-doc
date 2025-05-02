# Multiple DHE Assemblies

When multiple DHE assemblies exist, the decision to call `LoadOriginalDifferentialHybridAssembly` or `LoadDifferentialHybridAssemblyUnchecked` for loading depends on whether each assembly has changed.
However, there are some additional restrictions.

## Restrictions

Loading multiple DHE assemblies must meet the following conditions:

- Assemblies must be loaded in the order of their dependencies.
- If a DHE assembly is loaded using `LoadDifferentialHybridAssemblyUnchecked`, then all DHE assemblies that directly or indirectly depend on it must also be loaded using `LoadDifferentialHybridAssemblyUnchecked`, **even if those assemblies have not changed**.

## Transitivity of LoadDifferentialHybridAssemblyUnchecked

Due to some complex implementation reasons, if a DHE assembly is loaded using `LoadDifferentialHybridAssemblyUnchecked`, then all DHE assemblies that directly or indirectly depend on it must also be loaded using `LoadDifferentialHybridAssemblyUnchecked`.

For example, suppose Assembly B references Assembly A:

| Assembly | Loading Method |
|----------|----------------|
| A        | `LoadOriginalDifferentialHybridAssembly` |
| B        | `LoadOriginalDifferentialHybridAssembly` or `LoadDifferentialHybridAssemblyUnchecked` |
| A (Changed) | `LoadDifferentialHybridAssemblyUnchecked` |
| B (Must Use) | `LoadDifferentialHybridAssemblyUnchecked` |

If Assembly A changes, then even if Assembly B has not been modified, it must still be loaded using `LoadDifferentialHybridAssemblyUnchecked`.

## Computing DHE Assemblies That Need to Be Loaded Using LoadDifferentialHybridAssemblyUnchecked

Suppose you have multiple DHE assemblies A1 to An. If only A1 and A3 change in a certain update, it is not enough to load just these two assemblies using `LoadDifferentialHybridAssemblyUnchecked`.
All assemblies that directly or indirectly depend on A1 and A3 must also be loaded using `LoadDifferentialHybridAssemblyUnchecked`. When the number of assemblies is small, this is manageable manually, but when dealing with a large number of assemblies, it is easy to make mistakes.

Starting from version v7.5.0, a new function `HybridCLR.Editor.DHE.BuildUtils::ComputeAssembliesLoadedByLoadDifferentialHybridAssembly` has been added to compute the final list of DHE assemblies that need to be loaded using `LoadDifferentialHybridAssemblyUnchecked` based on the list of known changed DHE assemblies.

### Example Code

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
