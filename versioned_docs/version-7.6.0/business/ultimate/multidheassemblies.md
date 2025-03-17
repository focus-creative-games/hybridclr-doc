# 多个DHE程序集

存在多个DHE程序集时，可以根据每个程序集是否改变来决定调用LoadOriginalDifferentialHybridAssembly或LoadDifferentialHybridAssemblyUnchecked接口进行加载，
但有一些额外的限制。

## 限制条件

加载多个DHE程序集需要满足以下限制条件：

- 按照程序集的依赖顺序先后加载
- 如果某个DHE程序集使用LoadDifferentialHybridAssemblyUnchecked加载，那所有直接或者间接依赖它的DHE程序集必须也使用
LoadDifferentialHybridAssemblyUnchecked加载，**即使这些程序集没有任何改变**

## LoadDifferentialHybridAssemblyUnchecked的传递性

因为一些复杂的实现原因，如果某个DHE程序集使用LoadDifferentialHybridAssemblyUnchecked加载，那所有直接或者间接依赖它的DHE程序集必须也使用
LoadDifferentialHybridAssemblyUnchecked加载。

例如：假设B程序集引用了A程序集：

|程序集| A | B |
|-|-|-|
|加载方式|LoadOriginalDifferentialHybridAssembly|LoadOriginalDifferentialHybridAssembly或LoadDifferentialHybridAssemblyUnchecked|
|加载方式|LoadDifferentialHybridAssemblyUnchecked|LoadDifferentialHybridAssemblyUnchecked|

如果A程序集发生改变，即使B程序集没有改动，也必须使用LoadDifferentialHybridAssemblyUnchecked加载。

## 计算需要使用LoadDifferentialHybridAssemblyUnchecked加载的DHE程序集

假设你有多个DHE程序集 A1-An。某次更新的时候只有A1和A3发生改变，仅仅这两个程序集使用LoadDifferentialHybridAssemblyUnchecked加载是不够的，
所有直接或者间接依赖A1和A3的程序集都需要使用LoadDifferentialHybridAssemblyUnchecked来加载。当程序集数量少时这不是问题，你可以手动找出
依赖它们的程序集，但程序集数量较多时很容易出错。

自v7.5.0版本起，新增`HybridCLR.Editor.DHE.BuildUtils::ComputeAssembliesLoadedByLoadDifferentialHybridAssembly`函数用于根据已知变化的
DHE程序集列表计算出最终需要使用LoadDifferentialHybridAssemblyUnchecked加载的DHE程序集列表。

示例代码如下：

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
