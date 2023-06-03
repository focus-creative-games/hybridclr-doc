# AOT-interpreter bridge function

Two-way function calls are required between the Interpreter of HybridCLR and AOT. For example, the interpreter calls the AOT function, or the AOT calls back the interpreter through the interface interface or delegate.

The parameter passing and storage methods of the AOT part and the interpreter part are different. The interpreter part calls the AOT function, and the parameters of the interpreter are all on the interpreter stack, and the function parameters of the interpreter must be passed to the AOT function by means of a suitable method. Similarly, the interpreter cannot directly obtain the parameters of the AOT callback function. Corresponding bridge functions must be generated for each type of signature function to realize the two-way function parameter transfer between the interpreter and the aot part. Calling in the direction of `interpreter -> AOT` can be done through libraries like ffi, but the cost of function calls is too high. The most reasonable way is to generate this bidirectional bridge function in advance. The internal calls of the interpreter go directly to the interpreter stack, no bridge function is needed.

?> According to the principle of bridge functions, for a fixed AOT part, the set of bridge functions is determined, and no new additional bridge functions will be needed no matter any subsequent hot updates. **Therefore, there is no need to worry about the problem that the bridge function is missing suddenly after the hot update goes online. **

## Bridge function signature

The bridge function must be generated in the AOT part in advance, which is similar to the principle of lua's wrapper function.

In order to find the corresponding bridge function for each function called between `AOT <-> interpreter`, there must be a way to calculate the function signature. In addition, functions with completely equivalent parameter types and return value types can share the same bridge function, which greatly reduces the number of bridge functions. For the following example, for x64 and arm64 platforms, long and class types share the same signature. So they can all share a bridge function with `long (long, long)` signature.

```csharp
object Fun1(object a, long b);
long Fun2(long a, long b);
object Fun3(object a, object b);
```

There are some differences in how the ABIs of different operating systems and architectures handle function parameter passing and return values. Considering that both Android v8 and iOS are arm64, in order to maximize the performance of these two common platforms and balance the cost of maintaining too many platforms, we simply designed the most stringent signature calculation rules for 32 and 64 bits respectively, called Universal32 and Universal64, as well as the Arm64 family bridge signature calculation rules are designed for the mobile game arm 64-bit platform.

-Arm64
- Universal32 uses the abi intersection of all 32-bit platforms to calculate the signature
- Universal64 calculates the signature using the abi intersection method other than the arm64 platform

### Signature rules for Universal32

| Type | Signature|
|-|-|
|bool, byte| u1|
|sbyte |i1|
|short |i2|
|ushort, char| u2|
|int |i4|
|uint |u4|
|long |i8|
|ulong |u8|
|float |r4|
|double |r8|
|IntPtr |i4|
|UintPtr |u4|
Universal32 signature corresponding to |enum |underlying type|
|Value type reference and class type |i4|
|value type |{S,C}{size}|

S and C correspond to the value types of aligment=1 and 8 respectively. For example, the signature of UnityEngine.Vector3 is S12.

### Sharing rules for Universal64

| Type | Signature|
|-|-|
|bool, byte| u1|
|sbyte |i1|
|short |i2|
|ushort, char| u2|
|int |i4|
|uint |u4|
|long |i8|
|ulong |u8|
|float |r4|
|double |r8|
|IntPtr |i4|
|UintPtr |u4|
Universal32 signature corresponding to |enum |underlying type
|value type|S{size}|
|Vector2f|v2f|
|Vector3f|v3f|
|Vector4f|v4f|
|Vector2d|v2d|
|Vector3d|v3d|
|Vector4d|v4d|

Compared with Univeral32, the value type does not distinguish alignment, all use S.

### Sharing Rules for Arm64

| Type | Signature|
|-|-|
|bool, byte| u1|
|sbyte |i1|
|short |i2|
|ushort, char| u2|
|int |i4|
|uint |u4|
|long |i8|
|ulong |u8|
|float |r4|
|double |r8|
|IntPtr |i4|
|UintPtr |u4|
Universal32 signature corresponding to |enum |underlying type
|Value type reference and class type |i8|
|Value type as parameter (size<=16) |S16|
|Value type as parameter (size>16) |sr|
|The value type of the return value |S{size}|
|Vector2f|v2f|
|Vector3f|v3f|
|Vector4f|v4f|
|Vector2d|v2d|
|Vector3d|v3d|
|Vector4d|v4d|



## Generate bridge function

The tool script is provided in the com.code-philosophy.hybridclr package, and it is recommended to use the menu command `HybridCLR/Generate/All` to automatically generate all bridge functions. You can also use `HybridCLR/Generate/MethodBridge` directly
Generate bridge functions, but the command depends on `Cropped AOT dll` and `Hot Update dll`, and `Cropped AOT dll` depends on `Generate LinkXml` and `Generate Il2CppDef`. Therefore, if you do not use the `HybridCLR/Generate/All` command, you must first run in order:

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml`
- `HybridCLR/CompileDll/ActiveBuildTarget`
- `HybridCLR/Generate/AotDlls`
- `HybridCLR/Generate/MethodBridge`
