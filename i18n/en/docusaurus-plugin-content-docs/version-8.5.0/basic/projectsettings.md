# Configuration

After installing the com.code-philosophy.hybridclr package, you need to properly configure related parameters. For detailed configuration documentation, see [hybridclr_unity Package Introduction](/basic/com.code-philosophy.hybridclr.md).

## Configure PlayerSettings

- If your com.code-philosophy.hybridclr version is lower than v4.0.0, you need to disable the Use Incremental GC option. Starting from v4.0.0, incremental GC is supported and this option can be enabled.
- Switch `Scripting Backend` to `il2cpp`. This setting is not needed for WebGL platform. **Starting from `v2.4.0`, this option is automatically set and manual configuration is not required**.
- Switch `Api Compatibility Level` to `.NetFramework 4` (Unity 2019, 2020) or `.Net Framework` (Unity 2021+).

## Configure Hot Update Assemblies

Obviously, code that needs hot updates should be split into independent assemblies for convenient hot updating. For how to create and split hot update assemblies, see the [Creating and Configuring Hot Update Assembly](/basic/hotupdateassemblysetting.md) documentation.

Click the menu `HybridCLR/Settings` to open the configuration interface.

- If assemblies are defined using Assembly Definition (asmdef) method, add them to `hotUpdateAssemblyDefinitions`
- If they are regular DLLs or Assembly-CSharp.dll, add the assembly names (without '.dll' suffix, such as Main, Assembly-CSharp) to `hotUpdateAssemblies`.

The `hotUpdateAssemblyDefinitions` and `hotUpdateAssemblies` lists are equivalent; don't add duplicates or errors will occur.

:::caution
If the hot update assembly is a pre-compiled DLL (whether placed under Assets or other directories), you must also configure its search path in `External DLL Search Paths` in `HybridCLR/Settings`.
The search path is relative to the project root directory (the parent directory of Assets).
:::

## Other Parameters

Most parameters can maintain default values and general developers don't need to worry about them. For details, see [com.code-philosophy.hybridclr Package Introduction](/basic/com.code-philosophy.hybridclr.md).
