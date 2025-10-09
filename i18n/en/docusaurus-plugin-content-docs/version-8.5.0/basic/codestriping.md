# Code Stripping

Unity uses [code stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) technology to help reduce package size for the il2cpp backend. If anti-stripping measures are not taken, since there is generally not much code in the AOT main project, a large number of C# types and functions are stripped, causing hot update calls to these stripped classes or functions to result in the following exceptions:

```txt
    // Type missing error
    Unity: TypeLoadException: Could not load type 'Xxx' from assembly 'yyy'

    // Function missing error
    MissingMethodException: xxxx
```

## Solution

Based on error logs, determine which type or function was stripped, and preserve this type or function in link.xml, or explicitly add calls to these classes or functions in the main project.
If you're not familiar with how to preserve types or functions in link.xml, please refer to [code stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html).

However, this method is ultimately cumbersome. In actual projects, there are a large number of stripped types, and you repeatedly perform "build-type missing-supplement-build" operations,
wasting too much time. The `com.code-philosophy.hybridclr` package provides a convenient menu command `HybridCLR/Generate/LinkXml`,
which can generate all AOT type and function references in the hot update project with one click.

:::caution
Note that if your main project has never referenced any code from an assembly, that assembly will be completely stripped even if preserved in `link.xml`. Therefore, for each AOT assembly to be preserved,
please ensure that some class or function from it has been explicitly referenced in the main project code.
:::

## AOT Type and Function Reservation

Although the `HybridCLR/Generate/LinkXml` command in com.code-philosophy.hybridclr can intelligently scan the AOT types you currently reference, it cannot predict the types you will use in the future. Therefore, you still need to plan ahead and reserve types you may use in the future in `Assets/link.xml` (Note! Not the automatically generated link.xml).
Be sure not to miss anything, to avoid the embarrassing situation where types used in a certain update after going live are stripped!


## Check if Hot Update Code References Stripped Types or Functions

As long as `HybridCLR/Generate/All` is correctly executed when building the game, running the hot update code at that time will not encounter missing types or functions. However, as hot update code continues to iterate, it may access stripped types or functions. If this can be detected in advance when releasing hot update code, problems can be discovered and resolved early.

Starting from v5.0.0, the `HybridCLR.Editor.HotUpdate.MissingMetadataChecker` class is provided to check if stripped types and functions are accessed. Example code is as follows:

```csharp
        public static void CheckAccessMissingMetadata()
        {
            BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
            // aotDir points to the stripped aot dll directory generated when building the main package, not the latest SettingsUtil.GetAssembliesPostIl2CppStripDir(target) directory.
            // Generally speaking, when releasing hot update packages, since generate/all may have been called in between, the SettingsUtil.GetAssembliesPostIl2CppStripDir(target) directory contains the latest aot dlls,
            // which definitely cannot detect type or function stripping issues.
            // After building the main package, the aot dlls at that time need to be saved for later supplemental metadata or stripping checks.
            string aotDir = SettingsUtil.GetAssembliesPostIl2CppStripDir(target);

            // The 2nd parameter hotUpdateAssNames is the hot update assembly list. For the flagship version, this list needs to include DHE assemblies, i.e., SettingsUtil.HotUpdateAndDHEAssemblyNamesIncludePreserved.
            var checker = new MissingMetadataChecker(aotDir, SettingsUtil.HotUpdateAssemblyNamesIncludePreserved);

            string hotUpdateDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
            foreach (var dll in SettingsUtil.HotUpdateAssemblyFilesExcludePreserved)
            {
                string dllPath = $"{hotUpdateDir}/{dll}";
                bool notAnyMissing = checker.Check(dllPath);
                if (!notAnyMissing)
                {
                    // DO SOMETHING
                }
            }
        }

```

