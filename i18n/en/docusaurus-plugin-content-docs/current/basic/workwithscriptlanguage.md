# HybridCLR+lua/js/python

Some projects have been launched, and most of their codes have been implemented in lua; or some new projects have been developed halfway in lua, and they cannot completely switch to full C# development, but hope
to be able to access HybridCLR at the same time to help slowly transition to all native C# hot updates. Since HybridCLR is a native C# hot update technology, native support works with these scripting languages.

## Principle

All third-party scripts (lua, typescript, python, etc.) interacting with C# code rely on marking the C# function to be called back from native with `[MonoPInvokeCallback]`.

il2cpp will bind a separate Wrapper function to each function marked with `[MonoPInvokeCallback]` to handle issues such as marshal of the return value between managed and native.

Similarly, hybridclr also needs to generate a corresponding Wrapper function for each function marked with `[MonoPInvokeCallback]`. However, for platforms like iOS that have disabled jit, it is obviously impossible to dynamically generate these wrapper functions at runtime. Therefore, it is necessary to reserve corresponding wrapper functions for such functions that may be used in the future.

For details on how to reserve wrapper functions, see the document [MonoPInvokeCallback support](./monopinvokecallback).

## xlua

xlua has not considered modularization, and the generated code is all in the global Assembly-CSharp, and even made into a partial class associated with the Runtime code, so you may need to make a small adjustment to the generated code of these hot update solutions to work with hot updates.

Some group members have already created the `HybridCLR+xlua` project [HybridCLRXlua](https://gitee.com/ldr123/HybridCLRXlua), which has been run. Developers who do not fully understand it can learn from it.

## tolua, slua, puerts

Make sure enough ReversePInvokeWrapper functions are reserved and the generated wrapper code can be placed in the hot update module and registered correctly.
