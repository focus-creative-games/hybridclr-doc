# Hotfix

For trivial updates, such as a few lines of bug fixes, some projects may prefer dynamically patching the game during runtime rather than forcing players to restart the current game app. 

Currently, apart from the [hot reload version](./reload/intro), other versions do not support reloading hot update assemblies. Even in the hot reload version, due to its ability to completely unload and reload an assembly, it imposes many [restrictions and requirements](./reload/hotreloadassembly#unsupported-features-and-special-requirements) on code and significantly intrudes into business logic.

Hotfix technology specifically addresses these scenarios for dynamic bug patching. It allows runtime bug fixes for hot update modules in a seamless manner without intruding into business logic.

## Advantages

- Dynamically fix code bugs without restarting the game app.
- Can fix any code in hot update assemblies (including the flagship DHE assemblies), such as static member functions, generic functions, and asynchronous function.
- Simple to use, non-intrusive to business logic, and does not require modifying any business code.
- Unlimited fixes during app runtime. For example, after releasing version v1 with fixes, further bugs can be patched with a subsequent v2 release.

## Limitations and Drawbacks

- Can only modify function bodies, not type definitions (e.g., changing class names, adding or removing fields, functions, or modifying function signatures).
- Each patch loads a new hot update assembly, and memory from previously loaded assemblies cannot be released, leading to a certain degree of memory leakage.

## Usage

The `RuntimeApi::HotfixAssemblies` function can be called to apply the hotfix. Example code is as follows:

```csharp
            RuntimeApi.HotfixAssemblies(new HotfixManifest
            {
                assemblies = new List<HotfixAssembly>
                {
                    new HotfixAssembly
                    {
                        // Name of the target assembly to fix
                        name = "Hotfix",
                        // Content of the latest DLL file
                        hotfixAssemblyBytes = LoadDll.GetDllBytes("Hotfix.new.dll"),
                        // List of classes to fix
                        classes = new List<HotfixClass>
                        {
                            new HotfixClass
                            {
                                // Fully qualified name of the class, including namespace (if any)
                                name = "TestHotfixMethods",
                                // List of methods to fix
                                methods = new List<HotfixMethod>
                                {
                                    new HotfixMethod
                                    {
                                        // Fix by method name; if there are multiple methods with the same name, all will be fixed
                                        name = "Foo1",
                                    },
                                    new HotfixMethod
                                    {
                                        // Fix by method signature; either `name` or `signature` must be provided, but not both
                                        signature = "Int32 Foo2(Int32, Int32)",
                                    },
                                }
                            },
                            new HotfixClass
                            {
                                name = "TestHotfixCtors",
                                methods = new List<HotfixMethod>
                                {
                                    new HotfixMethod
                                    {
                                        // Constructor; if there are multiple constructors, all will be fixed
                                        name = ".ctor",
                                    },
                                    new HotfixMethod
                                    {
                                        // Constructor with a specific signature
                                        signature = ".ctor(Int32)",
                                    },
                                }
                            },
                            new HotfixClass
                            {
                                name = "TestHotfixStaticCtors",
                                methods = new List<HotfixMethod>
                                {
                                    new HotfixMethod
                                    {
                                        // Static constructor of the class
                                        name = ".cctor",
                                    },
                                }
                            },
                        }
                    }
                }
            });


Constructing the HotfixManifest directly in code is cumbersome and error-prone. It is recommended to first create an XML configuration file like the following example, and then convert it to the HotfixManifest class:

```xml
<manifest>
    <assembly fullname="Hotfix">
        <type fullname="TestHotfixMethods">
            <method name="Foo1"/>
            <method signature="Int32 Foo2(Int32, Int32)"/>
        </type>
    </assembly>
</manifest>
```

Currently, there is no provided code for converting XML to HotfixManifest, so developers need to implement this functionality themselves.
