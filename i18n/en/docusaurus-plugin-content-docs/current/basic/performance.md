# Execution performance

Although HybridCLR is also interpreted and executed, both theoretical principles and real machine test data show that HybridCLR has greatly improved performance (several times or even dozens of times) compared to the current popular hot update solutions such as lua and ILRuntime.

## testing report

The community version of HybridCLR is much (several times to tens of times) better than the Lua solution except that its numerical calculation is equal to that of Lua.

The HybridCLR of the **commercial version** has greatly optimized the performance of numerical calculations, with a performance improvement of nearly 300%. Most other common instructions also have a performance improvement of 50%-200%. Developers who have strict requirements on performance can contact us [Business Services](../business/intro.md).

The following is the test report of the community version of HybridCLR under the iphone 11 and Xiaomi 5C mobile phones. The test code is at the end of the appendix.

:::caution
Note that the test cases of test2, test8, and test9 are extremely unreasonable. In the case of AOT, they will be completely optimized by the compiler, resulting in a time of 0. real gap
It should be between 10-30 times.
:::

AOT lines are native il2cpp data. The HotFix line is HybridCLR data. Lua lines are data for xlua.

![iphone11](/img/hybridclr/benchmark_iphone11.png)

![xiaomi5c](/img/hybridclr/benchmark_xiaomi.png)

The following is the performance improvement data of the commercial version under some test cases compared with the community version.

![interpreter_optimization](/img/hybridclr/interpreter_optimization.jpg)

The following is the performance comparison between AOT and HybridCLR after optimization in terms of numerical calculation. The addition is about 7-16 times, the multiplication is 4 times, and the division is 2 times.

![benchmark_numeric](/img/hybridclr/benchmark_numeric.jpg)

## principle

Since HybridCLR is implemented in C++ and seamlessly integrated directly with il2cpp runtime, it can directly access the underlying data and various interfaces of runtime. Compared with ILRuntime and Xlua, the additional cost of the C# layer is saved, and the interaction cost is greatly reduced.

The excellent performance of HybridCLR mainly comes from the following aspects:

### Rewritten streamlined and efficient metadata parsing library

We did not use the ready-made metadata parsing library, and implemented a C++ version of streamlined and efficient metadata according to the requirements of HybridCLR
parsing library. Other C# hot update or hotfix solutions use C# libraries such as Cecil, and there is a huge gap in memory and loading efficiency!

### Use the register instruction set

The original IL bytecode is a stack-based instruction set, and HybridCLR converts it into a register instruction set, which reduces the stack maintenance overhead.

### Direct access to data stack and execution stack

Stack operations are the most common operations in the CLI, and almost all instructions involve stack operations. Since the interpreter stack is the heap memory maintained by itself, the CLI has restrictions on the pointer operation of the struct. If the interpreter is implemented in C#,
You cannot directly manipulate data types on the interpreter stack, and you have to use various tricks to achieve this purpose indirectly. The HybridCLR is implemented in C++ and can be directly manipulated.

The efficiency of manipulating struct types is several times to dozens of times higher than other interpreters.

### Directive static specialization

Some instructions such as the `add` instruction are multi-function instructions, and the final operation is determined according to the type of the operand on the current stack. HybridCLR designed four instructions `add_i4, add_i8, add_r4, add_r8` for it, when translating instructions
Calculate the data type of the current stack and translate it into the corresponding specialization instruction. It saves the overhead of judging the type at runtime, and also saves the overhead of maintaining data types at runtime.

### Calculate the runtime metadata that needs to be resolved in advance

Some instructions such as ldtoken and ldstr need to convert the data in the instruction into actual runtime data at runtime. HybridCLR directly calculates the corresponding runtime data during translation and saves it in the converted instruction.
greatly improved performance

### Object member access instructions are simple and efficient

