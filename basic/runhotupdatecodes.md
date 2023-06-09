# 加载和使用热更新代码

## 加载更新assembly

根据你们项目资源管理的方式，获得热更新dll的bytes数据。然后再直接调用Assembly.Load(byte[] assemblyData)即可。代码类似
如下：

```csharp
    // 从你的资源管理系统中获得热更新dll的数据
    byte[] assemblyData = xxxx; 
    // Assembly.Load函数内部会复制assemblyData,
    // 调用完此函数请立即释放assemblyData，千万不要保存起来。
    Assembly ass = Assembly.Load(assemblyData);
```

如果有多个热更新dll，请一定要**按照依赖顺序加载**，先加载被依赖的assembly。加载完热更新dll后，有多种方式运行热更新代码，这些技巧跟不考虑热更新时完全相同。

?> 如果Assembly.Load花费太多时间，造成卡顿，你可以在其他线程异步加载。

## 通过反射直接运行热更新函数

假设热更新集中有HotUpdateEntry类，主入口是静态的Main函数，代码类似：

```csharp
class HotUpdateEntry
{
    public static void Main()
    {
        UnityEngine.Debug.Log("hello, HybridCLR");
    }
}
```


你用如下方式运行：

```csharp
    // ass 为Assembly.Load返回的热更新assembly。
    // 你也可以在Assembly.Load后通过类似如下代码查找获得。
    // Assembly ass = AppDomain.CurrentDomain.GetAssemblies().First(assembly => assembly.GetName().Name == "Your-HotUpdate-Assembly");
    Type entryType = ass.GetType("HotUpdateEntry");
    MethodInfo method = entryType.GetMethod("Main");
    method.Invoke(null, null);
```

## 通过反射创造出Delegate后运行

```csharp
    Type entryType = ass.GetType("HotUpdateEntry");
    MethodInfo method = entryType.GetMethod("Main");
    Action mainFunc = (Action)Delegate.CreateDelegate(typeof(Action), method);
    mainFunc();
```

## 通过反射创建出对象后，再调用接口函数

假设AOT中有这样的接口

```csharp
public interface IEntry
{
    void Start();
}
```

热更新中实现了这样的类

```csharp
class HotUpdateEntry : IEntry
{
    public void Start()
    {
        UnityEngine.Debug.Log("hello, HybridCLR");
    }
}
```

你用如下方式运行：

```csharp
    Type entryType = ass.GetType("HotUpdateEntry");
    IEntry entry = (IEntry)Activator.CreateInstance(entryType);
    entry.Start();
```

## 通过动态AddComponent运行脚本代码

假设热更新中有这样的代码：

```csharp
class Rotate : MonoBehaviour
{
    void Update()
    {

    }
}
```

你在AOT中运行如下代码：

```csharp
    Type type = ass.GetType("Rotate");
    GameObject go = new GameObject("Test");
    go.AddComponent(type);
```


## 通过初始化从打包成assetbundle的prefab或者scene还原挂载的热更新脚本

假设热更新中有这样的入口脚本，这个脚本被挂到`HotUpdatePrefab.prefab`上。

```csharp

public class HotUpdateMain : MonoBehaviour
{
    void Start()
    {
        Debug.Log("hello, HybridCLR");
    }
}

```

你通过实例化这个prefab，即可运行热更新逻辑。

```csharp
        AssetBundle prefabAb = xxxxx; // 获得HotUpdatePrefab.prefab所在的AssetBundle
        GameObject testPrefab = Instantiate(prefabAb.LoadAsset<GameObject>("HotUpdatePrefab.prefab"));
```

这种方法不需要借助任何反射，而且跟原生的启动流程相同，推荐使用这种方式初始化热更新入口代码！
