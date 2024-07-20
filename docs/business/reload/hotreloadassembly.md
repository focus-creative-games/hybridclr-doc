# 热重载技术

热重载技术用于完全卸载或者重新加载一个assembly，适用于小游戏合集类型的游戏。该方案只提供**商业化版本**。

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

