# Common Errors

## [Serializable] types or MonoBehaviour (ScriptableObject) crash when containing generic fields with generic parameters being types from unloaded assemblies

Metadata information of objects serialized using JsonUtility or MonoBehaviour will be cached by the engine. To support their unloading, we reuse this type information, i.e., after reloading the assembly, the metadata information accessed by the engine layer will be updated to the latest values.

Since caching behavior is internal black box behavior of the engine, we cannot reuse too complex metadata. For example, these type fields cannot be `List<T>` where T is a type from the unloaded assembly.

The solution is to replace `List<T>` with `T[]`.

Note that **only [Serializable] and MonoBehaviour (ScriptableObject) have this limitation**; fields of other ordinary types can be of any type.

## Issues with illegal references to objects or functions in unloaded assemblies during unloading

### UnityEngine.AndroidJavaRunnableProxy

This object is created when CreteJavaProxy is called and is held by the engine layer. Unity doesn't provide a direct unloading method.
There is a cleanup method, but it cannot be cleaned immediately, and this type of error will still be reported during unloading:

```csharp
IntPtr handle = UnityEngine.AndroidJNIHelper.CreateJavaRunnable(xxx);
```

Record the handle. Then clean it when not in use:

```csharp
UnityEngine.AndrodJNISafe.DelegateGlobalRef(handle);
```

But this operation only stops holding this java Runnable object at the C# layer. Only when java gc occurs, this Runnable might be truly completely released, at which time the C# layer's AndroidJavaRunanbleProxy will be released, and then will no longer reference objects in the unloaded assembly.

Currently there is only one effective solution:

Don't directly pass delegates from unloaded assemblies to AndroidJavaRunnable, but use a proxy class from other AOT or non-unloadable assemblies. Also record this proxy class when creating AndroidJavaRunnable. In the proxy class, save a reference to the actual delegate from the unloaded assembly, and clear this proxy class's delegate reference to null before unloading. Code looks like this:

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

            // Pass this to Java layer
            var runner = UnityEngine.AndroidJNIHelper.CreateJavaRunnable(wrapper.Run);

            // Clean before unloading
            wrapper.Clean();
        }
```

