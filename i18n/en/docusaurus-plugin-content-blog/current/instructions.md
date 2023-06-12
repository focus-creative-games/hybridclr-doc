# hybridclr instruction set design

The original IL instruction set is a stack-based instruction set. The advantage is that the number of instructions is small, elegant, and compact. It is very suitable for representing virtual machine logic, but it is not suitable for efficient interpretation and operation by an interpreter. So we need to convert it to another custom, efficient
Interpret the set of instructions that are executed and then run in our interpreter.

## Defects of the IL instruction set

- IL is a stack-based instruction, and maintaining the execution stack at runtime is unnecessary overhead
- IL has a large number of single-instruction and multi-function instructions. For example, the add instruction can be used to calculate the sum of int, long, float, and double types. As a result, the runtime needs to judge which calculation should be performed based on the above. Not only increases the overhead of runtime judgment, but also increases the overhead of maintaining the execution stack data type at runtime
- The IL instruction contains some data that needs to be resolved at runtime, such as the first parameter of the newobj instruction is the method token. Token resolve is an expensive operation, and resolving every time it is executed will greatly slow down the execution performance
- IL is a stack-based instruction, and there are many instructions related to stack push and unstack. An instruction like a=b+c needs 4 instructions to complete, but if a register-based instruction is used, it can be completed in one instruction.
- IL is not suitable for other optimization operations, such as our InitOnce JIT technology.
- other

## hybridclr command set design goals

The design goal of the hybridclr instruction set is to solve the defects of the original IL and to do some more advanced optimizations. Currently, it mainly includes the following functions

- The instruction contains the target address to be operated, and there is no need to maintain the stack
- For single-instruction multi-function pointers, it is necessary to maintain a corresponding instruction for each type of operation data, eliminating the overhead of maintaining types and determining types at runtime. For example, the add instruction should be specialized into instructions such as add_int and add_long
- For instructions related to token parsing, try to fix them directly when converting the instructions, saving the overhead of calculation or query. For example, the method token field in newobj is directly converted into MethodInfo* metadata
- For some common operations such as a = b + c, 4 instructions `ldloc b , ldloc c, add, stloc a` are required, we hope to provide dedicated instructions to fold it
- Need to be able to cooperate with some common optimization techniques, such as function inline, InitOnce dynamic jit technology
- Cross-platform issues need to be considered, such as armv7, which requires memory-aligned hardware, can also be executed efficiently

hybridclr uses the classic register instruction set with some other runtime facilities to achieve the above goals.

## Operating environment

Regardless of the content of the instruction, the execution result of the instruction must produce side effects (even if it is a do-nothing instruction such as nop, it will also cause the current instruction register ip to change), and these side effects will inevitably affect the operating environment (even possible) In the instruction itself, such as InitOnce technology). Just because the instruction execution cannot be separated from the specific execution environment, the instruction design must be closely related to the operating environment of the hybridclr interpreter and il2cpp runtime.

### hybridclr function frame stack

Most basic instructions operate on function parameters, local variables, and data at the top of the execution stack. In hybridclr, the data stack is used to store these data, and the logical address (type uint16_t) is used to identify the location of the data to be operated. The logical address is local, and the logical address of the execution stack frame of each function starts from 0 and reaches a maximum of 2^16-1.

The layout of the logical address is as follows

![method frame](/img/blog/method_frame.jpg)

According to its nesting order, the position of the function frame on the data stack expands from low to high, as shown in the figure below

![method frame](/img/blog/method_frame2.jpg)

Each slot of the data stack is a StackObject type object with size=8, and each variable may occupy one or more slots. For example, an int type variable occupies only one slot, but a Vector3 type variable occupies two slots.

The localVarBase pointer is the base location of the function frame stack.

```cpp
union StackObject
{
     void* ptr; // can't adjust position. will raise native_invoke init args bugs.
     bool b;
     int8_t i8;
     uint8_t u8;
     int16_t i16;
     uint16_t u16;
     int32_t i32;
     uint32_t u32;
     int64_t i64;
     uint64_t u64;
     float f4;
     double f8;
     Il2CppObject* obj;
     Il2CppString* str;
     Il2CppObject** ptrObj;
};

StackObject* localVarBase;
```

### Runtime related

Except for the instructions that only operate the function frame stack and the current function state, the rest of the instructions must rely on the api provided by the il2cpp runtime and the hybridclr interpreter execution environment MachineState to complete the function. In more detail, it is divided into several categories