Object member access instructions like `v.x = b;` are very common. Due to the limitations of the C# language, like ILRuntime and xlua, they have to be operated through a wrap function call. Since HybridCLR is implemented in C++, it can directly access
For the memory data of the object, by calculating the offset of the field in the object in advance, directly `*(int32_t*)(obj + offset) = b;` can complete this access operation.

Compared with other hot update schemes, the efficiency is improved by dozens of times.

### Directly support reference and pointer operations without indirect methods

Due to the specification restrictions of the CLI, references in C# can only be placed on the managed stack, but not on the interpreter stack (because it is heap memory). To handle something like `ref int a = ref b; a = 5;`, you have to use very complicated
The trick maintains this reference indirectly. And HybridCLR uses c++ to realize, can save and operate these data directly.

Compared with other hot update solutions, the efficiency is greatly improved.

### Unified metadata, more efficient object creation, and smaller memory footprint

Due to the unified metadata, you can directly call il2cpp::vm::Object::New to create objects, the efficiency is very close to the original, and the memory is exactly the same. In contrast, other hot update schemes use fake types,
The object is bloated, and the process of creating the object is more complicated.

Compared with other hot update schemes, the efficiency is greatly improved.

### The metadata is unified, the function calling method is unified, and there is no additional overhead of PInvoke and ReservePInvoke

HybridCLR can directly call the C++ function translated by the IL function without any intermediate links, while ILRuntime and xlua require various complex judgments and parameter conversions, as well as PInvoke and ReservePInvoke between C# and bring a lot of extra overhead.

The interaction between HyridCLR and il2cpp AOT is extremely lightweight and efficient. No more performance issues.

### additionally provide a large number of instinct functions

For common operations such as `new Vector{2,3,4}`, `new string()`, `Nullable<T>.Value`, etc., we directly provide the corresponding instructions, and the running overhead is even lower than the implementation of AOT .

Compared with other hot update schemes, the efficiency is improved by dozens of times.

### Strictly follow the specification and do not introduce additional unnecessary costs

Due to careful design and optimization, HybridCLR tries to avoid all kinds of unnecessary overhead. For example, the GC of the execution process is exactly the same as that of native il2cpp and mono.

### Other instruction optimization techniques

Other Optimization Techniques

## Appendix: Test case code

The following test cases are provided by a third party. The use cases are unreasonable, but we don’t want to be deliberately constructed and directly quote their use cases.

```csharp
private static void Test0()
{
   var go = new GameObject("t");
   var transform = go. transform;

   var cnt = PerformanceSetting. Count * 1000;
   for (var i = 0; i < cnt; i++)
   {
     transform.position = transform.position;
   }

   Object. Destroy(go);
}

private static void Test1()
{
   var go = new GameObject("t");
   var transform = go. transform;

   var cnt = PerformanceSetting. Count * 100;
   for (var i = 0; i < cnt; i++)
   {
     transform. Rotate(Vector3. up, 1);
   }

   Object. Destroy(go);
}

private static void Test2()
{
   var cnt = PerformanceSetting. Count * 1000;
   for (var i = 0; i < cnt; i++)
   {
     var v = new Vector3(i, i, i);
     var x = v.x;
     var y = v.y;
     var z = v.z;
     var r = x + y * z;
   }
}

private static void Test3()
{
   var cnt = PerformanceSetting. Count * 10;
   for (var i = 0; i < cnt; i++)
   {
     var go = new GameObject("t");
     Object. Destroy(go);
   }
}

private static void Test4()
{
   var cnt = PerformanceSetting. Count * 10;
   for (var i = 0; i < cnt; i++)
   {
     var go = new GameObject();
     go.AddComponent<SkinnedMeshRenderer>();
     var c = go. GetComponent<SkinnedMeshRenderer>();
     c. receiveShadows = false;
     Object. Destroy(go);
   }
}

private static void Test5()
{
   var cnt = PerformanceSetting. Count * 1000;
   for (var i = 0; i < cnt; i++)
   {
     var p = Input. mousePosition;
   }
}

private static void Test6()
{
   var cnt = PerformanceSetting. Count * 1000;
   for (var i = 0; i < cnt; i++)
   {
     var v = new Vector3(i, i, i);
     Vector3. Normalize(v);
   }
}

private static void Test7()
{
   var cnt = PerformanceSetting. Count * 100;
   for (var i = 0; i < cnt; i++)
   {
     var q1 = Quaternion. Euler(i, i, i);
     var q2 = Quaternion. Euler(i * 2, i * 2, i * 2);
     Quaternion. Slerp(Quaternion. identity, q1, 0.5f);
   }
}

private static void Test8()
{
   double total = 0;
   var cnt = PerformanceSetting. Count * 10000;
   for (var i = 0; i < cnt; i++)
   {
     total = total + i - (i / 2) * (i + 3) / (i + 5);
   }
}

private static void Test9()
{
   var cnt = PerformanceSetting. Count * 1000;
   for (var i = 0; i < cnt; i++)
   {
     var a = new Vector3(1, 2, 3);
     var b = new Vector3(4, 5, 6);
     var c = a + b;
   }
}
```

