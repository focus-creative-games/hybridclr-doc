# Offline Instruction Optimization

:::warning

The offline instruction optimization technology is under development, and currently only the old version of the instruction optimization technology (i.e. the original standard instruction optimization technology) can be used.
:::

Offline Instruction Optimization (OIO) converts original IL instructions into customized register instructions offline.
Since there is no compilation performance limit offline, richer compilation optimization technologies can be used, which greatly improves the performance of the interpretation module.

After optimization, the overall instruction execution performance is improved by 100%-1000% (yes, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%.
And because it has been converted in advance, the loading and instruction translation process is faster and the lag is smaller.

Offline instruction optimization technology supports virtualization technology in code reinforcement solutions, greatly improving code security.

## accomplish

Advanced instruction optimization technology includes the following optimization technologies:

- Complete elimination of useless stack instructions. Eliminate all unnecessary stack operations
- Peephole optimization
- Constant copy optimization
- Optimization of local copy propagation
- Global copy propagation optimization
- Explain function inline
- AOT function inline (patented technology)
- Provide more instinct instructions to greatly improve the performance of common instruction combinations
- Conditional check elimination technology. Eliminate unnecessary null pointer checks, type cast checks, and array out-of-bounds checks
- CheckOnce runtime checks dynamically eliminate optimizations. For example, an instruction that accesses a static member variable will no longer check whether the type has been initialized during the second execution.
- Other optimizations


## Performance

TODO.

## Standard instruction optimization technology (will be obsolete)

Standard instruction optimization techniques are runtime optimization techniques. Careful and reliable optimization of common code paradigms has greatly improved the performance of common instructions such as variable access (50%-100%), numerical calculations (100-300%), object access (50-200%), etc., like some special The performance of codes such as typeof instructions has been improved by more than 1000%.

Due to runtime time and memory limitations, standard instruction optimization only performs simple but reliable optimizations such as useless stack elimination and peephole optimization, and cannot perform some complex optimizations. However, since the IL instruction is a stack instruction, even if only some uncomplicated common optimizations are made, the performance is significantly improved compared to the community's unoptimized version.


The following is the performance improvement data of the standard instruction optimization compared to the community version (0 means the performance is the same, n means n times improvement).

![interpreter_optimization](/img/hybridclr/interpreter_optimization.jpg)

The following is a performance comparison between native and standard instruction optimization in terms of numerical calculations. The ordinate is time consumption. The standard instruction optimized addition is about 7-16 times that of the native one, the multiplication is 4 times, and the division is 2 times.

![benchmark_numeric](/img/hybridclr/benchmark_numeric.jpg)
