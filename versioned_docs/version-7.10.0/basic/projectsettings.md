# 配置

安装完com.code-philosophy.hybridclr包后，需要正确设置相关参数。配置相关详细文档可见 [hybridclr_unity包介绍](/basic/com.code-philosophy.hybridclr.md)。

## 配置PlayerSettings


- 如果你的com.code-philosophy.hybridclr版本低于v4.0.0，需要关闭增量式GC(Use Incremental GC) 选项。自v4.0.0起已经支持增量式GC，可以开启这个选项。
- `Scripting Backend` 切换为 `il2cpp`, WebGL平台不用设置此选项。**自`v2.4.0`起，会自动设置此选项，可以不用手动执行此操作**。
- `Api Compatability Level` 切换为 `.NetFramework 4`(Unity 2019、2020) 或 `.Net Framework`（Unity 2021+）。

## 配置热更新程序集

很显然，对于需要热更新的代码应该拆分为独立的程序集，才能方便地热更新。如何创建和拆分热更新程序集，请看[创建和配置热更新Assembly](/basic/hotupdateassemblysetting.md)文档。

点击菜单 `HybridCLR/Settings` 打开配置界面。

- 如果是Assembly Definition(asmdef)方式定义的程序集，加入`hotUpdateAssemblyDefinitions`
- 如果是普通dll或者Assembly-CSharp.dll，则将程序集名字（不包含'.dll'后缀，如Main、Assembly-CSharp）加入`hotUpdateAssemblies`。

`hotUpdateAssemblyDefinitions`和`hotUpdateAssemblies`列表是等价的，不要重复添加，否则会报错。

:::caution
如果热更新程序集是已经编译好的dll（无论放在Assets下还是其他目录），必须同时在 `HybridCLR/Settings`的`外部dll搜索路径`中配置它的搜索路径。
搜索路径为相对路径，相对于项目根目录（也就是Assets的父目录）。
:::

## 其他参数

大多数参数保持默认值即可，一般开发者不用关心。详细请查看[com.code-philosophy.hybridclr包介绍](/basic/com.code-philosophy.hybridclr.md)。
