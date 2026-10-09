---
title: 'Execution Performance'
description: 'Although HybridCLR also uses interpretation execution, both theoretical principles and real device testing data show that HybridCLR has dramatically improv.'
slug: /basic/performance
---

# Execution Performance

Although HybridCLR also uses interpretation execution, both theoretical principles and real device testing data show that HybridCLR has dramatically improved performance (multiple times or even dozens of times) compared to popular hot update solutions like Lua and ILRuntime.

## Test Report

:::tip

HybridCLR is currently the highest-performing CLR interpreter implementation and the most performant among all hot update solutions, with comprehensive performance exceeding other solutions by more than an order of magnitude.

:::

The comprehensive performance of HybridCLR's commercial version significantly outperforms Mono's mint implementation, with numerical computation instruction performance ranging from 140%-330% of Mono's performance.

HybridCLR's commercial version **completely dominates** the xlua solution, with numerical computation instruction performance at 651%-720% of xlua's performance, and being dozens or even hundreds of times faster than xlua in other aspects.

The community version of HybridCLR has a noticeable gap with AOT only in **numerical computation**, while other aspects show minimal differences. Therefore, for most projects, the overall game performance is not significantly different from a fully native version.

The **commercial version** of HybridCLR dramatically optimizes numerical computation performance, achieving 280%-735% of the community version's performance. Developers with strict performance requirements can contact us for [commercial services](../../business/intro.md).

The following is a test report from OnePlus 9R ArmV8 real device testing. The complete test code is available in [Execution Performance Test Cases](./performance-testcases.md).

### HybridCLR Commercial Version Time vs Mono Time

![data](/img/benchmark/hybridclr_vs_mono.png)

### HybridCLR Commercial Version/Mono Performance Ratio

![data](/img/benchmark/hybridclr_div_mono.png)

### HybridCLR Commercial Version Time vs xlua Time

![data](/img/benchmark/full_hybridclr_vs_xlua.jpg)

### HybridCLR Commercial Version/xlua Performance Ratio

![data](/img/benchmark/full_hybridclr_div_xlua.jpg)

### AOT Time vs Commercial Version Time vs Community Version Time (Lower is Better)

![data](/img/benchmark/numeric_datas.jpg)

### Commercial Version Time/AOT Time vs Community Version Time/AOT Time (Lower is Better)

AOT version performance is `4.1 - 90` times that of the community version, and `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_business_vs_aot_div_aot.jpg)

### Commercial Version Performance/Community Version Performance (Higher is Better)

Commercial version performance is `2.87-7.35` times that of the community version.

![data](/img/benchmark/numeric_dialog_business_div_community.jpg)

### Commercial Version Time/AOT Version Time (Lower is Better)

AOT version performance is `1.30 - 12.9` times that of the commercial version.

![data](/img/benchmark/numeric_dialog_business_div_aot.jpg)

## Principles

Since HybridCLR is implemented in C++ and directly integrates seamlessly with the il2cpp runtime, it can directly access low-level runtime data and various interfaces. Compared to ILRuntime and xlua, it eliminates additional costs at the C# layer, significantly reducing interaction costs.

HybridCLR's excellent performance mainly comes from the following aspects:

### Rewritten Streamlined and Efficient Metadata Parsing Library

We didn't use existing metadata parsing libraries but implemented a streamlined and efficient C++ metadata parsing library according to HybridCLR's requirements. Other C# hot update or hotfix solutions all use C# libraries like Cecil, resulting in huge differences in memory and loading efficiency!

### Using Register Instruction Set

Original IL bytecode is a stack-based instruction set. HybridCLR converts it to a register instruction set, reducing stack maintenance overhead.

### Direct Access to Data Stack and Execution Stack

Stack operations are the most common operations in CLI, with almost all instructions involving stack operations. Since the interpreter stack is self-maintained heap memory, CLI has limitations on struct pointer operations. If implementing an interpreter in C#, you cannot directly operate data types on the interpreter stack and must use various techniques to achieve this indirectly. HybridCLR, being implemented in C++, can operate directly.

Operating struct types has several to dozens of times improvement in efficiency compared to other interpreters.

### Static Instruction Specialization

Some instructions like the `add` instruction are multi-functional instructions that decide the final operation based on the operand types on the current stack. HybridCLR designs `add_i4, add_i8, add_r4, add_r8` - these 4 instructions. When translating instructions, it calculates the current stack data types and translates to corresponding specialized instructions. This saves runtime type judgment overhead and runtime data type maintenance overhead.

### Pre-calculating Runtime Metadata that Needs to be Resolved

Some instructions like ldtoken and ldstr need to convert instruction data to actual runtime data at runtime. HybridCLR directly calculates the corresponding runtime data during translation and saves it to the converted instructions, greatly improving performance.

### Simple and Efficient Implementation of Object Member Access Instructions

Object member access instructions like `v.x = b;` are very common. Solutions like ILRuntime and xlua, due to C# language limitations, must operate through wrap function calls. HybridCLR, being implemented in C++, can directly access object memory data. By pre-calculating field offsets in objects, it can complete this access operation directly with `*(int32_t*)(obj + offset) = b;`.

This provides dozens of times efficiency improvement compared to other hot update solutions.

### Direct Support for Reference and Pointer Operations Without Indirect Methods

Due to CLI specification limitations, references in C# can only be placed on the managed stack, not stored on the interpreter stack (because it's heap memory). To handle code like `ref int a = ref b; a = 5;`, very complex techniques must be used to indirectly maintain this reference. HybridCLR, implemented in C++, can directly save and operate on this data.

Efficiency is greatly improved compared to other hot update solutions.

### Unified Metadata, More Efficient Object Creation, and Smaller Memory Usage

Due to unified metadata, il2cpp::vm::Object::New can be called directly to create objects, with efficiency very close to native and identical memory usage. In contrast, other hot update solutions use fake types with bloated objects and more complex object creation processes.

Efficiency is greatly improved compared to other hot update solutions.

### Unified Metadata, Unified Function Call Methods, and No Additional PInvoke and ReversePInvoke Overhead

HybridCLR can directly call C++ functions translated from IL functions without any intermediate steps, while ILRuntime and xlua require various complex determinations and parameter conversions, plus additional overhead from PInvoke and ReversePInvoke between C#.

HybridCLR's interaction with il2cpp AOT parts is extremely lightweight and efficient. Performance issues are no longer a concern.

### Additional Provision of Numerous Intrinsic Functions

For common operations like `new Vector{2,3,4}`, `new string()`, `Nullable<T>.Value`, etc., we directly provide corresponding instructions with runtime overhead even lower than AOT implementations.

This provides dozens of times efficiency improvement compared to other hot update solutions.

### Strict Compliance with Specifications, No Unnecessary Additional Costs

Through careful design and optimization, HybridCLR avoids various unnecessary overhead. For example, GC during execution is completely identical to native il2cpp and mono.

### Other Instruction Optimization Techniques

Other optimization techniques

## Test Case Code

The complete test case code used in the test report on this page is available in [Execution Performance Test Cases](./performance-testcases.md).
