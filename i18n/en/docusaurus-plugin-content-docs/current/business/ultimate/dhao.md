# DHAO Files

DHAO files are the core concept of DHE technology. DHAO files contain pre-calculated information about changed types and functions in the latest hot update dll. At runtime, the system directly determines whether to use the latest interpreted version or call the original AOT function when executing a hot update function based on the information in the DHAO file.
Pre-calculated DHAO files are extremely critical for DHE technology. Without DHAO files, the original AOT dll would need to be carried additionally, and the cost of calculating function changes would be extremely high.

By comparing the latest hot update dll with the AOT dll generated during packaging, changed types and functions are calculated offline and saved as DHAO files. Therefore, for the DHE mechanism to work properly, it must rely on the correctness of DHAO files, and the correctness of DHAO files depends on accurately providing the latest hot update dll and the AOT dll generated during packaging.

`HybridCLR.Editor.DHE.BuildUtils` provides multiple functions related to generating DHAO files.

|Function Name|Description|
|-|-|
|GenerateDHAODatas|Generate DHAO files for hot update packages (when code changes occur)|
|EncryptDllAndGenerateDHAODatas|When basic code protection is enabled, generate encrypted dlls and DHAO files for hot update packages (when code changes occur)|

## Marking Changed Function Information

Currently, it's possible to automatically calculate changed functions by comparing the latest hot update dll with the AOT dll generated during packaging. Manual operation is not required in most cases. However, there is no perfect code that can determine logical equivalence.
The tool simply compares IL one by one to determine equivalence. Sometimes functions may be equivalent but IL changes (such as swapping the order of two unrelated lines of code), which will be determined as function changes and switch to interpreted execution.
If this situation occurs, **and there are extremely strict performance requirements for that function**, developers can manually use the UnchangedAttribute to mark the function's change status.
`[Unchanged]` and `[Unchanged(true)]` indicate no change, `[Unchanged(false)]` indicates change, and unmarked attributes are automatically calculated by the tool.

Incorrectly marking unchanged functions as changed will not affect runtime correctness, only performance. Even if all hot update functions are marked as changed, it can still run normally. But incorrectly marking changed functions as unchanged will not only cause runtime logic errors,
but may also cause crashes in severe cases!

:::caution
Unless special circumstances and you are an experienced expert, do not manually mark. Because compilers often generate hidden classes or fields, and these class names are not stable. C# code that looks the same on the surface may not generate the same actual code. Forcing annotation as `[Unchanged]` will lead to incorrect runtime logic or even crashes.
:::

## Merging DHAO Files

Game packages released based on the same or similar source code have only minor differences in their original dhe assemblies across different platforms, and the DHAO files generated during hot updates also have only minor differences.
This requires calculating separate DHAO files for each platform (even on the same platform, due to code compilation instability, the generated original dlls may have minor differences), making DHAO maintenance complex and error-prone. This problem is particularly serious when multiple old and new game packages exist simultaneously.
Consider merging DHAO files for multiple platforms corresponding to the same dhe assembly, which does not affect runtime correctness while having minimal impact on performance.

We provide the `HybridCLR.Editor.DHE.BuildUtil::MergeDHAOFiles` function to achieve the goal of merging DHAO files.

Note that workflows with validation cannot use merged DHAO files because validated workflows check the md5 code of the original dll, which will definitely not match.

## Precautions

### External dlls cause massive differences in DHAO calculation results

If external dlls are marked as DHE assemblies, because external dlls are stripped during packaging, but when calculating DHAO files, the original external dll is taken, causing massive differences, which is not expected. There are several solutions:

1. In link.xml add `<assembly fullname="YourExternDll" preserve="all"/>` to completely preserve external dlls
2. Don't use the latest hot update dll to calculate differences, but use the AOT dll generated when repackaging with the latest code to calculate differences
