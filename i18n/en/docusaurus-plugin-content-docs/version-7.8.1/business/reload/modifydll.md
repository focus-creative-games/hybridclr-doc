# Modify the UnityEngine dll

Since some versions of the dll are not compatible with hot reloading, the code needs to be slightly modified.

## Use the dnspy tool

We use [dnspy](https://github.com/dnSpy/dnSpy) to modify dll files. And dnspy can only run under Win, so even if it is a mac version dll,
You also have to copy the corresponding dll to Win and then modify it. Download [dnspy](https://github.com/dnSpy/dnSpy/releases), select [Win64 version](https://github.com/dnSpy/dnSpy/releases/download/v6.1.8/dnSpy-net- win64.zip).

The operation of modifying the dll is roughly as follows:

- Clear all dlls on the left in dnspy
- open dll
- Find the function you want to modify `ToModifiedType.ToModifiedMethod` function, right-click the menu -> Edit Method (c#)..., and the source code editing interface will pop up.
- If the editor prompts that some dll references are missing, click the button similar to a folder in the lower left corner of the source code editing window to add them.
- modify the code
- Click the `Compile` button in the lower right corner. If it is successful, there will be no prompt, exit the editing interface, and return to the decompilation viewing mode. If that fails, handle compilation errors yourself. Sometimes dnspy will have inexplicable reference errors, exit the source code editing mode, right-click `edit method` again, and enter again to solve it.
- Menu `File -> Save Module` to save the modified dll file. If under Win or Mac, you may encounter permission problems, please handle it accordingly (for example, save it to another location first, and then manually overwrite it)

## Modify UnityEngine.CoreModule.dll

:::caution
Only Unity 2022+ versions need to be modified.
:::

Unity provides a separate set of UnityEngine dlls for each BuildTarget, which are located in `{editor_install_dir}/Editor/Data/PlaybackEngines/{platform}/Variations/il2cpp` (iOS platform is `iOSSupport\Variations\il2cpp\Releasearm64_managed`) directory Down,
Please replace the relevant dll under each platform according to the platform you need to package.

Since UnityEngine.CoreModule.dll refers to NetStandard 2.1, you need to pull `Editor\Data\NetStandard\ref\2.1.0\netstandard.dll` into the left assembly explorer of dnspy before compiling.

Original code:

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
				BurstRuntime.HashCode64<T>.Value = BurstRuntime.HashStringWithFNV1A64(typeof(T).AssemblyQualifiedName);
			}
		}
	}
}
```

Modified code:

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