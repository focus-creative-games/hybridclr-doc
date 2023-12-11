# 快速上手

与社区版本的[快速上手](../../beginner/quickstart.md)几乎完全相同，本文档只介绍不同之处。

## 安装

- 将hybridclr_unity解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下
- 打开 `HybridCLR/Installer`，开启`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装
- **Unity 2022+版本需要使用修改版本的 UnityEngine.CoreModule.dll**, 详细见[修改dll](modifydll.md)

![installer](/img/hybridclr/ultimate-installer.jpg)

## 开启完全泛型共享

- 2020版本不支持完全泛型共享
- 2021版本需要设置 IL2CPP Code Generation选项为`faster(smaller)`
- 2022版本默认开启完全泛型共享，无法关闭。如果设置 IL2CPP Code Generation选项为`faster(smaller)`则能进一步减少包体。


## 开启和关闭标准指令优化

默认已经开启标准优化。可以通过 `RuntimeApi.EnableTransformOptimization`函数主动控制开启或者关闭这个特性。

## 代码中使用

调用 `RuntimeApi.UnloadAssembly` 卸载程序集，使用`Assembly.Load`重新加载程序集。当前不支持在未卸载该程序集的情况下再次加载该程序集，示例代码如下：

```csharp
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