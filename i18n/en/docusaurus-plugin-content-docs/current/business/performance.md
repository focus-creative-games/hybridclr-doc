# Performance


A rough introduction to the performance gap between these optimization techniques. Taking numerical calculation as an example, if the performance benchmark of the community version is 1, then the primary instruction optimization is 2-4, the deep instruction optimization is 3-4, DHE is 50, and native is 50.

## Primary instruction optimization

Cautious and reliable optimization of common code paradigms during the run-time Transform process, greatly improving variable access (50%-100%), numerical calculation (100-300%), object access (50-200%) and other common The performance of instructions, such as the performance of some special codes such as typeof instructions, has increased by more than 1500%.

Due to runtime time and memory constraints, primary instruction optimization only does some simple but reliable optimizations such as useless stack elimination, peephole optimization, etc., and cannot perform some complex optimizations. However, since IL instructions are stack instructions, even if only some uncomplicated common optimizations are done, the performance is greatly improved compared to the unoptimized version of the community.

The following is the interpretation performance improvement data of primary instruction optimization compared with the community version (0 means the performance is flat, n means n times improvement).

![interpreter_optimization](/img/hybridclr/interpreter_optimization.jpg)

The following is a performance comparison between native and primary instruction optimization in terms of numerical calculations, and the vertical axis is time-consuming. The addition of primary instruction optimization is about 7-16 times of the original, the multiplication is 4 times, and the division is 2 times.

![benchmark_numeric](/img/hybridclr/benchmark_numeric.jpg)


## Deep instruction optimization

Compared with primary instruction optimization, deep instruction optimization can perform some deep and complex optimizations because it is completed offline, and because it can access the original AOT assembly, it can even do some optimizations that cannot be done at runtime (such as accessing AOT attributes optimized from a function call to a property access). Compared with the basic instruction optimization, the deep instruction optimization has little gap in numerical calculation, but the comprehensive gap is obvious (50-1000% increase).

Another advantage of deep instruction optimization is faster loading since the instruction conversion has been done offline.

Deep instruction optimizations include the following optimizations:

- More thorough stack elimination optimization, almost all unnecessary push and unstack operations are optimized
- Inline optimization, not only inline hot update function, but also inline AOT function
- Local and global copy propagation optimization
- Dead code elimination
- Constant copy propagation
- Common expression optimization
- Richer peephole optimization
- Other optimizations

Actual performance data is in testing.

## DHE technology

If the function has not changed, it is exactly the same as the original performance, and DHE will not increase performance overhead. If the function changes, performance is equivalent to low-level or deep instruction optimization, depending on the user's choice. According to the test data of commercial projects that have been connected so far, after using DHE technology, the actual running performance of hot update is basically the same as that of the original one.

For example, after using the community version for a heavy computing project, the frame rate drops from more than 40 to more than 20, and the lag is obvious. After the introduction of DHE technology, before any update, the frame rate was flat or even higher (this is caused by test fluctuations). After the hot update, the frame rate dropped from 44 to 42, a drop of about 5%. This actual performance is in line with our theoretical estimates.