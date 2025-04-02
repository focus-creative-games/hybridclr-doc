# Configure Assemblies

Generally speaking, the hot update code must be separated into an assembly to facilitate hot update.

## Assembly Classification

### Assembly defined by Assembly Definition

This is the recommended way of assembly by Unity. Split a large Unity project code into multiple assembly modules for easy management and shorten compilation time.

Please read the document [Assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html) to learn how to create an assembly.

### Assembly-CSharp assembly

This is Unity's default global assembly. It can be used as a hot update assembly like a normal dll.

### Ordinary dll assembly

Some code is compiled ahead of time into dll files and then moved into the project.

## Divide the assembly

Obviously, the project code must be reasonably split into `AOT` (that is, compiled into the main game package) assembly and `hot update` assembly in order to perform hot update. HybridCLR for
There are no restrictions on how to split the assembly, and even the code in the third-party project can be used as a hot update assembly. Generally speaking, when the game is just started, at least one AOT assembly is required to be responsible for the work related to startup and hot update.



There are several common split methods:

- Assembly-CSharp as AOT assembly. The rest of the code itself is split into N AOT assemblies and M hot update assemblies.
- Assembly-CSharp as a hot update assembly. The rest of the code itself is split into N AOT assemblies and M hot update assemblies.

Regardless of the splitting method, it is enough to correctly set the reference relationship between assemblies. Please do not refer to the hot update assembly in the AOT assembly, otherwise it will cause packaging errors. especially
Use Assembly-CSharp as an AOT assembly, since Assembly-CSharp is the top-level assembly, it will automatically reference all remaining assemblies, which is easy to appear
A case where a hot update assembly is incorrectly referenced.
