# Work with lua/js/python

Some projects have already been launched, and most of their codes have been implemented in lua; or some new projects have been developed in lua, and they cannot completely switch to full C# development, but hope
It can be connected to HybridCLR at the same time, helping to gradually transition to all native C# hot updates. Since HybridCLR is a native C# hot update technology, native support works with these scripting languages.

:::tip
What you need to do is to generate the hot update wrapper files to the hot update module, and reserve enough ReversePInvoke functions in advance.
:::

## xlua

xlua has not considered modularization. The generated code is all in the global Assembly-CSharp, and even made into a partial class associated with the Runtime code. Therefore, you may need to make a small adjustment to the generated code of these hot update solutions to cooperate with the hot update. Work.

A group of friends have already produced the `HybridCLR+xlua` project [HybridCLRXlua](https://gitee.com/ldr123/HybridCLRXlua), which has run through and improved the workflow. Recommended reference.

## tolua, slua, puerts

Make sure that enough ReversePInvokeWrapper functions are reserved and the generated wrapper code can be placed in the hot update module and registered correctly.

## MonoPInvokeCallbackAttribute support

HybridCLR supports `[MonoPInvokeCallbackAttribute]` exactly as natively. Since each function marked `[MonoPInvokeCallbackAttribute]` must have a unique corresponding c++ function, and AOT restrictions make it impossible to add functions at runtime,
Therefore, it is necessary to generate a `c++ wrapper function` for each `[MonoPInvokeCallbackAttribute]` function in advance for binding with it. These wrapper functions are in `hybridclr/generated/ReversePInvokeMethodStub_{abi}.cpp` file.

[com.code-philosophy.hybridclr](../basic/com.code-philosophy.hybridclr.md) has provided scripts to help automatically generate these wrapper functions, just run the menu command `HybridCLR/Generate/ReversePInvokeWrapper`.

## Reserved ReversePInvokeWrapper function

`HybridCLR/Generate/ReversePInvokeWrapper` generates a wrapper function for each function with `[MonoPInvokeCallbackAttribute]` by default.
However, if you only generate the same number of wrapper functions as the current functions with the `[MonoPInvokeCallbackAttribute]` feature, the new hot update function will be
The problem of insufficient wrapper functions will occur. The solution is to use `HybridCLR.ReversePInvokeWrapperGenerationAttribute` for reserved operations.

Add a feature `[ReversePInvokeWrapperGeneration(int preserveCount)]` to the function with `MonoPInvokeCallbackAttribute`, then generate preserveCount wrapper functions for functions with **this signature**. If this attribute is not included, it will only be generated for this function
A wrapper function. If the `[ReversePInvokeWrapperGeneration(xx)]` attribute is added to multiple functions with the same signature, the total number of wrapper functions is `the sum of all preserveCount + the number of functions that do not contain the ReversePInvokeWrapperGenerationAttribute attribute`.

As shown below, there are 10 wrappers of type `LuaFunction`, 101 wrappers of type `Func<int, int, int>`, and 1 wrapper of type `Func<int, int>`.

```csharp

[UnmanagedFunctionPointer(CallingConvention.Cdecl)]
delegate int LuaFunction(IntPtr luaState);

public class MonoPInvokeWrapperPreserves
{
     [ReversePInvokeWrapperGeneration(10)]
     [MonoPInvokeCallback(typeof(LuaFunction))]
     public static int LuaCallback(IntPtr luaState)
     {
         return 0;
     }

     [ReversePInvokeWrapperGeneration(100)]
     [MonoPInvokeCallback(typeof(Func<int, int, int>))]
     public static int Sum(int a, int b)
     {
         return a + b;
     }

     [MonoPInvokeCallback(typeof(Func<int, int, int>))]
     public static int Sum2(int a, int b)
     {
         return a + b;
     }

     [MonoPInvokeCallback(typeof(Func<int, int>))]
     public static int Inc(int a)
     {
         return a + 1;
     }
}

```

## Limitations

Currently, when calling MonoPInvokeCallback type functions, no marshal processing is performed on the parameters. Ordinary int and float types work fine, but parameters like string will crash if they are used directly because the native layer passes 'char*' and is not marshaled to string!

If you encounter string type parameters, there are two solutions:

1. You can put the callback function in AOT and call back the hot update function in AOT.

2. Change the parameter to IntPtr type, and then call Marshal.PtrToStringUTF8 to convert the original char* type data of IntPtr type into string. The sample code is as follows.

```csharp
[MonoPInvokeCallback(typeof(Func<Intptr, int>))]
public static int Inc(IntPtr ptr)
{
string s = Marshal.PtrToStringUTF8(ptr);
return s.Length;
}

```

Other non-primitive type parameters that need Marshal can be processed in the same way.
