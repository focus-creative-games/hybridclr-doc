# User Manual

## Installation

:::tip

Since version v8.6.0, the libil2cpp directory has been included in the com.code-philosophy.hybridclr package.

:::

- After extracting `dhe-{version}`, place the `com.code-philosophy.hybridclr` folder into your project’s **Packages** directory.
- Open **HybridCLR/Installer**, then click **Install** — this will automatically copy **libil2cpp** from the `Data~/libil2cpp` directory and complete the installation.
- Depending on your **Unity version**:
  - If using **6000.x.y** or **2023.x.y**:
    - First install **Unity 2022.3.60f1**.
    - Copy the directory `2022.3.60f1\Editor\Data\il2cpp\build\deploy` to `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\deploy-2022`.
    - Replace the file `ModifiedDlls\2022.3.60f1\Unity.IL2CPP.dll` with `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\deploy-2022\Unity.IL2CPP.dll`.
  - If using **2022.3.x** or **2021.3.x**, replace `ModifiedDlls\{version}\Unity.IL2CPP.dll` with
    `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\Unity.IL2CPP.dll`.
  - If using **2020.3.x**, replace `ModifiedDlls\{version}\Unity.IL2CPP.dll` with
    `{proj}\HybridCLRData\LocalIl2CppData-WindowsEditor\il2cpp\build\deploy\netcoreapp3.1\Unity.IL2CPP.dll`.
  - If using **2019.4.x**, no action is required, as the **Install** process already copies the necessary files automatically.

![installer](/img/hybridclr/ultimate-installer.jpg)

## Configuration

### Configure PlayerSettings

- Switch `Scripting Backend` to `IL2CPP`
- Switch `Api Compatability Level` to `.Net 4.x` (Unity 2019-2020) or `.Net Framework` (Unity 2021+)

![player settings](/img/hybridclr/ultimate-project-settings.jpg)

### Enable Incremental GC

Simply enable the `use incremental GC` option in `Player Settings`, no settings required for HybridCLR.

### Enable Full Generic Sharing

- 2020 version doesn't support full generic sharing
- 2021 version needs to set IL2CPP Code Generation option to `faster(smaller)`
- 2022 version has full generic sharing enabled by default and cannot be disabled. If you set IL2CPP Code Generation option to `faster(smaller)`, it can further reduce package size.

## Enable and Disable Standard Instruction Optimization

Standard optimization is enabled by default. You can actively control enabling or disabling this feature through the `RuntimeApi.EnableTransformOptimization` function.

Standard instruction optimization and advanced instruction optimization are completely independent and mutually exclusive features. For each interpreted function, you can only choose to use one of them or not use them at all.

### Configure HybridCLR

Same as the community version, click the `HybridCLR/Settings` menu to open the configuration dialog.

| Field | Description |
|-|-|-|
|differentialHybridAssemblies|DHE assembly list. Add assembly names that need differential hybrid execution to this list, such as HotUpdate. The same assembly **cannot be added simultaneously** to both differentialHybridAssemblies and hotUpdateAssemblies lists.|

### Reserve All DHE Assemblies in link.xml

For user's own code like Assembly-CSharp, il2cpp generally doesn't strip it. But for third-party assemblies added directly to Unity as dll files, if not all are reserved, these dlls will be stripped during packaging, which will cause massive changes when generating dhao files, which is obviously not what we expect.

Add configurations like `<assembly fullname="YourExternDll" preserve="all"/>` for all your dhe assemblies in `Assets/link.xml` (or other custom link.xml).

## Configure Function Injection Strategy

:::tip

In most projects, the default full injection strategy has negligible performance impact. As long as there are no performance issues, you don't need to and shouldn't care about this configuration.

:::

To avoid indirect dirty function contamination (i.e., function A calls function B, if B changes, A will also be marked as changed), by default a small section of check and jump code is injected at the beginning of all functions. Although it's a very simple `if (method->isInterpterImpl)` statement, for short functions like `int Age {get; set;}`, this insertion may cause observable performance degradation (even up to 10%).

Function injection strategy is used to optimize this situation. For short functions that won't change, configuring them as non-injected can improve performance. See the [InjectRules](./injectrules) document for details.

Fill in the injection strategy file path in the `InjectRuleFiles` field in `HybridCLR Settings`. The file's relative path is the project root directory (such as `Assets/InjectRules/DefaultInjectRules.xml`).

## Unsupported Features

- Does not support enabling the `script debugging` build option