- Metadata data related. Such as the typeof instruction, which depends on the runtime to convert the token to Il2Class* runtime metadata
- Object dependent. Such as ldsfld instruction type static member access
- gc related. For example, the newobj instruction relies on gc-related mechanisms to allocate object memory
- Multithreading related. Class static member variables such as ThreadStatic
- Some other special mechanics. For example, the localloc instruction relies on hybridclr's MachineState to provide api to allocate memory

## Instruction structure

The hybridclr instruction structure is as follows

![instrument](/img/blog/instrument.jpg)

The first 2 bytes of the instruction is opcode, and the remaining instruction data is called instruction param. Param is divided into several types:

- Data logical address.
- Ordinary literal constants. For example `a = b + 5`, where the constant 5 must be reflected in the instruction
- Data after resolve. Such as `ldtoken`, in order to optimize the performance and do not want to calculate the token every time it is executed, it is necessary to include the metadata corresponding to the token that is resolved at runtime into the instruction
- A pointer to the resolved data. Some instructions contain data of indefinite length, for example, a switch statement may contain jump addresses of n case items. In order to make the size of the instruction itself fixed, we store these variable-length data in the resolvedDatas of InterpMethodInfo, and use a uint32_t index to point to its location.
- some other auxiliary data
- The padding parameter inserted to ensure param memory alignment access

## Cross-platform compatibility

The cross-platform compatibility issues directly related to instructions are mainly memory alignment issues. At present, arm64 CPU supports unaligned memory access, but armv7 still requires memory alignment, otherwise once unaligned access occurs, either the operating efficiency will be greatly reduced, or it will directly lead to a crash.
Although two completely different sets of instructions can be designed for 64-bit and 32-bit, hybridclr still uses a unified set of instructions for the sake of convenient maintenance and feeding bugs.

Some design constraints of hybridclr instructions:

- The first 2 bytes of each instruction must be opcode
- Satisfy memory alignment. The size of the instruction param may be 1, 2, 4, 8. In order to meet the requirements of memory alignment, we insert some useless padding data of type uint8_t between param.

### padding optimization

In order to minimize the wasted padding data space, we sort all params from small to large, and insert padding to meet memory alignment. After less complex reasoning, we can know that each instruction wastes up to **7** bytes of padding space.

## Directive implementation

Due to the large number of IL instructions, we cannot introduce the hybridclr instruction set design corresponding to all instructions one by one. We will introduce them in detail in several categories.

### Empty directive

For example, the nop and pop instructions are eliminated directly in the transform stage, and the corresponding hybridclr instructions are not generated at all.

### Simple Data Copy Instructions

Typical

- Instructions for manipulating function parameters. Such as ldarg, starg, ldarga
- Instructions that manipulate local variables of a function. Such as ldloc, stloc, ldloca
- Instructions that manipulate the data at the top of the eval stack are implied. Such as add, dup

For the instructions to operate the function frame stack, the following types of processing are generally required

- Add corresponding logical address fields for source data and target data
- For instructions with multiple variants of source data or target data, they are unified into instructions with logical address fields. For example, ldarg.0 - ldarg.3, ldarg, and ldarg.s are all unified into one instruction.

Take the typical ldarg instruction as an example. If the type of the function parameter to be operated is int, the corresponding hybridclr instruction is

```cpp
struct IRCommon
{
     uint16_t opcode;
}

struct IRLdlocVarVar : IRCommon
{
     uint16_t dst;
     uint16_t src;
     uint8_t __pad6;
     uint8_t __pad7;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdlocVarVar:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint16_t __src = *(uint16_t*)(ip + 4);
     (*(uint64_t*)(localVarBase + __dst)) = (*(uint64_t*)(localVarBase + __src));
     ip += 8;
     continue;
}

```

- dst points to the logical address of the top of the current execution stack
- the logical address of the variable to be loaded in src ldarg
- __pad6 inserted for memory alignment
- __pad7 ditto

### Instructions that require expand target data

According to the CLI specification, primitive types such as byte, sbyte, short, and ushort whose size is less than 4, and enumerations whose underlying type is these primitive types, need to be sign-extended to int32_t type data when they are loaded into the evaluate stack. We don't want to make runtime judgments when executing the ldarg instruction, because this will reduce performance. Therefore, for these operations whose size is less than 4, corresponding instructions are designed separately.

Taking the byte type as an example, the corresponding hybridclr instruction is

```cpp
struct IRLdlocExpandVarVar_u1 : IRCommon
{
     uint16_t dst;
     uint16_t src;
     uint8_t __pad6;
     uint8_t __pad7;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdlocExpandVarVar_u1:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint16_t __src = *(uint16_t*)(ip + 4);
     (*(int32_t*)(localVarBase + __dst)) = (*(uint8_t*)(localVarBase + __src));
     ip += 8;
     continue;
}
```