```lua
local function test0()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 1000

     local go = CS.UnityEngine.GameObject("_")
     local transform = go.transform

     for i = 1, cnt do
         transform.position = transform.position
     end

     CS.UnityEngine.GameObject.Destroy(go)
end

local function test1()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 100

     local go = CS.UnityEngine.GameObject("_")
     local transform = go.transform

     for i = 1, cnt do
         transform:Rotate(CS.UnityEngine.Vector3.up, 1)
     end

     CS.UnityEngine.GameObject.Destroy(go)
end

local function test2()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 1000

     local go = CS.UnityEngine.GameObject("_")
     local transform = go.transform

     for i = 1, cnt do
         local tmp = CS.UnityEngine.Vector3(i, i, i)
         local x = tmp.x
         local y = tmp.y
         local z = tmp.z
         local r = x + y * z
     end
end

local function test3()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 10
     for i = 1, cnt do
         local tmp = CS.UnityEngine.GameObject("___")
         CS.UnityEngine.GameObject.Destroy(tmp)
     end
end

local function test4()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 10
     for i = 1, cnt do
         local tmp = CS.UnityEngine.GameObject("___")
         tmp:AddComponent(typeof(CS.UnityEngine.SkinnedMeshRenderer))
         local c = tmp:GetComponent(typeof(CS.UnityEngine.SkinnedMeshRenderer))
         c.receiveShadows = false
         CS.UnityEngine.GameObject.Destroy(tmp)
     end
end

local function test5()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 1000
     for i = 1, cnt do
         local tmp = CS.UnityEngine.Input.mousePosition;
     end
end

local function test6()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 1000
     for i = 1, cnt do
         local tmp = CS.UnityEngine.Vector3(i, i, i)
         CS.UnityEngine.Vector3.Normalize(tmp)
     end
end

local function test7()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 100
     for i = 1, cnt do
         local t1 = CS.UnityEngine.Quaternion.Euler(i, i, i)
         local t2 = CS.UnityEngine.Quaternion.Euler(i * 2, i * 2, i * 2)
         CS.UnityEngine.Quaternion.Slerp(t1, t2, CS.UnityEngine.Random.Range(0.1, 0.9))
     end
end

local function test8()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 10000
     local total = 0
     for i = 1, cnt do
         total = total + i - (i / 2) * (i + 3) / (i + 5)
     end
end

local function test9()
     local cnt = CS.GameMain.Scripts.Performance.PerformanceSetting.Count * 1000
     for i = 1, cnt do
         local tmp0 = CS.UnityEngine.Vector3(1, 2, 3)
         local tmp1 = CS.UnityEngine.Vector3(4, 5, 6)
         local tmp2 = tmp0 + tmp1
     end
end

```