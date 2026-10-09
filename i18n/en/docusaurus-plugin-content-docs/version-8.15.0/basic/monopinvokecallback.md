# MonoPInvokeCallback Support

When interacting with third-party languages like Lua, you need to call C# functions from these third-party languages. Two problems must be solved:

1. How to get the native function pointer corresponding to a C# function
2. How to handle parameter passing and return values for complex types like string

Mono and il2cpp use `[MonoPInvokeCallbackAttribute]` to solve these problems. When a static managed function has this attribute, a separate C++ wrapper function is generated for it,
and calling `Marshal.GetFunctionPointerForDelegate` can get that function pointer. Additionally, the wrapper function handles complex parameters or return values like string. Taking the `string`
type as an example, the wrapper function converts native `const char*` type data to a managed `string` object in C#, and converts the `string` type return value to `const char*` before returning to native.

Similarly, HybridCLR also needs to generate corresponding wrapper functions for each function marked with `[MonoPInvokeCallback]`. But for platforms like iOS that prohibit JIT, obviously these wrapper functions can't be dynamically generated at runtime. Therefore, corresponding wrapper functions need to be pre-reserved for such functions that may be used in the future.

## Reserving ReversePInvokeWrapper Functions

`HybridCLR/Generate/ReversePInvokeWrapper` by default generates one wrapper function for each function with the `[MonoPInvokeCallbackAttribute]` attribute.
But if we only generate the same number of wrapper functions as the current functions with `[MonoPInvokeCallbackAttribute]` attribute, adding new hot update functions later
will cause insufficient wrapper functions. The solution is to use `HybridCLR.ReversePInvokeWrapperGenerationAttribute` for reservation.

Add a new attribute `[ReversePInvokeWrapperGeneration(int preserveCount)]` to functions with `MonoPInvokeCallbackAttribute`, then preserveCount wrapper functions are generated for **this signature**. If this attribute is not included, only one wrapper function will be generated for this function. If multiple functions with the same signature have the `[ReversePInvokeWrapperGeneration(xx)]` attribute, the total number of wrapper functions is `sum of all preserveCount + number of functions without ReversePInvokeWrapperGenerationAttribute attribute`.

As shown below, `LuaFunction` type has 10 wrappers, `Func<int, int, int>` type has 101 wrappers, and `Func<int, int>` type has 1 wrapper.

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

Currently, when calling MonoPInvokeCallback type functions, parameters are not marshalled. Common int and float types work normally, but for parameters like string, since the native layer passes 'char*', it's not marshalled to string, and direct use will inevitably crash!

If you encounter string type parameters, there are two solutions:

1. Put the callback function in AOT, then callback to hot update functions from AOT.
2. Change the parameter to IntPtr type, then call Marshal.PtrToStringUTF8 to convert the IntPtr type raw char* data to string. Example code is shown below.

```csharp
    [MonoPInvokeCallback(typeof(Func<Intptr, int>))]
    public static int Inc(IntPtr ptr)
    {
        string s = Marshal.PtrToStringUTF8(ptr);
        return s.Length;
    }

```

Other non-primitive type parameters that need marshalling can be handled in the same way.
