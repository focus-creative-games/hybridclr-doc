# Offline Instruction Optimization

:::warning

Offline instruction optimization technology is under development, and currently only standard instruction optimization technology can be used.
:::

Offline Instruction Optimization (OIO) converts original IL instructions into customized register instructions offline.
Since there is no compilation performance limit offline, richer compilation optimization technologies can be used, which greatly improves the performance of the interpretation module.

After optimization, the overall instruction execution performance is improved by 100%-1000% (yes, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%.
And because it has been converted in advance, the loading and instruction translation process is faster and the lag is smaller.

Offline instruction optimization technology supports virtualization technology in code reinforcement solutions, greatly improving code security.

## Techonology Detail

Offline instruction optimization technology includes the following optimization technologies:

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
