# Code Protection

The community version loads the original dll directly, forcing developers to carry and download the original dll. These original dlls can be decompiled by tools like ILSpy
, causing serious safety problems. Even if the developer encrypts it, it can easily be intercepted in the memory and obtain the decrypted dll content.

We provide the industry's top managed code hardening technology, which effectively prevents code from being cracked and tampered with by malicious third parties.


|Technology|Safety Index|Achieved|
|-|-|-|
|Metadata obfuscation|:star:|✔|
|Metadata encryption|:star::star::star::star:|✔|
|Fabric Virtualization|:star::star::star:||
|Encrypted Virtualization|:star::star::star:|✔|
|Delayed decryption|:star::star::star:|✔|
|Instruction virtualization|:star::star::star::star::star:||

## Metadata obfuscation

Due to clr's own mechanism, no matter how complex the encryption is, valid metadata information such as types, fields, function names, etc. can be obtained through reflection in the memory.
This information must be added to the security by obfuscating the metadata itself, i.e. completely losing the original plaintext information from the original level.

Because instruction obfuscation will significantly harm performance, only pure information types such as types, fields, and functions are obfuscated. We mainly protect code security through virtualization technology.

## Metadata encryption

|Technology|Fabric Virtualization|Encryption Virtualization|Lazy Decryption|Security Index|
|-|-|-|-|-|
|Customized dll file structure|✔|||:star:|
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

Structural virtualization technology refers to the use of a dedicated structural virtual machine to parse the structure of metadata, and it can be dynamically adjusted without rebuilding the App. This requires the cracker to re-crack each version, which greatly increases the cost of the cracker.

## Encrypted virtualization technology

Encrypted virtualization technology refers to the use of a dedicated encryption virtual machine to encrypt metadata, and it can be dynamically adjusted without rebuilding the app. This requires the cracker to re-crack each version, which greatly increases the cost of the cracker.

## Delayed decryption technology

Delayed decryption technology refers to decrypting data only for the first time, effectively preventing crackers from hooking the critical path and directly dumping the complete original data into memory.

## Instruction virtualization technology

Instruction virtualization technology refers to converting original IL instructions into customized register virtual machine instructions, effectively preventing crackers from using ready-made decompilation tools to analyze the original code.

Instruction virtualization technology supports randomized instruction structures. Every time the App is rebuilt, a new instruction set is used (the instruction number and instruction length are completely different), which greatly increases the cost of crackers.
