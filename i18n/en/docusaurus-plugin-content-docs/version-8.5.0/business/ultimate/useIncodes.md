# Using in Code


## RuntimeApi::LoadOriginalDifferentialHybridAssembly

:::tip

Supported since v6.6.0.

:::

When building the app for the first time without any code updates, or when there are code updates but the code in this DHE assembly hasn't changed, you can call this interface to indicate that the original AOT implementation should be used completely.


Example code:

```csharp
    string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
    // If it doesn't exist, use the original AOT assembly
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

When the code of a DHE assembly changes, you need to use this interface to load the DHE assembly. Note that you cannot use Assembly.Load to load DHE assemblies, as it will cause errors.

This interface has two parameters: currentDllBytes and optionBytes.

- currentDllBytes is the byte array of the latest DHE assembly file
- optionBytes is the byte array of the dhao file. The [dhao file](./dhao) contains the change information for DHE, used to indicate which functions run in AOT mode and which execute interpretively.

```csharp

        string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
        // If it doesn't exist, use the original AOT assembly
        if (File.Exists(assFile))
        {
            byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dll.bytes");
            byte[] dhaoBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{assName}.dhao.bytes");
            LoadImageErrorCode err = RuntimeApi.LoadDifferentialHybridAssemblyUnchecked(dllBytes, dhaoBytes);
            if (err == LoadImageErrorCode.OK)
            {
                Debug.Log($"LoadDifferentialHybridAssembly {assName} OK");
            }
            else
            {
                Debug.LogError($"LoadDifferentialHybridAssembly {assName} failed, err={err}");
            }
        }

```


## Notes

- Even if the DHE assembly hasn't changed, you still need to explicitly execute RuntimeApi::LoadOriginalDifferentialHybridAssembly before running any code in the DHE assembly
- You must load DHE assemblies using LoadOriginalDifferentialHybridAssembly or LoadDifferentialHybridAssemblyUnchecked in the order of assembly dependencies
- DHE assemblies loaded by RuntimeApi::LoadOriginalDifferentialHybridAssembly are ordinary AOT assemblies. If other hot update assemblies reference generics in this DHE assembly and full generic sharing is not enabled, the same AOT generic issues as ordinary AOT assemblies will occur, which can be resolved using full generic sharing or supplemental metadata mechanisms
- DHE assemblies loaded by RuntimeApi::LoadDifferentialHybridAssemblyUnchecked already contain metadata. Even when full generic sharing is not enabled, **do not supplement metadata for DHE assemblies** - supplementing will fail. Other non-DHE AOT assemblies can supplement metadata as usual.

