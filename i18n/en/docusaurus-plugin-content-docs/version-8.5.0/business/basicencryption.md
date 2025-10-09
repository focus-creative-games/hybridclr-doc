# Code Hardening

The community version directly loads original dlls, forcing developers to carry and download original dlls. These original dlls can be decompiled by tools like ILSpy,
creating serious security issues. Even if developers encrypt them, it's easy to intercept in memory and obtain decrypted dll content.

We provide industry-leading managed code hardening technology that effectively prevents code from being maliciously cracked and tampered with by third parties.


|Technology|Security Rating|Implemented|
|-|-|-|
|global-metadata.dat encryption|:star:|✔|
|Metadata obfuscation|:star::star:|✔|
|Metadata encryption|:star::star::star::star:|✔|
|Structure virtualization|:star::star::star:|✔|
|Encryption virtualization|:star::star::star:|✔|
|Delayed decryption|:star::star::star:|✔|
|Instruction virtualization|:star::star::star::star::star:||

## global-metadata.dat Encryption

Encrypts global-metadata.dat to prevent malicious third parties from recovering metadata information.

## Metadata Obfuscation

Due to CLR's inherent mechanisms, regardless of how complex the encryption is, valid metadata information such as type, field, and function names can inevitably be obtained through reflection in memory.
This information must be secured by obfuscating the metadata itself, i.e., completely losing the original plaintext information at the source level to increase security.

Since instruction obfuscation significantly hurts performance, we only provide obfuscation for pure information types like types, fields, and functions. We primarily use virtualization technology to protect code security.

## Metadata Encryption

|Technology|Structure Virtualization|Encryption Virtualization|Delayed Decryption|Security Rating|
|-|-|-|-|-|
|Custom dll file structure||||:star:|
|~string stream encryption||✔||:star::star:|
|~blob stream encryption||✔||:star::star:|
|~US stream encryption||✔|✔|:star::star::star:|
|~table stream encryption|✔|✔|✔|:star::star::star::star:|
|method body data encryption||✔|✔|:star::star::star:|


### Custom DLL File Structure

Original dll files are in PE format, which we change to a custom file structure that cannot be opened by decompilation tools like ILSpy.

Supports structure virtualization technology, meaning each version's dll structure can be completely different, significantly increasing cracking costs.

### ~string Stream Encryption

The ~string stream stores strings used internally by metadata, such as type names and field names. Encrypting ~string stream data prevents direct retrieval of metadata strings from dll files.

Supports encryption virtualization technology, significantly increasing the difficulty of offline cracking.

### ~blob stream encryption

The ~blob stream stores some complex metadata (such as type signatures). Encrypting the ~blob stream makes it impossible to directly obtain the original blob data from the dll file.

Supports encryption virtualization technology, significantly increasing the cost of offline cracking.

### ~US stream encryption

The ~US stream stores user string (i.e., strings used in code) metadata.

Supports encryption virtualization technology, preventing crackers from directly obtaining the original ~US metadata from dll files.

Supports delayed decryption, preventing crackers from using memory dump techniques to directly restore all data.

### ~table stream encryption

The ~table stream stores most structured metadata.

Supports structural virtualization technology, with each version using different metadata data structures, greatly increasing the cost of cracking. Even if cracked, it cannot be restored to the original ~table stream structure through simple data movement or copying.

Supports encryption virtualization, significantly improving the cost of cracking.

Supports delayed decryption, preventing crackers from using memory dump techniques to directly restore all data.


### method body data encryption

method body stores function body metadata information.

Supports encryption virtualization, significantly improving the cost of cracking.

Supports delayed decryption, preventing crackers from using memory dump techniques to directly restore all data.

## Structural Virtualization Technology

Structural virtualization technology refers to using completely random metadata structures, using a dedicated structural virtual machine to parse the metadata structure, and can be dynamically adjusted without rebuilding the App, making crackers need to re-crack each version, greatly increasing the cost for crackers.

## Encryption Virtualization Technology

Encryption virtualization technology refers to using completely random encryption methods, using a dedicated encryption virtual machine to encrypt metadata, and can be dynamically adjusted without rebuilding the App, making crackers need to re-crack each version, greatly increasing the cost for crackers.

## Delayed Decryption Technology

Delayed decryption technology refers to decrypting data only when first accessed, effectively preventing crackers from hooking critical paths and directly dumping complete original data from memory.

## Instruction Virtualization Technology

Instruction virtualization technology refers to converting original IL instructions into custom register virtual machine instructions, effectively preventing crackers from using existing decompilation tools to analyze original code.

Instruction virtualization technology supports randomized instruction structures. Each time the App is rebuilt (to improve instruction decoding performance, unlike structure virtualization and encryption virtualization which support dynamic adjustment), a completely new instruction set (with completely different instruction numbers and instruction lengths) is used, greatly increasing the cost for crackers.


## Configuration

The Encryption field in `HybridCLR Settings` configures hardening-related parameters.

|Parameter Name|Must Match Main Package When Encrypting dll|Description|
|-|-|-|
|encryptGlobalMetdataDat||Encrypt global-metadata.dat file|
|vmSeed|Yes|Randomization seed for encryption virtual machine|
|metadataSeed|No|Randomization encryption seed for metadata|
|key|No|Encryption parameters used for encryption/decryption|
|stringEncCodeLength|No|Encryption instruction length for ~string stream|
|blobEncCodeLength|No|Encryption instruction length for ~blob stream|
|userStringEncCodeLength|No|Encryption instruction length for ~US stream|
|tableEncCodeLength|No|Encryption instruction length for ~table stream|
|lazyUserStringEncCodeLength|No|Delayed encryption instruction length for ~US stream|
|methdBodyEncCodeLength|No|Delayed encryption instruction length for ~function body|


vmSeed is the randomization seed for the encryption virtual machine. This random seed affects the generated encryption virtual machine code and is compiled into the main package's native code. Therefore, when generating encrypted dlls, ensure that vmSeed matches the vmSeed used when packaging the main package.
It is recommended to modify this parameter each time a new main package is released.

metadataSeed and key are both dynamic parameters and do not need to match the main package. These values can be modified each time hot update dlls are encrypted. It is recommended to modify these values after a period of time or after several versions.

xxEncCodeLength is the length of encryption instructions. The larger the value, the more complex the encryption, and decryption time is proportional to the encryption instruction length. Since the decryption process brings certain overhead, it is recommended to use default values. If loading encrypted hot update assemblies takes too long, these values can be appropriately reduced.

## Encrypt hot update dll

The `HybridCLR.Editor.Encryption.EncryptUtil` class is provided to encrypt dlls. Example code is as follows:

```csharp
    public static void EncryptDll(string originalDll, string encryptedDll)
    {
        HybridCLR.Editor.Encryption.EncryptionUtil.EncryptDll(originalDll, encryptedDll, SettingsUtil.EncryptionSettings);
    }

```

## Runtime loading of hot update dll

There is no difference from ordinary hot update dlls, just use `Assembly.Load`.

Supplementary metadata dlls can also be encrypted, and the loading method is the same as when unencrypted.
