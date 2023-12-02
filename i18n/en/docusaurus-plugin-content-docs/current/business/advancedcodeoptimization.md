# Advanced instruction optimization

:::warning
Advanced instruction optimizations are still under development.
:::

Advanced instruction optimization technology is an implementation independent of standard instruction optimization technology. Advanced instruction optimization technology uses richer compilation optimization technology to greatly improve the performance of the interpretation module.
After optimization, the overall instruction execution performance is improved by 100%-1000% (yes, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%.
And because it has been converted in advance, the loading and instruction translation process is faster and the lag is smaller.

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