# Metadata optimization

HybridCLR does not occupy additional memory when executing code, but loading assembly metadata occupies a large amount of memory. This may be a problem for some situations where there is a lot of memory pressure (such as WeChat mini-games).
For this situation, all commercial versions have significantly optimized metadata memory.

Optimize memory usage from several aspects:

- Use fully generic sharing technology.
- Optimize the memory occupied by loading supplementary metadata assemblies
- Hot update assembly metadata optimization
- **TODO** provides an interpreter based on raw IL instructions

## Fully generic sharing

Completely eliminating supplementary metadata memory (about 3-4 times the size of the dll). The disadvantage is that full generic sharing is only supported from 2021 onwards

## Optimize the memory occupied by loading supplementary metadata assemblies

The memory occupied during the loading process is optimized from 3-4 times the size of the supplementary metadata dll to about 1.2 times. This optimization takes effect on all Unity versions.

## Hot update assembly metadata optimization

Reuse metadata to the greatest extent possible. Compared with the community version, it solves the problem of multiple allocation and leakage of Il2CppType memory.

## Interpreter based on raw IL instructions

Runtime conversion to a register instruction set is no longer required, saving a large amount of instruction memory. The disadvantage is that it significantly reduces the interpretation performance.
