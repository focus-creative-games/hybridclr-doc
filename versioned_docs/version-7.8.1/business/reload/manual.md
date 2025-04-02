# 手册

## 支持的特性

- 支持卸载assembly，卸载100%的assembly所占用的内存
- 支持重新加载assembly，代码可以任意变化甚至完全不同（MonoBehaviour和Scriptable有一定的限制）
- 支持**限定热更新assembly中能访问的函数的集合**，适合UGC游戏中创建沙盒环境，避免恶意玩家代码造成破坏。

## 不支持特性及特殊要求

- 要求业务代码不会再使用被卸载的Assembly中的对象或者函数，并且退出所有在执行的旧逻辑
- 不能直接卸载被依赖的Assembly，必须按照逆依赖顺序先卸载依赖者，再卸载被依赖者。例如A.dll依赖B.dll，则需要先卸载A.dll，再卸载B.dll
- MonoBehaviour和ScriptableObject相关
  - 要求重载的MonoBehaviour中的事件或消息函数如Awake、OnEable之类不发生增删（但函数体可以变化）
  - 要求重载后在旧Assembly中存在同名脚本类的序列化字段名不发生变化（类型可以变）
  - 如果字段类型为可卸载程序集中的自定义类型A（class或struct或enum），必须给它加上`[Serializable]`特性
  - 不支持字段类型为`List<A>`其中A为可卸载的程序集中的类型，请替换为`A[]`
  - 不能继承泛型类型，例如`class MyScript : CommonScript<int>`
- 一些会缓存反射信息的库（这种行为在序列化相关的库中最为普遍，如LitJson），在热重载后需要清理掉缓存的反射信息
- 不支持析构函数，~XXX()。也不允许实例化泛型参数带本程序集类型的带析构函数的泛型类
- 与dots不兼容。由于dots大量缓存的类型信息，实现复杂，很难单独清理掉缓存信息。

## 内存卸载率

除了以下元数据内存无法卸载外，其余几乎所有（99.9%）元数据都可以被卸载：

- MonoBehavoiur、ScriptableObject之类的脚本类。它们在运行时层面对应的Il2CppClass会被Unity引擎内部引用，无法释放，但可以释放掉绝大多数成员元数据如method
- 被标记`[Serializable]`的类型。与MonoBehaviour类似，它们也可能在序列化过程中被Unity引擎内存引用，无法释放。
- 在本程序集运行过程中使用到，但不涉及到本程序集类型的泛型类。如`List<int>`元数据不会被释放，但`List<MyHotReloadClass>`会被释放

所有未释放的元数据（MonoBehaviour、Serializable类）在再次加载该程序集时**会被复用**。多次加载和卸载同一个程序集，只会发生一次未释放行为，不会导致泄露或者未释放的元数据内存持续增长。

实际项目中，对于大多数程序集可以卸载掉99%以上的元数据内存。

## 安装

- 将hybridclr_unity解压后，放到项目Packages目录下，改名为com.code-philosophy.hybridclr
- 根据你的unity版本解压对应的`il2cpp_plus-{version}.zip`
- 解压 `hybridclr.zip`
- 将`hybridclr.zip`解压后的hybridclr目录放到`il2cpp-{version}.zip`解压后的libil2cpp目录下
- 打开 `HybridCLR/Installer`，开启`从本地复制libil2cpp`选项，选中刚才解压的libil2cpp目录，进行安装

![installer](/img/hybridclr/ultimate-installer.jpg)

## 完全泛型共享

参见 [完全泛型共享](../fullgenericsharing)。

## 代码加密

参见 [代码加固](../basicencryption)。

## 控制访问

有时候可能想限制热更新代码能访问的类型和函数的范围，例如沙盒类游戏不想让UGC代码访问文件读取接口，访问控制可以实现这个目标。

详细请阅读文档[访问控制策略](../accesspolicy)。


## 卸载程序集

目前提供了两个接口用于卸载程序集：

- RuntimeApi::TryUnloadAssembly
- RuntimeApi::ForceUnloadAssembly

### RuntimeApi::TryUnloadAssembly

