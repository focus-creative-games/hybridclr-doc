# PInvoke Support

:::tip

Prior to version v8.0.0, defining extern functions in hot update code and attempting to call them would throw an `ExecutionEngineException: method body is null` error.

:::

HybridCLR has always supported calling extern functions defined in AOT, but starting from **v8.0.0**, it supports defining extern functions in hot update code.

## Supported Platforms

This extern function feature depends on runtime lookup of function symbols in dynamic link libraries. It works normally on most platforms but cannot run on iOS.

|Platform|Support|
|-|-|
|Windows|✔|
|Linux|✔|
|MacOS|✔|
|Android|✔|
|iOS||
|WebGL||
|Other platforms|Not tested|

## Reserving Bridge Functions

When calling PInvoke functions, parameter conversion from managed to native also needs to be resolved, so corresponding bridge functions for the PInvoke function must be pre-generated, otherwise a runtime exception `ExecutionEngineException: NotSupportManaged2NativeFunctionMethod` will be thrown.

For PInvoke functions that already exist in hot update code when building the main package, corresponding bridge functions will be automatically generated without special handling. For functions that may be used in the future but don't have existing PInvoke functions with the same signature, corresponding bridge functions need to be reserved.

The reservation method is to define some PInvoke-type extern functions in hot update code. PInvoke functions with the same signature can all share the same bridge function, **no need** to reserve a Wrapper function for each callback function like `[MonoPInvokeCallback]`.

The `dllName` and `EntryPoint` parameters in the `DllImport` attribute of reserved PInvoke functions can have arbitrary values and have no practical use.

Example as follows:

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

## Limitations

Since HybridCLR currently doesn't marshal parameters and return values for PInvoke functions, common int and float types work normally, but for parameters like string, since the native layer passes 'char*', it's not marshalled to string, and direct use will inevitably crash!

If you encounter string type parameters, there are two solutions:

1. Put the callback function in AOT, then callback to hot update functions from AOT.
2. Change the parameter to IntPtr type, then call Marshal.PtrToStringUTF8 to convert the IntPtr type raw char* data to string.

Example code as follows:

```csharp
    [DllImport("GameAssembly", EntryPoint = "GetStringLength")]
    public static extern int GetStringLength(IntPtr ptr);


    public static void ProcessString()
    {
      var s = "abc";
      // Convert string to native string of `const char*` type
      IntPtr strPtr = Marshal.StringToHGlobalUni(s);
      int length = GetStringLength(strPtr);
      // Free string memory
      Marshal.FreeHGlobal(strPtr);
    }

```

Other non-primitive type parameters that need marshalling can be handled in the same way.
