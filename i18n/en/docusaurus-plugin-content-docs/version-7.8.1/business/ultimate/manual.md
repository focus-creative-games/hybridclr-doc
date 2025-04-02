# User Manual

## Installation

- Unzip hybridclr_unity.zip and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your Unity version
- Unzip `hybridclr.zip`
- Put the hybridclr directory after unzipping `hybridclr.zip` into the libil2cpp directory after unzipping `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory just unzipped, and install it
- According to your Unity version:
- If the version is >= 2020, replace the `ModifiedDlls\{verions}\Unity.IL2CPP.dll` file `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll`(Unity 2020) or `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`(Unity 202 1+). If there is no file corresponding to your version, please contact us to make one
- If the version is 2019, no operation is required, because it has been automatically copied during the installation process

![installer](/img/hybridclr/ultimate-installer.jpg)

## Configuration

### Configure PlayerSettings

- Switch `Scripting Backend` to `IL2CPP`
- Switch `Api Compatibility Level` to `.Net 4.x`(Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

### Enable incremental GC

Enable the `use incremental GC` option in `Player Settings`, no settings are required for HybridCLR.

### Enable full generic sharing

- 2020 version does not support full generic sharing
- 2021 version needs to set IL2CPP Code Generation option to `faster(smaller)`
- 2022 version enables full generic sharing by default and cannot be turned off. If you set IL2CPP Code Generation option to `faster(smaller)`, you can further reduce the package size.

## Enable and disable standard instruction optimization

Standard optimization is enabled by default. You can actively control to enable or disable this feature through the `RuntimeApi.EnableTransformOptimization` function.

Standard instruction optimization and advanced instruction optimization are two completely independent and mutually exclusive features. For each interpreted function, you can only choose to use one of them or not use them at all.

### Configure HybridCLR

As with the community version, click the `HybridCLR/Settings` menu to open the configuration dialog box.

| Field | Description|
|-|-|-|
|differentialHybridAssemblies|DHE assembly list. Add the assembly names that need differential hybrid execution to this list, such as HotUpdate. The same assembly cannot be added to both the differentialHybridAssemblies and hotUpdateAssemblies lists. |

### Reserve all DHE assemblies in link.xml

For user-owned code such as Assembly-CSharp, il2cpp generally does not trim. However, for third-party assemblies that are directly added to Unity in the form of dll, if all are not reserved, these dlls will be trimmed during packaging, and there will be huge changes when generating dhao files, which is obviously not what we expect.

Add similar configurations `<assembly fullname="YourExternDll" preserve="all"/>` to all your dhe assemblies in `Assets/link.xml` (or other custom link.xml).

## Configure function injection strategy

:::tip

In most projects, the default full injection strategy has little impact on performance. As long as there is no performance problem, you don't need to care about this configuration.

:::

In order to avoid indirect dirty function contagion (i.e. function A calls function B, if B changes, A will also be marked as changed), a small check jump code is injected into all function headers by default. Although it is a very simple `if (method->isInterpterImpl)` statement, for short functions such as `int Age {get; set;}`, this insertion may cause observable performance degradation (even up to 10%).

Function injection strategy is used to optimize this situation. For short functions that do not change, configuring it to not inject can improve performance. For details, please see the [InjectRules](./injectrules) document.

In `HybridCLR Settings`, fill in the injection policy file path in the `InjectRuleFiles` field. The relative path of the file is the project root directory (such as `Assets/InjectRules/DefaultInjectRules.xml`).

## Unsupported features

- Unsupported `script debugging` build option
