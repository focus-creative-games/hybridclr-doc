
# Memory and GC

HybridCLR runtime memory consumption mainly consists of several parts:

- Memory consumed by HybridCLR module initialization
- Metadata memory consumed by loading supplemental metadata and hot update assemblies
- Memory generated during interpretation execution

## Initialization Memory Consumption

The metadata module, interpreter module, and instruction translation module all consume some memory, with the interpreter module's bridge function registration accounting for the majority. Depending on project size, the initialization process will consume 1M or more memory.

## Metadata Memory

### Supplemental Metadata Memory

We tested the memory consumed after supplementing metadata for common AOT assemblies. The community version consumes approximately 4 times the DLL size; the commercial version consumes about 1.3 times when full generic sharing is not enabled; and when the commercial version enables full generic sharing, this becomes 0 since supplemental metadata is not needed. The commercial version reduces memory by **67%** compared to the community version (100% when full generic sharing is enabled).

**Detailed Data:**

![aot-metadata-data](/img/memory-optimization/aot-metadata-data.jpg)

**Memory Consumption:**

![aot-metadata-memory](/img/memory-optimization/aot-metadata-memory.jpg)

**Memory Consumption/DLL Size:**

![aot-metadata-dll-rate](/img/memory-optimization/aot-metadata-dll-rate.jpg)

### Hot Update Assembly Loading Memory

We tested the memory consumed by common plugins when loaded in interpretation mode. The community version consumes approximately 4.7 times the DLL size, while the commercial version consumes 2.9 times. The commercial version reduces memory by **39%** compared to the community version.

:::tip

This data does not include memory occupied by runtime lazy-initialized Il2CppClass, MethodInfo, and translated instructions, which accounts for approximately 2.9-3.5 times the DLL size. The final metadata memory consumption is 7.6-8.2 times for the community version and 5.8-6.4 times for the commercial version. The commercial version reduces memory by approximately **25%** compared to the community version.
:::

**Detailed Data:**

![aot-metadata-data](/img/memory-optimization/assembly-load-data.jpg)

**Memory Consumption**:

![aot-metadata-memory](/img/memory-optimization/assembly-load-memory.jpg)

**Memory Consumption/DLL Size**：

![aot-metadata-dll-rate](/img/memory-optimization/assembly-load-rate.jpg)

## Memory Generated During Interpretation Execution

HybridCLR is a CLR-level implementation. Except for the execution mode being interpretive, all other aspects are completely identical to the AOT part. Therefore, objects created during runtime have exactly the same size whether in AOT or hot update.

:::tip

Equivalent objects consume 4-88 times or even more memory in ILRuntime or Lua solutions compared to HybridCLR - this difference is astounding!

:::

Additionally, through careful optimization, memory consumed during HybridCLR code execution is completely identical to the il2cpp AOT part. For example, `foreach loops` generate the same amount of GC in HybridCLR interpretation as they do in il2cpp or mono.

### Object Memory Size Comparison with Lua and ILRuntime

Lua's calculation rules are somewhat complex, see [third-party article](https://www.linuxidc.com/Linux/2018-10/154971.htm). An empty table occupies 56 bytes, with each additional field occupying at least 32 more bytes.

ILRuntime types (except enums) are uniformly represented as IlTypeInstance. Empty types occupy 72 bytes, with each additional field using at least 16 more bytes. If the object contains reference type data, the overall size increases by at least 24 bytes, with each additional object field adding 8 bytes.

|Type | Xlua | ILRuntime | HybridCLR/Native il2cpp|
|:---:|:---:|:---:|:---:|
|V1|88+| 88 | 1|
|V2|120+|104|8|
|V3|184+|168|24|
|C1|88+| 88 | 24|
|C2|120+|104|24|
|C3|184+|168|40|

The following are the test types:

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