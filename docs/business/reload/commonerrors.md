# 常见问题

## [Serializable] 类型或者Monbehaviour（ScriptableObject)中包含泛型参数为被卸载程序集中类型的泛型字段时崩溃

使用JsonUtility或者MonoBehaviour序列化的对象的元数据信息会被引擎缓存。为了支持它们的卸载，我们复用了这些类型信息，即重新加载程序集后，引擎层访问到这些元数据信息会被重新更新为
最新的值。

由于缓存行为是引擎内部黑箱行为，我们无法复用太复杂的元数据，比如这些类型字段不能是`List<T>`，其中T是被卸载程序集中的类型。

解决办法是将`List<T>`换成`T[]`。

注意，**仅仅是[Serializable]和MonoBhehaviour(ScriptableObject)有此限制**，其他普通类型的字段可以为任意类型。

## 卸载时存在非法引用了被卸载程序集中对象或者函数的问题


### UnityEngine.AndroidJavaRunnableProxy

这个对象在CreteJavaProxy时就被创建出来，并且被引擎层持有了，Unity没有提供直接卸载办法。
有一个清理办法，但是做不到立马清理，在卸载时仍然会报这种错误：

```csharp
IntPtr handle = UnityEngine.AndroidJNIHelper.CreateJavaRunnable(xxx);
```

记录下handle.然后不用时清理它：

```csharp
UnityEngine.AndrodJNISafe.DelegateGlobalRef(handle);
```

但这个操作只是在c#层不再持有这个java Runnable对象。 只有java gc时，才可能真正彻底释放这个 Runnable，此时才会释放C#层的AndroidJavaRunanbleProxy，然后再不会再引用这个被卸载的程序集中对象。


目前只有一个有效解决办法：

不要直接传递 被卸载的程序集中的delegate 给 AndroidJavaRunnable，而是其他AOT 或者不卸载的程序集中的 一个
代理类。 创建 AndroidJavaRunnable时也同时记录下这个代理类。在代理类中保存了指向 实际的被卸载的程序集中的delegate，在卸载前清理这个代码类的 delegate引用为null。代码类似这样：

```csharp
        class MyRunnableWrapper
        {
            private AndroidJavaRunnable _runnble;

            public MyRunnableWrapper(AndroidJavaRunnable runnable)
            {
                _runnble = runnable;
            }

            public void Run()
            {
                _runnble?.Invoke();
            }

            public void Clean()
            {
                _runnble = null;
            }
        }

        static void Register(AndroidJavaRunnable runnable)
        {
            var wrapper = new MyRunnableWrapper(runnable);

            // 将这个传递给Java层
            var runner = UnityEngine.AndroidJNIHelper.CreateJavaRunnable(wrapper.Run);

            // 卸载前清理
            wrapper.Clean();
        }
```

