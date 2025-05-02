# MonoPInvokeCallback Support

When interacting with third-party languages ​​such as Lua, you need to call C# functions from these third-party languages. Two problems must be solved:

1. How to get the native function pointer corresponding to the C# function

2. How to handle the problem of complex type parameter passing and return value such as string

mono and il2cpp use `[MonoPInvokeCallbackAttribute]` to solve these problems. When a static managed function is added with this attribute, a separate C++ Wrapper function will be generated for it, and the function pointer can be obtained by calling `Marshal.GetFunctionPointerForDelegate`. In addition, the Wrapper function will handle complex parameters or return values ​​such as string in parameters and return values. Taking the `string`
type as an example, the Wrapper function will convert the native `const char*` type data to the managed `string` object in C#, and convert the return value of the `string` type to `const char*` before returning to native.

Similarly, hybridclr also needs to generate a corresponding wrapper function for each function marked with `[MonoPInvokeCallback]`. However, for platforms such as iOS that have disabled jit, it is obviously impossible to dynamically generate these wrapper functions at runtime. Therefore, it is necessary to reserve the corresponding wrapper functions for such functions that may be used in the future.

## Reserve ReversePInvokeWrapper Function

`HybridCLR/Generate/ReversePInvokeWrapper` generates a wrapper function for each function with the `[MonoPInvokeCallbackAttribute]` attribute by default.
However, if only the same number of wrapper functions as the current function with the `[MonoPInvokeCallbackAttribute]` attribute is generated, the problem of insufficient wrapper functions will occur when adding hot update functions later. The solution is to use `HybridCLR.ReversePInvokeWrapperGenerationAttribute` for reservation operation.

Add a new attribute `[ReversePInvokeWrapperGeneration(int preserveCount)]` to the function with `MonoPInvokeCallbackAttribute`, and preserveCount wrapper functions will be generated for the function with **this signature**. If this attribute is not included, only one wrapper function will be generated for this function. If the `[ReversePInvokeWrapperGeneration(xx)]` attribute is added to multiple functions with the same signature, the total number of wrapper functions is `the sum of all preserveCount + the number of functions without the ReversePInvokeWrapperGenerationAttribute attribute`.

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

Currently, when calling MonoPInvokeCallback type functions, the parameters are not marshaled. Ordinary int and float types work fine, but parameters like string will crash if they are used directly because the native layer passes 'char*' and is not marshaled to string!

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
