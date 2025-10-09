# 从netstandard迁移到.Net Framework

Unity在打包过程中，会把对netstandard.dll的引用全部转换最终的mscorlib.dll之类的引用，导致原始代码
的引用关系跟最终的引用关系有很大不同。这个差异会导致`Generate/All/*`下命令会运行出错。同时由于
`HybridCLR/CompileDll/*`命令编译出的热更新dll仍然引用了`netstandard`而是不是最终的mscorlib之类的程序
集，导致加载和运行热更新dll时，会出现找不到netstandard中类型的错误。因此，HybridCLR默认要求使用`Net Framework`
Api Level。

有一些项目原先工作在.net standard Api Level上，为了能够接入HybridCLR后正常工作，需要执行一些迁移工作。
所幸，这些工作都是一次性的。

## 迁移步骤

迁移主要包含两步：

- 将项目内的预编译好的基于netstandard的dll转换为基于.net framework的dll
- 项目的Api Level 切换为 .Net Framework


## 转换基于netstarndard的外部dll

如果能直接找到该外部dll的基于.Net Framework的版本，替换项目对应的dll即可。如果找不到，
则可以利用Unity的打包过程会生成最终基于.Net Framework的aot dll的特性，生成该dll的
.Net Framework的版本。具体操作如下：

- 确保主工程已经有代码引用了此外部dll，而不仅仅是热更新代码中引用了该dll
- 在任意一个link.xml中perserve这个dll，如在`Assets/link.xml`里添加`<assembly fullname="xxx.dll" preserve="all"/>`
- 运行`HybridCLR/Generate/AOTDlls`
- 在`{project}/HybridCLRData/AssembliesPostIl2CppStrip/{target}`裁剪目录中获得该dll对应的文件
- 用该dll替换项目中的对应dll即可