该接口尝试卸载程序集。如果卸载成功，返回true；如果卸载失败，则保持现状并且返回false。

```csharp
        /// <summary>
        /// 尝试卸载程序集
        /// </summary>
        /// <param name="assembly"></param>
        /// <param name="printObjectReferenceLink">发现非法引用时是否打印引用链，此项不仅会导致卸载时间显著延长，
        /// 还会导致卸载期间有一个native内存暴涨峰值（卸载完成后会回落），强烈建议线上项目关闭此选项</param>
        /// <returns></returns>
    public static extern bool TryUnloadAssembly(Assembly assembly, bool printObjectReferenceLink);
```

### RuntimeApi::ForceUnloadAssembly

该接口强行卸载程序集。如果卸载过程中发布异常状况，则返回false，否则返回true。无论返回结果如何，都会移除该程序集。

```csharp
        /// <summary>
        /// 强行卸载程序集，不管AppDomain中是否还存在对该程序集的引用
        /// </summary>
        /// <param name="assembly">被卸载的程序集</param>
        /// <param name="ignoreObjectReferenceValidation">是否不调用LiveObjectValidator检查非法引用，建议取false</param>
        /// <param name="printObjectReferenceLink">发现非法引用时是否打印引用链，此项不仅会导致卸载时间显著延长，
        /// 还会导致卸载期间有一个native内存暴涨峰值（卸载完成后会回落），强烈建议线上项目不要开启此选项</param>
        /// <returns>是否没有非法引用，true表示没有，false表示有</returns>
        /// <exception cref="UnloadAssemblyException"></exception>
        public static bool ForceUnloadAssembly(Assembly assembly, bool ignoreObjectReferenceValidation, bool printObjectReferenceLink)
        {
            throw new UnloadAssemblyException($"Failed to unload assembly {assembly.FullName}");
        }
```

## HotReload兼容性检查

由于Unity引擎内部会缓存部分类型（MonoBehaviour、Serializable类）元数据，导致这些类使用有一些限制。如果违背这些限制，运行时可能出现崩溃。
`HybridCLR.Editor.HotReload.HotReloadCompatibilityValidator`可以提前检测出大多数不兼容热重载的代码。

```csharp
        [MenuItem("Test/CheckCompatibility")]
        public static void CheckCompatibility()
        {
            BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
            CompileDllCommand.CompileDll(target);
            // 这里填的是热重载程序集，而不是热更新程序集，不需要热重载的程序集请不要加到此列表。
            var hotReloadDlls = new List<string> { "Tests" };
            var assResolver = MetaUtil.CreateHotUpdateAndAOTAssemblyResolver(target, hotReloadDlls);
            var validator = new HotReloadCompatibilityValidator(hotReloadDlls, assResolver);
            if (!validator.Validate())
            {
                UnityEngine.Debug.LogError("CheckCompatibility failed");
            }
        }

```


## 解决被卸载对象的引用问题

热重载技术要求在未卸载的程序集或者全局内存中不能持有已卸载的程序集U的元数据。包括但不限于：

- 被卸载程序集的类型的实例
- 泛型类或者函数的泛型参数中包含被卸载程序集的类型
- 被卸载程序集相关的反射信息，如Assembly、Type、MethodInfo、PropertyInfo等等
- 指向被卸载程序集中某函数的delegate
- 被卸载程序集中定义的异步Task
- 其他

实际工程可能很复杂，开发者找出所有非法引用是很困难和不切实际的。我们已经实现了非法引用检查，卸载过程中会打印出所有非法引用的日志。开发者根据打印的日志清除所有非法引用即可。


## 已知的有兼容性问题的库

绝大多数不兼容问题本质上是被卸载的对象、类型或者函数被缓存导致，通过手动清理这些非法引用可以解决不兼容问题。

- 2022的Jobs会缓存类型相关信息，需要自行小幅[修改UnityEngine.CoreModule.dll](./modifydll.md)的代码。 低于2022的版本不需要修改
- LitJson之类的反序列化库会缓存反射信息，需要在热重载后清理掉库中缓存的反射信息，具体操作跟库的实现相关
