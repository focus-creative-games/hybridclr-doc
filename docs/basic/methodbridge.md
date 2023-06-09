
# AOT-interpreter 桥接函数

HybridCLR的interpreter与AOT之间需要双向函数调用。比如interpreter调用AOT函数，或者AOT通过interface接口或者delegate回调interpreter。

AOT部分与解释器部分的参数传递和存储方式是不同的。解释器部分调用AOT函数，解释器的参数全在解释器栈上，必须借助合适的办法才能将解释器的函数参数传递给AOT函数。同样的，解释器无法直接获得AOT回调函数的参数。必须为每一种签名的函数生成对应的桥接函数，来实现解释器与aot部分的双向函数参数传递。`interpreter -> AOT` 方向的调用，虽然可以通过ffi之类的库来完成，但函数调用的成本过高，最合理的方式仍然是提前生成好这种双向桥接函数。解释器内部调用直接走解释器栈，不需要桥接函数。

:::tip
根据桥接函数的原理，对于固定的AOT部分，桥接函数集是确定的，后续无论进行任何热更新，都不会需要新的额外桥接函数。**因此不用担心热更上线后突然出现桥接函数缺失的问题。**
:::

## 桥接函数签名

桥接函数必须提前在AOT部分生成，这点跟lua的wrapper函数原理相似。

为了给每个`AOT <-> interpreter`之间调用的函数找到对应的桥接函数，必须有一种计算函数签名的方式。另外，参数类型和返回值类型完全等效的函数可以共享同一个桥接函数，这极大减少了桥接函数的个数。如下示例，对于x64和arm64平台, long、class类型共享相同的签名。因此它们都可以共享一个 `long (long, long)` 签名的桥接函数。

```csharp
object Fun1(object a, long b);
long Fun2(long a, long b);
object Fun3(object a, object b);
```

不同操作系统及architecture的ABI的处理函数参数传递和返回值的方式有一些区别。考虑到Android v8和iOS都是arm64，为了最大化优化这两个常见平台的性能，同时平衡维护过多平台的成本，我们索性针对32和64位各设计了一个最严格签名计算规则，分别叫Universal32和Universal64，以及专门对手游arm 64位平台设计了Arm64族桥接签名计算规则。

- Arm64
- Universal32 使用所有32位平台的abi交集的方式计算签名
- Universal64 使用除arm64平台以外的abi交集的方式计算签名

### Universal32 的签名规则

| 类型 | 签名|
|-|-|
|bool、byte| u1|
|sbyte |i1|
|short |i2|
|ushort、char| u2|
|int |i4|
|uint |u4|
|long |i8|
|ulong |u8|
|float |r4|
|double |r8|
|IntPtr |i4|
|UintPtr |u4|
|enum |underlying类型对应的 Universal32签名|
|值类型引用及class类型 |i4|
|值类型 |{S,C}{size}|

S,C 分别对应aligment=1、8的值类型。例如UnityEngine.Vector3的签名为S12。

### Universal64 的共享规则

| 类型 | 签名|
|-|-|
|bool、byte| u1|
|sbyte |i1|
|short |i2|
|ushort、char| u2|
|int |i4|
|uint |u4|
|long |i8|
|ulong |u8|
|float |r4|
|double |r8|
|IntPtr |i4|
|UintPtr |u4|
|enum |underlying类型对应的 Universal32签名
|值类型|S{size}|
|Vector2f|v2f|
|Vector3f|v3f|
|Vector4f|v4f|
|Vector2d|v2d|
|Vector3d|v3d|
|Vector4d|v4d|

相比于Univeral32，值类型不区分对齐，全部使用S。

### Arm64 的共享规则

| 类型 | 签名|
|-|-|
|bool、byte| u1|
|sbyte |i1|
|short |i2|
|ushort、char| u2|
|int |i4|
|uint |u4|
|long |i8|
|ulong |u8|
|float |r4|
|double |r8|
|IntPtr |i4|
|UintPtr |u4|
|enum |underlying类型对应的 Universal32签名
|值类型引用及class类型 |i8|
|作为参数的值类型(size<=16) |S16|
|作为参数的值类型(size>16) |sr|
|作为返回值的值类型|S{size}|
|Vector2f|v2f|
|Vector3f|v3f|
|Vector4f|v4f|
|Vector2d|v2d|
|Vector3d|v3d|
|Vector4d|v4d|



## 生成桥接函数

com.code-philosophy.hybridclr package中提供工具脚本，推荐使用菜单命令 `HybridCLR/Generate/All` 自动生成所有桥接函数。你也可以直接使用`HybridCLR/Generate/MethodBridge`
生成桥接函数，但该命令依赖`裁剪后的AOT dll`和`热更新dll`，而`裁剪后的AOT dll`依赖于`生成LinkXml`和`生成Il2CppDef`。因此如果没有使用`HybridCLR/Generate/All`命令，必须先依次运行：

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml`
- `HybridCLR/CompileDll/ActiveBuildTarget`
- `HybridCLR/Generate/AotDlls`
- `HybridCLR/Generate/MethodBridge`

