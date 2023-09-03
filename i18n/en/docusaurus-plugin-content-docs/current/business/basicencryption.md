# Standard Code Encryption

The community version directly loads the original dll, making developers have to carry and download the original dll, and these original dll can be decompiled by tools such as ILSpy
, causing serious security problems. Even if the developer has done encryption, it is easy to be intercepted in the memory and obtain the decrypted dll content.

Standard code encryption provides a certain degree of obfuscation and encryption to ensure code security.

## Implementation

After standard code encryption is turned on, the hybridclr code will be reconstructed and disrupted, and the parsing method of dll will be changed. Only encrypted dll can be loaded.
Standard code encryption not only encrypts the dll itself, but also randomly transforms the IL separately. Even if the dll itself is decrypted, it cannot be used by ILSpy or the like.
Tool analysis can effectively prevent the code from being easily cracked.

Standard code encryption does not perform irreversible instruction set conversion like advanced code encryption, so the degree of protection is not as good as advanced code encryption.

## Configuration

Enable the `enableEncryption` option in HybridCLRSettings to enable standard code encryption. After command encryption is enabled, the `encryptionSeed` field needs to be configured at the same time.
This field is an int type value, which provides a default value, and developers are strongly recommended to modify this value.

Each different `encryptionSeed` will cause the `HybridCLR/Genrate/EncryptXXX` instructions to generate completely different hybridclr code.

## Building Games

- `HybridCLR/Generate/All`
- Use `HybridCLR.Editor.Encryption.DllEncrypter` class to encrypt supplementary metadata dll and hot update dll (even supplementary metadata dll needs to be encrypted!)
- Add the encrypted dll to the resource management system of your project
- Other operations are exactly the same as the community version

## Encryption dll

Use the `HybridCLR.Editor.Encryption.DllEncrypter` class to encrypt supplementary metadata dlls and hot update dlls. EncryptDll demonstrates in the following code
How to encrypt a dll, EncryptDllsInDirectory demonstrates how to encrypt multiple dlls.

```csharp

     public static class EncryptDllCommand
     {
         public static void EncryptDll(string originalDllFile, string encryptedDllFile)
         {
             int seed = SettingsUtil.EncryptionSeedOrZeroWhileDisable;
             if (seed == 0)
             {
                 Debug.LogWarning($"enableEncryption is false or encryptionSeed == 0, encryption is skipped");
                 return;
             }
             var encryptor = new DllEncryptor(seed);
             byte[] originBytes = File.ReadAllBytes(originalDllFile);
             byte[] encryptedBytes = encryptor.EncryptDll(originBytes);
             File.WriteAllBytes(encryptedDllFile, encryptedBytes);
         }

         public static void EncryptDllsInDirectory(string dllDir)
         {
             int seed = SettingsUtil.EncryptionSeedOrZeroWhileDisable;
             if (seed == 0)
             {
                 Debug.LogWarning($"enableEncryption is false or encryptionSeed == 0, encryption is skipped");
                 return;
             }
             var encryptor = new DllEncryptor(seed);
             foreach (var dllFile in Directory.GetFiles(dllDir, "*.dll.bytes"))
             {
                 byte[] originBytes = File. ReadAllBytes(dllFile);
                 byte[] encryptedBytes = encryptor.EncryptDll(originBytes);
                 File.WriteAllBytes(dllFile, encryptedBytes);
                 Debug.Log($"EncryptDllsInDirectory {dllFile} length:{encryptedBytes.Length}");
             }
         }
     }
```

## Load at runtime

Exactly the same as the community version, directly call Assembly.Load or RuntimeApi.LoadMetadataForAOTAssembly to load the encrypted dll file content.
hybridclr will decrypt it internally and does not require the developer to perform additional decryption operations.
