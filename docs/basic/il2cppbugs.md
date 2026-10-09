# il2cpp bug记录

## 逆变协变泛型接口调用错误

查找obj的interface实现有误，按规范以下代码应该打出"Comput B"，例如.net 6是这个结果，但mono和il2cpp下却打印出"Comput A"。

```csharp

interface ITest<out T>
{
    T Comput();
}

class A : ITest<object>
{
    public object Comput()
    {
        return "Comput A";
    }
}

class B : A, ITest<string>
{
    public string Comput()
    {
        return "Comput B";
    }
}

class App
{
    public static void Main()
    {
        ITest<object> f = new B();
        Debug.Log(f.Comput());
    }
}

```

## obj.Func() 非虚调用不符合规范

ECMA规范允许对null使用call指令进行非虚调用，但il2cpp却在调用前插入了NullCheck操作。导致以下代码在mono下会打印出 "hello"，而在il2cpp下抛了NullReferenceException。

```csharp

class TestNull
{
    public void Show()
    {
        Debug.Log("hello");
    }
}

class App
{
    public void Main()
    {
        TestNull nu = null;
        nu.Show();
    }
}

```

## 当struct中包含class类型对象时，StructLayout的pack不会生效

```csharp
    [StructLayout( LayoutKind.Sequential, Pack = 1)]
    struct StructWithoutClass
    {
        byte a;
        long b;
    }

    [StructLayout(LayoutKind.Sequential, Pack = 1)]
    struct StructWithClass
    {
        byte a;
        object b;
    }
```

x64下这两个struct计算的size都应该=9，运行.net 6程序测试也验证了这点。但在mono中，第一个结构计算值是9，第2个是16.

## 泛型数组函数未设置token

metadata/ArrayMetadata.cpp中

```cpp
    static MethodInfo* ConstructGenericArrayMethod(const GenericArrayMethod& genericArrayMethod, Il2CppClass* klass, Il2CppGenericContext* context)
    {
        MethodInfo* inflatedMethod = (MethodInfo*)MetadataCalloc(1, sizeof(MethodInfo));
        inflatedMethod->name = StringUtils::StringDuplicate(genericArrayMethod.name.c_str());
        inflatedMethod->klass = klass;

        const MethodInfo* methodToCopyDataFrom = genericArrayMethod.method;
        if (genericArrayMethod.method->is_generic)
        {
            const Il2CppGenericMethod* genericMethod = MetadataCache::GetGenericMethod(genericArrayMethod.method, context->class_inst, context->method_inst);
            methodToCopyDataFrom = GenericMethod::GetMethod(genericMethod);

            inflatedMethod->is_inflated = true;
            inflatedMethod->genericMethod = genericMethod;
            inflatedMethod->rgctx_data = methodToCopyDataFrom->rgctx_data;
        }
        // ==={{ add by HybridCLR
        inflatedMethod->token = methodToCopyDataFrom->token;
        // ===}} add by HybridCLR
        inflatedMethod->slot = methodToCopyDataFrom->slot;
        inflatedMethod->parameters_count = methodToCopyDataFrom->parameters_count;
        inflatedMethod->parameters = methodToCopyDataFrom->parameters;
        inflatedMethod->return_type = methodToCopyDataFrom->return_type;

        inflatedMethod->methodPointer = methodToCopyDataFrom->methodPointer;
        inflatedMethod->invoker_method = methodToCopyDataFrom->invoker_method;

        return inflatedMethod;
    }
```

## throw null 会导致崩溃

对于 c#代码  `throw ex;` 会生成如下代码，当`ex = null`时崩溃。

```cpp
    IL2CPP_RAISE_MANAGED_EXCEPTION(L_107, TestCase_Run_m5B897FE9D1ABDC1AA114D3482A6613BAAE3243F6_RuntimeMethod_var);
```


## close delegate 的this为null时，抛出的异常不合规范

`Delegate.Create(XXInstanceMethod, null)` ，调用时应该抛出 NullReferenceException异常，而il2cpp抛出了ArgumentException。

## mono及il2cpp不支持 instance method的open delegate 上调用 InvokeDyanmic

会抛出 'Object does not match target type' 错误。

```csharp
    public void void_class_intp_open_reflection()
    {
        var b = new FT_Class() { x = 1, y = 2f, z = "abc" };
        var m = typeof(FT_Class).GetMethod("Run");
        var del = (Action<FT_Class, int>)Delegate.CreateDelegate(typeof(Action<FT_Class, int>), null, m);
        del.DynamicInvoke(b, 4);
        Assert.Equal(5, b.x);

        var dd = del + del;
        dd.DynamicInvoke(b, 1);
        Assert.Equal(7, b.x);

        Assert.ExpectException<NullReferenceException>();
        del.DynamicInvoke(null, 4);
        Assert.Fail();
    }
```

## Mono 对于ValueType的成员函数的open delegate调用复制而不是传递ref的bug

在il2cpp可以正常运行。

```csharp
        public void void_valuetype_instance_open_interp()
        {
            var b = new FT_ValueType() { x = 1, y = 2f, z = "abc" };
            var m = typeof(FT_ValueType).GetMethod("Run");
            var invoke = typeof(ValueTypeRun).GetMethod("Invoke");
            var del = (ValueTypeRun)Delegate.CreateDelegate(typeof(ValueTypeRun), null, m);

            object c = b;
            invoke.Invoke(del, new object[] { c, 1 });
            // mono BUG!!! mono 会在此处断言失败, get value 1。
            // 但il2cpp却是正确的!
            Assert.Equal(2, ((FT_ValueType)c).x);

            var dd = del + del;
            invoke.Invoke(dd, new object[] { c, 1 });
            Assert.Equal(4, ((FT_ValueType)c).x);
        }
```