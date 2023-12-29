# 常见问题

## ExecutionEngineException: Could not run the type initializer for origin DHE type 'xxx'

原因是 意外创建了被DHE替换的原始AOT类型。使用DHE后，不能再创建DHE程序集中类型对应的原始类型。有几个导致这个错误的原因：

- 未加载DHE程序集前就执行了DHE程序集中代码
- 热更新dhe dll与dhao文件不匹配，导致错误地执行了本不应该被执行的原始AOT代码，创建了原始AOT类型。只有4.5.7及更早的没有严格校验dll的版本才会有此错误
- 抛出异常或打印日志时，获得函数帧栈过程中，意外访问了DHE程序集的原始函数。4.5.8及更早版本有此bug

