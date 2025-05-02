# 修改UnityEngine dll

由于有些版本的dll与热重载并不兼容，需要小幅修改代码。

## 使用dnspy工具

我们使用 [dnspy](https://github.com/dnSpy/dnSpy) 来修改 dll文件。而dnspy只能在Win下运行，故哪怕是mac版本dll，
你也得先将相应dll复制到Win下后再修改。下载 [dnspy](https://github.com/dnSpy/dnSpy/releases)，选择 [Win64版本](https://github.com/dnSpy/dnSpy/releases/download/v6.1.8/dnSpy-net-win64.zip)。

修改dll的操作大致如下：

- dnspy中清空左侧所有dll
- 打开dll
- 找到你要修改的函数 `ToModifiedType.ToModifiedMethod` 函数， 右键菜单 -> 编辑方法(c#)...，弹出源码编辑界面。
- 如果编辑器提示缺少某些dll引用，点击源码编辑窗口左下角类似文件夹的按钮，进行添加。
- 修改代码
- 点击右下角的 `编译` 按钮，如果成功，则无任何提示，退出编辑界面，返回反编译查看模式。如果失败，请自行处理编译错误。有时候dnspy会有莫名其妙的引用错误，退出源码编辑模式，重新右键`编辑方法`，再次进入就能解决。
- 菜单 `文件 -> 保存模块` 保存修改后的dll文件。如果在Win或Mac下，有可能会遇到权限问题，请酌情处理（比如先保存到其他位置，再手动覆盖）

## 修改 UnityEngine.CoreModule.dll

:::caution
只有 Unity 2022+版本才需要修改。
:::

Unity对于每个BuildTarget提供了单独一套UnityEngine dll，它们位置在 `{editor_install_dir}/Editor/Data/PlaybackEngines/{platform}/Variations/il2cpp`（iOS平台为`iOSSupport\Variations\il2cpp\Releasearm64_managed`）目录下，
请根据自己需要打包的平台，替换每个平台下的相关dll。

由于UnityEngine.CoreModule.dll引用了NetStandard 2.1，编译前需要先将`Editor\Data\NetStandard\ref\2.1.0\netstandard.dll`拉入 dnspy左侧程序集资源管理器中。

原始代码：

```csharp
namespace Unity.Collections.LowLevel.Unsafe
{
	// Token: 0x020000A6 RID: 166
	internal static partial class BurstRuntime
	{
		// Token: 0x020000A7 RID: 167
		private partial struct HashCode64<T>
		{
			// Token: 0x06000348 RID: 840 RVA: 0x000063F5 File Offset: 0x000045F5
			// Note: this type is marked as 'beforefieldinit'.
			static HashCode64()
			{
				BurstRuntime.HashCode64<T>.Value = BurstRuntime.HashStringWithFNV1A64(typeof(T).AssemblyQualifiedName);
			}
		}
	}
}
```

修改后的代码：

```csharp
using System;

namespace Unity.Collections.LowLevel.Unsafe
{
	// Token: 0x020000A6 RID: 166
	internal static partial class BurstRuntime
	{
		// Token: 0x020000A7 RID: 167
		private partial struct HashCode64<T>
		{
			// Token: 0x06000348 RID: 840 RVA: 0x000063F5 File Offset: 0x000045F5
			// Note: this type is marked as 'beforefieldinit'.
			static HashCode64()
			{
				BurstRuntime.HashCode64<T>.Value = BurstRuntime.HashStringWithFNV1A64(typeof(T).AssemblyQualifiedName + ":" + typeof(T).GetHashCode().ToString());
			}
		}
	}
}
```

