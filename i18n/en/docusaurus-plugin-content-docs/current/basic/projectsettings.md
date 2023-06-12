# Configure HybridCLR

After installing the com.code-philosophy.hybridclr package, you need to set the relevant parameters correctly. Detailed configuration related documents can be found in [hybridclr_unity package introduction](../basic/com.code-philosophy.hybridclr.md).

## Configure PlayerSettings

- Turn off the incremental GC (Use Incremental GC) option. Because incremental GC is not currently supported. WebGL platforms ignore this option. **com.code-philosophy.hybridclr will automatically turn off this option, you don't have to do it manually**.
- `Scripting Backend` is switched to `il2cpp`, WebGL platform does not need to set this option. **Since `v2.4.0`, this option is set automatically, you can do it without manually**.
- `Api Compatability Level` switched to `.NetFramework 4` (Unity 2019, 2020) or `.Net Framework` (Unity 2021+).

## Configure hot update assembly

Obviously, the code that needs to be hot updated should be split into independent assemblies in order to facilitate hot updating. How to create and split hot update assembly, please see [Create and configure hot update Assembly](../basic/hotupdateassemblysetting.md) document.

Click the menu `HybridCLR/Settings` to open the configuration interface.

- If it is an assembly defined by Assembly Definition (asmdef), add `hotUpdateAssemblyDefinitions`
- If it is a common dll or Assembly-CSharp.dll, add the assembly name (excluding the '.dll' suffix, such as Main, Assembly-CSharp) to `hotUpdateAssemblies`.
- If your hot update code is in an external project (for example, if you use a framework such as ET, its hot update code is not placed in the Unity project), you can use it in `externalHotUpdateAssemblyDirs`
The search path of the external hot update dll is specified in the configuration item. Note that **this path is a relative path**, relative to the root directory of the Unity project (that is, the parent directory of Assets).

The `hotUpdateAssemblyDefinitions` and `hotUpdateAssemblies` lists are equivalent, do not add them repeatedly, otherwise an error will be reported.

:::caution
If the hot update assembly is a compiled dll, its search path must be configured in `external dll search path` at the same time. The search path is a relative path, relative to the project root directory (that is, the parent directory of Assets).
:::

## Other parameters

Most of the parameters can be kept at their default values, and developers generally don’t need to care about them. For details, please refer to [com.code-philosophy.hybridclr package introduction](../basic/com.code-philosophy.hybridclr.md).
