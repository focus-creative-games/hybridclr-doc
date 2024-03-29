# il2cpp Bugs

## Contravariant covariant generic interface call error

There is an error in finding the interface implementation of obj. According to the specification, the following code should print "Comput B". For example, .net 6 is the result, but "Comput A" is printed under mono and il2cpp.

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

class app
{
     public static void Main()
     {
         ITest<object> f = new B();
         Debug. Log(f. Comput());
     }
}

```

## obj.Func() non-virtual call does not conform to the specification

The ECMA specification allows non-virtual calls to null using the call instruction, but il2cpp inserts a NullCheck operation before the call. As a result, the following code will print "hello" under mono, but throw NullReferenceException under il2cpp.

```csharp

class TestNull
{
     public void Show()
     {
         Debug. Log("hello");
     }
}

class app
{
     public void Main()
     {
         TestNull nu = null;
         nu. Show();
     }
}

```

## When the struct contains class type objects, the pack of StructLayout will not take effect

```csharp
     [StructLayout( LayoutKind. Sequential, Pack = 1)]
     struct StructWithoutClass
     {
         byte a;
         long b;
     }

     [StructLayout(LayoutKind. Sequential, Pack = 1)]
     struct StructWithClass
     {
         byte a;
         object b;
     }
```

The size calculated by these two structs under x64 should both be 9, and this is also verified by running the .net 6 program test. But in mono, the first structure calculates the value as 9 and the 2nd as 16.

## Generic array function does not set token

metadata/ArrayMetadata.cpp

```cpp
     static MethodInfo* ConstructGenericArrayMethod(const GenericArrayMethod& genericArrayMethod, Il2CppClass* klass, Il2CppGenericContext* context)
     {
         MethodInfo* inflatedMethod = (MethodInfo*)MetadataCalloc(1, sizeof(MethodInfo));
         inflatedMethod->name = StringUtils::StringDuplicate(genericArrayMethod.name.c_str());
         inflatedMethod->klass = klass;

         const MethodInfo* methodToCopyDataFrom = genericArrayMethod. method;
         if (genericArrayMethod. method->is_generic)
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

## throw null will cause a crash

For c# code `throw ex;` will generate the following code, which crashes when `ex = null`.

```cpp
     IL2CPP_RAISE_MANAGED_EXCEPTION(L_107, TestCase_Run_m5B897FE9D1ABDC1AA114D3482A6613BAAE3243F6_RuntimeMethod_var);
```


## When the this of the close delegate is null, the exception thrown is out of specification

`Delegate.Create(XXInstanceMethod, null)` should throw a NullReferenceException when called, but the unity2021 version throws an ArgumentException.

## The delegate calling code generated in 2019 does not handle the open delegate correctly and this is ValueType

When using open delegate, and ref ValueType as this parameter, two calls will be made by mistake!

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

## mono and il2cpp do not support calling InvokeDyanmic on the open delegate of the instance method

will throw an 'Object does not match target type' error.

```csharp
     public void void_class_intp_open_reflection()
     {
         var b = new FT_Class() { x = 1, y = 2f, z = "abc" };
         var m = typeof(FT_Class).GetMethod("Run");
         var del = (Action<FT_Class, int>)Delegate.CreateDelegate(typeof(Action<FT_Class, int>), null, m);
         del. DynamicInvoke(b, 4);
         Assert.Equal(5, b.x);

         var dd = del + del;
         dd.DynamicInvoke(b, 1);
         Assert.Equal(7, b.x);

         Assert. ExpectException<NullReferenceException>();
         del.DynamicInvoke(null, 4);
         Assert. Fail();
     }
```

## 2019 WebGL platform generated object member access code does not check for null references

A null pointer is not checked when fetching a class member field. It is currently found that this is only the case with the WebGL platform.

```cpp

//WebGL platform does not have NullCheck
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
