# HotReload 热重载技术

HotReload技术用于完全卸载或者重新加载一个assembly，适用于小游戏合集类型的游戏。该方案只提供**商业化版本**，具体请见[商业化服务](/other/business.md)。

## 支持的特性

- 支持卸载assembly
- 支持重新加载assembly，代码基本可以任意变化甚至完全不同（除MonoBehaviour类外）
- 卸载大部分内存（预计95%以上），但有少量残留（如`[ThreadStatic]`标记的线程静态成员字段占据的内存）
- 支持**限定热更新assembly中能访问的函数的集合**，适合UGC游戏中创建沙盒环境，避免恶意玩家代码造成破坏。
- 支持MonoBehaviour及ScriptableObject的热重载。

## 不支持特性及特殊要求

- 要求业务代码不会再使用被卸载的Assembly中的对象或者函数，并且退出所有在执行的旧逻辑
- 要求重载后在旧Assembly中存在同名类的MonoBehaviour中的被Unity引擎特殊处理函数如Awake之类不发生增删（但函数体可以变化）
