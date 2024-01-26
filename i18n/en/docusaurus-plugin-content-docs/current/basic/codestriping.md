# Code Stripping

Unity uses [Code Stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html) technology to help reduce the package size of the il2cpp backend. If anti-cutting processing is not performed, since there are generally not many codes in the AOT main project, a large number of C# types and functions are
Clipping, resulting in the following exceptions when calling these clipped classes or functions during hot update:

```txt
     // missing type error
     Unity: TypeLoadException: Could not load type 'Xxx' from assembly 'yyy'

     // missing function error
     MissingMethodException: xxxx
```

## Solution

Determine which type or function is cut according to the log error log, keep this type or function in link.xml, or explicitly add calls to these classes or functions in the main project.

If you are not familiar with how to preserve this type or function in link.xml, please refer to [Code Stripping](https://docs.unity3d.com/Manual/ManagedCodeStripping.html).

But this method is very troublesome after all. There are a lot of cut types in the actual project, and you perform the operation of "package-type missing-supplement-package" over and over again,
Too much time wasted. `com.code-philosophy.hybridclr` package provides a convenient menu command `HybridCLR/Generate/LinkXml`,
All AOT types and function references in the hot update project can be generated with one click.

Note that if you don't have any code referencing an assembly in your main project, even if it is kept in `link.xml`, the assembly will be completely trimmed. So for each AOT assembly to keep,
Make sure to explicitly reference one of its classes or functions in the main project code.

## AOT type and function reserved

Although the `HybridCLR/Generate/LinkXml` command of com.code-philosophy.hybridclr can intelligently scan out the AOT type you are currently referencing, it cannot predict the AOT type you will use in the future
type. Therefore, you still need to plan ahead in `Assets/link.xml` (note! Not the automatically generated link.xml) to reserve your future
types that may be used. Remember not to miss it, so as to avoid the embarrassing situation that the type used in a certain update is cut after it goes online!

## Check whether the pruned type or function is referenced in the hot update code

As long as `HybridCLR/Generate/All` is executed correctly when building the game, running the hot update code at that time will not cause problems with missing types or functions. But as the subsequent hot update code continues to iterate,
It is possible that a clipped type or function was accessed. If you can check it in advance when hot update code is released, problems can be discovered and solved early.

Since version v5.0.0, the `HybridCLR.Editor.HotUpdate.MissingMetadataChecker` class is provided to check whether clipped types and functions are accessed. The sample code is as follows:

```csharp
         public static void CheckAccessMissingMetadata()
         {
             BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
             // aotDir is the stripped aot dll directory generated when building the main package, not the latest SettingsUtil.GetAssembliesPostIl2CppStripDir(target) directory.
             // Generally speaking, when releasing a hot update package, since generate/all may have been called in the middle, the SettingsUtil.GetAssembliesPostIl2CppStripDir(target) directory contains the latest aot dll.
             // Definitely cannot check for type or function pruning issues.
             // After building the main package, you need to save the aot dll at that time for later supplementary metadata or cropping inspection.
             string aotDir = "xxxx";
            
             // The second parameter excludeDllNames is the aot dll to be excluded. Generally, an empty list will suffice. For ultimate edition users,
             // excludeDllNames needs to be the dhe assembly list, because the dhe assembly will be hot updated, and the hot update code
             // The type or function in the referenced dhe assembly must exist.
             var checker = new MissingMetadataChecker(aotDir, new List<string>());

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
