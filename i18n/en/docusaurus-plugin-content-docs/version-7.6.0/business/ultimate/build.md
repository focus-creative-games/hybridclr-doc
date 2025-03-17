# Build and hot update

The files related to the build in DHE technology are dhe dll files and corresponding dhao files.

## Build the game

Since the code in all DHE assemblies in the first package has not changed, no DHE-related dll or dhao files are needed in the game building workflow.

- Run `HybridCLR/Generate/All`
- Build the game
- Back up all assemblies in the `HybridCLRData\AssembliesPostIl2CppStrip\{buildTarget}` directory and add them to the version management system. These original dll files will be needed when hot updating to generate dhao files in the future

## Hot Update

- Use `HybridCLR/CompileDll/ActivedBuildTarget` to generate hot update dlls.
- Use `HybridCLR.Editor.DHE.BuildUtils.GenerateDHAODatas` to generate the latest hot update dll dhao files. If you need to encrypt the DHE assembly, use `HybridCLR.Editor.DHE.BuildUtils.EncryptDllAndGenerateDHAODatas` to generate the encrypted DLL and the corresponding DHA file.
- Add the latest hot update DLL (or encrypted DLL) and DHA file to the hot update resource management system. Note that the original DLL file is not needed at runtime, so please do not add the backed-up original DLL to the hot update resource management system.

:::caution

If you use the **development build option** to build the game, please be sure to use `HybridCLR/CompileDll/ActivedBuildTarget_Development` to compile the hot update DLL in Development mode.
Otherwise, due to the large difference between the developmentemnt and non-development compiled DLLs, almost all functions will be calculated as changes.

:::
