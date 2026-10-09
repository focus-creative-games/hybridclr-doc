# Assembly Configuration

Generally speaking, hot update code must be organized into independent assemblies to facilitate hot updates.

## Assembly Classification

### Assemblies Defined by Assembly Definition

This is Unity's recommended assembly approach. It splits the code of a large Unity project into multiple assembly modules for easier management and shorter compilation times.

Please read the documentation [Assembly definitions](https://docs.unity3d.com/Manual/ScriptCompilationAssemblyDefinitionFiles.html) to learn how to create assemblies.

### Assembly-CSharp Assembly

This is Unity's default global assembly. It can be used as a hot update assembly like any regular dll.

### Regular DLL Assemblies

Some code is pre-compiled into dll files and then moved into the project.

## Dividing Assemblies

Obviously, project code must be reasonably split into `AOT` (i.e., compiled into the game main package) assemblies and `hot update` assemblies to enable hot updates. HybridCLR has no restrictions on how to split assemblies - you can even use third-party project code as hot update assemblies. Generally speaking, when the game starts, at least one AOT assembly is needed to handle startup and hot update related work.

Common splitting approaches include:

- Assembly-CSharp as AOT assembly. Split remaining code into N AOT assemblies and M hot update assemblies.
- Assembly-CSharp as hot update assembly. Split remaining code into N AOT assemblies and M hot update assemblies.

Regardless of the splitting approach, just set up the reference relationships between assemblies correctly. Please do not reference hot update assemblies in AOT assemblies, as this will cause build errors. If your project uses Assembly-CSharp as an AOT assembly, it's strongly recommended to disable the `auto reference` option for hot update assemblies. Since Assembly-CSharp is the top-level assembly, it will automatically reference all other assemblies, making it easy to accidentally reference hot update assemblies.
