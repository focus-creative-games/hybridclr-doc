# Offline Instruction Optimization

:::warning

Offline instruction optimization technology is under development. Currently, only standard instruction optimization technology is available.
:::

Offline Instruction Optimization (OIO) converts original IL instructions into custom register instructions offline.
Since there are no compilation performance constraints offline, richer compilation optimization techniques can be used, greatly improving the performance of the interpretation module.

The optimized instruction execution performance improves overall by 100%-1000% (yes, more than 10 times) or even higher, especially numeric instructions improve by nearly 300% overall.
Moreover, since conversion is done in advance, loading and instruction translation processes are faster with less stuttering.

Offline instruction optimization technology supports virtualization technology in code hardening solutions, greatly improving code security.

## Implementation

Offline instruction optimization technology includes the following optimization techniques:

- Complete elimination of useless stack instructions. Removes all unnecessary stack operations
- Peephole optimization
- Constant propagation optimization
- Local copy propagation optimization
- Global copy propagation optimization
- Interpretation function inline
- AOT function inline (patented technology)
- Provides more instinct instructions, significantly improving performance of common instruction combinations
- Condition check elimination technology. Eliminates unnecessary null pointer checks, type cast checks, array bounds checks
- CheckOnce runtime check dynamic elimination optimization. For example, instructions accessing static member variables no longer check if the type has been initialized on the second execution
- Other optimizations


## Performance

TODO.
