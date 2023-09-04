
# 桥接函数

HybridCLR的interpreter与AOT之间需要双向函数调用。比如interpreter调用AOT函数，或者AOT通过interface接口或者delegate回调interpreter。

AOT部分与解释器部分的参数传递和存储方式是不同的。解释器部分调用AOT函数，解释器的参数全在解释器栈上，必须借助合适的办法才能将解释器的函数参数传递给AOT函数。同样的，解释器无法直接获得AOT回调函数的参数。必须为每一种签名的函数生成对应的桥接函数，来实现解释器与aot部分的双向函数参数传递。`interpreter -> AOT` 方向的调用，虽然可以通过ffi之类的库来完成，但函数调用的成本过高，最合理的方式仍然是提前生成好这种双向桥接函数。解释器内部调用直接走解释器栈，不需要桥接函数。

:::tip
根据桥接函数的原理，对于固定的AOT部分，桥接函数集是确定的，后续无论进行任何热更新，都不会需要新的额外桥接函数。**因此不用担心热更上线后突然出现桥接函数缺失的问题。**
:::

## 桥接函数签名

桥接函数必须提前在AOT部分生成，这点跟lua的wrapper函数原理相似。

为了给每个`AOT <-> interpreter`之间调用的函数找到对应的桥接函数，必须有一种计算函数签名的方式。另外，参数类型和返回值类型完全等效的函数可以共享同一个桥接函数，这极大减少了桥接函数的个数。如下示例，class类型共享相同的签名。因此它们都可以共享一个 `object (object, long)` 签名的桥接函数。

```csharp
object Fun1(object a, long b);
string Fun2(string a, long b);
```

|类型|签名|
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
|class类型|u|
|指针类型|u|
|enum类型|underlying 类型对应的签名，如`enum Color:short {}`的签名为i2|
|TypedReference|typedbyref|
|struct|全局唯一struct签名, 类似`s{序号}`这样|

## 生成桥接函数

com.code-philosophy.hybridclr package中提供工具脚本，推荐使用菜单命令 `HybridCLR/Generate/All` 自动生成所有桥接函数。你也可以直接使用`HybridCLR/Generate/MethodBridge`
生成桥接函数，但该命令依赖`裁剪后的AOT dll`和`热更新dll`，而`裁剪后的AOT dll`依赖于`生成LinkXml`和`生成Il2CppDef`。因此如果没有使用`HybridCLR/Generate/All`命令，必须先依次运行：

- `HybridCLR/Generate/Il2CppDef`
- `HybridCLR/Generate/LinkXml`
- `HybridCLR/CompileDll/ActiveBuildTarget`
- `HybridCLR/Generate/AotDlls`
- `HybridCLR/Generate/MethodBridge`

