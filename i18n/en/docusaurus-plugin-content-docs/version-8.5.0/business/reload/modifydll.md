# Modifying UnityEngine DLL

Some versions of DLLs are not compatible with hot reload and require minor code modifications.

## Using dnspy Tool

We use [dnspy](https://github.com/dnSpy/dnSpy) to modify DLL files. Since dnspy can only run on Windows, even for Mac version DLLs, you need to copy the corresponding DLL to Windows first before modification. Download [dnspy](https://github.com/dnSpy/dnSpy/releases), choose the [Win64 version](https://github.com/dnSpy/dnSpy/releases/download/v6.1.8/dnSpy-net-win64.zip).

The general procedure for modifying DLLs is as follows:

- Clear all DLLs on the left side in dnspy
- Open the DLL
- Find the function you want to modify `ToModifiedType.ToModifiedMethod`, right-click menu -> Edit Method (C#)..., this opens the source code editing interface.
- If the editor prompts that some DLL references are missing, click the folder-like button in the bottom left corner of the source code editing window to add them.
- Modify the code
- Click the `Compile` button in the bottom right corner. If successful, there will be no prompt, exit the editing interface and return to decompiled view mode. If it fails, please handle the compilation errors yourself. Sometimes dnspy has inexplicable reference errors; exit the source code editing mode, right-click `Edit Method` again, and re-enter to resolve it.
- Menu `File -> Save Module` to save the modified DLL file. On Windows or Mac, you might encounter permission issues, please handle accordingly (such as saving to another location first, then manually overwriting)

## Modifying UnityEngine.CoreModule.dll

:::caution
Only Unity 2022+ versions need modification.
:::

Unity provides a separate set of UnityEngine DLLs for each BuildTarget, located in `{editor_install_dir}/Editor/Data/PlaybackEngines/{platform}/Variations/il2cpp` (for iOS platform: `iOSSupport\Variations\il2cpp\Releasearm64_managed`) directory. Please replace the relevant DLLs under each platform according to your packaging platform needs.

Since UnityEngine.CoreModule.dll references NetStandard 2.1, you need to first drag `Editor\Data\NetStandard\ref\2.1.0\netstandard.dll` into the dnspy left assembly resource manager before compilation.

Original code:

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

