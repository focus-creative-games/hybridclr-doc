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

调用 `RuntimeApi.UnloadAssembly` 卸载程序集，使用`Assembly.Load`重新加载程序集。当前不支持在未卸载该程序集的情况下再次加载该程序集，示例代码如下：

```csharp

    // 卸载程序集时默认会扫描整个运行时，检查有没有持有对被卸载程序集中对象的引用。
    // 对于正式发布的版本，可以使用以下语句禁用检查，缩短卸载时间。
    // 开发期间强烈推荐不要禁用它

    // RuntimeApi.EnableLiveObjectValidation(false);

    // 第一次加载
    Assembly ass = Assembly.Load(yyy);

    // 执行一些代码
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // 第一次卸载
    RuntimeApi.UnloadAssembly(ass);

    // 第二次加载
    Assembly newAss = Assembly.Load(yyy);

    // 执行一些代码
    Type mainType = ass.GetType("Entry");
    mainType.GetMethod("Main").Invoke(null, null);

    // 第二次卸载
    RuntimeApi.UnloadAssembly(ass);
```

## 注意事项

- async或者协程很容易隐式地在其他线程保持了对卸载程序集代码的引用，卸载前请务必清理所有异步或者协程函数
- UI的OnClick或者各种回调事件很容易导致保持了对卸载程序集的引用，一定要清理干净
- 注册到全局的事件或者其他加高，容易意外保持了对卸载程序集的引用，一定要清理干净
- 根据`RuntimeApi.UnloadAssembly`中打印的非法引用的日志，清理掉代码中的非法引用
- 正式发布的项目可以使用`RuntimeApi.EnableLiveObjectValidation(false)`禁用非法引用检查以缩短卸载耗时