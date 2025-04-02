# DHAO file

The dhao file is the core concept of DHE technology. The dhao file contains the information of the types and functions changed in the latest hot update dll calculated offline. When executing a hot update function, the runtime directly determines whether to use the latest interpreted version or directly call the original AOT function based on the information in the dhao file.
The dhao file calculated offline is extremely critical for DHE technology. If there is no dhao file, the original AOT dll needs to be carried additionally, and the cost of calculating function changes is extremely high.

By comparing the latest hot update dll with the AOT dll generated during packaging, the changed types and functions are calculated offline and saved as dhao files. Therefore, for the DHE mechanism to work properly, it must rely on the correctness of the dhao file, and the correctness of the dhao file
depends on accurately providing the latest hot update dll and the AOT dll generated during packaging.

`HybridCLR.Editor.DHE.BuildUtils` provides multiple functions related to generating dhao files.

|Function name|Description|
|-|-|
|GenerateDHAODatas|Generate dhao file for hot update package (i.e. when code changes)|
|EncryptDllAndGenerateDHAODatas|When primary code reinforcement is enabled, generate encrypted dll and dhao file for hot update package (i.e. when code changes)|

## Mark changed function information

Currently, it is possible to automatically calculate the changed functions by comparing the latest hot update dll with the aot dll generated during packaging, and manual operation is not required in most cases. But in fact, there is no perfect code that can determine logical equivalence.
The tool simply compares IL one by one to determine equivalence. Sometimes, the function may be equivalent but the IL has changed (such as swapping the order of two unrelated lines of code), which will be judged as a function transformation and switched to interpreted execution.
If this happens, **and there are extremely strict performance requirements for the function**, developers can manually use the UnchangedAttribute feature to mark the function's variability.
`[Unchanged]` and `[Unchanged(true)]` indicate unchanged, `[Unchanged(false)]` indicates changed, and unmarked features are automatically calculated by the tool.

Incorrectly marking unchanged functions as changed will not affect the correctness of the operation, but only the performance. Even if all hot update functions are marked as changed, they can still run normally. However, incorrectly marking changed functions as unchanged will not only cause errors in the operation logic,
but also cause crashes in serious cases!

:::caution
Unless there are special circumstances and you are an experienced expert, do not mark manually. Because the compiler often generates some hidden classes or fields, these class names are not stable. The C# code that looks the same on the surface may not be the same as the actual generated code. Forcibly marking it as `[Unchanged]` will lead to incorrect operation logic or even crashes.
:::

## Merge dhao files

Game packages released based on the same or similar source code have only slight differences in their original dhe assemblies on different platforms, and the dhao files generated during hot updates also have only slight differences.
This results in the need to calculate a separate dhao file for each platform (even for the same platform, the generated original dll may have slight differences due to the instability of code compilation), which makes the maintenance of dhao complicated and error-prone. This problem is particularly serious when multiple new and old game packages exist at the same time.
You can consider merging the dhao files of multiple platforms corresponding to the same dhe assembly, which does not affect the correctness of the operation and has little impact on performance.

We provide the `HybridCLR.Editor.DHE.BuildUtil::MergeDHAOFiles` function to achieve the goal of merging dhao files.

Note that the workflow with verification cannot use the method of merging dhao files, because the workflow with verification will check the md5 code of the original dll, which is definitely not a match.

## Notes

### The results of calculating dhao caused by external dlls have huge differences

If an external dll is marked as a DHE assembly, the external dll will be trimmed when it is packaged, and when calculating the dhao file, the original external dll is taken, resulting in huge differences, which is not expected. There are several solutions:

1. In link.xml, `<assembly fullname="YourExternDll" preserve="all"/>` completely retain the external dll
2. Instead of using the latest hot update dll to calculate the difference, use the aot dll generated when the latest code is repackaged to calculate the difference
