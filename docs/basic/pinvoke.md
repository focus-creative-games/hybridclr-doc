# PInvoke支持

:::tip

在v8.0.0版本之前在热更新代码中定义了extern函数，并且试图调用它时，会抛出`ExecutionEngineException:method body is null`的错误。

:::

hybridclr一直以来都支持调用AOT中定义的extern函数，但自**v8.0.0**版本起，才支持在热更新代码中定义extern函数。

## 支持的平台

支持extern函数这个特性依赖于运行时查找动态链接库中的函数符号，它可以在大多数平台上正常工作，但无法在iOS上运行。

|平台|支持|
|-|-|
|Windows|✔|
|Linux|✔|
|MacOS|✔|
|Android|✔|
|iOS||
|WebGL||
|其他平台|未测试|

## 预留桥接函数

调用PInvoke函数时，同样需要解决managed到native的参数转换，因此需要预先生成该PInvoke函数相应的桥接函数，否则运行时会抛出异常。

对于构造主包时在热更新代码中已经存在的PInvoke函数，会自动为它们生成相应桥接函数，不需要特殊处理。对于未来可能用到，但没有现存跟它
相同签名的PInvoke函数的函数，需要为它预留相应桥接函数。

预留办法为在热更新代码中定义一些PInvoke类型的extern函数。相同签名的PInvoke函数都可以共享同一个桥接函数，**不需要**像`[MonoPInvokeCallback]`
那样为每个回调函数预留一个Wrapper函数。

预留PInvoke函数的`DllImport`特性中的`dllName`和`EntryPoint`参数可以任意取值，没有实际用途。

示例如下：

```csharp

public static class PreservedPInvokes
{
      [DllImport("xxxx", EntryPoint = "Demo0")]
      public static extern void Demo0();

      [DllImport("xxxx", EntryPoint = "Demo1")]
      public static extern void Demo1(int value);

      [DllImport("xxxx", EntryPoint = "DemoLua")]
      public static extern IntPtr DemoLua(IntPtr luaState);
}

```

## 限制

由于hybridclr目前没有对PInvoke函数的参数与返回值进行marshal处理，普通的int、float类型工作正常，但像string之类参数由于native层传递的是'char*'，没有marshal转为string，直接使用后必然会崩溃！

如果遇到string类型参数的情况，有两种解决办法：

1. 可以将回调函数放到AOT中，在AOT中再回调热更新函数。
2. 将参数改为IntPtr类型，然后再调用Marshal.PtrToStringUTF8将IntPtr类型的原始char*类型数据转成string。

示例代码如下:

```csharp
    [DllImport("GameAssembly", EntryPoint = "GetStringLength")]
    public static extern int GetStringLength(IntPtr ptr);


    public static void ProcessString()
    {
      var s = "abc";
      // 将字符串转为`const char*`类型的native字符串
      IntPtr strPtr = Marshal.StringToHGlobalUni(s);
      int length = GetStringLength(strPtr);
      // 释放字符串内存
      Marshal.FreeHGlobal(strPtr);
    }

```

其他需要Marshal的非primitive类型的参数均可仿照这个方法处理。
