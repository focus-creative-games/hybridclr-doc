# PInvoke support

:::tip

Before v8.0.0, if you defined an extern function in hot-update code and tried to call it, an error of `ExecutionEngineException:method body is null` would be thrown.

:::

hybridclr has always supported calling extern functions defined in AOT, but since **v8.0.0**, it supports defining extern functions in hot-update code.

## Supported platforms

Supporting extern functions relies on the runtime to find function symbols in dynamic link libraries. It works properly on most platforms, but not on iOS.

|Platform|Support|
|-|-|
|Windows|✔|
|Linux|✔|
|MacOS|✔|
|Android|✔|
|iOS||
|WebGL||
|Other platforms|Untested|

## Reserved bridge function

When calling a PInvoke function, you also need to solve the parameter conversion from managed to native, so you need to generate the corresponding bridge function for the PInvoke function in advance, otherwise an exception will be thrown at runtime.

For PInvoke functions that already exist in the hot update code when constructing the main package, the corresponding bridge function will be automatically generated for them, and no special processing is required. For functions that may be used in the future but do not have an existing PInvoke function with the same signature, you need to reserve the corresponding bridge function for it.

The reservation method is to define some PInvoke type extern functions in the hot update code. PInvoke functions with the same signature can share the same bridge function, and it is **not** necessary to reserve a Wrapper function for each callback function like `[MonoPInvokeCallback]`.

The `dllName` and `EntryPoint` parameters in the `DllImport` attribute of the reserved PInvoke function can take any value and have no practical use.

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

Since hybridclr currently does not marshal the parameters and return values ​​of the PInvoke function, ordinary int and float types work normally, but parameters such as string are passed as 'char*' by the native layer, and are not marshaled to string, so they will inevitably crash if used directly!

If you encounter a string type parameter, there are two solutions:

1. You can put the callback function in AOT and call back the hot update function in AOT.

2. Change the parameter to IntPtr type, and then call Marshal.PtrToStringUTF8 to convert the original char* type data of IntPtr type into string.

The sample code is as follows:

```csharp
[DllImport("GameAssembly", EntryPoint = "GetStringLength")]
public static extern int GetStringLength(IntPtr ptr);

public static void ProcessString()
{
  var s = "abc";
  // Convert the string to a native string of type `const char*`
  IntPtr strPtr = Marshal.StringToHGlobalUni(s);
  int length = GetStringLength(strPtr);
  // Release string memory
  Marshal.FreeHGlobal(strPtr);
}

```

Other non-primitive parameters that require Marshal can be processed in the same way.
