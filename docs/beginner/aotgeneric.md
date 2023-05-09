# 使用泛型

HybridCLR完整支持泛型特性，没有任何限制。

## 使用热更新中定义的泛型类或者函数

此时没有任何限制，直接使用即可。示例如下：

```csharp

class Foo
{
    // 普通类里的泛型函数
    public T Empty<T>()
    {
      return default(T);
    }
}

class MyList<T>
{
    // 泛型类里的普通函数
    public T Get(int index)
    {
        return default(T);
    }

    // 泛型类里的泛型函数
    public Dictionary<K, T> NewList<K>()
    {
        return new Dictionary<K, T>();
    }
}

class HotUpdateGenericDemos
{
    public void Run()
    {
        // 使用热更新泛型的示例代码
        Foo.Empty<int>();
        var list = new MyList<Foo>();
        Foo v = list.Get(1);
        Dictionary<int, Foo> dic = list.NewList<int>();
    }
}

```

## 使用AOT中定义的泛型类或者函数

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
        // 使用热更新泛型的示例代码
        var arr = new List<float>();
    }
}

```

但如果AOT中没有实例化过某个AOT泛型类或者函数，则需要作一定的处理。解决办法有两种：

- 在AOT代码添加相应的实例化代码
- **补充元数据技术**。 这是HybridCLR的专利技术。

关于AOT泛型问题的详细原理请阅读[AOT泛型处理](/basic/aotgeneric.md)。

对于方法1，有几个硬伤：

- AOT代码中添加实例化代码需要重新打包，不仅开发期很麻烦，上线后短期内重新发主包是不现实的。
- 泛型参数有可能是热更新类型，不可能在AOT中提前实例化。例如你在热更新定义了` struct MyVector3 {int x, y, z;}`，你不可能在AOT中提前实例化`List<MyVector3>`。

`补充元数据技术`彻底解决了这个问题。粗略地说，你补充AOT泛型类的原始元数据后，就可以任意实例化这个泛型类了。以上面`List<MyVector3>`为例，你补充了List类所在的`mscorlib.dll`元数据后，就可以在热更新代码中使用任意`List<T>`泛型类了。


## 代码中执行补充元数据

使用`com.focus-creative-games.hybridclr_unity`包中的`HybridCLR.RuntimeApi.LoadMetadataForAOTAssembly`函数为AOT泛型补充元数据。

元数据只需要补充一次。你可以参考 hybridclr_trial 项目了解具体的使用方式。

```csharp

    // 根据你要补充的泛型类所在的assembly，实践中可能要扩充，例如添加 "UniTask.dll"
    public static List<string> AOTMetaAssemblyNames { get; } = new List<string>()
    {
        "mscorlib.dll",
        "System.dll",
        "System.Core.dll",
    };

    private static void LoadMetadataForAOTAssemblies()
    {
        // 不限补充元数据dll文件的读取方式，你可以从ab、StreamingAssets、或者裸文件下载等办法获得
        HomologousImageMode mode = HomologousImageMode.SuperSet;
        foreach (var aotDllName in AOTMetaAssemblyNames)
        {
            // GetAssetData 是一个具体项目中实现的函数，它用于读取补充元数据dll的所有字节
            byte[] dllBytes = GetAssetData(aotDllName); // 获得某个aot dll文件所有字节
            // 加载assembly对应的dll，会自动为它hook。一旦aot泛型函数的native函数不存在，用解释器版本代码
            LoadImageErrorCode err = RuntimeApi.LoadMetadataForAOTAssembly(dllBytes, mode);
            Debug.Log($"LoadMetadataForAOTAssembly:{aotDllName}. mode:{mode} ret:{err}");
        }
    }
```

推荐在执行热更新代码前，调用 LoadMetadataForAOTAssemblies 补充元数据。

## 获得补充元数据dll

**打包过程**生成的裁剪后的AOT dll可以用于补充元数据。hybridclr_unity插件会自动把它们复制到`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`。注意，不同BuildTarget的裁剪AOT dll不可复用。

使用`HybridCLR/Generate/AotDlls`命令也可以立即生成裁剪后的AOT dll，它的工作原理是通过导出一个Temp工程来获得裁剪AOT dll。

从`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`目录获得你所需要的补充元数据dll，加入项目的热更新资源管理系统，再通过 LoadMetadataForAOTAssemblies 加载它们。

## 应该补充元数据的assembly列表

`HybridCLR/generate/AOTGenericReference` 命令生成的 AOTGenericReferences.cs 文件中包含了应该补充元数据的assembly列表，你不需要运行游戏也能快速知道应该补充哪些元数据。

文件内容类似这样：

```csharp
	// {{ AOT assemblies
	// Main.dll
	// System.Core.dll
	// UnityEngine.CoreModule.dll
	// mscorlib.dll
	// }}
```

