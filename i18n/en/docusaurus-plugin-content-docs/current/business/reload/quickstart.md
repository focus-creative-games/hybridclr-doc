# Quick Start

Almost identical to the [Quick Start](../../beginner/quickstart.md) of the Community Edition, this document only highlights the differences.

## Installation

- Extract hybridclr_unity and place it in the project's Packages directory, renaming it to com.code-philosophy.hybridclr.
- Extract the corresponding il2cpp_plus-{version}.zip based on your Unity version.
- Extract hybridclr.zip.
- Place the hybridclr directory from the extracted hybridclr.zip into the libil2cpp directory from the extracted il2cpp-{version}.zip.
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory that was just extracted, and proceed with the installation.

![installer](/img/hybridclr/ultimate-installer.jpg)

## Usage in Code

Use `RuntimeApi.UnloadAssembly` to unload the assembly and `Assembly.Load` to reload the assembly. Currently, reloading the same assembly without unloading it first is not supported. Example code:

```csharp
    // First load
    Assembly ass = Assembly.Load(yyy);

    // Execute some code
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // First unload
    RuntimeApi.UnloadAssembly(ass);

    // Second load
    Assembly newAss = Assembly.Load(yyy);

    // Execute some code
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // Second unload
    RuntimeApi.UnloadAssembly(ass);
```

## Notes

- async or coroutine functions easily hold references to unloaded assembly code on other threads, so make sure to clean up all async or coroutine functions before unloading.
- UI OnClick or various callback events easily hold references to unloaded assembly, so make sure to clean them up properly.
- Events or other registrations to the global scope can accidentally hold references to unloaded assembly, so make sure to clean them up properly.
- Based on the logs of illegal references printed in RuntimeApi.UnloadAssembly, clean up all illegal references in the code.
