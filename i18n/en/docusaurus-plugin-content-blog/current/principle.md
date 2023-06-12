# Analysis of hybridclr technical principles

We are in the previous section completed the hybridclr feasibility analysis. Due to the large amount of hybridclr content, this article mainly introduces the technical implementation of hybridclr in an overview due to space limitations.

## CLR and il2cpp basics

Add a native interpreter module to the pure AOT il2cpp runtime, and finally realize [hybrid mode execution](https://developpaper.com/new-net-interpreter-mono-has-arrived/), which seems very complicated matter.

In fact, the program is nothing more than code + data. There are mainly several types of things that CLR does during operation:

1. Perform simple memory operations or calculations or logical jumps. This part roughly corresponds to the Base instruction set of the CLI
2. Perform a basic operation that depends on metadata information. For example, code like `a.x, arr[3]` depends on metadata information to work correctly. Corresponds to the Object Model instruction set of some CLIs.
3. Perform a more complex operation that relies on metadata. Such as `typeof(object), a is string, (object)5`, this kind of code depends on the functions and corresponding metadata provided by the runtime to work correctly. Corresponds to the Object Model instruction set of some CLIs.
4. Function calls. Including but not limited to being called by AOT functions and calling AOT functions, and function calls between interpreters. Corresponds to Object Model commands such as `call, callvir, newobj` in the CLI command set.

If you have an in-depth understanding and thorough analysis of the CLR, in order to achieve `hybrid mode execution`, the hybridclr core needs to complete the following two things, and the others are details that do not hinder the overall situation:

- Assembly information can be loaded and registered. On this basis, `1-3` can be realized.
- Make sure that the interpreter function can be found and called, and can execute with the correct result. Then `4` can be achieved.

Since a thorough understanding of the above content requires a richer understanding of the CLR and stronger insight, we will not bother to explain it. Developers who do not understand do not need to delve into it, and continue to read the subsequent chapters.

## core module

From a functional point of view, it includes the following core parts:

- Elementary analysis of metadata
- Metadata advanced metadata structure analysis
- Dynamic registration of metadata
- Register instruction set design
- Conversion from IL instruction set to hybridclr register instruction set
- Interpret and execute hybridclr instruction set
- Others such as GC, multi-thread related processing

From the code structure point of view, it contains three directories:

- metadata Metadata related
- transform instruction set conversion related
- interpreter Interpreter related

## primary analysis of metadata

The technical threshold of this part of the content is not high, but it is relatively trivial and hard, faithfully according to the [ECMA-335 specification](https://www.ecma-international.org/publications-and-standards/standards/ecma-335/) Documentation can be realized. For a small number of doubts, you can use the information on the Internet or learn from the code of mono.

The relevant code is in the `hybridclr\metadata` directory, mainly implemented in RawImage.h and RawImage.cpp. If subdivided, the relevant implementation is divided into the following parts.

### PE file structure analysis

The managed dll extends the PE file structure and adds CLI-related metadata. The main tasks of this link are:

- Parse PE headers
- Parse the section headers, find out the CLI header, and locate the cli data segment
- Parse out all streams. Stream is one of the lowest-level data structures in CLI. CLI divides metadata into several categories according to characteristics.
   - #~ stream. Contains all tables definitions and is the core metadata structure
   - #Strings stream. Include non-document-type strings in the code, such as type names, field names, etc.
   - #GUID stream
   - #Blob stream. Some metadata types are too complex to save in blob format. There are also some data, such as array initialization data lists, which are often saved to Blob streams.
   - #- flow
   - #Pdb stream. for debugging

Parse the PE file and code in RawImage::Load, and parse the code corresponding to the stream in RawImage::LoadStreams.

### tables metadata analysis

Most metadata in the CLI is divided into dozens of types, and each type of data is organized into a table. For each table, each row is the same size.

In primary parsing, each row in the table is not parsed, only the size of each row of the table and the offset of each field are parsed. There is a large category of fields of Coded Index type, which may be 2 or 4 bytes, and is not fixed. The field size of this column in the table needs to be determined according to the Row Count of other tables. Since there are many tables, this calculation process is trivial and error-prone.

The corresponding code is in RawImage::LoadTables, the intercepted part of the code is as follows

```cpp
void RawImage::BuildTableRowMetas()
{
     {
         auto& table = _tableRowMetas[(int)TableType::MODULE];
         table.push_back({ 2 });
         table.push_back({ ComputStringIndexByte() });
         table.push_back({ ComputGUIDIndexByte() });
         table.push_back({ ComputGUIDIndexByte() });
         table.push_back({ ComputGUIDIndexByte() });
     }
     {
         auto& table = _tableRowMetas[(int)TableType::TYPEREF];
         table.push_back({ ComputTableIndexByte(TableType::MODULE, TableType::MODULEREF, TableType::ASSEMBLYREF, TableType::TYPEREF, TagBits::ResoulutionScope) });
         table.push_back({ ComputStringIndexByte() });
         table.push_back({ ComputStringIndexByte() });
     }

     // ... other
}

```

### table parsing

The previous section has parsed out the starting data position, row count, offset and size of each field in each table, and there is enough information to parse out the data of any row in each table. The id of the row in the table starts from 1.

The parsing method of the row of each table can be implemented according to the ECMA specification. The row of each table is defined in the `metadata\Coff.h` file, and the Row parsing code is in `RawImage.h`. These parsing codes are very similar. In order to avoid errors, a large number of macros are used. The intercepted part of the code is as follows:

```cpp
TABLE2(GenericParamConstraint, TableType::GENERICPARAMCONSTRAINT, owner, constraint)
TABLE3(MemberRef, TableType::MEMBERREF, classIdx, name, signature)
TABLE1(StandAloneSig, TableType::STANDALONESIG, signature)
TABLE3(MethodImpl, TableType::METHODIMPL, classIdx, methodBody, methodDeclaration)
TABLE2(FieldRVA, TableType::FIELDRVA, rva, field)
TABLE2(FieldLayout, TableType::FIELDLAYOUT, offset, field)
TABLE3(Constant, TableType::CONSTANT, type, parent, value)
TABLE2(MethodSpec, TableType::METHODSPEC, method, instantiation)
TABLE3(CustomAttribute, TableType::CUSTOMATTRIBUTE, parent, type, value)

```

## metadata Advanced metadata structure analysis

What is directly read from tables is the persistent initial metadata, and what is needed at runtime is not only these simple original data, but also further resolved data. For example

- Il2CppType. It can be a simple `int`, or a more complicated `List<int>`, or even a particularly complicated `List<(int,int)>&`
- MethodInfo. It can be a simple `object.ToString`, or a complex generic type `IEnumerator<int>.Count`.

The generic mechanism of CLI makes the metadata extremely complex, typically the runtime parsing of metadata related to TypeSpec, MethodSpec, and MemberSpec. The core implementation code is implemented in Image.cpp, and the remaining part is implemented in InterpreterImage.cpp and AOTHomologousImage.cpp. There will be a special introduction later.

## metadata dynamic registration

According to the particle size from large to small, it is mainly divided into the following categories

- Assembly registration. The assembly to be loaded is registered in the metadata management of il2cpp.
- TypeDefinition registration. This step generates the underlying runtime type Il2CppClass.
- VTable virtual table calculation. Because the virtual table calculation of il2cpp is a black box, the interior is quite complicated, and it took us a lot of effort to study and understand its calculation mechanism. There will be a special chapter to introduce VTable calculation later, so I won't go into details here.
- Other metadata such as CustomAttribute calculations and more.

### Assembly registration

The key function of Assembly loading is il2cpp::vm::MetadataCache::LoadAssemblyFromBytes . Since il2cpp is an AOT runtime, the original implementation simply throws an exception. We modified and improved the implementation, calling hybridclr::metadata::Assembly::LoadFromBytes in it to complete the creation of the Assembly, and then register it to the global Assemblies list. The relevant code is implemented as follows:

```cpp
const Il2CppAssembly* il2cpp::vm::MetadataCache::LoadAssemblyFromBytes(const char* assemblyBytes, size_t length)
{
     il2cpp::os::FastAutoLock lock(&il2cpp::vm::g_MetadataLock);

     Il2CppAssembly* newAssembly = hybridclr::metadata::Assembly::LoadFromBytes(assemblyBytes, length, true);
     if (newAssembly)
     {
         // avoid register placeholder assembly twice.
         for (Il2CppAssembly* ass :s_cliAssemblies)
         {
             if (ass == newAssembly)
             {
                 return ass;
             }
         }
         il2cpp::vm::Assembly::Register(newAssembly);
         s_cliAssemblies. push_back(newAssembly);
         return newAssembly;
     }

     return nullptr;
}
```

### TypeDefinition registration

Assembly uses the delayed initialization method. After registration, the type information in Assembly does not create the corresponding runtime metadata Il2CppClass, and it is initialized only when the type is accessed for the first time.

Il2Class creation is a step-by-step process due to cross-dependencies and to optimize performance

- Il2CppClass base creation
- Child metadata lazy initialization of Il2CppClass
- Class initialization at runtime

#### Il2CppClass basic creation

The definition data Il2CppTypeDefinition corresponding to all types has been created when the Assembly was loaded in the previous section, and the creation of Il2CppClass is completed in il2cpp::vm::GlobalMetadata::FromTypeDefinition. code show as below:

```cpp
Il2CppClass* il2cpp::vm::GlobalMetadata::FromTypeDefinition(TypeDefinitionIndex index)
{
     /// ... omit others
     Il2CppClass* typeInfo = (Il2CppClass*)IL2CPP_CALLOC(1, sizeof(Il2CppClass) + (sizeof(VirtualInvokeData) * typeDefinition->vtable_count));
     typeInfo->klass = typeInfo;
     typeInfo->image = GetImageForTypeDefinitionIndex(index);
     typeInfo->name = il2cpp::vm::GlobalMetadata::GetStringFromIndex(typeDefinition->nameIndex);
     typeInfo->namespaze = il2cpp::vm::GlobalMetadata::GetStringFromIndex(typeDefinition->namespaceIndex);
     typeInfo->byval_arg = *il2cpp::vm::GlobalMetadata::GetIl2CppTypeFromIndex(typeDefinition->byvalTypeIndex);
     typeInfo->this_arg = typeInfo->byval_arg;
     typeInfo->this_arg.byref = true;
     typeInfo->typeMetadataHandle = reinterpret_cast<const Il2CppMetadataTypeHandle>(typeDefinition);
     typeInfo->genericContainerHandle = GetGenericContainerFromIndex(typeDefinition->genericContainerIndex);
     typeInfo->instance_size = typeDefinitionSizes->instance_size;
     typeInfo->actualSize = typeDefinitionSizes->instance_size; // actualSize is instance_size for compiler generated values
     typeInfo->native_size = typeDefinitionSizes->native_size;
     typeInfo->static_fields_size = typeDefinitionSizes->static_fields_size;
     typeInfo->thread_static_fields_size = typeDefinitionSizes->thread_static_fields_size;
     typeInfo->thread_static_fields_offset = -1;
     typeInfo->flags = typeDefinition->flags;
     typeInfo->valuetype = (typeDefinition->bitfield >> (kBitIsValueType - 1)) & 0x1;
     typeInfo->enumtype = (typeDefinition->bitfield >> (kBitIsEnum - 1)) & 0x1;
     typeInfo->is_generic = typeDefinition->genericContainerIndex != kGenericContainerIndexInvalid; // generic if we have a generic container
     typeInfo->has_finalize = (typeDefinition->bitfield >> (kBitHasFinalizer - 1)) & 0x1;
     typeInfo->has_cctor = (typeDefinition->bitfield >> (kBitHasStaticConstructor - 1)) & 0x1;
     typeInfo->is_blittable = (typeDefinition->bitfield >> (kBitIsBlittable - 1)) & 0x1;
     typeInfo->is_import_or_windows_runtime = (typeDefinition->bitfield >> (kBitIsImportOrWindowsRuntime - 1)) & 0x1;
     typeInfo->packingSize = ConvertPackingSizeEnumToValue(static_cast<PackingSize>((typeDefinition->bitfield >> (kPackingSize - 1)) & 0xF));
     typeInfo->method_count = typeDefinition->method_count;
     typeInfo->property_count = typeDefinition->property_count;
     typeInfo->field_count = typeDefinition->field_count;
     typeInfo->event_count = typeDefinition->event_count;
     typeInfo->nested_type_count = typeDefinition->nested_type_count;
     typeInfo->vtable_count = typeDefinition->vtable_count;
     typeInfo->interfaces_count = typeDefinition->interfaces_count;
     typeInfo->interface_offsets_count = typeDefinition->interface_offsets_count;
     typeInfo->token = typeDefinition->token;
     typeInfo->interopData = il2cpp::vm::MetadataCache::GetInteropDataForType(&typeInfo->byval_arg);

     // omit other

     return typeInfo;
}
```

You can see that there are quite a lot of fields in TypeDefinition, which are calculated during the Assembly loading process.

#### Il2CppClass sub-metadata delayed initialization

Due to interaction dependencies and to optimize performance, the sub-metadata data of Il2Class uses a lazy initialization strategy, which is performed step by step and initialized when it is used for the first time. The following code is intercepted from `Class.h` file:

```cpp
class Class
{
     // ... other code
     static bool Init(Il2CppClass *klass);

     static void SetupEvents(Il2CppClass *klass);
     static void SetupFields(Il2CppClass *klass);
     static void SetupMethods(Il2CppClass *klass);
     static void SetupNestedTypes(Il2CppClass *klass);
     static void SetupProperties(Il2CppClass *klass);
     static void SetupTypeHierarchy(Il2CppClass *klass);
     static void SetupInterfaces(Il2CppClass *klass);
     // ... other code
};

```

Here comes the point! ! ! The binding of the execution pointer of the function metadata is completed in the SetupMethods function, where the key code snippets are as follows:

```cpp
void SetupMethodsLocked(Il2CppClass *klass, const il2cpp::os::FastAutoLock& lock)
{
     /// ... other ignored code
     for (MethodIndex index = 0; index < end; ++index)
     {
         Il2CppMetadataMethodInfo methodInfo = MetadataCache::GetMethodInfo(klass, index);

         newMethod->name = methodInfo.name;

         if (klass->valuetype)
         {
             Il2CppMethodPointer adjustorThunk = MetadataCache::GetAdjustorThunk(klass->image, methodInfo.token);
             if (adjustorThunk != NULL)
                 newMethod->methodPointer = adjustorThunk;
         }

         // We did not find an adjustor thunk, or maybe did not need to look for one. Let's get the real method pointer.
         if (newMethod->methodPointer == NULL)
             newMethod->methodPointer = MetadataCache::GetMethodPointer(klass->image, methodInfo.token);

         newMethod->invoker_method = MetadataCache::GetMethodInvoker(klass->image, methodInfo.token);
     }
     /// ... other ignored code
}
```

The metadata structure when the function is running is MethodInfo, which is defined as follows,

```cpp
typedef struct MethodInfo
{
     Il2CppMethodPointer methodPointer;
     InvokerMethod invoker_method;
     const char* name;
     Il2CppClass *klass;
     const Il2CppType *return_type;
     const ParameterInfo* parameters;

     // ... omit others
} MethodInfo;

```

Among them, we are more concerned about the two fields methodPointer and invoker_method. methodPointer points to the normal execution function, and invoker_method points to the reflection execution function.

Let's take methodPointer as an example to further track its setting process. The implementation of `il2cpp::vm::MetadataCache::GetMethodPointer` is as follows:

```cpp
Il2CppMethodPointer il2cpp::vm::MetadataCache::GetMethodPointer(const Il2CppImage* image, uint32_t token)
{
     uint32_t rid = GetTokenRowId(token);
     uint32_t table = GetTokenType(token);
     if (rid == 0)
         return NULL;

     // ==={{ hybridclr
     if (hybridclr::metadata::IsInterpreterImage(image))
     {
         return hybridclr::metadata::MetadataModule::GetMethodPointer(image, token);
     }
     // ===}} hybridclr

     IL2CPP_ASSERT(rid <= image->codeGenModule->methodPointerCount);

     return image->codeGenModule->methodPointers[rid - 1];
}
```

It can be seen that if it is an interpreter assembly, it jumps to the interpreter metadata module to obtain the corresponding MethodPointer pointer. Continue to track, the relevant code is as follows:

```cpp

Il2CppMethodPointer InterpreterImage::GetMethodPointer(uint32_t token)
{
     uint32_t methodIndex = DecodeTokenRowIndex(token) - 1;
     IL2CPP_ASSERT(methodIndex < (uint32_t)_methodDefines. size());
     const Il2CppMethodDefinition* methodDef = &_methodDefines[methodIndex];
     return hybridclr::interpreter::InterpreterModule::GetMethodPointer(methodDef);
}

Il2CppMethodPointer InterpreterModule::GetMethodPointer(const Il2CppMethodDefinition* method)
{
     const NativeCallMethod* ncm = GetNativeCallMethod(method, false);
     if (ncm)
     {
         return ncm->method;
     }
     //RaiseMethodNotSupportException(method, "GetMethodPointer");
     return (Il2CppMethodPointer)NotSupportNative2Managed;
}

// interpreter/InterpreterModule.cpp
template<typename T>
const NativeCallMethod* GetNativeCallMethod(const T* method, bool forceStatic)
{
     char sigName[1000];
     ComputeSignature(method, !forceStatic, sigName, sizeof(sigName) - 1);
     auto it = s_calls. find(sigName);
     return (it != s_calls. end()) ? &it->second : nullptr;
}

// s_calls definition
static std::unordered_map<const char*, NativeCallMethod, CStringHash, CStringEqualTo> s_calls;

void InterpreterModule::Initialize()
{
     for (size_t i = 0; ; i++)
     {
         NativeCallMethod& method = g_callStub[i];
         if (!method. signature)
         {
             break;
         }
         s_calls. insert({ method. signature, method });
     }

     for (size_t i = 0; ; i++)
     {
         NativeInvokeMethod& method = g_invokeStub[i];
         if (!method. signature)
         {
             break;
         }
         s_invokes. insert({ method. signature, method });
     }
}
```

Here, the signature is calculated according to the function definition and a function pointer is returned. What is this function pointer? s_calls are initialized using g_callStub in InterpreterModule::Initialize. So what is g_calStub? It is defined in `interpreter/MethodBridge_xxx.cpp`, which turns out to be the data structure related to the bridge function!

Why return such a function instead of directly pointing the methodPointer to the `InterpreterModule::Execute` function? Take `int Foo::Sum(int,int)` function as an example. The actual signature of this function is `int32_t (int32_t, int32_t, MethodInfo*)`. When calling this methodPointer function, the caller must pass these three parameters. These parameters are different for each function. If you directly point to the `InterpreterModule::Execute` function, because the ABI call cannot be introspected (even if it can, the performance is relatively poor), the Execute function can neither extract ordinary parameters nor extract MethodInfo* parameter, so it will not work correctly. Therefore, for each function, these parameters in the ABI call need to be passed to the Execute function appropriately.

As the name suggests, the bridge function undertakes the bidirectional conversion of parameters between the native ABI function parameters and the interpreter function. Intercept a piece of sample code:

```cpp

/// Call parameter conversion from AOT to interpreter
static int64_t __Native2ManagedCall_i8srr8sr(void* __arg0, double __arg1, void* __arg2, const MethodInfo* method)
{
     StackObject args[4] = {*(void**)&__arg0, *(void**)&__arg1, *(void**)&__arg2 };
     StackObject* ret = args + 3;
     Interpreter::Execute(method, args, ret);
     return *(int64_t*)ret;
}

// Interpreter to AOT call parameter conversion
static void __Managed2NativeCall_i8srr8sr(const MethodInfo* method, uint16_t* argVarIndexs, StackObject* localVarBase, void* ret)
{
     if (hybridclr::metadata::IsInstanceMethod(method) && !localVarBase[argVarIndexs[0]].obj)
     {
         il2cpp::vm::Exception::RaiseNullReferenceException();
     }
     Interpreter::RuntimeClassCCtorInit(method);
     typedef int64_t (*NativeMethod)(void* __arg0, double __arg1, void* __arg2, const MethodInfo* method);
     *(int64_t*)ret = ((NativeMethod)(method->methodPointer))((void*)(localVarBase+argVarIndexs[0]), *(double*)(localVarBase+argVarIndexs[1]), (void*) (localVarBase+argVarIndexs[2]), method);
}
```

#### Runtime Class initialization

That is, the type initialization is triggered when the static field or function of the class is accessed for the first time during the running of the program, or when the object is created. Done in il2cpp::vm::Runtime::ClassInit(klass). Not particularly critical, we will introduce it later in a separate article.

### VTable virtual table calculation

Virtual tables are at the heart of polymorphism. The virtual table calculation of CLI is very complicated, but not understanding its implementation does not affect developers' understanding of the core operation process of hybridclr, which we will introduce in a separate article later.

### Additional Metadata

CustomAttribute uses lazy initialization, and the calculation is also very complicated. We will introduce it in a separate article later.

## Register instruction set design

There are several problems with directly interpreting raw IL instructions:

- IL is a stack-based instruction, and the execution stack is maintained at runtimeunnecessary expense
- IL has a large number of single-instruction and multi-function instructions. For example, the add instruction can be used to calculate the sum of int, long, float, and double types. As a result, the runtime needs to judge which calculation should be performed based on the above. Not only increases the overhead of runtime judgment, but also increases the overhead of maintaining the execution stack data type at runtime
- The IL instruction contains some data that needs to be resolved at runtime, such as the first parameter of the newobj instruction is the method token. Token resolve is an expensive operation, and resolving every time it is executed will greatly slow down the execution performance
- IL is a stack-based instruction, and there are many instructions related to stack push and unstack. An instruction like a=b+c needs 4 instructions to complete, but if a register-based instruction is used, it can be completed in one instruction.
- IL is not suitable for other optimization operations, such as our InitOnce JIT technology.
- other

So we need to convert raw IL instructions into more efficient register instructions. Due to the large number of instructions, the detailed design of the register instruction set is not introduced here. Take the add command as an example

```cpp

// Contains the type field, which is the instruction ID.
struct IRCommon
{
     HiOpcodeEnum type;
};

// add int, int -> register instruction corresponding to int
struct IRBinOpVarVarVar_Add_i4 : IRCommon
{
     uint16_t ret; // The stack position corresponding to the calculation result
     uint16_t op1; // stack location corresponding to operand 1
     uint16_t op2; // stack position corresponding to operand 2
};

```

## Instruction set conversion

Understanding this section requires preliminary knowledge of compilation principles. We used a very simple conversion algorithm and basically did not optimize instructions. The conversion process is divided into several steps:

- BasicBlock division. Cut the IL instruction block into a code block that does not contain any jump instructions, called BasicBlock.
- Simulate the instruction execution flow, while using the breadth-first traversal algorithm to traverse all BasicBlocks and convert each BasicBlock to IRBasicBlock.

The conversion from BasicBlock to IRBasicBlock adopts the simplest one-to-one instruction conversion algorithm, and the conversion related code is in `transform::HiTransform::Transform`. Let's take the add command as an example:

```cpp

case OpcodeValue::ADD:
{
     IL2CPP_ASSERT(evalStackTop >= 2);
     EvalStackVarInfo& op1 = evalStack[evalStackTop - 2];
     EvalStackVarInfo& op2 = evalStack[evalStackTop - 1];

     CreateIR(ir, BinOpVarVarVar_Add_i4);
     ir->op1 = op1.locOffset;
     ir->op2 = op2.locOffset;
     ir->ret = op1.locOffset;

     EvalStackReduceDataType resultType;
     switch (op1. reduceType)
     {
     case EvalStackReduceDataType::I4:
     {
         switch (op2. reduceType)
         {
         case EvalStackReduceDataType::I4:
         {
             resultType = EvalStackReduceDataType::I4;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_i4;
             break;
         }
         case EvalStackReduceDataType::I:
         case EvalStackReduceDataType::Ref:
         {
             CreateAddIR(irConv, ConvertVarVar_i4_i8);
             irConv->dst = irConv->src = op1.locOffset;

             resultType = op2.reduceType;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_i8;
             break;
         }
         default:
         {
             IL2CPP_ASSERT(false);
             break;
         }
         }
         break;
     }
     case EvalStackReduceDataType::I8:
     {
         switch (op2. reduceType)
         {
         case EvalStackReduceDataType::I8:
         case EvalStackReduceDataType::I: // not support i8 + i ! but we support
         {
             resultType = EvalStackReduceDataType::I8;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_i8;
             break;
         }
         default:
         {
             IL2CPP_ASSERT(false);
             break;
         }
         }
         break;
     }
     case EvalStackReduceDataType::I:
     case EvalStackReduceDataType::Ref:
     {
         switch (op2. reduceType)
         {
         case EvalStackReduceDataType::I4:
         {
             CreateAddIR(irConv, ConvertVarVar_i4_i8);
             irConv->dst = irConv->src = op2.locOffset;

             resultType = op1. reduceType;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_i8;
             break;
         }
         case EvalStackReduceDataType::I:
         case EvalStackReduceDataType::I8:
         {
             resultType = op1. reduceType;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_i8;
             break;
         }
         default:
         {
             IL2CPP_ASSERT(false);
             break;
         }
         }
         break;
     }
     case EvalStackReduceDataType::R4:
     {
         switch (op2. reduceType)
         {
         case EvalStackReduceDataType::R4:
         {
             resultType = op2.reduceType;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_f4;
             break;
         }
         default:
         {
             IL2CPP_ASSERT(false);
             break;
         }
         }
         break;
     }
     case EvalStackReduceDataType::R8:
     {
         switch (op2. reduceType)
         {
         case EvalStackReduceDataType::R8:
         {
             resultType = op2.reduceType;
             ir->type = HiOpcodeEnum::BinOpVarVarVar_Add_f8;
             break;
         }
         default:
         {
             IL2CPP_ASSERT(false);
             break;
         }
         }
         break;
     }
     default:
     {
         IL2CPP_ASSERT(false);
         break;
     }
     }

     PopStack();
     op1.reduceType = resultType;
     op1.byteSize = GetSizeByReduceType(resultType);
     AddInst(ir);
     ip++;
     continue;
}

```

It can be seen from the code that the conversion algorithm is actually very simple, which is to determine which register instruction to convert to according to the parameter type of the add instruction, and at the same time correctly set the field value of the instruction.

## Interpret and execute the hybridclr instruction set

Interpretation execution is done in code `interpreter::InterpreterModule::Execute` function. Several parts are involved:

- Function frame construction, initialization of parameters, local variables, and execution stack
- Execute common commands
- call subroutine
- exception handling

There is also a lot of content in this area, and we will introduce the implementation in detail in multiple articles. Here is a brief excerpt of the implementation code of the BinOpVarVarVar_Add_i4 instruction:

```cpp
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

I believe this code is relatively easy to understand. The code related to instruction set conversion and instruction interpretation is the core of hybridclr, but the complexity is not high. Thanks to the il2cpp runtime, it has supported us with most of the complex metadata-related operations.

## Others such as GC, multipleThread related processing

We analyzed both parts of the implementation in our hybridclr feasibility thought experiment.

###GC

For object allocation, we use the il2cpp::vm::Object::New function to allocate objects. There are other parts involved in GC, such as the cache of Il2CppString objects in the ldstr instruction, which utilizes some other GC mechanisms provided by the il2cpp runtime.

### Multi-thread related processing

- volatile. For instructions containing volatile prefix instructions, we simply insert MemoryBarrier before and after executing the code.
- ThreadStatic. Use the ThreadStatic variable mechanism of Class built in il2cpp.
- Thread. For each managed thread, we create a corresponding interpreter stack.
- async related. Since async dependencies are just syntactic sugar, it's up to the compiler and standard library to do everything. Hybridclr only needs to solve the problem of AOT generic instantiation generated in it.

## Summarize

In a nutshell, the implementation of hybridclr is:

- Load and register the interpreter Assembly when MetadataCache::LoadAssemblyFromBytes (triggered when the c# layer calls Assembly.Load)
- Delayed initialization of type-related metadata during il2cpp operation, where the key is to correctly set the methodPointer pointer in the MethodInfo metadata
- When il2cpp is running, it passes the methodPointer or methodInvoke pointer, then jumps through the bridge function, and finally executes the Interpreter::Execute function.
   - The Execute function triggers the HiTransform::Transform operation when an interpreter function is executed for the first time, and translates the original IL instruction into a hybridclr register instruction.
   - Then execute the hybridclr register instruction corresponding to the function.

So far, the technical principle introduction of hybridclr has been completed.
