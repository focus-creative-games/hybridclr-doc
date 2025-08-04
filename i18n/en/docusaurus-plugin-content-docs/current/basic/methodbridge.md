
# Bridge Functions

HybridCLR's interpreter needs bidirectional function calls with AOT. For example, interpreter calling AOT functions, or AOT calling back to interpreter through interface or delegate callbacks.

The parameter passing and storage methods between the AOT part and interpreter part are different. When the interpreter calls AOT functions, all interpreter parameters are on the interpreter stack, and appropriate methods must be used to pass interpreter function parameters to AOT functions. Similarly, the interpreter cannot directly obtain parameters from AOT callback functions. Bridge functions must be generated for each function signature to enable bidirectional function parameter passing between interpreter and AOT parts. For `interpreter -> AOT` direction calls, although they can be completed through libraries like ffi, the function call cost is too high. The most reasonable approach is still to pre-generate these bidirectional bridge functions. Internal interpreter calls go directly through the interpreter stack and don't need bridge functions.

:::tip
According to the principle of bridge functions, for a fixed AOT part, the set of bridge functions is determined. No matter what hot updates are performed subsequently, no new additional bridge functions will be needed. **Therefore, you don't need to worry about suddenly missing bridge functions after hot updates go live.**
:::

## Bridge Function Signatures

Bridge functions must be generated in advance in the AOT part, which is similar to the principle of lua wrapper functions.

To find the corresponding bridge function for each `AOT <-> interpreter` function call, there must be a way to calculate function signatures. Additionally, functions with completely equivalent parameter types and return value types can share the same bridge function, which greatly reduces the number of bridge functions. In the following example, class types share the same signature. Therefore, they can all share a bridge function with signature `object (object, long)`.

```csharp
object Fun1(object a, long b);
string Fun2(string a, long b);
```

|Type|Signature|
|-|-|
|sbyte|i1|
|byte|u1|
|bool|u1|
|char|u2|
|short|i2|
|ushort|u2|
|int|i4|
|uint|u4|
|long|i8|
|ulong|u8|
|IntPtr|i|
|UintPtr|u|
|float|r4|
|double|r8|
|class types|u|
|pointer types|u|
|enum types|signature corresponding to underlying type, e.g., `enum Color:short {}` has signature i2|
|TypedReference|typedbyref|
|struct|globally unique struct signature, like `s{sequence number}`|

## Generating Bridge Functions

The com.code-philosophy.hybridclr package provides tool scripts. It's recommended to use the menu command `HybridCLR/Generate/All` to automatically generate all bridge functions. You can also directly use `HybridCLR/Generate/MethodBridge`
to generate bridge functions, but this command depends on `stripped AOT dlls` and `hot update dlls`, while `stripped AOT dlls` depend on `generating LinkXml` and `generating Il2CppDef`. Therefore, if you haven't used the `HybridCLR/Generate/All` command, you must run them in sequence:

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml`
- `HybridCLR/CompileDll/ActiveBuildTarget`
- `HybridCLR/Generate/AotDlls`
- `HybridCLR/Generate/MethodBridge`

## Platform-Related

Bridge functions themselves are platform-independent. For the same dll, the bridge function files generated for all platforms are completely identical. However, due to different compilation macro switches and different base libraries (like mscorlib) on each platform, the bridge functions generated for different platforms are also different. Therefore, **do not reuse** bridge functions,
but generate them separately for each platform.
