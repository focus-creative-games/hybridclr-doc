# 不支持的特性

:::tip
不在限制事项中的特性HybridCLR都支持，请不要再问HybridCLR是否支持某个功能。
:::

- 暂时不支持在热更新脚本中定义extern函数，但可以调用AOT中extern函数。
- 支持2022的dots技术，需要小幅修改dots代码以支持动态注册component和system类型（**需要购买商业化版本获得实现细节**），而且无法利用burst加速。如果burst部分在AOT，则仍然原生方式执行；如果burst部分在热更部分，则虽然是Jobs并发执行，但以解释方式执行。
- 不支持`System.Runtime.InteropServices.Marshal`中 `Marshal.StructureToPtr`之类序列化结构的函数，但普通Marshal函数如`Marshal.PtrToStringAnsi`都是能正常工作的。
- 不支持[RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.xxx)]。纯粹是时机问题，Unity收集这些函数的时机很早，此时热更新dll还没加载。一个推荐的办法是你使用反射收集这些函数，在合适的时机主动调用它们。
- 不支持对解释代码部分进行C#级别调试，因为没暂时没时间写调试器
- `RequireComponent(typeof(AAA))` 要求AAA必须已经在别处资源中实例化或者AddComponent过，否则Unity无法识别AAA为脚本而忽略处理。
