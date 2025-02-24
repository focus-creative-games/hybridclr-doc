# 常见问题

## ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'

原因是 意外创建了被DHE替换的原始AOT类型。使用DHE后，不能再创建DHE程序集中类型对应的原始类型。有几个导致这个错误的原因：

- 未加载DHE程序集前就执行了DHE程序集中代码
- 热更新dhe dll与dhao文件不匹配，导致错误地执行了本不应该被执行的原始AOT代码，创建了原始AOT类型。只有4.5.7及更早的没有严格校验dll的版本才会有此错误
- 抛出异常或打印日志时，获得函数帧栈过程中，意外访问了DHE程序集的原始函数。4.5.8及更早版本有此bug
- 开启了 `script debugging`构建参数

## 只改了少量代码，但生成dhao时输出日志显示有巨量的struct和method发生改变

少量代码改动一般只会影响所在函数，如果发生巨量的函数变化，说明生成dhao时所用的原始dhe dll或者最新的dhe dll有很大的差异。可能的原因有几个：

- 使用了错误的原始dhe dll或者最新的dhe dll
- development选项不一致导致dll差异巨大。如构建主包时开启了development选项，但编译dll时没有使用`CompileDll/activeTarget_development`命令。或者构造主包时禁用了development选项，但编译dll时使用`CompileDll/activeTarget_development`。
- dhe程序集为预编译好的dll，构造主包时该dhe程序集被裁剪，导致与最新的dhe dll差异巨大。解决办法为在`link.xml`中添加`<assembly fullname="YourExternDll" preserve="all"/>` 完全保留该dll