### Static specialization directives

The actual execution method of a class of instructions is related to its parameter type, such as add. When the number of operations is int, long, float, double, perform the data addition operation of the corresponding type. But in fact, due to the static nature of the IL program, the data type operated by each instruction must be fixed, and there is no need to maintain the data type at runtime, and determine what operation to perform based on the data type. We use a technique called "static specialization" to design multiple hybridclr instructions for this instruction, and generate corresponding instructions according to the specific operation data type during transform.

Take add as an example to add two int32_t type data

```cpp
struct IRBinOpVarVarVar_Add_i4 : IRCommon
{
     uint16_t ret;
     uint16_t op1;
     uint16_t op2;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::BinOpVarVarVar_Add_i4:
{
     uint16_t __ret = *(uint16_t*)(ip + 2);
     uint16_t __op1 = *(uint16_t*)(ip + 4);
     uint16_t __op2 = *(uint16_t*)(ip + 6);
     (*(int32_t*)(localVarBase + __ret)) = (*(int32_t*)(localVarBase + __op1)) + (*(int32_t*)(localVarBase + __op2));
     ip += 8;
     continue;
}
```

### Instructions directly containing constants

There are some instructions that contain ordinary literal constants, such as the ldc instruction. The corresponding register instructions simply add fields of the corresponding size.

Take ldc int32_t type data as an example

```cpp
struct IRLdcVarConst_4 : IRCommon
{
     uint16_t dst;
     uint32_t src;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdcVarConst_4:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint32_t __src = *(uint32_t*)(ip + 4);
     (*(int32_t*)(localVarBase + __dst)) = __src;
     ip += 8;
     continue;
}
```

### Implicit constant directives

There are some instructions that implicitly operate on constants, such as ldnull, ldc.i4.0 - ldc.i4.8, etc. For such instructions, if there is a corresponding implementation of `instructions directly containing constants`, it is simply converted to the `instructions directly containing constants` introduced in the previous section. It may be further optimized in the future.

Take ldnull as an example

```cpp
struct IRLdnullVar : IRCommon
{
     uint16_t dst;
     uint8_t __pad4;
     uint8_t __pad5;
     uint8_t __pad6;
     uint8_t __pad7;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdnullVar:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     (*(void**)(localVarBase + __dst)) = nullptr;
     ip += 8;
     continue;
}

```

#### Command Sharing

In order to reduce the number of instructions, the ldc instructions that operate on the same size constant will be merged into one. For example, the ldloc.r4 instruction is merged into the implementation of the ldloc.i4 instruction.

### Instructions containing resolved data

Some instructions include metadata token, such as sizeof, ldstr, newobj. In order to avoid huge runtime resolve overhead, hybridclr has already resolved the token data into the corresponding runtime metadata when transforming these instructions.

In more detail, it is divided into two categories.

#### Instructions that directly contain resolved data

Taking sizeof as an example, the original command token is the type information. When transforming, the size of the corresponding ValueType is directly calculated, and there is no need to design a corresponding command for sizeof, and the ready-made LdcVarConst_4 command is directly used.

```cpp
case OpcodeValue::SIZEOF:
{
     uint32_t token = (uint32_t)GetI4LittleEndian(ip + 2);
     Il2CppClass* objKlass = image->GetClassFromToken(token, klassContainer, methodContainer, genericContext);
     IL2CPP_ASSERT(objKlass);
     int32_t typeSize = GetTypeValueSize(objKlass);
     CI_ldc4(typeSize, EvalStackReduceDataType::I4);
     ip += 6;
     continue;
}
```

### Instructions that indirectly contain resolved data

The tokens contained in instructions such as ldstr and newobj become pointers corresponding to runtime metadata after being resolved. Considering that pointers are of different sizes on different platforms, this pointer is not directly placed in the instruction, but replaced with a uint32_t type Points to the index param of the InterpMethodInfo::resolvedData field. During the execution process, a query operation to resolvedData is required, and the time complexity is O(1).


Take the newobj command as an example

```cpp
struct IRLdstrVar : IRCommon
{
     uint16_t dst;
     uint32_t str;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdstrVar:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint32_t __str = *(uint32_t*)(ip + 4);
     (*(Il2CppString**)(localVarBase + __dst)) = ((Il2CppString*)imi->resolveDatas[__str]);
     ip += 8;
     continue;
}

```

### Branch jump instruction

The original IL bytecode uses a relative offset jump target, and almost every jump-related instruction is designed with near and far offset instructions. For simplicity, hybridclr directly uses a 4-byte absolute jump address.

