# Performance

Although HybridCLR is also interpreted and executed, both theoretical principles and real machine test data show that HybridCLR has greatly improved performance (several times or even dozens of times) compared to the currently popular hot update solutions such as Lua and ILRuntime.

## Benchmark

:::tip

HybridCLR is currently the highest-performing CLR interpreter implementation and the best-performing among all current hot update solutions. Its comprehensive performance exceeds other solutions by more than an order of magnitude.

:::

The overall performance of HybridCLR's commercial version is significantly better than Mono's mint implementation, and the numerical calculation instruction performance is between 140% and 330% of Mono's.

The performance of the commercial version of HybridCLR completely crushes the xlua solution. The numerical calculation instruction performance is 651%-720% of xlua. In other aspects, it is dozens or even a hundred times faster than the xlua solution.

Except for the obvious difference between **numerical calculation** and AOT, the community version of HybridCLR has little difference in other aspects. Therefore, for most projects, the overall performance of the game is not much different from that of the fully native version.

The **commercial version** of HybridCLR has greatly optimized numerical computing performance. The performance is 280%-735% of the community version. Developers with strict performance requirements can contact us [commercial service](../business/intro .md).

The following is the OnePlus 9R ArmV8 actual test report, with the test code appendix at the end.

### HybridCLR commercial version is time consuming vs Mono is time consuming


![data](/img/benchmark/hybridclr_vs_mono.png)


### HybridCLR commercial version/Mono performance multiplier

![data](/img/benchmark/hybridclr_div_mono.png)

### HybridCLR commercial version takes time vs xlua takes time


![data](/img/benchmark/full_hybridclr_vs_xlua.jpg)


### HybridCLR commercial version/xlua performance multiplier

![data](/img/benchmark/full_hybridclr_div_xlua.jpg)

### AOT time-consuming vs. commercial version time-consuming vs. community version time-consuming (the smaller the better)

![data](/img/benchmark/numeric_datas.jpg)

### Commercial version time-consuming/AOT time-consuming vs community version time-consuming/AOT time-consuming (the smaller the better)

The performance of the AOT version is `4.1 - 90` times that of the community version and `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)


### Commercial version performance/community version performance (the bigger, the better)

The performance of the commercial version is `2.87-7.35` times that of the community version.

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### Commercial version time-consuming/AOT version time-consuming (the smaller, the better)

The performance of the AOT version is `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_dialog_business_div_aot.jpg)


## Principle

Since HybridCLR is implemented in C++ and directly integrated seamlessly with the il2cpp runtime, it can directly access the underlying data and various interfaces of the runtime. Compared with ILRuntime and Xlua, the additional cost of the C# layer is eliminated, and the interaction cost is greatly reduced.

The excellent performance of HybridCLR mainly comes from the following aspects:

### Rewritten streamlined and efficient metadata parsing library

We did not use the ready-made metadata parsing library and implemented a C++ version of streamlined and efficient metadata according to HybridCLR requirements.
Parsing library. Other C# hot update or hotfix solutions all use C# libraries such as Cecil, and there is a huge gap in memory and loading efficiency!

### Use register instruction set

The original IL bytecode is a stack-based instruction set, and HybridCLR converts it into a register instruction set, reducing stack maintenance overhead.

### Direct access to data stack and execution stack

Stack operation is the most common operation in CLI, and almost all instructions involve stack operation. Since the interpreter stack is a heap memory maintained by itself, the CLI has restrictions on struct pointer operations. If you use C# to implement the interpreter,
Then you cannot directly operate the data type on the interpreter stack, and you have to use various techniques to achieve this purpose indirectly. HybridCLR is implemented in C++ and can be operated directly.

The efficiency of operating struct types is improved several times to dozens of times compared with other interpreters.

### Static specialization of directives

Some instructions such as the `add` instruction are multi-functional instructions that determine the final operation based on the type of operand currently on the stack. HybridCLR has designed 4 instructions for it: `add_i4, add_i8, add_r4, add_r8`. When translating the instructions
Calculate the data type of the current stack and translate it into the corresponding specialization instruction. It saves the overhead of determining types at runtime and the overhead of maintaining data types at runtime.

