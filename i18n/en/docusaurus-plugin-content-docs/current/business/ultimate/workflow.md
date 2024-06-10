# Simplify dhao workflow

Based on the same version of the original project, the original dll will have slight differences when publishing different platforms, resulting in the need to calculate a separate dhao file for each platform (even for the same platform, due to the instability of code compilation, the generated original dll may also have slight differences), which makes the maintenance of dhao complicated and error-prone. This problem is particularly serious when multiple new and old game packages exist at the same time.

The solution to this problem mainly relies on `merging dhao files`.

## Merging dhao files

Based on the same or similar source code, the original dhe assemblies of game packages released on different platforms have only slight differences, and the dhao files generated during hot updates also have only slight differences.

You can consider merging the dhao files of multiple platforms corresponding to the same dhe assembly, which does not affect the correctness of the operation and has little impact on performance.

We provide the `HybridCLR.Editor.DHE.BuildUtil::MergeDHAOFiles` function to achieve the goal of merging dhao files.

Note that the workflow with verification cannot use the method of merging dhao files, because the workflow with verification will check the md5 code of the original dll, which is definitely not a match.