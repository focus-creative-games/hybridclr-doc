# DOTS支持

DOTS的TypeManager初始化时机过早，而且不支持动态注册Component和System等类型。为了让热更新模块能在DOTS系统中正常
运行，需要对DOTS源码进行修改，调整World的的初始化时机。

## 支持的版本

由于DOTS仍然在快速迭代和修改，为了减少维护成本，只维护以下几个版本的com.unity.entities：

- 0.51.1-preview.21
- 1.0.16

目前仅在Unity 2021+版本上完成测试，Unity 2020及更低版本未测试兼容性。一般来说，只要对应版本的com.unity.entities能
在该Unity版本上正常运行，也能支持hybridclr。

有特殊DOTS版本需求的开发者，由于维护单独的DOTS版本成本较高，需要联系我们单独付费定制。


## 支持的特性

目前绝大多数DOTS特性都可以在hybridclr下正常运行，只有跟BurstCompile及资源序列化相关的特性支持较差。

### 1.0.16版本

|特性|社区版本|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|Aspect|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

### 0.51.1-preview.21版本

|特性|社区版本|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component|✔|✔|✔|✔|
|Unmanaged Component|✔|✔|✔|✔|
|Managed System|✔|✔|✔|✔|
|Unmanaged System|✔|✔|✔|✔|
|IJobEntity|✔|✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

## 安装

### 安装com.unity.entities

- 在项目中移除 com.unity.entities包，退出Unity Editor，清空 `Library\PackageCache` 目录下该包对应的目录
- 根据项目使用的版本，下载[修改后的com.unity.entities](https://code-philosophy.feishu.cn/file/NH0cbaeneozfd8xdbvmcLNvfn2d)，将对应目录下的`com.unity.entities.7z` 解压到 Packages目录。请确保解压后的目录名为com.unity.entities。

重新打开Unity Editor时可能会提示是否要进行Api升级，根据项目情况自行决定是否升级。

### 修改项目设置

为了避免DOTS运行过程中带动态注册Component或System可能引发的问题，需要调整World的初始化时机以确保运行所有World之前已经注册了所有热更新类型。

在`Player Settings`的`Scripting Define Symbols`中，添加编译宏 `UNITY_DISABLE_AUTOMATIC_SYSTEM_BOOTSTRAP_RUNTIME_WORLD`。详细介绍可以参见World的
[自定义初始化文档](https://docs.unity3d.com/Packages/com.unity.entities@0.51/manual/world.html)。

### 初始化

为了避免遇到问题，请在**加载完热更新代码后，运行任何dots代码之前**进行初始化。

初始化中主要包含两部分：

- 注册热更新的dots类型
- 初始化World

不同的com.unity.entities版本的初始化实现略有差别。

0.51.1版本初始化代码如下：

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies为所有包含自定义Component、System等DOTS类型的AOT和热更新程序集
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<System.Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddNewComponentTypes(componentTypes.ToArray());
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);

    }
```

1.0.16版本的初始化代码如下：

```csharp
    private static void InitializeWorld()
    {
#if !UNITY_EDITOR
        // dotsAsseemblies为所有包含自定义Component、System等DOTS类型的AOT和热更新程序集
        var dotsAssemblies = new Assembly[] { ... };
        var componentTypes = new HashSet<Type>();
        TypeManager.CollectComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.AddComponentTypes(dotsAssemblies, componentTypes);
        TypeManager.RegisterSystemTypes(dotsAssemblies);
        TypeManager.InitializeSharedStatics();
        TypeManager.EarlyInitAssemblies(dotsAssemblies);
#endif


        DefaultWorldInitialization.Initialize("Default World", false);
    }
```

### 解决ReversePInvokeCallback的问题

DOTS系统初始化Unmanaged System时会尝试获得它的OnStart之类函数的Marshal指针。hybridclr需要为每个这种函数绑定一个运行时唯一的cpp函数指针，
否则运行过程中会出现`GetReversePInvokeWrapper fail. exceed max wrapper num of method`错误。详细介绍可见[HybridCLR+lua/js/python](https://www.hybridclr.cn/docs/basic/workwithscriptlanguage)文档。

简单来说，需要预留足够多的 SystemBaseRegistry.ForwardingFunc对应的 wrapper函数。在热更新模块（也可以在DHE程序集，但不能在AOT程序集）中添加如下代码：

```csharp
public static class PreserveDOTSReversePInvokeWrapper
{
    [ReversePInvokeWrapperGeneration(100)]
    [MonoPInvokeCallback(typeof(SystemBaseRegistry.ForwardingFunc))]
    public static void ForwordMethod(IntPtr system, IntPtr state)
    {

    }
}


```

将代码中的100改为一个适当的数字即可，推荐为Unmanaged System类型个数的5-10倍。


### Burst相关

- 包含`[BurstCompile]`的热更新函数发生变化，需要去掉`[BurstCompile]`特性，否则运行会报错。这个问题后面可能会优化
