# Quick Start

This is almost identical to the community version of the [Quick Start](../../beginner/quickstart.md), and this document only describes the differences.

## Installation

- Unzip hybridclr_unity and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Put the hybridclr directory after unzipping `hybridclr.zip` into the libil2cpp directory after unzipping `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, turn on the `Copy libil2cpp from local` option, select the libil2cpp directory just unzipped, and install it

![installer](/img/hybridclr/ultimate-installer.jpg)

## Use in code

Call `RuntimeApi.TryUnloadAssembly or RuntimeApi.ForceUnloadAssembly` Unload the assembly and reload it using `Assembly.Load`. The assembly must be successfully unloaded before it can be loaded again.

There are currently two unloading workflows:

- TryUnloadAssembly
- ForceUnloadAssembly

### TryUnloadAssembly

Try to unload. If there is a reference to the object in the unloaded assembly in the AppDomain, keep the status quo and return failure, otherwise return success.

The sample code is as follows:

```csharp

// First load
Assembly ass = Assembly.Load(yyy);

// Execute some code
Type mainType = ass.GetType("Entry");
mainType.GetMethod("Main").Invoke(null, null);

// First unload
// The printObjectReferenceLink parameter is true, which means that when the unloading fails, a detailed reference chain log of illegal objects will be printed, which is convenient for developers to locate where illegal references are maintained.
// It is recommended to set it to true only during the development period and change it to false after the official launch
if (!RuntimeApi.TryUnloadAssembly(ass, true))
{
    throw new Exception("unload fail");
}

// Second load
Assembly newAss = Assembly.Load(yyy);

// Execute some code
Type mainType = ass.GetType("Entry");
mainType.GetMethod("Main").Invoke(null, null);

// Second uninstall
if (!RuntimeApi.TryUnloadAssembly(ass, true))
{
    throw new Exception("unload fail");
}
```

### ForceUnloadAssembly

Force uninstallation, even if there are references to objects in the uninstalled assembly in the AppDomain. Returning true means there is no problem, and returning false means that an illegal reference was detected during the uninstallation process. If false is returned, it may crash after running for a period of time. Use this operation with caution, and it is recommended to communicate with official technical support in detail.

```csharp

// Load for the first time
Assembly ass = Assembly.Load(yyy);

// Execute some code
Type mainType = ass.GetType("Entry");
mainType.GetMethod("Main").Invoke(null, null);

// Uninstall for the first time
// The ignoreObjectReferenceValidation parameter is true, which means that illegal object references are not checked during the uninstall process, which can shorten the uninstall time. However, it is recommended to use false regardless of the development period or the official release
// The printObjectReferenceLink parameter is true, which means that when the uninstall fails, a detailed illegal object reference chain log will be printed, which is convenient for developers to locate where the illegal reference is maintained. It is recommended to set it to true only during the development period and change it to false after the official launch
if (!RuntimeApi.ForceUnloadAssembly(ass, false, true))
{
    throw new Exception("unload fail");
}

// Second load
Assembly newAss = Assembly.Load(yyy);

// Execute some code
Type mainType = ass.GetType("Entry");
mainType.GetMethod("Main").Invoke(null, null);

// Second uninstall
if (!RuntimeApi.ForceUnloadAssembly(ass, false, true))
{
    throw new Exception("unload fail");
}
```

## Notes

- Async or coroutines can easily implicitly keep references to the uninstalled assembly code in other threads. Please be sure to clean up all asynchronous or coroutine functions before uninstalling
- UI OnClick or various callback events can easily keep references to the uninstalled assembly, so be sure to clean them up
- Registering to global events or other heightening can easily accidentally keep references to uninstalled assemblies, so be sure to clean them up.
- Clean up illegal references in the code according to the illegal reference logs printed during the uninstall process
