# Using Generics

HybridCLR fully supports generic features without any limitations.

## Using Generic Classes or Functions Defined in Hot Updates

Use them directly.

## Using Generic Classes or Functions Defined in AOT

For detailed principles about AOT generic issues, please read [AOT Generics](/basic/aotgeneric.md).

If some generic class or function has already been instantiated in AOT code, it can be used directly in hot updates. For example:

```csharp

// AOT already used List<float> generic
class Foo
{
    public void Run()
    {
        var arr = new List<float>();
    }
}

// Hot update can use List<float>
class HotUpdateGenericDemos
{
    public void Run()
    {
        var arr = new List<float>();
    }
}

```

But if some AOT generic class or function hasn't been instantiated in AOT, there are several solutions:

1. Add corresponding instantiation code in AOT code.
2. **Supplementary metadata technology**. This is HybridCLR's patented technology, also available in the community version.
3. `Full generic sharing` complete generic sharing technology. Compared to supplementary metadata technology, the workflow is simpler, requiring neither carrying or downloading supplementary metadata dlls with the package, nor loading supplementary metadata dlls, with significantly reduced package size and memory usage. This technology is currently only available in commercial versions.

Method 1 has several fatal flaws:

- Adding instantiation code in AOT requires repackaging, which is not only troublesome during development but also unrealistic to rerelease the main package shortly after going live.
- Generic parameters might be hot update types, making it impossible to instantiate them in AOT in advance. For example, if you define `struct MyVector3 {int x, y, z;}` in hot update code, you cannot instantiate `List<MyVector3>` in AOT in advance.

`Supplementary metadata technology` completely solves this problem. Roughly speaking, after supplementing the original metadata of an AOT generic class (or generic function), you can instantiate this generic class arbitrarily. Using the above `List<MyVector3>` example, after supplementing the metadata of `mscorlib.dll` where the List class (not MyVector3) is located, you can use any `List<T>` generic class in hot update code.

The disadvantage of supplementary metadata technology is that it increases package size or requires additional downloading of supplementary metadata dlls, making the workflow more complex, and also consuming more memory. `Full generic sharing` further solves these defects of supplementary metadata. Since `full generic sharing` is a commercial solution, due to space limitations, only the usage of supplementary metadata is introduced here.

## Obtaining Supplementary Metadata DLLs

The stripped AOT dlls generated during the **packaging process** can be used for supplementary metadata. The com.code-philosophy.hybridclr plugin automatically copies them to `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`.

:::danger
Stripped AOT dlls from different BuildTargets cannot be reused.
:::

The `HybridCLR/Generate/AotDlls` command can also immediately generate stripped AOT dlls. It works by exporting a Temp project to obtain stripped AOT dlls.

Get the supplementary metadata dlls you need from the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}` directory and add them to your project's hot update resource management system. For demonstration purposes, the sample project places them in the StreamingAssets directory.
Taking the `List<T>` type as an example, it needs to supplement `mscorlib.dll`. Copy `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}/mscorlib.dll` to `Assets/StreamingAssets/mscorlib.dll.bytes`.

## Executing Supplementary Metadata

Use the `HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly` function in the `com.code-philosophy.hybridclr` package to supplement metadata for AOT generics.
Metadata only needs to be supplemented once, recommended before executing any hot update code. `LoadDll.cs` should look similar to the following:

```csharp

public class LoadDll : MonoBehaviour
{

    void Start()
    {
        // Supplement metadata first
        LoadMetadataForAOTAssemblies();
      // In Editor environment, HotUpdate.dll.bytes has been automatically loaded, no need to load, repeated loading will cause problems.
#if !UNITY_EDITOR
        Assembly hotUpdateAss = Assembly.Load(File.ReadAllBytes($"{Application.streamingAssetsPath}/HotUpdate.dll.bytes"));
#else
      // No need to load in Editor, directly find and get HotUpdate assembly
        Assembly hotUpdateAss = System.AppDomain.CurrentDomain.GetAssemblies().First(a => a.GetName().Name == "HotUpdate");
#endif
    
        Type type = hotUpdateAss.GetType("Hello");
        type.GetMethod("Run").Invoke(null, null);
    }

    private static void LoadMetadataForAOTAssemblies()
    {
        List<string> aotDllList = new List<string>
        {
            "mscorlib.dll",
            "System.dll",
            "System.Core.dll", // If using Linq, this is needed
            // "Newtonsoft.Json.dll", 
            // "protobuf-net.dll",
        };

        foreach (var aotDllName in aotDllList)
        {
            byte[] dllBytes = File.ReadAllBytes($"{Application.streamingAssetsPath}/{aotDllName}.bytes");
            int err = HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly(dllBytes, HomologousImageMode.SuperSet);
            Debug.Log($"LoadMetadataForAOTAssembly:{aotDllName}. ret:{err}");
        }
    }
}    
```

Now you can freely use AOT generics in hot update code.

:::tip

Please save the stripped AOT dlls generated during packaging (usually in the `{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}` directory). Use these saved AOT dlls when supplementary metadata is needed.

After packaging is complete, supplementary metadata dlls will not change. Please **do not use the latest generated AOT dlls for each hot update**.

:::

## Optimizing Supplementary Metadata DLL Size

The default generated supplementary metadata dlls contain a lot of data that the supplementary metadata mechanism doesn't need. Starting from version v4.0.16, optimization and trimming of supplementary metadata dlls is supported. For detailed documentation, see [AOT Generics](../basic/aotgeneric).
