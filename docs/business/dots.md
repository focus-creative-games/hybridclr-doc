# DOTS支持

:::tip

**商业化客户需要联系我们获取com.unity.entities package代码**，替换项目中对应的package。

:::

商业化版本修改了DOTS运行时代码及hybridclr运行时代码，支持绝大多数DOTS特性。


## 特性的支持状况

:::tip

注意，我们不单独罗列Shared Component之类的特性，它们统一归类到Component特性。

:::

|特性|社区版本|专业版|旗舰版|热重载版|
|-|-|-|-|-|
|Jobs|✔|✔|✔|✔|
|Managed Component||✔|✔|✔|
|Unmanaged Component||✔|✔|✔|
|Managed System||✔|✔|✔|
|Unmanaged System||✔|✔|✔|
|Aspect||✔|✔|✔|
|IJobEntity||✔|✔|✔|
|BurstCompile|||✔||
|SubScene|||||

## 注意事项

1. 专业版和热重载版热更新模块的DOTS代码以解释方式执行
2. 热重载版本无法卸载包含DOTS代码的程序集
3. 旗舰版本对标记了`[BurstCompile]`函数，未改变前执行原始burst代码，改变后会以解释方式执行。**改变的burst函数需要删除[BurstCompile]特性，否则运行时将出错**
4. 由于Unity的dots资源的序列化机制的并不支持新增热更新类型，包含热更新组件的资源的SubScene无法正确还原Component

## 支持的Unity及DOTS版本

由于DOTS代码处于不断变动中，目前仅支持以下版本组合：

- Unity 2021.3.0+ 及 com.unity.entities 0.51.1-preview.21
- Unity 2022.3.0+ 及 com.unity.entities 1.0.16

所有商业化版本都可以使用以上版本。有特殊版本需求的开发者，由于维护单独的DOTS版本成本较高，需要单独付费订制。
