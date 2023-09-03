# Migrate projects whose Api Level is netstandard

During the building pipeline, Unity will convert all references to netstandard.dll into final references such as mscorlib.dll, resulting in original code
The reference relationship is very different from the final reference relationship. This difference will cause the command under `Generate/All/*` to run incorrectly. At the same time due to
The hot update dll compiled by the `HybridCLR/CompileDll/*` command still references `netstandard` instead of the final mscorlib and other programs.
set, causing an error that the type in netstandard cannot be found when loading and running the hot update dll. Therefore, HybridCLR requires the use of `Net Framework` by default
API Level.

Some projects originally worked on the .net standard Api Level. In order to be able to work normally after being connected to HybridCLR, some migration work needs to be performed.
Fortunately, these tasks are one-time only.

## Migration steps

Migration mainly consists of two steps:

- Convert the precompiled netstandard-based dll in the project to the .net framework-based dll
- Switch the project's Api Level to .Net Framework


## Convert external dll based on netstarndard

If you can directly find the .Net Framework-based version of the external dll, just replace the dll corresponding to the project. If not found,
Then you can use Unity's building pipeline to generate the final aot dll based on .Net Framework, and generate the dll's
.Net Framework version. The specific operation is as follows:

- Make sure that the main project already has code that references this external dll, not just the dll that is referenced in the hot update code
- Preserve this dll in any link.xml, such as adding `<assembly fullname="xxx.dll" preserve="all"/>` in `Assets/link.xml`
- Run `HybridCLR/Generate/AOTDlls`
- Obtain the file corresponding to the dll in the clipping directory of `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`
- Use this dll to replace the corresponding dll in the project