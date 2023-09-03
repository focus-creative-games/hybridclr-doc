# Advanced instruction optimization

:::warning
Advanced instruction optimization is still under development and is expected to have a preview version in October 2023.
:::

Advanced instruction optimization techniques are implemented independently of standard instruction optimization techniques. Advanced instruction optimization technology uses richer compilation optimization technology to greatly improve the performance of the interpretation module.
The overall execution performance of optimized instructions is improved by 100%-1000% (you read that right, more than 10 times) or even higher, especially the overall improvement of numerical instructions by nearly 300%.
And because it has been converted in advance, the loading and instruction translation process is faster and the lag is smaller.

## Implementation

Advanced instruction optimization techniques include the following optimization techniques:

- Complete elimination of useless stack instructions. Eliminate all unnecessary stack operations
- Peephole optimization
- Constant copy optimization
- Optimization of local copy propagation
- Global copy propagation optimization
- Function inline, even inline AOT function
- Provide more intrinsic instructions, greatly improving the performance of common instruction combinations
- CheckOnce runtime checks dynamically eliminate optimizations. For example, the instruction to access the static member variable no longer checks whether the type has been initialized when it is executed for the second time
- Other optimizations


## Performance

Will test again after release.