Take the br unconditional jump instruction as an example

```cpp

struct IRBranchUncondition_4 : IRCommon
{
     uint8_t __pad2;
     uint8_t __pad3;
     int32_t offset;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::BranchUncondition_4:
{
     int32_t __offset = *(int32_t*)(ip + 4);
     ip = ipBase + __offset;
     continue;
}
```

offset is the absolute offset of the converted instruction address.

### Object member access directives

Since the offset of the field in the object has been completely determined, the offset of the field in the object is calculated during transform, and saved as the offset param of the instruction. When executing, use the this pointer and the offset to directly access the field data according to the size of the object.

Take ldfld to read int type fields as an example

```cpp

struct IRLdfldVarVar_i4 : IRCommon
{
     uint16_t dst;
     uint16_t obj;
     uint16_t offset;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdfldVarVar_i4:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint16_t __obj = *(uint16_t*)(ip + 4);
     uint16_t __offset = *(uint16_t*)(ip + 6);
     CHECK_NOT_NULL_THROW((*(Il2CppObject**)(localVarBase + __obj)));
     (*(int32_t*)(localVarBase + __dst)) = *(int32_t*)((uint8_t*)(*(Il2CppObject**)(localVarBase + __obj)) + __offset);
     ip += 8;
     continue;
}

```

### ThreadStatic member access instruction

When initializing Il2CppClass, if it contains a static member variable marked by the ThreadStatic attribute, it is allocated a continuous space of ThreadLocalStorage that can put all the ThreadStatic variables of this type.
With the support of ThreadStatic in il2cpp runtime, the implementation of related instructions is quite simple and straightforward.

Take the ldsfld command as an example

```cpp

struct IRLdthreadlocalVarVar_i4 : IRCommon
{
     uint16_t dst;
     int32_t offset;
     int32_t klass;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LdthreadlocalVarVar_i4:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint32_t __klass = *(uint32_t*)(ip + 8);
     int32_t __offset = *(int32_t*)(ip + 4);

     Il2CppClass* _klass = (Il2CppClass*)imi->resolveDatas[__class];
     Interpreter::RuntimeClassCCtorInit(_klass);
     (*(int32_t*)(localVarBase + __dst)) = *(int32_t*)((byte*)il2cpp::vm::Thread::GetThreadStaticData(_klass->thread_static_fields_offset) + __offset);
     ip += 16;
     continue;
}
```

### Array access related instructions

It is more conventional and straightforward, but there is a special point: according to the specification, the index variable can be of type i4 or native int. Since array access is a very frequent operation, we don't want to insert runtime data type type and conversion, because we designed 2 hybridclr instructions for each array-related instruction according to the size of the index variable.

Take the case where the index of the ldelem.i4 instruction is of type i4 as an example

```cpp
struct IRGetArrayElementVarVar_i4_4 : IRCommon
{
     uint16_t dst;
     uint16_t arr;
     uint16_t index;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::GetArrayElementVarVar_i4_4:
{
     uint16_t __dst = *(uint16_t*)(ip + 2);
     uint16_t __arr = *(uint16_t*)(ip + 4);
     uint16_t __index = *(uint16_t*)(ip + 6);
     Il2CppArray* arr = (*(Il2CppArray**)(localVarBase + __arr));
     CHECK_NOT_NULL_AND_ARRAY_BOUNDARY(arr, (*(int32_t*)(localVarBase + __index)));
     (*(int32_t*)(localVarBase + __dst)) = il2cpp_array_get(arr, int32_t, (*(int32_t*)(localVarBase + __index)));
     ip += 8;
     continue;
}
```

### Function call instruction

At present, calling the AOT function and calling the Interpreter function use different instructions, because the Interpreter function can directly reuse the data that has been pushed to the top of the stack, and can completely optimize the process of Manged2Native -> Native2Managed to improve performance.

When calling the interpreter function, the current InterpreterModule::Execute function frame can be reused, which also saves the function call overhead, and also avoids the problem of native stack overflow caused by too deep nested calls of the interpreter.

For functions with a return value, since there is an additional return value address parameter ret, different instructions are designed for functions that return void.

If the AOT function is called, since the parameters of each function are variable, we record the parameter information in resolvedDatas, and then save this indirect index in argIdxs. In addition, it is necessary to complete the conversion of interpreter function parameters to native abi function parameters through a bridge function. In order to avoid the overhead of runtime search, this bridge function is also calculated in advance, recorded in resolvedDatas, and then this indirect index is saved in managed2NativeMethod.

Taking the call instruction as an example, 5 instructions are designed for it

