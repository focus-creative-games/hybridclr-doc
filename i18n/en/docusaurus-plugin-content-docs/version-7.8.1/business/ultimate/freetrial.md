# Free Trial

Compared to the paid trial version and the version after formal purchase, the free trial version only provides pre-compiled binary libs and tools, and only supports building for the iOS platform target.

## Trial Rules

- Targeted towards enterprise users only.
- The trial is free and has no trial period limit. However, if technical support is needed during the trial, additional charges will apply.
- The trial version will randomly crash after **30 minutes** of app launch. Please do not use it for formal releases.

## Hardware and platform limitation

:::tip
The official version is the same as the community version, and there are no platform restrictions for both Editor and Runtime.
:::

- Unity Editor must be run on a Mac with M1 or M2 CPU.
- **Only supports** iOS platform release

## Supported Versions

Only specific Unity versions are supported.

- ~~2019.4.40f1~~ To be supported
- ~~2020.3.48f1~~ To be supported
- 2021.3.31f1
- 2022.3.11f1

## Unsupported Features

:::tip

The following features are supported in the paid trial or the formal paid version.

:::

- dots
- **Incremental GC**
- Development build options like Profiler, Script Debugging, etc.

The lack of support for Incremental GC and various compilation options is due to the need for separate libil2cpp.a files for each compilation parameter, greatly increasing maintenance costs.

## Installation

The relevant libil2cpp code has been directly included in the package. Open the `HybridCLR/Installer` menu and click the Install button to complete the installation.

## Configuration

Compared to the community version or the formal commercial version, the following settings need to be modified:

- Disable incremental GC
- Disable development options
- The value of the encryption parameter vmSeed cannot be modified and must remain as 0. Other encryption parameters can be modified.

## Differences from the Standard Commercial Version

In the trial version, the source code of some modules is removed and replaced with compiled binary programs. The following are the related modules:

- DllEncryptor DLL encryption module
- DhaoGenerator dhao generation module

## Usage

Apart from minor adjustments in installation and configuration as described above, the rest remains entirely according to the [Quick Start](./quickstartunchecked) documentation.
