# 重定向元数据

编译器生成的匿名类和匿名函数是不稳定的，有时候仅仅因为程序集中新增了一个类型或者函数，就导致大量的匿名类和匿名函数的名称发生变化。
即使这些匿名类自身的代码并没有改变，由于它们名称发生改变，生成dhao时会将这些匿名类和函数被判定为变化，从而导致这些匿名函数以
解释方式执行，最终影响运行性能。


## 标记为`[BurstCompile]`的函数的问题

如果游戏使用了burst相关技术，burst相关package会在编译时修改被`[BurstCompile]`标记的函数，例如：

```csharp

[BurstCompile]
private static int DecryptNumber(int number, int mulFactor, int addFactor)
{
	return (number - addFactor) / mulFactor;
}

```

最终会编译为

```csharp

[BurstCompile]
private static int DecryptNumber(int number, int mulFactor, int addFactor)
{
	return DecryptNumber_00000029$BurstDirectCall.Invoke(number, mulFactor, addFactor);
}

public delegate int DecryptNumber_00000029$PostfixBurstDelegate(int number, int mulFactor, int addFactor);

internal static class DecryptNumber_00000029$BurstDirectCall
{

    // 忽略掉一些代码 ... 

	public unsafe static int Invoke(int number, int mulFactor, int addFactor)
	{
		if (BurstCompiler.IsEnabled)
		{
			IntPtr functionPointer = GetFunctionPointer();
			if (functionPointer != (IntPtr)0)
			{
				return ((delegate* unmanaged[Cdecl]<int, int, int, int>)functionPointer)(number, mulFactor, addFactor);
			}
		}
		return DecryptNumber$BurstManaged(number, mulFactor, addFactor);
	}
}


```

如果你在程序集中新增了一些其他类型，即使没有修改`DecryptNumber`的代码，下一次编译时， `DecryptNumber_00000029$BurstDirectCall`和`DecryptNumber_00000029$PostfixBurstDelegate`
有可能变成 `DecryptNumber_0000002A$BurstDirectCall`和`DecryptNumber_0000002A$PostfixBurstDelegate`。

这不仅导致DecryptNumber错误地以解释方式执行，在低于7.4.0的hybridclr版本上，甚至还会运行错误甚至崩溃！


## 重定向匿名类型名和匿名函数名

自旗舰版本 `v7.4.0`起，提供了`HybridCLR.Editor.AssemblyMetaRetarget`用于重定向元数据，以增强匿名类和匿名函数相关元数据的稳定性。

用法如下：

```csharp
        private static void RetargetAssembly()
        {
            string dllName = "HotUpdate";

            string dllDir = $"{Application.dataPath}/../Dlls";

            string oldDllFile = $"{dllDir}/{dllName}.old.dll.bytes";
            string newDllFile = $"{dllDir}/{dllName}.new.dll.bytes";
            byte[] oldDllBytes = File.ReadAllBytes(oldDllFile);
            byte[] newDllBytes = File.ReadAllBytes(newDllFile);

            var retarget = new AssemblyMetaRetarget(oldDllBytes, newDllBytes);
            retarget.Retarget();
            retarget.Save($"{dllDir}/{dllName}.retargeted.dll.bytes");
        }

```

## 其他说明

重定向元数据是可选的，如果不使用`[BurstCompile]`，一般不需要执行这个操作。

请在重定向元数据后，把生成的程序集当作最新的热更新程序集，用于生成dhao。






