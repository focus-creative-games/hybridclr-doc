# Getting Started 

Almost identical to the community version of [Quickstart](../../beginner/quickstart.md), this document only introduces the differences.

## Install

- After decompressing hyridclr_unity, put it in the project Packages directory and rename it to com.code-philosophy.hybridclr
- Decompress the corresponding `libil2cpp-{version}.7z` according to your unity version
- Open `HybridCLR/Installer`, turn on the `Copy libil2cpp from Local` option, select the libil2cpp directory you just decompressed, and install it
- **Unity 2022+ version needs to use the modified version of UnityEngine.CoreModule.dll**, see [Modify dll](modifydll.md) for details

![installer](/img/hybridclr/ultimate-installer.jpg)

## Enable full generic sharing

- The 2020 version does not support fully generic sharing
- The 2021 version needs to set the IL2CPP Code Generation option to `faster(smaller)`
- Full generic sharing is enabled by default in the 2022 version and cannot be turned off. If you set the IL2CPP Code Generation option to `faster(smaller)`, you can further reduce the package body.

## used in the code

Call `RuntimeApi.UnloadAssembly` to unload the assembly, call `Assembly.Load` to reload the assembly. It is currently not supported to load the assembly again without unloading the assembly, the sample code is as follows:

```csharp
     // first load
     Assembly ass = Assembly. Load(yyy);

     // execute some code
     Type mainType = ass. GetType("Entry");
     mainType. GetMethod("Main"). Invoke(null, null);

     // first uninstall
     RuntimeApi. UnloadAssembly(ass);

     // second load
     Assembly newAss = Assembly. Load(yyy);

     // execute some code
     Type mainType = ass. GetType("Entry");
     mainType. GetMethod("Main"). Invoke(null, null);

     // second uninstall
     RuntimeApi. UnloadAssembly(ass);
```

## Precautions

- It is easy for async or coroutines to implicitly keep references to the unloaded assembly code in other threads. Be sure to clean up all async or coroutine functions before unloading
- OnClick or various callback events of the UI can easily cause references to the uninstall assembly to be kept, so it must be cleaned up
- Registered to the global event or other elevation, it is easy to accidentally keep a reference to the uninstall assembly, be sure to clean it up