# Free Trial

Compared to paid trial versions and officially purchased versions that include all HybridCLR runtime and Editor source code, the free trial version only provides precompiled binary libs and tools, and only supports building iOS platform targets.

## Trial Rules

- Only available for enterprise users
- Trial is free with no time limit, but technical support during trial requires additional payment
- Trial version will **randomly crash** 1 hour after app startup, please do not use for official releases

## Hardware and Platform Limitations

:::tip
Official versions, like the community version, have no platform restrictions for either Editor or Runtime.
:::

- Requires Unity Editor to run on Mac computers with M1 or M2 CPU.
- **Only supports** iOS platform publishing

## Supported Versions

Only supports the following specific Unity versions:

- 2021.3.31f1
- 2022.3.11f1

## Unsupported Features

:::tip

All the following features are supported in the official source code version

:::

- dots
- **Incremental GC**
- Profiler, Script Debugging and other development Build options

Incremental GC and various compilation options are not supported because each compilation parameter requires a separate libil2cpp.a, greatly increasing maintenance costs.

## Differences from Standard Commercial Version

The trial version removes source code from some modules and calls compiled binary programs instead. The following are related modules.

- DllEncryptor dll encryption module

## Installation

Related libil2cpp code is directly included in the Package. Open the `HybridCLR/Installer` menu and click the Install button to complete installation.

## Settings

Compared to the community version or official commercial version, the following settings need to be modified:

- Disable incremental GC
- Disable development options
- Cannot modify the encryption parameter vmSeed value, must keep it as 0. Other encryption parameters can be modified

## Usage

Except for installation and settings which have slight adjustments as described in the documentation above, the rest can completely follow the [Quick Start](./quickstart).
