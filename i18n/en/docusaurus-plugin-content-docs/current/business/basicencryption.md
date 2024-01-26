# Code Protection

The community version loads the original dll directly, forcing developers to carry and download the original dll. These original dlls can be decompiled by tools like ILSpy
, causing serious safety problems. Even if the developer encrypts it, it can easily be intercepted in the memory and obtain the decrypted dll content.

We provide the industry's top managed code hardening technology, which effectively prevents code from being cracked and tampered with by malicious third parties.


|Technology|Safety Index|Achieved|
|-|-|-|
|Metadata obfuscation|:star::star:|✔|
|Metadata encryption|:star::star::star::star:|✔|
|Structure Virtualization|:star::star::star:|✔|
|Encrypted Virtualization|:star::star::star:|✔|
|Delayed decryption|:star::star::star:|✔|
|Instruction virtualization|:star::star::star::star::star:|✔|

## Metadata obfuscation

Due to clr's own mechanism, no matter how complex the encryption is, valid metadata information such as types, fields, function names, etc. can be obtained through reflection in the memory.
This information must be added to the security by obfuscating the metadata itself, i.e. completely losing the original plaintext information from the original level.

Because instruction obfuscation will significantly harm performance, only pure information types such as types, fields, and functions are obfuscated. We mainly protect code security through virtualization technology.

## Metadata encryption

|Technology|Structure Virtualization|Encryption Virtualization|Lazy Decryption|Security Index|
|-|-|-|-|-|
|Customized dll file structure||||:star:|
|~string stream encryption||✔||:star::star:|
|~blob stream encryption||✔||:star::star:|
|~US stream encryption||✔|✔|:star::star::star:|
|~table stream encryption|✔|✔|✔|:star::star::star::star:|
|method body data encryption||✔|✔|:star::star::star:|


### Custom dll file structure

The original dll file is in PE format. We changed it to a custom file structure and cannot be opened using decompilation tools such as ILSpy.

Supports structure virtualization technology, that is, the dll structure of each version can be completely different, which significantly increases the cost of cracking.

### ~string stream encryption

The ~string stream stores strings used internally in metadata, such as type names, field names, etc. Encrypting the ~string stream data makes it impossible to obtain the metadata string directly from the dll file.

Supports encryption virtualization technology, which significantly increases the difficulty of offline cracking.

### ~blob stream encryption

~blob streams store some complex metadata (such as type signatures). Encrypting the ~blob stream makes it impossible to obtain the original lob data directly from the dll file.

Supports encryption virtualization technology, which significantly increases the cost of offline cracking.

### ~US stream encryption

The user string (that is, the string used in the code) metadata is saved in the ~US stream.

Supports encrypted virtualization technology, preventing crackers from directly obtaining original ~US metadata from dll files.

Supports delayed decryption to prevent crackers from using memory dump technology to directly restore all data.

### ~table stream encryption

The ~table stream holds most of the structured metadata.

Supporting structure virtualization technology, each version uses different metadata data structures, which greatly increases the cost of cracking. Even if it is cracked, it cannot be restored to the original ~table stream structure through simple data movement or copying.

Supports encrypted virtualization, which significantly increases the cost of cracking.

Supports delayed decryption to prevent crackers from using memory dump technology to directly restore all data.


### method body data encryption

The function body metadata information is stored in the method body.

Supports encrypted virtualization, which significantly increases the cost of cracking.

Supports delayed decryption to prevent crackers from using memory dump technology to directly restore all data.

## Structure virtualization technology

Structure virtualization technology refers to the use of a dedicated structural virtual machine to parse the structure of metadata, and it can be dynamically adjusted without rebuilding the App. This requires the cracker to re-crack each version, which greatly increases the cost of the cracker.

## Encrypted virtualization technology

Encrypted virtualization technology refers to the use of a dedicated encryption virtual machine to encrypt metadata, and it can be dynamically adjusted without rebuilding the app. This requires the cracker to re-crack each version, which greatly increases the cost of the cracker.

## Delayed decryption technology

Delayed decryption technology refers to decrypting data only for the first time, effectively preventing crackers from hooking the critical path and directly dumping the complete original data into memory.

## Instruction virtualization technology

Instruction virtualization technology refers to converting original IL instructions into customized register virtual machine instructions, effectively preventing crackers from using ready-made decompilation tools to analyze the original code.

Instruction virtualization technology supports randomized instruction structures. Every time the App is rebuilt, a new instruction set is used (the instruction number and instruction length are completely different), which greatly increases the cost of crackers.

## Configuration

The encryption field in `HybridCLR Settings` configures hardening related parameters.

|Parameter name|When encrypting dll, it needs to be consistent with the main package|Description|
|-|-|-|
|vmSeed| is the |randomized seed for encrypted virtual machines|
|metadataSeed|No|Randomized encryption seed for metadata|
|key|No|Encryption parameters used for encryption and decryption|
|stringEncCodeLength|No|~The encryption instruction length of the string stream|
|blobEncCodeLength|No|~The encryption instruction length of the blob stream|
|userStringEncCodeLength|No|~US stream encryption command length|
|tableEncCodeLength|No|~Encryption instruction length of table stream|
|lazyUserStringEncCodeLength|No|~Lazy Encryption Instruction Length for US Stream|
|methdBodyEncCodeLength|No|~Delayed encryption instruction length of the function body|


vmSeed is the randomization seed for encrypted virtual machines. This random seed affects the code of the generated encrypted virtual machine and is compiled into the native code of the main package. Therefore, when generating an encrypted dll, make sure that vmSeed is consistent with the vmSeed used when packaging the main package.
It is recommended to modify this parameter every time a new main package is released.

MetadtaSeed and key are both dynamic parameters and do not need to be consistent with the main package. This value can be modified every time the encryption hot update dll is updated. It is recommended to modify these values every time or after several versions.

xxEncCodeLength is the length of the encryption instruction. The larger the value, the more complex the encryption. The decryption time is proportional to the length of the encryption instruction. Since the decryption process will bring some overhead, it is recommended to use the default value. if
It takes too long to load encrypted hot update assemblies. You can reduce these values appropriately.

## Encrypted hot update dll

The `HybridCLR.Editor.Encryption.EncryptUtil` class is provided to encrypt the dll. The sample code is as follows:

```csharp
     public static void EncryptDll(string originalDll, string encryptedDll)
     {
         HybridCLR.Editor.Encryption.EncryptionUtil.EncryptDll(originalDll, encryptedDll, SettingsUtil.EncryptionSettings);
     }

```

For flagship version users, since the default dhao file records the MD5 value of currentDll before encryption, if the dll is encrypted, the dhao file needs to be updated synchronously, otherwise Runtime.LoadDifferentialHybridAssembly will fail to run.
For ease of use, we provide the `HybridCLR.Editor.DHE.BuildUtil.EncryptDllAndGenerateDHAODatas` function separately to complete the encryption and generation of dhao files in one go.

## Load hot update dll at runtime

There is no difference from ordinary hot update dll, just use `Assembly.Load`.

Supplementary metadata dlls can also be encrypted and loaded in the same way as when unencrypted.
