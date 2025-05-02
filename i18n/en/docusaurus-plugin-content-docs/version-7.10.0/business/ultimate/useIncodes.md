# Use in code

## RuntimeApi::LoadOriginalDifferentialHybridAssembly

:::tip

The interface is supported since v6.6.0.

:::

When no code update occurs during the initial build of the App, or when there is a code update but the code of the DHE assembly is not updated, this interface can be called to indicate that the original AOT implementation is used completely.

Sample code:

```csharp
string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
// If it does not exist, use the original AOT assembly
if (!File.Exists(assFile))
{
LoadImageErrorCode err = RuntimeApi.LoadOriginalDifferentialHybridAssembly(assName);
if (err == LoadImageErrorCode.OK)
{
Debug.Log($"LoadOriginalDifferentialHybridAssembly {assName} OK");
}
else
{
Debug.LogError($"LoadOriginalDifferentialHybridAssembly {assName} failed, err={err}");
}
}
```

## RuntimeApi::LoadDifferentialHybridAssemblyUnchecked

When a DHE assembly code changes, this interface is needed to load the DHE assembly. Note that you cannot use Assembly.Load to load the DHE assembly, which will result in an error.

This interface has two parameters: currentDllBytes and optionBytes.

- currentDllBytes is the bytes of the latest DHE assembly file

- optionBytes is the bytes of the dhao file. [dhao file](./dhao) contains DHE change information, which is used to indicate which functions run in aot mode and which are executed in interpreted mode.

```csharp string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes"; // If it does not exist, use the original AOT assembly if (File.Exists(assFile)) { byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes"); byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes"); LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyUnchecked(dllBytes, dhaoBytes); if (err == LoadImageErrorCode.OK) { Debug.Log($"LoadDifferentialHybridAssembly {assName} OK" ); } else { Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
}
}

```

## Notes:

- Even if the DHE assembly has not changed, RuntimeApi::LoadOriginalDifferentialHybridAssembly must be explicitly executed before running any code in the DHE assembly
- LoadOriginalDifferentialHybridAssembly or LoadDifferentialHybridAssemblyUnchecked to load the DHE assembly in the order of assembly dependencies
- The DHE assembly loaded by RuntimeApi::LoadOriginalDifferentialHybridAssembly is a normal AOT assembly. If the generics in the DHE assembly are referenced in other hot update assemblies and full generic sharing is not enabled, the AOT generic problem will occur like a normal AOT assembly. This can be solved by using full generic sharing or supplementary metadata mechanism
- The DHE assembly loaded by RuntimeApi::LoadDifferentialHybridAssemblyUnchecked already contains metadata. Even if full generic sharing is not enabled, do not add metadata to the DHE assembly. It will fail if added. Other non-DHE AOT assemblies can add metadata as usual.
