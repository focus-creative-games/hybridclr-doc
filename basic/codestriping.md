# 代码裁剪问题

Unity使用了[代码裁剪](https://docs.unity3d.com/Manual/ManagedCodeStripping.html)技术来帮助减少il2cpp backend的包体大小。如果未做防裁剪处理，由于AOT主工程里的代码一般不多，大量的C#类型和函数被
裁剪，导致热更新中调用这些被裁剪类或函数出现如下异常：

```txt
    // 类型缺失错误
    Unity: TypeLoadException: Could not load type 'Xxx' from assembly 'yyy'

    // 函数缺失错误
    MissingMethodException: xxxx
```

## 解决办法

根据日志错误日志确定哪个类型或函数被裁减，在link.xml里保留这个类型或函数，或者在主工程里显式地加上对这些类或函数的调用。

如果不熟悉如何在link.xml保留这个类型或函数，请参阅[代码裁剪](https://docs.unity3d.com/Manual/ManagedCodeStripping.html)。

但这种办法终究很麻烦，实际项目中有大量被裁剪的类型，你一遍遍地进行"打包-类型缺失-补充-打包"的操作，
浪费了太多时间。 `com.focus-creative-games.hybridclr_unity` 包提供了一个便捷的菜单命令`HybridCLR/Generate/LinkXml`，
能一键生成热更新工程里的所有AOT类型及函数引用。

注意，如果你主工程中没有引用过某个程序集的任何代码，即使在`link.xml`中保留，该程序集也会被完全裁剪。因此对于每个要保留的AOT程序集，
请确保在主工程代码中显式引用过它的某个类或函数。

## AOT类型及函数预留

hybridclr_unity的`HybridCLR/Generate/LinkXml`命令虽然可以智能地扫描出你当前引用的AOT类型，却不能预知你未来将来使用的
类型。因此你仍然需要有规划地提前在 `Assets/link.xml`(注意！不是自动生成的那个link.xml)预留你将来
可能用到的类型。切记不要疏漏，免得出现上线后某次更新使用的类型被裁剪的尴尬状况！