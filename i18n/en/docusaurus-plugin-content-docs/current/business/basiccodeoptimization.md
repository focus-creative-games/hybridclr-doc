# Standard Code Optimization

Careful and reliable optimization of common code paradigms has greatly improved the performance of common instructions such as variable access (50%-100%), numerical calculations (100-300%), object access (50-200%), etc., like some special The performance of codes such as typeof instructions has been improved by more than 1000%.

## Implementation

Due to runtime time and memory constraints, standard instruction optimization only does some simple but reliable optimizations such as useless stack elimination and peephole optimization, and cannot perform some complex optimizations. However, since the IL instruction is a stack instruction, even if only some common and uncomplicated optimizations are made, the performance is greatly improved compared to the community's unoptimized version.

[Advanced instruction optimization] (./advancedcodeoptimization) compared with standard instruction optimization, using complex offline optimization technology, the performance is much better than standard instruction optimization technology.

## Performance data

The following is the performance improvement data of standard instruction optimization compared to the community version (0 means the performance is the same, n means n times improvement).

![interpreter_optimization](/img/hybridclr/interpreter_optimization.jpg)

The following is a performance comparison between native and standard instruction optimization in terms of numerical calculations. The ordinate is time consumption. The standard instruction optimized addition is about 7-16 times that of the native one, the multiplication is 4 times, and the division is 2 times.

![benchmark_numeric](/img/hybridclr/benchmark_numeric.jpg)