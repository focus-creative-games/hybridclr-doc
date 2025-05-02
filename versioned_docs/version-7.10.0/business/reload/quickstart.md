# 快速上手

与社区版本的[快速上手](../../beginner/quickstart.md)几乎完全相同，本文档只介绍不同之处。

## 安装

- 将hybridclr_unity解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下
- 打开 `HybridCLR/Installer`，开启`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装

![installer](/img/hybridclr/ultimate-installer.jpg)


## 代码中使用

调用 `RuntimeApi.TryUnloadAssembly或者RuntimeApi.ForceUnloadAssembly` 卸载程序集，使用`Assembly.Load`重新加载程序集。必须成功卸载程序集后才能再次加载该程序集。

当前有两种卸载工作流：

- TryUnloadAssembly 
- ForceUnloadAssembly

### TryUnloadAssembly

尝试卸载，如果AppDomain中存在对被卸载程序集中对象的引用，则保持现状，返回失败，否则返回成功。

示例代码如下：

```csharp

    // 第一次加载
    Assembly ass = Assembly.Load(yyy);

    // 执行一些代码
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // 第一次卸载
    // printObjectReferenceLink参数为true表示当卸载失败时，会打印出详细的非法对象的引用链日志，方便开发者定位出哪儿保持了非法引用。
    // 建议只在开发期为true，正式上线后改为false
    if (!RuntimeApi.TryUnloadAssembly(ass, true))
    {
        throw new Exception("unload fail");
    }

    // 第二次加载
    Assembly newAss = Assembly.Load(yyy);

    // 执行一些代码
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // 第二次卸载
    if (!RuntimeApi.TryUnloadAssembly(ass, true))
    {
        throw new Exception("unload fail");
    }
```

### ForceUnloadAssembly

强制卸载,即使AppDomain中存在对被卸载程序集中对象的引用。返回true表示没有问题，返回false表示卸载过程中检查出非法引用。如果返回false，在运行一段时间后**有可能**会崩溃。此操作慎用，建议与官方技术支持详细沟通。

```csharp

    // 第一次加载
    Assembly ass = Assembly.Load(yyy);

    // 执行一些代码
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // 第一次卸载
    // ignoreObjectReferenceValidation参数为true表示卸载过程中不检查非法对象引用，可以缩短卸载时间。但建议无论开发期还是正式发布都取false
    // printObjectReferenceLink参数为true表示当卸载失败时，会打印出详细的非法对象的引用链日志，方便开发者定位出哪儿保持了非法引用。建议只在开发期为true，正式上线后改为false
    if (!RuntimeApi.ForceUnloadAssembly(ass, false, true))
    {
        throw new Exception("unload fail");
    }

    // 第二次加载
    Assembly newAss = Assembly.Load(yyy);

    // 执行一些代码
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // 第二次卸载
    if (!RuntimeApi.ForceUnloadAssembly(ass, false, true))
    {
        throw new Exception("unload fail");
    }
```

## 注意事项

- async或者协程很容易隐式地在其他线程保持了对卸载程序集代码的引用，卸载前请务必清理所有异步或者协程函数
- UI的OnClick或者各种回调事件很容易导致保持了对卸载程序集的引用，一定要清理干净
- 注册到全局的事件或者其他加高，容易意外保持了对卸载程序集的引用，一定要清理干净
- 根据卸载过程中打印的非法引用的日志，清理掉代码中的非法引用