# Hotfix

Some updates merely consist of a few lines of bug code fixes, and some projects may wish to dynamically repair these directly during the game's running process, instead of forcing players to restart the current game App.
Currently, versions other than the [hot reload version](./reload/intro) do not support reloading hot update assemblies.
Even the hot loading version, because it supports completely uninstalling an assembly and reloading a completely new assembly, has many [restrictions and requirements](./reload/hotreloadassembly#Unsupported_features_and_special_requirements),
which is highly intrusive to business code.

Hotfix technology is specifically designed to solve such occasions for dynamically fixing bugs. It can fix bugs in hot update modules in an unnoticeable way during runtime, and it is non-intrusive to business code.

## Advantages

- Dynamically fix code bugs without needing to restart the game App
- Can fix any code in hot update assemblies (including flagship version DHE assemblies), including static member functions, generic functions, asynchronous functions, etc.
- Easy to use, non-intrusive to business code, no need to modify any business code
- No limit on the number of fixes, multiple fixes can be made during app runtime. For example, after publishing version v1 and fixing, if other bugs are found, then publish version v2 for the fix

## Limitations and Defects

- Can only fix the function body, cannot modify type definitions (such as changing class names, adding or deleting fields, adding or deleting functions, modifying function signatures, etc.)
- Each fix will load a hot update assembly, and the memory of the previously loaded assembly cannot be released, causing some memory leaks

## Usage

Call the `RuntimeApi::HotfixAssembly` function to complete the hotfix, example code is as follows.

```csharp

public static void ApplyHotfix()
{
    byte[] hotfixDllBytes = LoadFromXXX("Hotfix");
    var hotfixTypes = new List<HotfixType>
    {
        // The full name of the class to be fixed, including the namespace (if any)
        name = "TestHotfixMethods",
        // The list of methods to be fixed
        methods = new List<HotfixMethod>
        {
            new HotfixMethod
            {
                // Fix by function name, if there are multiple functions with the same name, all will be fixed
                name = "Foo1",
            },
            new HotfixMethod
            {
                // Fix by function signature. Only one of name and signature should be provided, otherwise an error will occur
                signature = "Int32 Foo2(Int32, Int32)",
            },
        }
    };
}
```

When there are many dlls and functions that need to be fixed, this operation is tedious and prone to errors. It is recommended to first create a hotfix.manifest.xml configuration file, then convert it to the HotfixManifest class, and then use RuntimeApi.HotfixAssemblies to fix all at once, the code is similar to the following:

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
