# Unsupported features

!> HybridCLR supports all the features that are not in the restrictions, please don't ask if HybridCLR supports a certain feature.

- Incremental gc is not supported yet. At present, the memory barrier details of incremental gc have not been carefully handled, and this problem will be resolved later.
- Temporarily does not support defining extern functions in hot update scripts, but you can call extern functions in AOT.
- Supports Unity Jobs library, but cannot take advantage of burst acceleration. If the burst part is in the AOT, it is still executed natively; if the burst part is in the hot update part, although the jobs are executed concurrently, they are executed in an interpreted manner.
- Functions that serialize structures such as `Marshal.StructureToPtr` in `System.Runtime.InteropServices.Marshal` are not supported, but ordinary Marshal functions such as `Marshal.PtrToStringAnsi` can work normally.
- [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)] is not supported. It's purely a matter of timing. Unity collects these functions very early, before the hot update dll is loaded. A recommended way is that you use reflection to collect these functions and call them actively at the right time.
- Does not support C# level debugging of the interpreted code part, because there is no time to write a debugger
