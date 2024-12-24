# Hotfix动态热修复

有的更新仅仅是寥寥几行bug代码修复，有些项目可能希望可以直接在游戏运行过程中动态修复，而不是强迫玩家重启当前的游戏App。
目前除了[热重载版本](./reload/intro)以外的版本都不支持重新加载热更新程序集。
即使是热加载版本，由于它支持彻底卸载一个程序集并且可以重新加载全新的程序集，对代码有较多[限制和要求](./reload/hotreloadassembly#不支持特性及特殊要求)，
对业务代码侵入性很大。

Hotfix技术即为专门解决此类动态修复bug的场合。它可以运行时无感的方式修复热更新模块的bug，而且对业务代码没有侵入性。

## 优点

- 动态修复代码bug，不需要重启游戏App
- 可以修复热更新程序集（包括旗舰版本的DHE程序集）中任何代码，包括静态成员函数、泛型函数、异步函数等待
- 使用简单，对业务代码无入侵，不需要修改任何业务代码
- 不限制修复次数，可以在app运行过程中多次修复。比如说发布v1版本修复后，又发现其他bug，接着发布v2版本修复

## 限制和缺陷

- 只能修复函数体，不能修改类型定义（如修改类名、增删字段、增删函数、修改函数签名之类）
- 每次修复都会加载一次热更新程序集，之前加载的程序集内存无法释放，造成一定的内存泄露

## 使用

调用`RuntimeApi::HotfixAssemblies`函数即可完成热修复，示例代码如下。

```csharp
            RuntimeApi.HotfixAssemblies(new HotfixManifest
            {
                assemblies = new List<HotfixAssembly>
                {
                    new HotfixAssembly
                    {
                        // 需要修复的目标程序集名
                        name = "Hotfix",
                        // 最新的dll文件内容
                        hotfixAssemblyBytes = LoadDll.GetDllBytes("Hotfix.new.dll"),
                        // 需要修复的类列表
                        classes = new List<HotfixClass>
                        {
                            new HotfixClass
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
                                        // 按函数签名。 name和signature只能提供一个，否则会报错
                                        signature = "Int32 Foo2(Int32, Int32)",
                                    },
                                }
                            },
                            new HotfixClass
                            {
                                name = "TestHotfixCtors",
                                methods = new List<HotfixMethod>
                                {
                                    new HotfixMethod
                                    {
                                        // 构造函数，如果有多个构造函数，则全部都会被修复
                                        name = ".ctor",
                                    },
                                    new HotfixMethod
                                    {
                                        // 指定签名的构造函数
                                        signature = ".ctor(Int32)",
                                    },
                                }
                            },
                            new HotfixClass
                            {
                                name = "TestHotfixStaticCtors",
                                methods = new List<HotfixMethod>
                                {
                                    new HotfixMethod
                                    {
                                        // 类静态构造函数
                                        name = ".cctor",
                                    },
                                }
                            },
                        }
                    }
                }
            });

```

