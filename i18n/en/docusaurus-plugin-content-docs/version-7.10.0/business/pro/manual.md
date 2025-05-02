# Manual

## Installation

- Unzip hybridclr_unity and put it in the project Packages directory, rename it to com.code-philosophy.hybridclr
- Unzip the corresponding `il2cpp_plus-{version}.zip` according to your unity version
- Unzip `hybridclr.zip`
- Put the hybridclr directory after unzipping `hybridclr.zip` into the libil2cpp directory after unzipping `il2cpp-{version}.zip`
- Open `HybridCLR/Installer`, turn on the `Copy libil2cpp from local` option, select the libil2cpp directory just unzipped, and install it

![installer](/img/hybridclr/ultimate-installer.jpg)

## Usage

- To enable full generic sharing, see [Full Generic Sharing](../fullgenericsharing)
- To encrypt code, see [Code hardening](../basicencryption)
- For metadata optimization, see [metadata optimization](../metadataoptimization)
- Other usages are exactly the same as the community version
