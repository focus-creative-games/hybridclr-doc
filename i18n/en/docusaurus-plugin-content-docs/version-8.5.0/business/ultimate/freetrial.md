# Free Trial

Compared to the paid trial version and the officially purchased version which both include all HybridCLR runtime and Editor source code, the free trial version only provides precompiled
binary lib and tools, and only supports building iOS platform targets.


## Trial Rules

- Only for enterprise users
- Trial is free with no time limit, but technical support during the trial requires additional payment
- The trial version will **randomly crash** 1 hour after the App starts, please do not use it for officially released versions

## Hardware and Platform Limitations

:::tip
The official version, like the community version, has no platform restrictions for either Editor or Runtime.
:::

- Requires Unity Editor to run on Mac computers with M1 or M2 CPU.
- **Only supports** publishing to iOS platform

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

## Installation

The related libil2cpp code is already included directly in the Package. Open the `HybridCLR/Installer` menu and click the Install button to complete the installation.

## Settings

Compared to the community version or the official commercial version, the following settings need to be modified:

- Disable Incremental GC
- Disable development options
- Cannot modify the vmSeed value of encryption parameters, must keep it as 0. Other encryption parameters can be modified

## Differences from Standard Commercial Version

The trial version has removed source code for some modules and replaced them with calls to compiled binary programs. The following are the related modules.

- DllEncryptor dll encryption module
- DhaoGenerator dhao generation module

## Usage

Except for the installation and settings adjustments as described in the documentation above, the rest can completely follow the [Quick Start](./quickstartunchecked).
