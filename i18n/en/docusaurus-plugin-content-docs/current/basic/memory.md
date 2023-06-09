# Memory and GC

## object memory size

HybridCLR is a CLR-level implementation. The hot update type is executed in the interpretation mode, and the other methods are exactly the same as the AOT part. Therefore define equivalent types, whether in AOT or hot update, the object size is exactly the same.

### primitive type

Such as byte, int. As we all know, byte occupies 1 byte, int occupies 4 bytes, and others will not be described in detail.

### struct value type

In the case where Explicit Layout is not specified, the total size is calculated according to the field size and memory alignment rules, which is similar to the struct calculation rules of C++. I won’t elaborate here, just give an example.

```csharp
// V1 object size 1
struct V1
{
     public byte a1;
}

// V2 object size 8
struct V2
{
     public byte a1;
     public int a2;
}

// V3 object size 24
struct V3
{
     public int a1;
     public int a2;
     public object a3;
     public byte a4;
}
```

### class type

Similar to the value type, but with 16 bytes of object header, and enforces memory alignment to 8 bytes. Example:

```csharp
// C1 object size 24
class C1
{
     public byte a1;
}
// C2 object size 24
class C2
{
     public byte a1;
     public int a2;
}
// C3 object size 40
class C3
{
     public int a1;
     public int a2;
     public object a3;
     public byte a4;
}
```

## Compared with the object memory size of lua and ILRuntime

The calculation rules of lua are slightly complicated, see [third-party article](https://www.linuxidc.com/Linux/2018-10/154971.htm). An empty table occupies 56 bytes, and each additional field occupies at least 32 bytes.

The type of ILRuntime is expressed in IlTypeInstance except enum. The empty type occupies 72 bytes, and each additional field uses at least 16 bytes. If the object contains reference type data, there will be at least 24 bytes more overall, and each additional object field will add 8 bytes.

|Type | Xlua | ILRuntime | HybridCLR/native il2cpp|
|:---:|:---:|:---:|:---:|
|V1|88+| 88 | 1|
|V2|120+|104|8|
|V3|184+|168|24|
|C1|88+| 88 | 24|
|C2|120+|104|24|
|C3|184+|168|40|

## The memory occupied by the loaded assembly

When loading an assembly, a dll file byte array is copied, and metadata is dynamically generated in memory. The final memory is generally 1-5 times the size of the assembly (not a lot of statistics).

## GC during operation

HybridCLR is implemented strictly according to the specifications. Except that the additional CPU and memory will be consumed when the assembly is loaded and the function is transferred for the first time, the memory consumed at runtime is exactly the same as that of il2cpp.

So you don't have to ask questions such as whether `foreach loop will generate GC`. How many GCs are generated under il2cpp or mono, and the exact same GCs are also generated when interpreted and executed in HybridCLR.
