# 使用泛型

HybridCLR完整支持泛型特性，没有任何限制。

## 使用热更新中定义的泛型类或函数

直接使用即可。

## 使用AOT中定义的泛型类或函数

关于AOT泛型问题的详细原理请阅读[AOT泛型](/basic/aotgeneric.md)。

如果AOT中已经有代码实例化过某个泛型类或者函数，则热更新中可以直接使用，例如：

```csharp

// AOT 中已经用过List<float>泛型
class Foo
{
    public void Run()
    {
        var arr = new List<float>();
    }
}

// 热更新中可以使用 List<float>
class HotUpdateGenericDemos
{
    public void Run()
    {
        var arr = new List<float>();
    }
}

```

但如果AOT中没有实例化过某个AOT泛型类或者函数，解决办法有几种：

1. 在AOT代码添加相应的实例化代码。
1. **补充元数据技术**。 这是HybridCLR的专利技术，社区版本也能使用。
1. `full generic sharing` 完全泛型共享技术，相比补充元数据技术，工作流更简单，既不需要随包携带或者下载补充元数据dll，也不需要加载补充元数据dll，包体大小和内存都明显降低。该技术目前只在商业化版本提供。


对于方法1，有几个致命缺陷：

- AOT代码中添加实例化代码需要重新打包，不仅开发期很麻烦，上线后短期内重新发主包是不现实的。
- 泛型参数有可能是热更新类型，不可能在AOT中提前实例化。例如你在热更新代码中定义了` struct MyVector3 {int x, y, z;}`，你不可能在AOT中提前实例化`List<MyVector3>`。

`补充元数据技术`彻底解决了这个问题。粗略地说，你补充AOT泛型类（或泛型函数）的原始元数据后，就可以任意实例化这个泛型类了。以上面`List<MyVector3>`为例，你补充了List类（而不是MyVector3）所在的`mscorlib.dll`元数据后，就可以在热更新代码中使用任意`List<T>`泛型类了。

补充元数据技术的缺陷是增大了包体或者需要额外下载补充元数据dll，导致工作流复杂一些，另外还多占用了内存。`full generic sharing` 又进一步解决补充元数据的这些缺陷。由于`full generic sharing`是商业化方案，这儿限于篇幅只介绍补充元数据的用法。

## 获得补充元数据dll

**打包过程**生成的裁剪后的AOT dll可以用于补充元数据。com.code-philosophy.hybridclr插件会自动把它们复制到`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`。

:::danger
不同BuildTarget的裁剪AOT dll不可复用。
:::

使用`HybridCLR/Generate/AotDlls`命令也可以立即生成裁剪后的AOT dll，它的工作原理是通过导出一个Temp工程来获得裁剪AOT dll。

从`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`目录获得你所需要的补充元数据dll，加入项目的热更新资源管理系统。示例项目出于演示起见，将它们放到StreamingAssets目录下。
以`List<T>`类型为例，它需要补充`mscorlib.dll`。将`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}/mscorlib.dll`复制到`Assets/StreamingAssets/mscorlib.dll.bytes`。

## 执行补充元数据

使用`com.code-philosophy.hybridclr`包中的`HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly`函数为AOT泛型补充元数据。
元数据只需要补充一次，推荐在执行任何热更新代码前。`LoadDll.cs`最终变成类似如下。

```csharp

public class LoadDll : MonoBehaviour
{

    void Start()
    {
        // 先补充元数据
        LoadMetadataForAOTAssemblies();
      // Editor环境下，HotUpdate.dll.bytes已经被自动加载，不需要加载，重复加载反而会出问题。
#if !UNITY_EDITOR
        Assembly hotUpdateAss = Assembly.Load(File.ReadAllBytes($"{Application.streamingAssetsPath}/HotUpdate.dll.bytes"));
#else
      // Editor下无需加载，直接查找获得HotUpdate程序集
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
            "System.Core.dll", // 如果使用了Linq，需要这个
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

现在你可以在热更新代码随意使用AOT泛型了。

:::tip

请保存打包时生成的裁剪后的AOT dll（一般在`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`目录下）。如果需要补充元数据时使用这些保存的AOT dll。

打包完成后，补充元数据dll不会发生变化，请**不要在每次热更新时使用最新生成的AOT dll**。

:::

## 优化补充元数据dll大小

默认生成的补充元数据dll中包含了大量补充元数据机制不需要的数据，自v4.0.16版本起支持对补充元数据dll进行剔除优化，详细文档见[AOT泛型](../basic/aotgeneric)。
