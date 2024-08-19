# 代码中使用


## RuntimeApi::LoadOriginalDifferentialHybridAssembly

:::tip

自v6.6.0版本支持接口。

:::

在初次构建App未发生任何代码更新，或者说虽然有代码更新，但该DHE程序集的代码没有更新时，可以调用此接口，表示完全使用原始AOT实现。


示例代码：

```csharp
    string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
    // 如果不存在，则使用原始AOT程序集
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

当某个DHE程序集代码发生变化时，需要用此接口加载DHE程序集。注意，不能使用Assembly.Load加载DHE程序集，会出错。

该接口有两个参数: currentDllBytes和optionBytes。

- currentDllBytes为最新的DHE程序集文件的字节
- optionBytes 为dhao文件的字节。[dhao文件](./dhao)包含了DHE的变化信息，用于指示哪些函数以aot模式运行，哪些以解释方式执行。

```csharp

        string assFile = $"{Application.streamingAssetsPath}/{assName}.dll.bytes";
        // 如果不存在，则使用原始AOT程序集
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


## 注意事项：

- 即使DHE程序集没有发生改变，在运行DHE程序集中任何代码前，仍然要显式执行RuntimeApi::LoadOriginalDifferentialHybridAssembly
- 要按照assembly的依赖顺序LoadOriginalDifferentialHybridAssembly或LoadDifferentialHybridAssemblyUnchecked加载 DHE程序集
- RuntimeApi::LoadOriginalDifferentialHybridAssembly 加载的DHE程序集为普通AOT程序集，如果其他热更新程序集中引用了该DHE程序集中的泛型，并且没有开启完全泛型共享，则会与普通AOT程序集一样出现AOT泛型问题，可以使用完全泛型共享或者补充元数据机制解决
- RuntimeApi::LoadDifferentialHybridAssemblyUnchecked 加载的DHE程序集本身已经包含了元数据，即使未开启完全泛型共享时也**不要对DHE程序集进行补充元数据**，补充了也会失败，其他非DHE的AOT程序集可以照常补充元数据。

