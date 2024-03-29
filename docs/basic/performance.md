# 执行性能

虽然HybridCLR也是解释执行，但无论从理论原理还是真机测试数据表明，HybridCLR相比当前流行的lua、ILRuntime之类的热更新方案，性能有极大的提升(数倍甚至数十倍)。

## 测试报告

社区版本的HybridCLR除了**数值计算**跟AOT有较明显差距外，其他方面差距不大。因此对于大多数项目来说，游戏综合性能跟全原生版本差距不大。

**商业版本**的HybridCLR大幅优化了数值计算性能，性能是社区版本的280%-735%，对性能有严苛要求的开发者可以联系我们[商业化服务](../business/intro.md)。

以下是OnePlus 9R ArmV8 实机测试报告，测试代码附录最后。

### AOT耗时 vs 商业化版本耗时 vs 社区版本耗时 （越小越好）

![data](/img/benchmark/numeric_datas.jpg)

### 商业化版本耗时/AOT耗时 vs 社区版本耗时/AOT耗时  （越小越好）

AOT版本性能是社区版本的`4.1 - 90`倍，是商业化版本的`1.30 - 12.9`倍。

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)


### 商业化版本性能/社区版本性能 （越大越好）

商业化版本性能是社区版本的`2.87-7.35`倍。

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### 商业化版本耗时/AOT版本耗时 （越小越好）

AOT版本性能是是商业化版本的`1.30 - 12.9`倍。

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)


## 原理

由于HybridCLR用C++实现，并且直接与il2cpp运行时无缝集成，可以直接访问运行时底层的数据和各种接口。相比与ILRuntime和Xlua，省去C#层的额外成本，交互成本极大降低。

HybridCLR性能优秀主要来自以下几个方面：

### 重写的精简高效的metadata解析库

我们没有使用现成的metadata解析库，按照HybridCLR需求实现了一个C++版本的精简高效的metadata
解析库。而其他C#热更新或者hotfix方案均用了Cecil之类的C#库，内存和加载效率差距巨大！

### 使用寄存器指令集

原始IL字节码是基于栈的指令集，HybridCLR将其转成寄存器指令集，减少了栈维护开销。

### 直接访问数据栈和执行栈

栈操作是CLI中最常见的操作，几乎所有指令都会涉及到栈操作。由于解释器栈是自己维护的堆内存，CLI对struct的指针操作有限制，如果用C#实现解释器，
则无法直接在解释器栈上操作数据类型，不得不使用使用各种技巧间接达到这个目的。而HybridCLR是C++实现，可以直接操作。

操作struct类型效率相比其他解释器有数倍到数十倍提升。

### 指令静态特例化

有一些指令如`add`指令是多功能指令，根据当前栈上的操作数类型来决定最终的操作。HybridCLR为它设计了`add_i4、add_i8、add_r4、add_r8`这4条指令，翻译指令时
计算出当前堆栈的数据类型，翻译为对应的特例化化指令。节省了运行时判断类型的开销，也节省了运行时维护数据类型的开销。

### 提前计算好需要resolve的运行时元数据

有些指令如ldtoken、ldstr之类需要运行时将指令中的数据转换为实际地运行时数据。HybridCLR在翻译时直接计算出对应的运行时数据，保存到转换后的指令中，
极大提升了性能

### 对象成员访问指令实现简单高效

像 `v.x = b;` 这种对象成员访问指令非常常见，像ILRuntime和xlua由于C#语言限制，不得不通过一个wrap函数调用进行操作。而HybridCLR由于用C++实现，能直接访问
对象的内存数据，通过提前计算字段在对象中的偏移，直接 `*(int32_t*)(obj + offset) = b;` 就能完成这个访问操作。

相比其他热更新方案数几十倍地提升了效率。

### 直接支持引用与指针操作，无需通过间接方法

由于CLI的规范限制，在C#中引用只能放到托管栈上，而不能存放到解释器栈上(因为是堆内存)。为了处理 `ref int a = ref b; a = 5;` 之类的代码，不得不使用非常复杂的
技巧间接地维护这个引用。而HybridCLR使用c++实现，可以直接保存和操作这些数据。

相比其他热更新方案效率极大提升。

### 元数据统一，创建对象更高效，内存占用也更小

由于元数据统一，可以直接调用il2cpp::vm::Object::New来创建对象，效率跟原生非常接近，而且内存完全相同。相比之下，其他热更新方案使用假类型，
对象臃肿，创建对象的过程更重度复杂。

相比其他热更新方案极大提升了效率。

### 元数据统一，函数调用方式统一，并且没有PInvoke和ReservePInvoke的额外开销

HybridCLR可以直接调用 由IL函数翻译后的c++函数，没有任何中间环节，而ILRuntime和xlua需要各种复杂的判定和参数转换以及与C#之间PInvoke和ReservePInvoke带来额外大量开销。

HybridCLR与il2cpp AOT部分交互极其轻量高效。不再有性能问题。

### 额外提供大量instinct函数

像 `new Vector{2,3,4}`、`new string()`、`Nullable<T>.Value` 等等的常用操作，我们直接提供了对应的指令，运行开销甚至低于AOT的实现。

相比其他热更新方案数几十倍地提升了效率。

### 严格遵循规范，不引入额外不必要成本

由于精心的设计和优化，HybridCLR尽量规避各种不必要的开销。例如执行过程的GC与原生il2cpp及mono完全相同。

### 其他指令优化技术

其他的优化技术

## 附录：测试用例代码



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