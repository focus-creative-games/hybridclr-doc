# Quick Start

Similar to the [Quick Start](../../beginner/quickstart.md) of the Community Edition, this document only highlights the differences.

## Installation

- Extract hybridclr_unity and place it in the project's Packages directory, renaming it to com.code-philosophy.hybridclr.
- Extract the corresponding il2cpp_plus-{version}.zip based on your Unity version.
- Extract hybridclr.zip.
- Place the hybridclr directory from the extracted hybridclr.zip into the libil2cpp directory from the extracted il2cpp-{version}.zip.
- Open `HybridCLR/Installer`, enable the `Copy libil2cpp from local` option, select the libil2cpp directory that was just extracted, and proceed with the installation.

![installer](/img/hybridclr/ultimate-installer.jpg)

## Usage

- For enabling Full Generic Sharing, see [Full Generic Sharing](../fullgenericsharing).
- For code encryption, refer to [Code Encryption](../basicencryption).
- For metadata optimization, see [Metadata Optimization](../metadataoptimization).
- Other usage remains identical to the Community Edition.