-IRCallNative_void
-IRCallNative_ret
-IRCallNative_ret_expand
-IRCallInterp_void
-IRCallInterp_ret

Take the implementation of IRCallNative_ret as an example to introduce the instruction to call the AOT function:

```cpp

struct IRCallNative_ret : IRCommon
{
     uint16_t ret;
     uint32_t managed2NativeMethod;
     uint32_t methodInfo;
     uint32_t argIdxs;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::CallNative_ret:
{
     uint32_t __managed2NativeMethod = *(uint32_t*)(ip + 4);
     uint32_t __methodInfo = *(uint32_t*)(ip + 8);
     uint32_t __argIdxs = *(uint32_t*)(ip + 12);
     uint16_t __ret = *(uint16_t*)(ip + 2);
     void* _ret = (void*)(localVarBase + __ret);
     ((Managed2NativeCallMethod)imi->resolveDatas[__managed2NativeMethod])(((MethodInfo*)imi->resolveDatas[__methodInfo]), ((uint16_t*)&imi->resolveDatas[__argIdxs]), localVarBase, _ret);
     ip += 16;
     continue;
}
```

If you call the Interpreter function, since the function parameters have been pushed onto the stack in order, you only need an argBase parameter to specify the logical address of arg0, and you don’t need resolvedDatas or managed2NativeMethod bridging function pointer.
This is also why interpreter functions are not affected by bridge functions.

Take IRCallInterp_ret as an example to introduce the instruction to call the Interpreter function:

```cpp
struct IRCallInterp_ret : IRCommon
{
     uint16_t argBase;
     uint16_t ret;
     uint8_t __pad6;
     uint8_t __pad7;
     uint32_t methodInfo;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::CallInterp_ret:
{
     MethodInfo* __methodInfo = *(MethodInfo**)(ip + 8);
     uint16_t __argBase = *(uint16_t*)(ip + 2);
     uint16_t __ret = *(uint16_t*)(ip + 4);
     CALL_INTERP_RET((ip + 16), __methodInfo, (StackObject*)(void*)(localVarBase + __argBase), (void*)(localVarBase + __ret));
     continue;
}
```

### Exception mechanism related instructions

The instructions related to the exception mechanism are not complicated, but the exception handling mechanism is very complicated.

The special flow control instruction of exception is similar to the branch jump instruction. The original instruction contains a relative offset. For simplicity, we change it to an absolute offset of type int32_t when converting the instruction.

Take the leave command as an example

```cpp
struct IRLeaveEx : IRCommon
{
     uint8_t __pad2;
     uint8_t __pad3;
     int32_t offset;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::LeaveEx:
{
     int32_t __offset = *(int32_t*)(ip + 4);
     LEAVE_EX(__offset);
     continue;
}
```

### Some extra instinct instructions

For some particularly common functions, in order to optimize performance, hybridclr directly built-in corresponding instructions, such as new Vector{2,3,4}, such as operations related to nullable variables. The execution performance of these instinct instructions is basically the same as that of AOT.

Take new Vector3() as an example

```cpp

struct IRNewVector3_3 : IRCommon
{
     uint16_t obj;
     uint16_t x;
     uint16_t y;
     uint16_t z;
     uint8_t __pad10;
     uint8_t __pad11;
     uint8_t __pad12;
     uint8_t __pad13;
     uint8_t __pad14;
     uint8_t __pad15;
};

// Corresponding to the interpreted execution code
case HiOpcodeEnum::NewVector3_3:
{
     uint16_t __obj = *(uint16_t*)(ip + 2);
     uint16_t __x = *(uint16_t*)(ip + 4);
     uint16_t __y = *(uint16_t*)(ip + 6);
     uint16_t __z = *(uint16_t*)(ip + 8);
     *(HtVector3f*)(*(void**)(localVarBase + __obj)) = {(*(float*)(localVarBase + __x)), (*(float*)(localVarBase + __y)), (*(float *)(localVarBase + __z))};
     ip += 16;
     continue;
}
```

### InitOnce Directive

Some instructions (such as ldsfld) need to be initialized when they are executed for the first time, but they do not need to be initialized when they are executed again later. But even so, an operation of checking whether it has been initialized is inevitable, and we hope to completely optimize this checking behavior. InitOnce dynamic JIT technology is used to solve this problem.

InitOnce is a patented technology of hybridclr, which has not been implemented in the code yet, so I won't introduce it in detail here.

### Other technical related instructions

Due to space limitations, these instructions will be introduced in separate articles

## Summarize

So far we have completed the introduction to the implementation of the hybridclr instruction set.