### Calculate the runtime metadata that needs to be resolved in advance

Some instructions such as ldtoken and ldstr require the data in the instruction to be converted into actual runtime data at runtime. HybridCLR directly calculates the corresponding runtime data during translation and saves it to the converted instructions.
Greatly improved performance

### Implementation of object member access instructions is simple and efficient

Object member access instructions like `v.x = b;` are very common. ILRuntime and xlua have to operate through a wrap function call due to C# language limitations. Since HybridCLR is implemented in C++, it can directly access
For the memory data of the object, by calculating the offset of the field in the object in advance, this access operation can be completed directly by `*(int32_t*)(obj + offset) = b;`.

Compared with other hot update solutions, the efficiency is improved dozens of times.

### Directly supports reference and pointer operations without indirect methods

Due to CLI specification restrictions, references in C# can only be placed on the managed stack and not on the interpreter stack (because it is heap memory). In order to handle code like `ref int a = ref b; a = 5;` one has to use very complex
The trick is to maintain this reference indirectly. HybridCLR is implemented in c++ and can directly save and operate these data.

Compared with other hot update solutions, the efficiency is greatly improved.

### Metadata is unified, object creation is more efficient, and memory usage is smaller.

Due to the unified metadata, you can directly call il2cpp::vm::Object::New to create objects. The efficiency is very close to the native one, and the memory is exactly the same. In contrast, other hot update schemes use fake types,
Objects are bloated and the process of creating objects is more complex.

Compared with other hot update solutions, the efficiency is greatly improved.

### Unified metadata, unified function calling methods, and no additional overhead of PInvoke and ReservePInvoke

HybridCLR can directly call C++ functions translated by IL functions without any intermediate links, while ILRuntime and xlua require various complex determinations and parameter conversions, as well as PInvoke and ReservePInvoke with C#, which brings a lot of additional overhead.

The interaction between HybridCLR and il2cpp AOT is extremely lightweight and efficient. No more performance issues.

### Provides a large number of additional instinct functions

For common operations like `new Vector{2,3,4}`, `new string()`, `Nullable<T>.Value`, etc., we directly provide corresponding instructions, and the running overhead is even lower than the AOT implementation. .

Compared with other hot update solutions, the efficiency is improved dozens of times.

### Strictly follow the specifications and do not introduce additional unnecessary costs

Due to careful design and optimization, HybridCLR tries to avoid unnecessary overhead. For example, the GC of the execution process is exactly the same as native il2cpp and mono.

### Other instruction optimization techniques

Other optimization techniques

## Appendix: Test case code



