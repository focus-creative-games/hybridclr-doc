# il2cpp Bug Record

## Covariance and Contravariance Generic Interface Call Error

Finding obj's interface implementation is incorrect. According to the specification, the following code should print "Comput B", such as in .net 6, but under mono and il2cpp it prints "Comput A".

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

## obj.Func() Non-virtual Call Does Not Comply with Specification

The ECMA specification allows using the call instruction for non-virtual calls on null, but il2cpp inserts a NullCheck operation before the call. This causes the following code to print "hello" under mono, but throw a NullReferenceException under il2cpp.

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

## StructLayout pack does not take effect when struct contains class type objects

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

On x64, both structs should have size=9, which is verified by running a .net 6 program. But in mono, the first struct calculates to 9, while the second is 16.

## Generic array function does not set token

In metadata/ArrayMetadata.cpp:

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

## throw null causes crash

For C# code `throw ex;`, the following code is generated, which crashes when `ex = null`.

```cpp
    IL2CPP_RAISE_MANAGED_EXCEPTION(L_107, TestCase_Run_m5B897FE9D1ABDC1AA114D3482A6613BAAE3243F6_RuntimeMethod_var);
```

## Closed delegate with null this throws incorrect exception

`Delegate.Create(XXInstanceMethod, null)` should throw a NullReferenceException when called, but Unity 2021 throws ArgumentException.

## 2019 generated delegate call code incorrectly handles open delegate when this is ValueType

When using open delegate with ref ValueType as this parameter, it incorrectly produces two calls!

```csharp
    if (targetThis == NULL && il2cpp_codegen_class_is_value_type(il2cpp_codegen_method_get_declaring_type(targetMethod)))
    {
        typedef int32_t (*FunctionPointerType) (RuntimeObject*, int32_t, const RuntimeMethod*);
        result = ((FunctionPointerType)targetMethodPointer)((reinterpret_cast<RuntimeObject*>(___a0) - 1), ___b1, targetMethod);
    }
    if (targetThis == NULL)
    {
        typedef int32_t (*FunctionPointerType) (RuntimeObject*, int32_t, const RuntimeMethod*);
        result = ((FunctionPointerType)targetMethodPointer)((RuntimeObject*)(reinterpret_cast<RuntimeObject*>(___a0) - 1), ___b1, targetMethod);
    }
    else
    {
        typedef int32_t (*FunctionPointerType) (void*, FT_AOT_ValueType_t851DF541610F2A3DE72568571355F3953F0063AF *, int32_t, const RuntimeMethod*);
        result = ((FunctionPointerType)targetMethodPointer)(targetThis, ___a0, ___b1, targetMethod);
    }

```

## mono and il2cpp do not support InvokeDynamic on open delegate of instance method

Throws 'Object does not match target type' error.

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

## 2019 WebGL platform generated object member access code does not check null reference

When accessing class member fields, it doesn't check for null pointer. Currently found only on WebGL platform.

```cpp

//WebGL platform has no NullCheck
IL2CPP_EXTERN_C IL2CPP_METHOD_ATTR void FT_AOT_Class_Run2_m0451FFC153671CD294EB1178A01AB2D92202624C (FT_AOT_Class_t03C2F346FF0EA8694088FD3F901E6536935FB2BA * ___s0, int32_t ___b1, const RuntimeMethod* method)
{
	{
		// s.x += b;
		FT_AOT_Class_t03C2F346FF0EA8694088FD3F901E6536935FB2BA * L_0 = ___s0;
		FT_AOT_Class_t03C2F346FF0EA8694088FD3F901E6536935FB2BA * L_1 = L_0;
		int32_t L_2 = L_1->get_x_0();
		int32_t L_3 = ___b1;
		L_1->set_x_0(((int32_t)il2cpp_codegen_add((int32_t)L_2, (int32_t)L_3)));
		// }
		return;
	}
}

// Other platforms have NullCheck
IL2CPP_EXTERN_C IL2CPP_METHOD_ATTR void FT_AOT_Class_Run2_m0451FFC153671CD294EB1178A01AB2D92202624C (FT_AOT_Class_t03C2F346FF0EA8694088FD3F901E6536935FB2BA * ___s0, int32_t ___b1, const RuntimeMethod* method)
{
	{
		// s.x += b;
		FT_AOT_Class_t03C2F346FF0EA8694088FD3F901E6536935FB2BA * L_0 = ___s0;
		FT_AOT_Class_t03C2F346FF0EA8694088FD3F901E6536935FB2BA * L_1 = L_0;
		NullCheck(L_1);
		int32_t L_2 = L_1->get_x_0();
		int32_t L_3 = ___b1;
		NullCheck(L_1);
		L_1->set_x_0(((int32_t)il2cpp_codegen_add((int32_t)L_2, (int32_t)L_3)));
		// }
		return;
	}
}
```

## Mono bug with open delegate call on ValueType member function copying instead of passing ref

Works correctly in il2cpp.

```csharp
        public void void_valuetype_instance_open_interp()
        {
            var b = new FT_ValueType() { x = 1, y = 2f, z = "abc" };
            var m = typeof(FT_ValueType).GetMethod("Run");
            var invoke = typeof(ValueTypeRun).GetMethod("Invoke");
            var del = (ValueTypeRun)Delegate.CreateDelegate(typeof(ValueTypeRun), null, m);

            object c = b;
            invoke.Invoke(del, new object[] { c, 1 });
            // mono BUG!!! mono will assert fail here, get value 1.
            // But il2cpp is correct!
            Assert.Equal(2, ((FT_ValueType)c).x);

            var dd = del + del;
            invoke.Invoke(dd, new object[] { c, 1 });
            Assert.Equal(4, ((FT_ValueType)c).x);
        }
```