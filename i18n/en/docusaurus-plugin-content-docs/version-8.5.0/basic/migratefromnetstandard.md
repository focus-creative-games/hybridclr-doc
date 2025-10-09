# Migrating from netstandard to .Net Framework

During Unity's packaging process, all references to netstandard.dll are converted to final references like mscorlib.dll, causing the original code's reference relationships to differ significantly from the final reference relationships. This difference causes the `Generate/All/*` commands to run with errors. Additionally, since the hot update dlls compiled by `HybridCLR/CompileDll/*` commands still reference `netstandard` rather than the final assemblies like mscorlib, loading and running hot update dlls will result in errors where types in netstandard cannot be found. Therefore, HybridCLR defaults to requiring the use of `Net Framework` Api Level.

Some projects originally worked on .net standard Api Level. To work properly after integrating HybridCLR, some migration work needs to be performed.
Fortunately, this work is one-time only.

## Migration Steps

Migration mainly includes two steps:

- Convert pre-compiled netstandard-based dlls in the project to .net framework-based dlls
- Switch the project's Api Level to .Net Framework


## Converting External netstandard-based DLLs

If you can directly find a .Net Framework-based version of the external dll, simply replace the corresponding dll in the project. If you can't find one,
you can utilize Unity's packaging process feature that generates final .Net Framework-based aot dlls to generate
the .Net Framework version of that dll. Specific operations are as follows:

- Ensure the main project has code that references this external dll, not just hot update code referencing the dll
- Preserve this dll in any link.xml, such as adding `<assembly fullname="xxx.dll" preserve="all"/>` in `Assets/link.xml`
- Run `HybridCLR/Generate/AOTDlls`
- Obtain the corresponding file for that dll in the stripped directory `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`
- Replace the corresponding dll in the project with this dll