```csharp
public class LongArithmetics
{
     [Benchmark]
     [Params(1000000)]
     public long add_1(long n)
     {
         long a = 1;
         long b = n;
         long c = 2;
         long d = n;
        
         for(long i = 0; i < n; i++)
         {
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public long add_2(long n)
     {
         long a = 1;
         long b = n;
         long c = 2;
         long d = n;
         long e = 3;

         for (long i = 0; i < n; i++)
         {
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public long mul_1(long n)
     {
         long a = 1;
         long b = n;
         long c = 2;
         long d = n;

         for (long i = 0; i < n; i++)
         {
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public long mul_2(long n)
     {
         long a = 1;
         long b = n;
         long c = 2;
         long d = n;
         long e = 3;

         for (long i = 0; i < n; i++)
         {
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public long div_1(long n)
     {
         long a = 1;
         long b = n;
         long c = 2;
         long d = n;

         for (long i = 0; i < n; i++)
         {
             b = c / a;
             c = d/a;
             d = b / a;

             b = c / a;
             c = d/a;
             d = b / a;
             b = c / a;
             c = d/a;
             d = b / a;
             b = c / a;
             c = d/a;
             d = b / a;
             b = c / a;
             c = d/a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d/a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             a = a / n + 1;
         }
         return a + b + c + d;
     }


     public class IntArithmetics
{
     [Benchmark]
     [Params(1000000)]
     public int add_1(int n)
     {
         int a = 1;
         int b = n;
         int c = 2;
         int d = n;
        
         for(int i = 0; i < n; i++)
         {
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public int add_2(int n)
     {
         int a = 1;
         int b = n;
         int c = 2;
         int d = n;
         int e = 3;

         for (int i = 0; i < n; i++)
         {
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public int mul_1(int n)
     {
         int a = 1;
         int b = n;
         int c = 2;
         int d = n;

         for (int i = 0; i < n; i++)
         {
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public int mul_2(int n)
     {
         int a = 1;
         int b = n;
         int c = 2;
         int d = n;
         int e = 3;

         for (int i = 0; i < n; i++)
         {
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public int div_1(int n)
     {
         int a = 1;
         int b = n;
         int c = 2;
         int d = n;

         for (int i = 0; i < n; i++)
         {
             b = c / a;
             c = d / a;
             d = b / a;

             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             a = a / n + 1;
         }
         return a + b + c + d;
     }
}

public class FloatArithmetics
{
     [Benchmark]
     [Params(1000000)]
     public float add_1(int n)
     {
         float a = 1;
         float b = n;
         float c = 2;
         float d = n;
        
         for(int i = 0; i < n; i++)
         {
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public float add_2(int n)
     {
         float a = 1;
         float b = n;
         float c = 2;
         float d = n;
         float e = 3;

         for (int i = 0; i < n; i++)
         {
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public float mul_1(int n)
     {
         float a = 1;
         float b = n;
         float c = 2;
         float d = n;

         for (int i = 0; i < n; i++)
         {
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public float mul_2(int n)
     {
         float a = 1;
         float b = n;
         float c = 2;
         float d = n;
         float e = 3;

         for (int i = 0; i < n; i++)
         {
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public float div_1(int n)
     {
         float a = 1;
         float b = n;
         float c = 2;
         float d = n;

         for (int i = 0; i < n; i++)
         {
             b = c / a;
             c = d / a;
             d = b / a;

             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             a = a / n + 1;
         }
         return a + b + c + d;
     }
}

public class DoubleArithmetics
{
     [Benchmark]
     [Params(1000000)]
     public double add_1(int n)
     {
         double a = 1;
         double b = n;
         double c = 2;
         double d = n;

         for (int i = 0; i < n; i++)
         {
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
             a = b + c;
             b = c + d;
             c = d + a;
             d = a + b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public double add_2(int n)
     {
         double a = 1;
         double b = n;
         double c = 2;
         double d = n;
         double e = 3;

         for (int i = 0; i < n; i++)
         {
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
             a = b + c + d + e;
             b = c + d + e + a;
             c = d + e + a + b;
             d = e + a + b + c;
             e = a + b + c + d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public double mul_1(int n)
     {
         double a = 1;
         double b = n;
         double c = 2;
         double d = n;

         for (int i = 0; i < n; i++)
         {
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
             a = b * c;
             b = c * d;
             c = d * a;
             d = a * b;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public double mul_2(int n)
     {
         double a = 1;
         double b = n;
         double c = 2;
         double d = n;
         double e = 3;

         for (int i = 0; i < n; i++)
         {
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
             a = b * c * d * e;
             b = c * d * e * a;
             c = d * e * a * b;
             d = e * a * b * c;
             e = a * b * c * d;
         }
         return a + b + c + d;
     }


     [Benchmark]
     [Params(1000000)]
     public double div_1(int n)
     {
         double a = 1;
         double b = n;
         double c = 2;
         double d = n;

         for (int i = 0; i < n; i++)
         {
             b = c / a;
             c = d / a;
             d = b / a;

             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             b = c / a;
             c = d / a;
             d = b / a;
             a = a / n + 1;
         }
         return a + b + c + d;
     }
}

```
