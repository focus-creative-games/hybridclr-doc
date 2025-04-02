# 代码加固

社区版本直接加载原始dll，使得开发者不得不携带和下载原始dll。这些原始dll能够被ILSpy之类的工具反编译
，产生严重的安全问题。即使开发者做了加密也很容易被内存中拦截而获得解密后的dll内容。

我们提供了业内顶级的托管代码加固技术，有效阻止了代码被恶意第三方破解和篡改。


|技术|安全指数|已经实现|
|-|-|-|
|global-metadatata.dat加密|:star:|✔|
|元数据混淆|:star::star:|✔|
|元数据加密|:star::star::star::star:|✔|
|结构虚拟化|:star::star::star:|✔|
|加密虚拟化|:star::star::star:|✔|
|延迟解密|:star::star::star:|✔|
|指令虚拟化|:star::star::star::star::star:||

## global-metadatata.dat加密

对global-metadata.dat进行加密，阻止恶意第三方还原出元数据信息。

## 元数据混淆

由于clr自身机制原因，无论作了多复杂的加密，在内存中必然可以通过反射获得类型、字段、函数名等等有效的元数据信息。
这些信息必须通过对元数据本身的混淆，即从原始级别就彻底丢失了原始明文信息来增加安全性。

因为指令混淆会对性能有明显伤害，所以只提供类型、字段、函数之类的纯信息类型的混淆。我们主要通过虚拟化技术来保护代码安全。

## 元数据加密

|技术|结构虚拟化|加密虚拟化|延迟解密|安全指数|
|-|-|-|-|-|
|自定义dll文件结构||||:star:|
|~string流加密||✔||:star::star:|
|~blob流加密||✔||:star::star:|
|~US流加密||✔|✔|:star::star::star:|
|~table流加密|✔|✔|✔|:star::star::star::star:|
|method body数据加密||✔|✔|:star::star::star:|


### 自定义dll文件结构

原始dll文件为PE格式，我们改为自定义文件结构，无法使用ILSpy等反编译工具打开。

支持结构虚拟化技术，也就是每个版本的dll结构都可以完全不一样，显著增加了破解成本。

### ~string流加密

~string流保存了元数据内部使用的字符串，如类型名、字段名之类。对~string流数据加密使得无法从dll文件中直接获得元数据字符串。

支持加密虚拟化技术，显著增加了离线破解难度。

### ~blob流加密

~blob流保存了一些复杂元数据（如类型签名）。对~blob流加密使得无法从dll文件中直接获得原始lob数据。

支持加密虚拟化技术，显著增加了离线破解成本。

### ~US流加密

~US流中保存了用户字符串（即代码中使用的字符串）元数据。

支持加密虚拟化技术，阻止了破解者从dll文件中直接获得原始~US元数据。

支持延迟解密，阻止破解者使用内存dump技术直接还原出所有数据。

### ~table流加密

~table流保存了大多数结构化的元数据。

支持结构虚拟化技术，每个版本都使用不同的元数据数据结构，大幅增加了破解成本，即使被破解也无法通过简单的数据移动或者复制还原为原始的~table流结构。

支持加密虚拟化，显著提升了破解成本。

支持延迟解密，阻止破解者使用内存dump技术直接还原出所有数据。


### method body数据加密

method body中保存了函数体元数据信息。

支持加密虚拟化，显著提升了破解成本。

支持延迟解密，阻止破解者使用内存dump技术直接还原出所有数据。

## 结构虚拟化技术

结构虚拟化技术指使用元数据结构完全随机，使用专用结构虚拟机来解析元数据的结构，并且在不重新构建App的情况下可以动态调整，使得破解者需要每个版本都重新破解，极大提升了破解者的成本。

## 加密虚拟化技术

加密虚拟化技术指使用加密方式完全随机，使用专用加密虚拟机来加密元数据，并且在不重新构建App的情况下可以动态调整，使得破解者需要每个版本都重新破解，极大提升了破解者的成本。

## 延迟解密技术

延迟解密技术指第一次才解密数据，有效防止破解者hook关键路径，直接内存dump出完整的原始数据。

## 指令虚拟化技术

指令虚拟化技术指将原始IL指令转换为自定义的寄存器虚拟机指令，有效阻止破解者使用现成的反编译工具分析出原始代码。

指令虚拟化技术支持随机化指令结构，每次重新构建App（为了提升解码指令的性能，不像结构虚拟化和加密虚拟化那样支持动态调整）时都使用全新的指令集（指令号和指令长度都完全不同），极大增加了破解者的成本。


## 配置

`HybridCLR Settings`中Encryption字段配置了加固相关参数。

|参数名|加密dll时需要与主包一致|描述|
|-|-|-|
|encryptGlobalMetdataDat||加密global-metadata.dat文件|
|vmSeed|是|加密虚拟机的随机化种子|
|metadataSeed|否|元数据的随机化加密种子|
|key|否|加解密时所用的加密参数|
|stringEncCodeLength|否|~string流的加密指令长度|
|blobEncCodeLength|否|~blob流的加密指令长度|
|userStringEncCodeLength|否|~US流的加密指令长度|
|tableEncCodeLength|否|~table流的加密指令长度|
|lazyUserStringEncCodeLength|否|~US流的延迟加密指令长度|
|methdBodyEncCodeLength|否|~函数体的延迟加密指令长度|


vmSeed是加密虚拟机的随机化种子。这个随机会种子会影响生成的加密虚拟机的代码，并且编译到主包的原生代码中。因此生成加密dll时，要确保vmSeed与主包打包时所用的vmSeed一致。
推荐每次发布新主包时修改此参数。

metadtaSeed和key为均为动态参数，不需要与主包一致。每次加密热更新dll都可以修改此值。推荐每经过一段时间或者经过几个版本后修改这些值。

xxEncCodeLength为加密指令的长度，值越大则加密越复杂，解密耗时与加密指令长度成正比关系。由于解密过程会带来一定的开销，建议取默认值即可。如果加载加密的热更新程序集的时间过长，可以适当减少这些值。

## 加密热更新dll

提供了 `HybridCLR.Editor.Encryption.EncryptUtil`类对dll进行加密。示例代码如下：

```csharp
    public static void EncryptDll(string originalDll, string encryptedDll)
    {
        HybridCLR.Editor.Encryption.EncryptionUtil.EncryptDll(originalDll, encryptedDll, SettingsUtil.EncryptionSettings);
    }

```

对于旗舰版本用户，由于默认的dhao文件记录了加密前的currentDll的MD5值，因此如果对dll进行加密，需要同步更新dhao文件，否则Runtime.LoadDifferentialHybridAssembly会运行失败。
为了方便使用，我们单独提供`HybridCLR.Editor.DHE.BuildUtil.EncryptDllAndGenerateDHAODatas`函数用于一次性完成加密和生成dhao文件的工作。

## 运行时加载热更新dll

与普通热更新dll没有任何区别，使用`Assembly.Load`即可。

补充元数据dll也可以加密，加载方式与未加密时相同。
