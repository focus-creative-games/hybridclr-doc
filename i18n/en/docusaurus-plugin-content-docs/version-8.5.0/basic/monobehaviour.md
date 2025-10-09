
# MonoBehaviour Support

HybridCLR fully supports hot update MonoBehaviour and ScriptableObject workflows, allowing you to add hot update scripts to GameObjects in code or directly attach hot update scripts to assets. However, due to the special nature of Unity's asset management mechanism, attaching hot update scripts to assets requires some special handling in the packaging workflow.

## Usage Through Code

`AddComponent<T>()` or `AddComponent(Type type)` are perfectly supported at any time. You just need to load the hot update DLL into the runtime using Assembly.Load beforehand.

## Attaching MonoBehaviour to Assets or Creating ScriptableObject Type Assets

Unity's asset management system requires the following conditions to be met when deserializing hot update scripts in assets:

1. The DLL containing the script must already be loaded into the runtime
2. Must be assets packaged using AssetBundle (**frameworks that indirectly use AB like Addressable also work**)
3. The DLL containing the script must be added to the assembly list file generated during packaging. This list file is loaded at Unity startup and is immutable data. Different Unity versions have different list file names and formats.

If no special processing is done to the packaging process, since hot update DLLs are removed in the `IFilterBuildAssemblies` callback, they definitely won't appear in the assembly list file. Due to not meeting condition 3, hot update scripts attached to hot update assets cannot be restored, and `Scripting Missing` errors will occur at runtime.

Therefore, we've made special handling in the `Editor/BuildProcessors/PatchScriptingAssemblyList.cs` script to add hot update DLLs to the assembly list file. You need to add hot update assemblies in your project to the `HotUpdateAssemblyDefinitions or HotUpdateAssemblies fields in HybridCLRSettings configuration`.

Only hot update assets are restricted to be packaged as AB bundles; there are no restrictions on hot update DLL packaging methods. You can **freely choose hot update methods** according to project requirements, packaging DLLs into AB, as raw data files, or with encryption and compression, etc. Just ensure they're loaded using Assembly.Load before loading hot update assets.

:::warning
**If hot update scripts are attached to assets like Resources that ship with the main package, scripting missing errors will occur!** However, if you first package them as AssetBundle packages and then place them under Resources, loading that bundled AssetBundle at runtime works fine.
:::

## Assembly List File

Different Unity versions have different names and formats for assembly list files.

- 2019 version: globalgamemanagers file when uncompressed; saved to globalgamemanagers file then packaged with other files into data.unity3d file in BundleFile format when compressed.
- 2020-2021 versions: Saved in ScriptingAssembles.json file.

## Known Issues

### GameObject.GetComponent(string name) Interface Cannot Get Components

This is a known bug related to Unity's code implementation. Only hot update scripts attached to hot update assets have this problem; hot update scripts added through AddComponent in code can be found using this method. If you encounter this issue, please use `GameObject.GetComponent<T>()` or `GameObject.GetComponent(typeof(T))` instead.

## Other Notes

Don't modify the DLL names of scripts that need to be attached to assets after going live, because the assembly list file cannot be modified after packaging.

It's recommended not to disable TypeTree when building AB, otherwise normal AB loading methods will fail. (The reason is that for scripts with disabled TypeTree, Unity performs signature verification to prevent process crashes during MonoBehaviour deserialization due to binary mismatches. The signature content is a hash generated from the script's FullName and TypeTree data, but since our hot update script information doesn't exist in the packaged installation, verification will definitely fail)

If you must disable TypeTree, a workaround is to disable script hash verification. In this case, users must ensure code and asset version consistency during packaging, otherwise crashes may occur. Example code:

```csharp
    AssetBundleCreateRequest req = AssetBundle.LoadFromFileAsync(path);
    req.SetEnableCompatibilityChecks(false); // Non-public, needs to be called through reflection
```
