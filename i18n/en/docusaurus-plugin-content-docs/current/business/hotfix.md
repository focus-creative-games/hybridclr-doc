# Hotfix Dynamic Hot Repair

Some updates are just a few lines of bug fixes, and some developers might want to dynamically fix them while the game is running, rather than forcing players to restart the current game app.
Currently, versions other than the [Hot Reload Edition](./reload/intro) don't support reloading hot update assemblies.
Even the hot reload version, despite supporting complete unloading of assemblies and reloading of entirely new assemblies, has many [limitations and requirements](./reload/hotreloadassembly#unsupported-features-and-special-requirements) for code, making it highly intrusive to business code.

Hotfix technology is specifically designed to solve such dynamic bug fixing scenarios. It can fix bugs in hot update modules at runtime without affecting the user experience, and it's non-intrusive to business code.

## Advantages

- Dynamically fixes code bugs without needing to restart the game app
- Can fix any code in hot update assemblies (including DHE assemblies in Ultimate Edition), including static member functions, generic functions, async functions, etc.
- Simple to use, non-intrusive to business code, requires no modification of any business code
- No limit on the number of fixes; can be applied multiple times during app runtime. For example, after releasing v1 fix, other bugs are discovered and v2 fix can be released immediately

## Limitations and Drawbacks

- Can only fix function bodies, cannot modify type definitions (such as changing class names, adding/removing fields, adding/removing functions, modifying function signatures, etc.)
- Each fix loads a hot update assembly once; previously loaded assembly memory cannot be released, causing some memory leakage
- Incompatible with function inline optimization; function inlining must be disabled. Call `RuntimeApi.SetRuntimeOption(RuntimeOptionId.MaxMethodInlineDepth, 0);` before hot update loading or at the hot update entry point

## Usage

Call the `RuntimeApi::HotfixAssembly` function to complete hot repair. Example code as follows:

```csharp

public static void ApplyHotfix()
{
    byte[] hotfixDllBytes = LoadFromXXX("Hotfix");
    var hotfixTypes = new List<HotfixType>
    {
        // Full name of the class to fix, including namespace (if any)
        name = "TestHotfixMethods",
        // List of functions to fix
        methods = new List<HotfixMethod>
        {
            new HotfixMethod
            {
                // By function name; if there are multiple functions with the same name, all will be fixed
                name = "Foo1",
            },
            new HotfixMethod
            {
                // By function signature. Only one of name or signature can be provided, otherwise an error will occur
                signature = "Int32 Foo2(Int32, Int32)",
            },
        }
    };
    RuntimeApi.HotfixAssembly("Hotfix", hotfixDllBytes, hotfixTypes);
}
```

When there are many dlls and functions to fix, this operation is tedious and error-prone. It's recommended to first create a hotfix.manifest.xml configuration file, then convert it to a HotfixManifest class, and use `RuntimeApi.HotfixAssemblies` to apply all fixes at once. The code would look like this:


```csharp

public static void ApplyHotfix()
{
    string hotfixXmlStr = @"
<manifest>
    <assembly fullname=""Hotfix"">
        <type fullname=""TestHotfixMethods"">
            <method name=""Foo1"" />
            <method signature=""Int32 Foo2(Int32, Int32)"" />
            <method name=""Bar1"" />
            <method signature=""Int32 Bar2(Int32, Int32)"" />
        </type>
        <type fullname=""TestHotfixCtors"">
            <method name="".ctor"" />
            <method signature="".ctor(Int32)"" />
        </type>
        <type fullname=""TestHotfixStaticCtors"">
            <method name="".cctor"" />
        </type>
        <type fullname=""TestHotfixGenericClass`1"">
            <method name=""Foo1"" />
            <method name=""Foo2"" />
        </type>
        <type fullname=""TestHotfixGenericMethods"">
            <method name=""Foo1"" />
        </type>
    </assembly>
</manifest>
";

    RuntimeApi.HotfixAssemblies(HotfixManifest.LoadFrom(s_fixXmlStr, assName => LoadDll.GetDllBytes(assName + ".dll")));
}

```

## Trimming Hotfix Assemblies

In most cases, the number of functions that need to be fixed is very small. Loading the entire original hotfix DLL for this purpose would waste significant download bandwidth and runtime memory usage. HybridCLR provides a trimming tool that retains only the metadata information (such as types and functions) directly referenced by the hotfix functions within the hotfix assembly. By calling the function HybridCLR.Editor.Hotfix.HotfixAssemblyMetadataStripper::StripAssembly(string originalAssemblyPath, HotfixManifest manifest, string strippedAssemblyPath), you can generate a trimmed, debug-optimized assembly. In practice, this can reduce the assembly size by ​​over 99%​​.

```csharp
    [MenuItem("Test/TestsStripper")]
    private static void StripTests()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string DllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        string hotfixDllPath = $"{DllDir}/Tests.dll";
        string hotfixDllStrippedPath = $"{DllDir}/Tests.stripped.dll";
        var manifest = HotfixManifest.LoadFrom(s_fixXmlStr, ass => null);
        HotfixAssemblyMetadataStripper.StripAssembly(hotfixDllPath, manifest, hotfixDllStrippedPath);
        Debug.Log("strip hotfix assembly done!");
    }
```
