# Hotfix动态热修复

有的更新仅仅是寥寥几行bug代码修复，有些开发者可能希望可以直接在游戏运行过程中动态修复，而不是强迫玩家重启当前的游戏App。
目前除了[热重载版本](./reload/intro)以外的版本都不支持重新加载热更新程序集。
即使是热加载版本，由于它支持彻底卸载一个程序集并且可以重新加载全新的程序集，对代码有较多[限制和要求](./reload/hotreloadassembly#不支持特性及特殊要求)，
对业务代码侵入性很大。

Hotfix技术即为专门解决此类动态修复bug的场合。它可以运行时无感的方式修复热更新模块的bug，而且对业务代码没有侵入性。

## 优点

- 动态修复代码bug，不需要重启游戏App
- 可以修复热更新程序集（包括旗舰版本的DHE程序集）中任何代码，包括静态成员函数、泛型函数、异步函数等等
- 使用简单，对业务代码无入侵，不需要修改任何业务代码
- 不限制修复次数，可以在app运行过程中多次修复。比如说发布v1版本修复后，又发现其他bug，接着发布v2版本修复

## 限制和缺陷

- 只能修复函数体，不能修改类型定义（如修改类名、增删字段、增删函数、修改函数签名之类）
- 每次修复都会加载一次热更新程序集，之前加载的程序集内存无法释放，造成一定的内存泄露
- 与函数Inline优化不兼容，需要关闭函数inline。在热更新加载前或者热更新入口调用`RuntimeApi.SetRuntimeOption(RuntimeOptionId.MaxMethodInlineDepth, 0);`

## 使用

调用`RuntimeApi::HotfixAssembly`函数即可完成热修复，示例代码如下。

```csharp

public static void ApplyHotfix()
{
    byte[] hotfixDllBytes = LoadFromXXX("Hotfix");
    var hotfixTypes = new List<HotfixType>
    {
        // 修复的类全名，含namespace（如果有）
        name = "TestHotfixMethods",
        // 修复的函数列表
        methods = new List<HotfixMethod>
        {
            new HotfixMethod
            {
                // 按函数名，如果有多个同名函数，则全部都会被修复
                name = "Foo1",
            },
            new HotfixMethod
            {
                // 按函数签名。name和signature只能提供一个，否则会报错
                signature = "Int32 Foo2(Int32, Int32)",
            },
        }
    };
    RuntimeApi.HotfixAssembly("Hotfix", hotfixDllBytes, hotfixTypes);
}
```

当需要修复的dll和函数比较多时，这么操作琐碎并且易错。建议先创建一个hotfix.manifest.xml配置文件，再转换为HotfixManifest类，然后使用`RuntimeApi.HotfixAssemblies`一次性修复，代码类似如下:


```csharp

public static void ApplyHotfix()
{
    string hotfixXmlStr = @"
<manifest>
    <assembly fullname=""Hotfix"">
        <type fullname=""TestHotfixMethods"">
            <method name=""Foo1"" />
            <method signature=""Int32 Foo2(Int32, Int32)"" />
            <method name=""Bar1"" />
            <method signature=""Int32 Bar2(Int32, Int32)"" />
        </type>
        <type fullname=""TestHotfixCtors"">
            <method name="".ctor"" />
            <method signature="".ctor(Int32)"" />
        </type>
        <type fullname=""TestHotfixStaticCtors"">
            <method name="".cctor"" />
        </type>
        <type fullname=""TestHotfixGenericClass`1"">
            <method name=""Foo1"" />
            <method name=""Foo2"" />
        </type>
        <type fullname=""TestHotfixGenericMethods"">
            <method name=""Foo1"" />
        </type>
    </assembly>
</manifest>
";

    RuntimeApi.HotfixAssemblies(HotfixManifest.LoadFrom(s_fixXmlStr, assName => LoadDll.GetDllBytes(assName + ".dll")));
}

```

## 裁剪hotfix程序集

绝大多数时候需要修复的函数数量很少，如果为此加载整个原始热更新dll，会造成大量下载带宽和运行时内存占用的浪费。hybridclr提供了裁剪工具，
只保留hotfix程序集中被hotfix的函数及它直接引用的类型和函数等元数据信息。调用`HybridCLR.Editor.Hotfix.HotfixAssemblyMetadataStripper::StripAssembly(string originalAssemblyPath, HotfixManifest manifest, string strippedAssemblyPath)`函数即可以生成裁剪后的调试精简的程序集。实践中往往可以裁剪掉**99%**以上程序集大小。

```csharp
    [MenuItem("Test/TestsStripper")]
    private static void StripTests()
    {
        BuildTarget target = EditorUserBuildSettings.activeBuildTarget;
        string DllDir = SettingsUtil.GetHotUpdateDllsOutputDirByTarget(target);
        string hotfixDllPath = $"{DllDir}/Tests.dll";
        string hotfixDllStrippedPath = $"{DllDir}/Tests.stripped.dll";
        var manifest = HotfixManifest.LoadFrom(s_fixXmlStr, ass => null);
        HotfixAssemblyMetadataStripper.StripAssembly(hotfixDllPath, manifest, hotfixDllStrippedPath);
        Debug.Log("strip hotfix assembly done!");
    }
```
