# Manual

## Installation

- Extract hybridclr_unity and place it in the project's Packages directory, rename it to com.code-philosophy.hybridclr
- Extract the corresponding `il2cpp_plus-{version}.zip` according to your Unity version
- Extract `hybridclr.zip`
- Place the hybridclr directory from the extracted `hybridclr.zip` into the libil2cpp directory from the extracted `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory you just extracted, and perform the installation

![installer](/img/hybridclr/ultimate-installer.jpg)

## Usage

- For enabling full generic sharing, see [Full Generic Sharing](../fullgenericsharing)
- For code encryption, see [Code Hardening](../basicencryption)
- For metadata optimization, see [Metadata Optimization](../metadataoptimization)
- Other usage is exactly the same as the community version