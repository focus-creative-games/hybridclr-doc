# Code Protection

The community version loads the original dll directly, forcing developers to carry and download the original dll. These original dlls can be decompiled by tools like ILSpy
, causing serious safety problems. Even if the developer encrypts it, it can easily be intercepted in the memory and obtain the decrypted dll content.

We provide the industry's top managed code hardening technology, which effectively prevents code from being cracked and tampered with by malicious third parties.


|Technology|Safety Level|
|-|-|
|Metadata Encryption|:star::star::star::star:|
|Structural randomization|:star::star::star:|
|Crypto-randomization|:star::star::star:|
|Delayed decryption|:star::star::star:|
|Virtualization|:star::star::star::star::star:|
|dll signature|:star::star::star:|

## Metadata encryption

|Technology|Structural Randomization|Encryption Randomization|Delayed Decryption|Safety Level|
|-|-|-|-|-|
|Customized dll file structure|✔|||:star:|
|~string stream encryption||✔||:star::star:|
|~blob stream encryption||✔||:star::star:|
|~US stream encryption||✔|✔|:star::star::star:|
|~table stream encryption|✔|✔|✔|:star::star::star::star:|
|method body data encryption||✔|✔|:star::star::star:|


### Custom dll file structure

The original dll file is in PE format. We changed it to a custom file structure and cannot be opened using decompilation tools such as ILSpy.

Supports structure randomization technology, that is, the dll structure of each version can be completely different, which significantly increases the cost of cracking.

### ~string stream encryption

The ~string stream stores strings used internally in metadata, such as type names, field names, etc. Encrypting the ~string stream data makes it impossible to obtain the metadata string directly from the dll file.

Supports encryption randomization technology, which significantly increases the difficulty of offline cracking.

### ~blob stream encryption

~blob streams store some complex metadata (such as type signatures). Encrypting the ~blob stream makes it impossible to obtain the original lob data directly from the dll file.

Supports encryption randomization technology, which significantly increases the cost of offline cracking.

### ~US stream encryption

The user string (that is, the string used in the code) metadata is saved in the ~US stream.

Supports encryption randomization technology, preventing crackers from directly obtaining the original ~US metadata from the dll file.

Supports delayed decryption to prevent crackers from using memory dump technology to directly restore all data.

### ~table stream encryption

The ~table stream holds most of the structured metadata.

Supporting structure randomization technology, each version uses a different metadata data structure, which greatly increases the cost of cracking. Even if it is cracked, it cannot be restored to the original ~table stream structure through simple data movement or copying.

Supports encryption randomization, significantly increasing the cost of cracking.

Supports delayed decryption to prevent crackers from using memory dump technology to directly restore all data.


### method body data encryption

The function body metadata information is stored in the method body.

Supports encryption randomization, significantly increasing the cost of cracking.

Supports delayed decryption to prevent crackers from using memory dump technology to directly restore all data.

## Structural randomization technology

Structural randomization technology refers to using a completely different file or metadata structure each time, which requires the cracker to re-crack each version, which greatly increases the cost of the cracker.

## Encryption randomization technology

Encryption randomization technology refers to using a completely different encryption technology each time, which requires the cracker to re-crack each version, which greatly increases the cost of the cracker.

## Delayed decryption technology

Delayed decryption technology refers to decrypting data only for the first time, effectively preventing crackers from hooking the critical path and directly dumping the complete original data into memory.

##Virtualization technology

Virtualization technology refers to converting original IL instructions into customized register virtual machine instructions, effectively preventing crackers from using ready-made decompilation tools to analyze the original code.

Virtualization technology supports instruction randomization technology. The instruction number and length of each version of the instruction are different, which greatly increases the cost of crackers.

## dll signature technology

Check the dll signature when loading the dll to make sure it is from an official source. Even if a malicious third party cracks the code, it will not be able to execute the tampered code, which greatly improves code security.
