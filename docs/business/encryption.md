# 标准代码加固

:::tip
所有商业化版本都支持标准代码加固。
:::

社区版本直接加载原始dll，使得开发者不得不携带和下载原始dll，而这些原始dll能够被ILSpy之类的工具反编译
，进行产生严重的安全问题。即使开发者做了加密也很容易被内存中拦截而获得解密后的dll内容。

标准代码加固提供了一定程度的混淆和加密功能，保障了代码安全。

## 实现

开启标准代码加固后，会重构和打乱hybridclr代码，同时改变了dll的解析方式，只能加载加密后的dll。
标准代码加固不仅加密了dll本身，也单独对IL进行了随机变换，即使解密了dll本身也无法被ILSpy之类的
工具解析，可以有效阻止代码被轻松破解。

标准代码加固不像深度代码加固那样做了不可逆的指令集转换，因此防护程度不如深度代码加固。

## 配置

在HybridCLRSettings中启用`enableEncryption`选项，即开启了标准代码加固。开启指令加固后，需要同时配置`encryptionSeed`字段。
该字段是一个int类型值，提供了一个默认值，强烈建议开发者修改此值。

每个不同的`ecryptionSeed`会导致`HybridCLR/Genrate/EncryptXXX`指令生成完全不同的hybridclr代码。

## 打包流程

- `HybridCLR/Generate/All`
- 使用`HybridCLR.Editor.Encryption.DllEncrypter`类对 补充元数据dll及热更新dll加密（即使补充元数据dll也需要加密！）
- 将加密后的dll加入你项目的资源管理系统
- 其他与社区版本操作完全相同

## 加密dll

使用`HybridCLR.Editor.Encryption.DllEncrypter`类对 补充元数据dll及热更新dll加密。 下面代码中EncryptDll演示了
如何加密一个dll，EncryptDllsInDirectory演示了如何加密多个dll。

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
                byte[] originBytes = File.ReadAllBytes(dllFile);
                byte[] encryptedBytes = encryptor.EncryptDll(originBytes);
                File.WriteAllBytes(dllFile, encryptedBytes);
                Debug.Log($"EncryptDllsInDirectory {dllFile} length:{encryptedBytes.Length}");
            }
        }
    }
```

## 运行时加载

与社区版本完全相同，直接调用Assembly.Load或RuntimeApi.LoadMetadataForAOTAssembly加载加密后的dll文件内容。
hybridclr会在内部解密，不需要开发者执行额外的解密操作。

